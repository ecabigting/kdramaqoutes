"use server"

import { auth } from "@/auth"
import { createQoute } from "../data/qoutes"
import { revalidatePath } from "next/cache"

export async function submitQoute(qoute: string) {
  const session = await auth()

  if (!session || !session.user?.id) {
    throw new Error("You must be logged in to submit a qoute.")
  }

  if (!qoute || qoute.length > 200) {
    throw new Error("Qoute must not be empty at less than 200 characters.")
  }

  try {
    await createQoute({ qoutes: qoute, userId: session.user.id, authorName: session.user.name, image: "" })
    revalidatePath("/")
  } catch (error) {
    throw new Error(`Failed to submit qoute:${error}`)
  }
}
