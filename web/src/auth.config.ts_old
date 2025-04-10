// ./src/auth.config.ts
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
// Make sure process.env is available here. Add logs if needed.
console.log("Auth Config - Google ID:", process.env.AUTH_GOOGLE_ID);
console.log("Auth Config - Google Secret:", !!process.env.AUTH_GOOGLE_SECRET); // Check if secret exists without logging it
export default {
  providers:
    [
      Google,
      // Credentials({
      //   name: "Credentials",
      //   credentials: {
      //     email: { label: "Email", type: "email" },
      //     password: { label: "Password", type: "password" }
      //   },
      //   async authorize(credentials) {
      //     // Validate credentials
      //     if (!credentials?.email || !credentials?.password) {
      //       return null;
      //     }
      //     const { getUserByEmail } = await import('../actions/user');
      //     const user = await getUserByEmail(credentials?.email);
      //     if (!user) return null
      //     // Return user object without sensitive data
      //     return {
      //       id: user.id,
      //       email: user.email,
      //       name: user.name,
      //       displayName: user.displayName || user.name?.split(' ')[0] || 'User',
      //       displayNameChanged: user.displayNameChanged || false,
      //       image: user.image
      //     };
      //   }
      // })
    ],
} satisfies NextAuthConfig
