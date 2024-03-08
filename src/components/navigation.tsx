import Link from "next/link";
import { NavAction } from "@/components/nav-action";

export function Navigation() {
  return (
    <>
      <nav className="flex-col md:flex-row items-center gap-4 md:gap-8 flex">
        <Link href="/interior" className="link font-semibold text-neutral whitespace-nowrap">
          Interior Design
        </Link>
        <Link href="/restore" className="link font-semibold text-neutral whitespace-nowrap">
          Restore Photos
        </Link>
        <Link href="/upscale" className="link font-semibold text-neutral whitespace-nowrap">
          Upscale Photos
        </Link>
        <Link href="/pricing" className="link font-semibold text-neutral whitespace-nowrap">
          Pricing
        </Link>
        <Link href="/billing" className="link font-semibold text-neutral whitespace-nowrap">
          Billing
        </Link>
        <Link href="#faq" className="link font-semibold text-neutral whitespace-nowrap">
          FAQ
        </Link>
      </nav>
      <NavAction className="md:ml-6" />
    </>
  )
}
