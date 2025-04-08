// ./src/auth.ts
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./prisma";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import NextAuth, { NextAuthConfig } from "next-auth";
import { CustomUser } from "./types/user";
import { generateDisplayName } from "../lib/utils";
import { getUserByEmail } from "../actions/user";
import { signinFormSchema } from "./types/schema/signinFormSchema";

export const config = {
  providers:
    [
      Google,
      Credentials({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
          // Validate credentials
          if (!credentials?.email || !credentials?.password) {
            return null;
          }
          const validatedData = signinFormSchema.parse(credentials);
          const user = await getUserByEmail(validatedData.email);
          if (!user) return null
          // Return user object without sensitive data
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            displayName: user.displayName || user.name?.split(' ')[0] || 'User',
            displayNameChanged: user.displayNameChanged || false,
            image: user.image
          };
        }
      })
    ],
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider !== 'credentials') {
        const customUser = user as CustomUser;
        if (customUser && account?.provider) {
          customUser.enabledBy = `enabledBy-${account.provider}-signIn`;
        }

        // Generate and assign display name
        if (user.email) {
          customUser.displayName = generateDisplayName(user.email);
          customUser.displayNameChanged = false; // Set to false on first sign-in
        }
      }
      return true;
    },
    jwt: async ({ token, user }) => {
      // Include the user ID in the token
      if (user) {
        token.id = user.id;
        token.displayName = (user as CustomUser).displayName;
        token.displayNameChanged = (user as CustomUser).displayNameChanged; // New field
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.displayName = token.displayName as string;
        session.user.displayNameChanged = token.displayNameChanged as boolean; // New field
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(config)
