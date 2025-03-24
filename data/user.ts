import { db } from "@/prisma";

export const getUserById = async (id: string) => {
  return await db.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      displayName: true
    },
  });
};

export const updateUserDisplayName = async (userId: string, displayName: string) => {
  return await db.user.update({
    where: { id: userId },
    data: { displayName },
  });
};
