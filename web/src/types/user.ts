// ./src/types/user.ts
import { User } from "@prisma/client";

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  image: string;
  displayName: string;
  displayNameChanged: boolean;
}

/*
 *
 * CUSTOM INTERFACES
 * 
 */

export type CustomUser = User & {
  enabledBy?: string;
  displayName?: string;
  displayNameChanged?: boolean;
}


