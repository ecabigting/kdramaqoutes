// ./src/app/components/ui/googlesigninbutton.tsx

import { signIn } from "@/auth";

export function GoogleSignInButton() {
  async function handleGoogleSignIn() {
    'use server';
    // const { signIn } = await import('@/auth');
    await signIn('google', { redirectTo: '/' });
  }

  return (
    <form action={handleGoogleSignIn}>
      <button
        type="submit"
        className="w-full py-2 px-4 border border-gray-300 rounded-md flex items-center justify-center hover:bg-purple-600"
      >
        Sign in with Google
      </button>
    </form>
  );
}
