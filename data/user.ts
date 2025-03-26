// data/user.ts

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


export const createNewUser = async ({
  displayName,
  email,
  password,
}: {
  displayName: string;
  email: string;
  password: string;
}) => {
  return await db.user.create({
    data: {
      email,
      name: displayName,
      displayName,
      displayNameChanged: false,
      isEnabled: true,
      enabledAt: new Date(),
      password: password,
      enabledBy: "credentials-signup-system",
    },
    select: {
      id: true,
      email: true,
      name: true,
      displayName: true,
    },
  });
};

export const checkEmailExists = async (email: string) => {
  const existingUser = await db.user.findUnique({
    where: { email }
  });
  return !!existingUser;
};

export const checkDisplayNameExists = async (displayName: string) => {
  const existingUser = await db.user.findFirst({
    where: { displayName }
  });
  return !!existingUser;
};

export const findUserByEmail = async (email: string) => {
  return await db.user.findUnique({
    where: { email: email.toLowerCase() },
    select: {
      id: true,
      email: true,
      password: true,
      name: true,
      displayName: true,
      displayNameChanged: true,
      image: true,
      isEnabled: true
    }
  });
};
