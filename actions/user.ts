// actions/user.ts
"use server";

import { auth } from "@/auth";
import { getUserById, updateUserDisplayName } from "../data/user";

export const getCurrentUser = async () => {
  const session = await auth();
  if (!session?.user?.id) return null;

  const user = await getUserById(session.user.id);
  return {
    ...user,
    displayName: user?.displayName || user?.name?.split(' ')[0] || 'Anonymous'
  };
};

export const updateCurrentUserDisplayName = async (displayName: string) => {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  return await updateUserDisplayName(session.user.id, displayName);
};
