"use client";

import Link from "next/link";
import { KeyRound, SwatchBook } from "lucide-react"
import { CreditCounter } from "@/components/credit-counter";

export function NavAction() {
  const signedIn = status === "authenticated"
  const notSignedIn = status === "unauthenticated"

  return (
    <nav className="flex flex-col md:flex-row items-center gap-2 flex-1">
      {signedIn ? (
        <CreditCounter />
      ) : null}
      <Link href="/create" className="btn btn-success text-white rounded-badge text-lg">
        <SwatchBook className="h-5 w-5" />
        Create
      </Link>
      {notSignedIn ? (
        <Link href="/login" className="btn text-white btn-success rounded-badge text-lg">
          <KeyRound className="h-4 w-4" />
          Sign In
        </Link>
      ) : null}
      {/* <UserNav className="hidden md:inline-flex" /> */}
    </nav>
  )
}
