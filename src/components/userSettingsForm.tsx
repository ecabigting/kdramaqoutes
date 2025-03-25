'use client';

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { CheckCircle2, XCircle } from 'lucide-react';
import { updateCurrentUserDisplayName } from '../../actions/user';

export default function SettingsForm({
  initialDisplayName
}: {
  initialDisplayName: string
}) {
  const [displayName, setDisplayName] = useState(initialDisplayName);
  const [result, setResult] = useState<{ success?: boolean; error?: string } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await updateCurrentUserDisplayName(formData);
    setResult(response);

    // Auto-hide messages after 3 seconds
    // setTimeout(() => setResult(null), 3000);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="displayName" className="block mb-2 text-white">
          Display Name
        </label>
        <input
          type="text"
          id="displayName"
          name="displayName"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full p-2 border rounded bg-gray-800 text-white border-gray-700"
          maxLength={50}
          required
        />
        <p className="text-sm text-gray-400 mt-1">
          Choose a unique display name (case-sensitive)
        </p>
      </div>

      {/* Result Messages */}
      {result?.success && (
        <div className="p-3 bg-green-900/50 text-green-400 rounded flex items-center transition-opacity duration-300">
          <CheckCircle2 className="mr-2" />
          Display name updated successfully!
        </div>
      )}
      {result?.error && (
        <div className="p-3 bg-red-900/50 text-red-400 rounded flex items-center transition-opacity duration-300">
          <XCircle className="mr-2" />
          {result.error}
        </div>
      )}

      <SubmitButton isDisabled={displayName === initialDisplayName} />
    </form>
  );
}

function SubmitButton({ isDisabled }: { isDisabled: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={isDisabled || pending}
      className={`px-4 py-2 bg-purple-800 text-white rounded hover:bg-purple-700 transition-colors
        ${(isDisabled || pending) ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {pending ? 'Saving...' : 'Save Changes'}
    </button>
  );
}
