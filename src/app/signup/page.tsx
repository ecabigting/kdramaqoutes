// src/app/signup/page.tsx

import { SignupForm } from "@/components/signupForm";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Your Account</h1>
        <SignupForm />
      </div>
    </div>
  );
}
