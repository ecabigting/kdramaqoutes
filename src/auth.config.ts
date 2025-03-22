import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"

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
} satisfies NextAuthConfig
