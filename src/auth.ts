import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import { db } from "./prisma"
import authConfig from "./auth.config"
import { User } from "@prisma/client";

/*
 *
 * CUSTOM INTERFACES
 * 
 */

type CustomUser = User & {
  enabledBy?: string;
}


export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  callbacks: {
    signIn: async ({ user, account }) => {
      const customUser = user as CustomUser;
      if (customUser && account?.provider) {
        customUser.enabledBy = `enabledBy-${account.provider}-signIn`;
      }
      return true;
    },
    jwt: async ({ token, user }) => {
      // Include the user ID in the token
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  ...authConfig,
})
