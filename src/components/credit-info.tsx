"use client";

import Link from "next/link";

export function CreditInfo() {
  return (
    <span className="text-sm leading-2 block mt-5">
      You will be charged <strong>1 Credit</strong> for each generation (regardless of number of renders). You can <Link className="link link-primary font-semibold" href="/pricing">purchase credits</Link> from your account dashboard.
    </span>
  )
}
