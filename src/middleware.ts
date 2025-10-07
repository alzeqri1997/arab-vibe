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
  "/:lang/api(.*)",
  "/api(.*)",
  "/:lang/pricing(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) await auth.protect();

  const { pathname } = req.nextUrl;

  // Don't redirect api routes
  if (pathname.startsWith('/api')) return

  return handleI18nRouting(req);
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/:locale/(api|trpc)(.*)",
  ],
  // matcher: ['/', '/(ar|en)/:path*']
};
