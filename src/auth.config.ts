// ./src/auth.config.ts
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"

export default {
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

          // Find user by email
          const user = await db.user.findUnique({
            where: { email: credentials.email.toLowerCase() }
          });

          // Check if user exists and has password
          if (!user || !user.password) {
            return null;
          }

          // Verify password
          const passwordsMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!passwordsMatch) {
            return null;
          }

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
      })],
} satisfies NextAuthConfig
