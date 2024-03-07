"use client";

import Link from "next/link";
import { KeyRound, SwatchBook } from "lucide-react"
import { CreditCounter } from "@/components/credit-counter";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

export function NavAction() {
  return (
    <nav className="flex flex-col md:flex-row items-center gap-2 flex-1 justify-end">
      <SignedIn>
        <CreditCounter />
      </SignedIn>
      <Link href="/create" className="btn btn-sm btn-success text-white text-sm">
        <SwatchBook className="h-5 w-5" />
        Create
      </Link>
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
