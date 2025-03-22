import { db } from "@/prisma";


export async function createQoute(qouteData: {
  qoutes: string,
  userId: string,
  authorName?: string,
  image?: string,
}) {

  return await db.qoutes.create({
    data: {
      ...qouteData,
      enabledBy: qouteData.userId,
      isEnabled: true,
      userId: qouteData.userId,
    }
  })
}
