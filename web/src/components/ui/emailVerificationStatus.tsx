import { ReactNode } from 'react';

interface EmailVerificationStatusProps {
  icon: ReactNode;
  title: string;
  message?: string;
  isError?: boolean;
  children?: ReactNode;
}

/**
 * Reusable component for displaying email verification status
 * 
 * @param icon - Icon to display (Lucide icon)
 * @param title - Main title/heading
 * @param message - Optional short status message
 * @param isError - Whether to display error styling
 * @param children - Custom content to display below the message
 */
export function EmailVerificationStatus({
  icon,
  title,
  message,
  isError = false,
  children,
}: EmailVerificationStatusProps) {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="max-w-md w-full rounded-lg shadow-md p-6 text-center bg-card space-y-4">
        {/* Icon with colored background circle */}
        <div
          className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${isError ? 'bg-red-100' : 'bg-green-100'
            }`}
        >
          {icon}
        </div>

        {/* Main title */}
        <h2 className="text-lg font-medium text-foreground">{title}</h2>

        {/* Conditional rendering: message or children */}
        {message ? (
          <p
            className={`text-sm ${isError ? 'text-destructive' : 'text-muted-foreground'
              }`}
          >
            {message}
          </p>
        ) : (
          <div className="text-left">{children}</div>
        )}

        {/* Render children below message if both exist */}
        {message && children && (
          <div className="pt-2">{children}</div>
        )}
      </div>
    </div>
  );
}
