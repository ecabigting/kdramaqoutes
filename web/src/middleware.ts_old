// ./src/middleware.ts

import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { publicRoutes } from "./routes";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  // Allow auth-related routes to proceed
  if (nextUrl.pathname.startsWith("/api/auth")) {
    return
  }

  // Allow access to public routes without authentication
  if (isPublicRoute) {
    return
  }

  // // Redirect to home if the user is not logged in and trying to access a protected route
  // if (!isLoggedIn) {
  //   return NextResponse.redirect(new URL("/", nextUrl));
  // }

  return
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
