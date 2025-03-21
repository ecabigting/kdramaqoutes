
import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { publicRoutes } from "./routes";
const { auth } = NextAuth(authConfig)

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  //const isAdminRoute = adminRoutes.includes(nextUrl.pathname);
  // const cUser = req.auth;

  // if (isAuthRoute) {
  //   if (isLoggedIn) {
  //     if (cUser?.user.role === UserRole.ADMIN) {
  //       return Response.redirect(new URL("/users", nextUrl));
  //     } else {
  //       return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  //     }
  //   }
  //   return;
  // }

  // if (isAdminRoute && cUser?.user.role !== UserRole.ADMIN) {
  //   return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  // }
  //
  // if (!isLoggedIn && !isPublicRoute) {
  //   return Response.redirect(new URL("/", nextUrl));
  // }
  // return;


  // Allow auth-related routes to proceed
  if (nextUrl.pathname.startsWith("/api/auth")) {
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/", nextUrl));
  }
  return;
})


export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

