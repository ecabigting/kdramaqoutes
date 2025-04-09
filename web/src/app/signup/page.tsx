// ./src/app/signup/page.tsx

import { SignupForm } from "@/components/signupForm";
import { GoogleSignInButton } from "@/components/ui/GoogleSignInButton";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Join with</h1>
        {/* Google button rendered server-side */}
        <GoogleSignInButton />

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Client-side form */}
        <SignupForm />
      </div>
    </div>
  );
}
