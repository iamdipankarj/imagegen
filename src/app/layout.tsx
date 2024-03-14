import type { Metadata } from "next";
import { Gabarito as FontSans } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'
import "./globals.css";
import { cn } from "@/lib/utils";
import { AppHeader } from "@/components/app-header";
import { Footer } from "@/components/footer";
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

export const metadata: Metadata = {
  title: "PhotoWorks.ai | AI Powered Photo Generation",
  description: "AI powered photo generation. Generate high quality images from text, upscale images, restore old photos and more.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning data-theme="light">
        <head>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css" />
        </head>
        <body className={cn("min-h-screen font-sans flex flex-col antialiased", fontSans.variable)}>
          <AppHeader />
          {children}
          <Footer />
          <Toaster
            toastOptions={{ className: 'font-sans !text-sm' }}
            position="top-center"
            richColors
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
