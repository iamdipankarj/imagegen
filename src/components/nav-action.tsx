"use client";

import Link from "next/link";
import { KeyRound } from "lucide-react"
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

export function NavAction({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn("flex flex-col md:flex-row items-center gap-2", className)} {...props}>
      <SignedOut>
        <Link href="/login" className="btn btn-sm btn-tertiary text-white btn-primary">
          <KeyRound className="h-4 w-4" />
          Sign In
        </Link>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </nav>
  )
}
