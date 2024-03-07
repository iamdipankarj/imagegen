import Link from "next/link";
import { Hamburger } from "@/components/hamburger";
import { Logo } from '@/components/logo';
import { cn } from "@/lib/utils";
import { Navigation } from "@/components/navigation";
// import { UserNav } from "@/components/user-nav";

export function AppHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <header className={cn("h-14", className)} {...props}>
      <div className="fixed top-0 left-0 w-full h-14 transition-all z-50 duration-300 ease-in-out p-3 shadow bg-base-100/80 backdrop-blur flex items-center">
        <div className="md:container mx-auto w-full flex flex-row items-center justify-between px-4">
          <div className="order-1 shrink-0">
            <Link href="/" className="block">
              <Logo />
            </Link>
          </div>
          <div className="hidden md:flex items-center flex-1 order-2 justify-end">
            <Navigation />
          </div>
          {/* <UserNav className="inline-flex md:hidden order-2 -my-4 mr-2" /> */}
          <Hamburger className="order-3 -my-4 inline-flex md:hidden" />
        </div>
      </div>
      <div id="mobileMenu" className="fixed flex flex-col gap-2 px-2 top-14 inset-x-0 origin-[top_center] ease-in-out bg-slate-100/80 backdrop-blur-sm md:hidden py-4 md:py-0 rounded-bl-lg rounded-br-lg duration-300 transition-transform scale-y-0 z-50">
        <Navigation />
      </div>
    </header>
  )
}
