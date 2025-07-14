"use client";

import Link from "next/link";
import { NavAction } from "@/components/nav-action";

export function Navigation() {
  return (
    <>
      <nav className="flex-col md:flex-row items-center gap-4 md:gap-8 flex">
        <Link href="/portrait" className="link font-semibold text-neutral whitespace-nowrap">
          Portraits
        </Link>
        <Link href="/restore" className="link font-semibold text-neutral whitespace-nowrap">
          Restore Photos
        </Link>
        <Link href="/upscale" className="link font-semibold text-neutral whitespace-nowrap">
          Upscale Photos
        </Link>
        <Link href="/text-to-image" className="link font-semibold text-neutral whitespace-nowrap">
          Text To Image
        </Link>
        <Link href="#faq" className="link font-semibold text-neutral whitespace-nowrap">
          FAQ
        </Link>
      </nav>
      <NavAction className="md:ml-6" />
    </>
  )
}
