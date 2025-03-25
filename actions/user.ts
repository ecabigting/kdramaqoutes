// actions/user.ts
"use server";

import { auth } from "@/auth";
import { getDisplayName, getUserById, setDisplayNameDismissed, updateUserDisplayName } from "../data/user";

export const getCurrentUser = async () => {
  const session = await auth();
  if (!session?.user?.id) return null;

  const user = await getUserById(session.user.id);
  return {
    ...user,
    displayName: user?.displayName || user?.name?.split(' ')[0] || 'Anonymous'
  };
};

export const updateCurrentUserDisplayName = async (formData: FormData) => {
  try {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");

    const displayName = formData.get("displayName") as string;

    // Check availability
    const isAvailable = await checkDisplayNameAvailable(displayName, session.user.id);
    if (!isAvailable) throw new Error(`"${displayName}" is already taken`);

    // Update in database
    await updateUserDisplayName(session.user.id, displayName);

    return { success: true };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to update display name"
    };
  }
};

export const dismissDisplayNamePrompt = async () => {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  session.user.displayNameChanged = true;
  return await setDisplayNameDismissed(session.user.id);
};

export const checkDisplayNameAvailable = async (displayName: string, currentUserId: string) => {
  return await getDisplayName(displayName, currentUserId);
}


