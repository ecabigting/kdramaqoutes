// ./src/app/components/SignupForm.tsx
'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupFormSchema, SignupFormData } from '../types/schema/signupFormSchema';
import { createUser } from '../../actions/user';
import { Spinner } from './ui/spinner';
import Link from 'next/link';

export function SignupForm() {
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupFormSchema)
  });

  const onSubmit = (data: SignupFormData) => {
    startTransition(async () => {
      setError(null);
      setSuccess(false);

      startTransition(async () => {
        try {
          const result = await createUser(data);

          if (!result?.success) {
            setError(result.message);
            return;
          }

          setSuccess(result.success);
          reset();
        } catch (err) {
          console.log(err)
          setError('An unexpected error occurred. Please try again.');
        }
      });
    });
  };


  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md text-sm">
          Account created successfully! Please check your email for verification.
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Display Name Field */}
        <div>
          <input
            {...register('displayName')}
            placeholder="Display Name"
            disabled={isPending}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
          {errors.displayName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.displayName.message}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <input
            {...register('email')}
            type="email"
            placeholder="Email"
            disabled={isPending}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="relative">
          <input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            disabled={isPending}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isPending}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600 disabled:opacity-50"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2 px-4 bg-purple-800 text-white rounded-md hover:bg-purple-600 disabled:opacity-50 flex justify-center items-center"
        >
          {isPending ? (
            <>
              <div className="text-purple-600">
                <Spinner />
              </div>
              Creating Account...
            </>
          ) : (
            'Sign Up'
          )}
        </button>
        <Link href="/signin" className="w-full py-2 px-4 bg-purple-800 text-white rounded-md hover:bg-purple-600 disabled:opacity-50 flex justify-center items-center"
        >
          Already have an account?&nbsp; <strong>Sign In</strong>
        </Link>
      </form>
    </div>
  );
}
