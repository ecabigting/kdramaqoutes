// next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add the user ID to the session type
      name?: string;
      email?: string;
      image?: string;
      displayName?: string;
      displayNameChanged?: boolean; // New field
    };
  }

  interface User {
    id: string; // Ensure the user object has an ID
    name?: string;
    email?: string;
    image?: string;
    displayNameChanged?: boolean; // New field
  }
}
