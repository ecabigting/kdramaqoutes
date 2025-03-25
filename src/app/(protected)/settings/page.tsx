import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getCurrentUser } from "../../../../actions/user";
import SettingsForm from "@/components/userSettingsForm";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/signin");

  const user = await getCurrentUser();
  const currentDisplayName = user?.displayName || user?.name?.split(' ')[0] || 'Anonymous';

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Profile Settings</h1>
      <SettingsForm initialDisplayName={currentDisplayName} />
    </div>
  );
}
