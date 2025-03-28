// ./src/auth.ts
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import { db } from "./prisma"
import authConfig from "./auth.config"
import { User } from "@prisma/client";
import { generateDisplayName } from "../lib/utils";

/*
 *
 * CUSTOM INTERFACES
 * 
 */


type CustomUser = User & {
  enabledBy?: string;
  displayName?: string;
  displayNameChanged?: boolean;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: true,
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  callbacks: {
    signIn: async ({ user, account }) => {
      const customUser = user as CustomUser;
      if (customUser && account?.provider) {
        customUser.enabledBy = `enabledBy-${account.provider}-signIn`;
      }

      // Generate and assign display name
      if (user.email) {
        customUser.displayName = generateDisplayName(user.email);
        customUser.displayNameChanged = false; // Set to false on first sign-in
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
  ...authConfig,
})
