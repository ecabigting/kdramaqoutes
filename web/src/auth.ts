import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { CustomUser } from "./types/user";
import { generateDisplayName } from "../lib/utils";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: true,
  providers: [Google({
    clientId: process.env.AUTH_GOOGLE_ID || "", // Ensure fallback for safety
    clientSecret: process.env.AUTH_GOOGLE_SECRET || "", // Ensure fallback for safety

    // --- Explicitly define endpoints ---
    authorization: {
      url: "https://accounts.google.com/o/oauth2/v2/auth",
      params: {
        scope: "openid email profile", // Adjust scopes as needed
        prompt: "consent",          // Optional: Forces consent screen every time
        access_type: "offline",     // Optional: Needed if you want refresh tokens
        response_type: "code",
      },
    },
    token: {
      url: "https://oauth2.googleapis.com/token",
    },
    userinfo: {
      url: "https://openidconnect.googleapis.com/v1/userinfo",
    },
    // --- End of explicit endpoints ---

  }),
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
      const { getUserByEmail } = await import('../actions/user');
      const user = await getUserByEmail(credentials?.email);
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
  session: { strategy: "jwt" },
  callbacks: {
    signIn: async ({ user, account, profile }) => {
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

        console.log(">>>>>>>>>>>>>>>>>> SIGIN WITH:", account?.provider)
        console.log(">>>>>>>>>>>>>>>>>> USER DATA:", { user })
        console.log(">>>>>>>>>>>>>>>>>> ACCOUNT DATA:", { account })
        console.log(">>>>>>>>>>>>>>>>>> PROFILE:", { profile })

      }
      return true;
    },
    jwt: async ({ token, user, account }) => {
      // Include the user ID in the token
      if (user) {
        token.id = user.id;
        token.displayName = (user as CustomUser).displayName;
        token.displayNameChanged = (user as CustomUser).displayNameChanged; // New field
      }

      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.idToken = account.id_token;
        token.expiresAt = account.expires_at; // Expiration timestamp of the token
      }

      // Handle token expiration
      if (typeof token.expiresAt === "number" && Date.now() / 1000 > token.expiresAt) {
        console.log("Token expired. Refreshing...");
        try {
          const url = "https://oauth2.googleapis.com/token";
          const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              client_id: process.env.GOOGLE_CLIENT_ID || "", // Fallback to empty string if undefined
              client_secret: process.env.GOOGLE_CLIENT_SECRET || "", // Fallback to empty string if undefined
              refresh_token: typeof token.refreshToken === "string" ? token.refreshToken : "", // Ensure refreshToken is a string
              grant_type: "refresh_token",
            }),
          });

          const refreshedTokens = await response.json();

          if (!response.ok) {
            throw refreshedTokens; // Throw error if refresh fails
          }

          token.accessToken = refreshedTokens.access_token;
          token.idToken = refreshedTokens.id_token;
          token.expiresAt = Math.floor(Date.now() / 1000) + refreshedTokens.expires_in;
        } catch (error) {
          console.error("Error refreshing token:", error);
        }
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.displayName = token.displayName as string;
        session.user.displayNameChanged = token.displayNameChanged as boolean; // New field
      }

      session.accessToken = token.accessToken; // Attach access token to session
      session.idToken = token.idToken; // Attach ID token to session
      session.expiresAt = token.expiresAt; // Attach expiration timestamp

      return session;
    },
  },

})
