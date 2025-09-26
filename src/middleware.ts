import { NextResponse } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublic = createRouteMatcher([
  '/',
  '/login',
  '/register',
  '/privacy-policy',
  '/refund-policy',
  '/terms-of-service'
]);

const isApiOpen = createRouteMatcher([
  '/api/generate',
  '/api/remove-image',
]);

const isIgnored = createRouteMatcher([
  '/',
  '/privacy-policy',
  '/refund-policy',
  '/terms-of-service',
]);

export default clerkMiddleware(async (auth, req) => {
  // Skip everything for ignored routes
  if (isIgnored(req)) return NextResponse.next();

  // Allow public pages and specific open API routes
  if (isPublic(req) || isApiOpen(req)) return NextResponse.next();

  // Everything else requires auth
  await auth.protect();

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
