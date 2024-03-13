import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: [
    '/',
    '/login',
    '/register',
    '/privacy-policy',
    '/terms-of-service',
  ],
  // Routes that can always be accessed, and have
  // no authentication information
  ignoredRoutes: [
    '/',
    //--------- @TODO Remove the next 4 lines when ready for launch ---------
    '/interior',
    '/upscale',
    '/restore',
    '/text-to-image',
    // --------- END @TODO ---------------
    '/privacy-policy',
    '/terms-of-service'
  ]
});
 
export const config = {
  // Protects all routes, including api/trpc.
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  // for more information about configuring your Middleware
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
