import { db } from "@/prisma";


export async function createQoute(qouteData: {
  qoutes: string,
  userId: string,
  authorName?: string,
  image: string,
  showTitle: string,
  characterName: string
}) {

  return await db.qoutes.create({
    data: {
      ...qouteData,
      enabledBy: qouteData.userId,
      isEnabled: true,
      userId: qouteData.userId,
      image: qouteData.image
    }
  })
}



export async function getEnabledQoutes() {
  return await db.qoutes.findMany({
    where: { isEnabled: true },
    orderBy: { createdAt: "desc" },
  });
}

