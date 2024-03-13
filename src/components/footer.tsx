import Link from "next/link";
import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="bg-base-200 border-t">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className=" flex lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <Link
              aria-current="page"
              className="flex gap-2 justify-center md:justify-start items-center"
              href="/#"
            >
              <Logo />
            </Link>
            <p className="mt-3 text-sm text-base-content-secondary">
              Your all-in-one AI design tool for creating stunning visual content.
            </p>
            <p className="mt-3 text-sm text-base-content-secondary/80">
              Made with ❤️ in India
            </p>
          </div>
          <div className="flex-grow flex flex-wrap md:pl-24 -mb-10 md:mt-0 mt-10 text-center">
            <div className="lg:w-1/3 md:w-1/2 w-full px-4">
              <div className="footer-title font-medium text-base-content tracking-widest text-sm md:text-left mb-3">
                LINKS
              </div>
              <div className="flex flex-col justify-center items-center md:items-start gap-2 mb-10 text-sm">
                <Link className="link link-hover" href="/#examples">
                  Examples
                </Link>
                <Link className="link link-hover" href="/#how">
                  How it works
                </Link>
                <Link className="link link-hover" href="/pricing">
                  Pricing
                </Link>
                <Link className="link link-hover" href="/billing">
                  Billing
                </Link>
              </div>
            </div>
            <div className="lg:w-1/3 md:w-1/2 w-full px-4">
              <div className="footer-title font-medium text-base-content tracking-widest text-sm md:text-left mb-3">
                LEGAL
              </div>
              <div className="flex flex-col justify-center items-center md:items-start gap-2 mb-10 text-sm">
                <Link className="link link-hover" href="/terms-of-service">
                  Terms of service
                </Link>
                <Link className="link link-hover" href="/privacy-policy">
                  Privacy policy
                </Link>
                <Link className="link link-hover" href="/refund-policy">
                  Refund Policy
                </Link>
                <Link className="link link-hover" href="/support">
                  Help &amp; Support
                </Link>
              </div>
            </div>
            <div className="lg:w-1/3 md:w-1/2 w-full px-4">
              <div className="footer-title font-medium text-base-content tracking-widest text-sm md:text-left mb-3">
                FEATURES
              </div>
              <div className="flex flex-col justify-center items-center md:items-start gap-2 mb-10 text-sm">
                <Link className="link link-hover" href="/text-to-image">
                  Text to Image
                </Link>
                <Link className="link link-hover" href="/restore">
                  Restore Photographs
                </Link>
                <Link className="link link-hover" href="/upscale">
                  Upscale Images
                </Link>
                <Link className="link link-hover" href="/interior">
                  Redesign Interiors
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
