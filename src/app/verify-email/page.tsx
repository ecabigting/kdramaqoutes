// ./src/app/verify-email/page.tsx
'use server'
import { X, Check, TriangleAlertIcon } from 'lucide-react';
import Link from 'next/link';
import { verifyUserEmail } from '../../../actions/user';
import { EmailVerificationStatus } from '@/components/ui/emailVerificationStatus';

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: { token?: string }
}) {
  const token = searchParams?.token
  if (!token) {
    return (
      <EmailVerificationStatus
        icon={<X className="h-6 w-6 text-red-600" />}
        title="Verification Failed"
        message="Missing verification token"
        isError
      />
    );
  }

  const verificationResult = await verifyUserEmail(token);

  // Handle expired token case with automatic resend
  if (!verificationResult.success && verificationResult.error === 'EXPIRED_TOKEN') {

    return (
      <EmailVerificationStatus
        icon={<X className="h-6 w-6 text-red-600" />}
        title="Verification Failed"
        isError
      >
        <div className="space-y-4">
          <p className="text-destructive font-bold text-center">
            Token has expired.
          </p>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <TriangleAlertIcon className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  A new verification email was sent to your inbox.
                </p>
              </div>
            </div>
          </div>
        </div>
      </EmailVerificationStatus>
    );
  }

  if (!verificationResult.success) {
    return (
      <EmailVerificationStatus
        icon={<X className="h-6 w-6 text-red-600" />}
        title="Verification Failed"
        message="Invalid verification token. Please check your email and try again!"
        isError
      />
    );
  }

  return (
    <EmailVerificationStatus
      icon={<Check className="h-6 w-6 text-green-600" />}
      title="Email Verified!"
      message="Your email has been successfully verified."
    >
      <Link
        href="/signin"
        className="mt-4 inline-flex items-center rounded-md bg-purple-800 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-700 transition-colors"
      >
        Continue to Sign In
      </Link>
    </EmailVerificationStatus >
  );
}

