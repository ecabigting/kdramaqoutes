
// Import the original types you want to extend
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt"; // Or "@auth/core/jwt" for v5

// Extend the built-in session.user object
// Add the properties you added to the user object in the authorize/signIn callbacks
interface ExtendedUser extends DefaultUser {
  id: string; // Ensure id is always string in your user type
  displayName?: string;
  displayNameChanged?: boolean;
  // Add any other custom user properties if needed
}

// Extend the built-in JWT type
// Add the properties you added to the token in the jwt callback
declare module "next-auth/jwt" { // Or use "@auth/core/jwt" if using v5 module path
  interface JWT extends DefaultJWT {
    id?: string; // Added in jwt callback
    displayName?: string; // Added in jwt callback
    displayNameChanged?: boolean; // Added in jwt callback
    accessToken?: string; // Added in jwt callback
    refreshToken?: string; // Added in jwt callback (needed for refresh)
    idToken?: string; // Added in jwt callback
    expiresAt?: number; // Added in jwt callback
    // You can add other properties from your token here if necessary
  }
}

// Extend the built-in Session type
// Add the properties you added to the session in the session callback
declare module "next-auth" { // Or use "@auth/core/types" if using v5 module path
  interface Session {
    // Extend the user property to use our ExtendedUser type
    user: ExtendedUser & DefaultSession["user"]; // Merge custom user fields with default ones

    // Add the custom properties to the top-level Session object
    accessToken?: string; // Added in session callback
    idToken?: string; // Added in session callback
    expiresAt?: number; // Added in session callback
    // Add any other custom session properties if needed
    error?: string; // Example: For handling refresh errors, often added to session
  }
}
