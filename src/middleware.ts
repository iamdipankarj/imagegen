import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: [
    '/',
    '/login',
    '/register',
    '/privacy-policy',
    '/refund-policy',
    '/terms-of-service',
    "/api/lemonsqueezy/capture",
    '/api/clerk/capture'
  ],
  publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  // Routes that can always be accessed, and have
  // no authentication information
  ignoredRoutes: [
    '/',
    '/privacy-policy',
    "/api/lemonsqueezy/capture",
    '/refund-policy',
    '/terms-of-service'
  ]
});
 
export const config = {
  // Protects all routes, including api/trpc.
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  // for more information about configuring your Middleware
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
