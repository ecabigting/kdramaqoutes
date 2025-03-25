"use server"

import { auth } from "@/auth"
import { createQoute, getEnabledQoutes } from "../data/qoutes"
import { revalidatePath } from "next/cache"

export async function submitQoute({ qoute, showTitle, characterName, showImage }: { qoute: string, showTitle: string, characterName: string, showImage: string }) {
  const session = await auth()

  if (!session || !session.user?.id) {
    throw new Error("You must be logged in to submit a qoute.")
  }

  if (!qoute || qoute.length > 200) {
    throw new Error("Qoute must not be empty at less than 200 characters.")
  }

  if (!showTitle || !characterName) {
    throw new Error("Show Title and Character Name are required.")
  }

  try {
    await createQoute({
      qoutes: qoute,
      userId: session.user.id,
      authorName: session.user.displayName,
      image: showImage,
      showTitle: showTitle,
      characterName: characterName
    })
    revalidatePath("/")
  } catch (error) {
    console.log(error)
    throw new Error(`Failed to submit qoute:${error}`)
  }
}

export async function fetchEnabledQoutes() {
  return await getEnabledQoutes();
}
