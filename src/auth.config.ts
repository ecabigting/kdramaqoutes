import { User } from "@prisma/client";
import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"

/*
 *
 * CUSTOM INTERFACES
 * 
 */

interface CustomUser extends User {
  enabledBy?: string;
}

export default {
  providers:
    [
      Google,
      // Credentials({
      //   credentials: { email: {}, password: {} },
      //   authorize: async (credentials) => {
      //     const user = null
      //     return user
      //   }
      // })
    ],
  callbacks: {
    signIn: async ({ user, account }) => {
      const customUser = user as CustomUser;
      if (customUser && account?.provider) {
        customUser.enabledBy = `enabledBy-${account.provider}-signIn`;
      }
      return true;
    },
    session: async ({ session, user }) => {
      return session;
    },
  }
} satisfies NextAuthConfig
