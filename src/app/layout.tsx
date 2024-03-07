import type { Metadata } from "next";
import { Nunito as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AppHeader } from "@/components/app-header";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning data-theme="light">
      <body className={cn("min-h-screen font-sans flex flex-col antialiased", fontSans.variable)}>
        <AppHeader />
        {children}
      </body>
    </html>
  );
}
