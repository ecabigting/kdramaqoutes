// ./src/middleware.ts

import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { NextRequest, NextResponse } from 'next/server'; // <-- Import NextResponse
import { publicRoutes } from './routes';

// Initialize the auth helper, but don't export it directly yet
const { auth } = NextAuth(authConfig);

// Define your middleware logic as a standard async function
async function middlewareHandler(req: NextRequest) {
  const session = await auth(); // <-- Call auth() inside to get session/user
  const { nextUrl } = req;
  const isLoggedIn = !!session?.user; // <-- Check user on the session object
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  // Allow auth-related routes to proceed
  if (nextUrl.pathname.startsWith('/api/auth')) {
    return NextResponse.next(); // <-- Must return NextResponse
  }

  // Allow access to public routes without authentication
  if (isPublicRoute) {
    return NextResponse.next(); // <-- Must return NextResponse
  }

  // Redirect to home if the user is not logged in and trying to access a protected route
  if (!isLoggedIn) {
    // Use req.url to ensure the base URL is correct for redirection
    const loginUrl = new URL('/', req.url);
    return NextResponse.redirect(loginUrl);
  }

  // If logged in and accessing a protected route, allow the request to continue
  return NextResponse.next(); // <-- Must return NextResponse
}

// Export the handler function as the default
export default middlewareHandler;

// Keep the config to run this specific middleware function in Node.js
export const config = {
  runtime: 'nodejs',
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
