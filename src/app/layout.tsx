import type { Metadata } from "next";
import { Gabarito as FontSans } from "next/font/google";
import { Toaster } from 'sonner'
import "./globals.css";
import { cn } from "@/lib/utils";
import { AppHeader } from "@/components/app-header";
import { Footer } from "@/components/footer";
import { getMetaData, getStructuredData } from "@/lib/seo";
import SessionProvider from "@/app/session-provider";
// import ProgressProvider from "@/components/progress-provider";

declare global {
  interface Window {
    GLightbox: any
  }
}

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = getMetaData();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning data-theme="light">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css" />
        {process.env.NODE_ENV === "production" ? (
          <>
            <link rel="preconnect" href="https://plausible.io" crossOrigin="anonymous" />
            <script defer data-domain="photoworks.ai" src="https://plausible.io/js/script.js" />
          </>
        ) : null}
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#41c289" />
        <script
          key="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getStructuredData()) }}
        />
      </head>
      <body className={cn("min-h-screen font-sans flex flex-col antialiased", fontSans.variable)}>
        <SessionProvider>
          <AppHeader />
          {children}
          <Footer />
          <Toaster
            toastOptions={{ className: 'font-sans !text-sm' }}
            position="top-center"
            richColors
          />
        </SessionProvider>
      </body>
    </html>
  );
}
