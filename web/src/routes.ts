
/**
 *
 *  An array of routes that are accessible to the public
 *  These routes do not require authentication
 *  @type {string[]}
 *
 */
export const publicRoutes: string[] = [
  "/",
  "/signup",
  "/signin",
  "/about",
  "/blog",
  "/contact",
  "/terms",
  "/privacy",
  "/dmca",
  "/docs",
  "/guide",
  "/api",
  "/verify-email"
];

/**
 *
 * Protected Routes - can only be access when user logged in
 * @type {string[]}
 * */

export const protectedRoutes: string[] = [
  "/settings",
  "/profile",
  "/dashboard"
];

export const DEFAULT_USER_ROUTE = "/settings"
