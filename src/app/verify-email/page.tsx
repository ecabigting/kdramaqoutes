// ./src/app/verify-email/page.tsx
import { X, Check } from 'lucide-react';
import Link from 'next/link';
import { verifyUserEmail } from '../../../actions/user';

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const token = Array.isArray(searchParams.token)
    ? searchParams.token[0]
    : searchParams.token;
  const verificationResult = await verifyUserEmail(token as string)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-h-9/12l mx-auto p-4">
        {!verificationResult.success ? (
          <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="max-w-md w-full rounded-lg shadow-md p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <X className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="mt-3 text-lg font-medium text-gray-900 dark:text-white">
                Verification Failed
              </h2>
              <p className="mt-2 text-sm text-red-600 font-bold">
                {verificationResult.error}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="max-w-md w-full rounded-lg shadow-md p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="mt-3 text-lg font-medium text-gray-900 dark:text-white">
                Verification Success
              </h2>
              <p className="mt-2 font-bold p-2">
                <Link href="/signin"
                  className="bg-purple-800 text-white px-4 py-2 rounded hover:bg-purple-700">
                  Please Sign In
                </Link>
              </p>
            </div>
          </div>
        )}
      </main>
    </div>)
}
