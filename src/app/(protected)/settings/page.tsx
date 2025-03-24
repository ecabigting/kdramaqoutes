// app/settings/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getCurrentUser, updateCurrentUserDisplayName } from "../../../../actions/user";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/signin");

  const user = await getCurrentUser();
  const currentDisplayName = user?.displayName || user?.name?.split(' ')[0] || 'Anonymous';

  async function handleSubmit(formData: FormData) {
    "use server"

    const newDisplayName = formData.get("displayName") as string;
    await updateCurrentUserDisplayName(newDisplayName);
    redirect("/settings?success=true");
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile Settings</h1>
      <form action={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="displayName" className="block mb-2">
            Display Name
          </label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            defaultValue={currentDisplayName}
            className="w-full p-2 border rounded"
            maxLength={50}
            required
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
