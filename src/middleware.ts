import createMiddleware from "next-intl/middleware";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);
const isPublicRoute = createRouteMatcher([
  "",
  "/",
  "/:lang",
  "/:lang/",
  "/:lang/sign-in(.*)",
  "/:lang/sign-up(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/:lang/api(.*)",
  "/api(.*)",
  "/:lang/pricing(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) await auth.protect();

  const { pathname } = req.nextUrl;

  // Don't redirect api routes
  if (pathname.startsWith("/api")) return;

  return handleI18nRouting(req);
});

export const config = {
  matcher: [
    // Match only internationalized pathnames
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
  ],
};
