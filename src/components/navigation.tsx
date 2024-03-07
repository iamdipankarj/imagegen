import Link from "next/link";
import { NavAction } from "@/components/nav-action";

export function Navigation() {
  return (
    <>
      <nav className="flex-col md:flex-row items-center gap-4 md:gap-12 flex">
        <Link href="/pricing" className="link font-semibold text-neutral">
          Pricing
        </Link>
        <Link href="/billing" className="link font-semibold text-neutral">
          Billing
        </Link>
        <Link href="#faq" className="link font-semibold text-neutral">
          FAQ
        </Link>
      </nav>
      <NavAction />
    </>
  )
}
