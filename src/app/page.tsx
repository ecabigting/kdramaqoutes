import { auth } from "@/auth"

export default async function Home() {
  const session = await auth()
  return <div className="flex flex-col items-center justify-center m-auto h-screen">
    <h1 className="text-3xl font-bold ">kdramaqoutes.com</h1>
    {JSON.stringify(session?.user)}
    <h2 className="">coming soon...</h2>
  </div>
}

