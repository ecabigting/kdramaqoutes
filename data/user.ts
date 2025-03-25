import { db } from "@/prisma";

export const getUserById = async (id: string) => {
  return await db.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      displayName: true,
      displayNameChanged: true // New field
    },
  });
};

export const updateUserDisplayName = async (userId: string, displayName: string) => {
  return await db.user.update({
    where: { id: userId },
    data: { displayName, displayNameChanged: true },
  });
};

export const setDisplayNameDismissed = async (userId: string) => {
  return await db.user.update({
    where: { id: userId },
    data: { displayNameChanged: true },
  });
};

export const getDisplayName = async (displayName: string, currentUserId?: string) => {
  const existingUser = await db.user.findFirst({
    where: {
      displayName: {
        equals: displayName, // Exact match (case-sensitive)
      },
      ...(currentUserId ? { NOT: { id: currentUserId } } : {}), // Optional current user exclusion
    },
    select: { id: true }
  });
  return !existingUser;
};
