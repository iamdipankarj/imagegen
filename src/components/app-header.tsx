import Link from "next/link";
import { Hamburger } from "@/components/hamburger";
import { Logo } from '@/components/logo';
import { cn } from "@/lib/utils";
import { Navigation } from "@/components/navigation";
import { UserNav } from "@/components/user-nav";

export function AppHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <header className={cn("w-full transition-all z-50 duration-300 ease-in-out p-3 bg-transparent relative", className)} {...props}>
      <div className="md:container mx-auto w-full flex flex-row items-center justify-between bg-white rounded-full px-3 py-3">
        <Link href="/" className="flex-1 order-1 shrink-0">
          <Logo />
        </Link>
        <div className="hidden md:flex items-center order-2 gap-5">
          <Navigation />
        </div>
        <UserNav className="inline-flex md:hidden order-2 mr-2" />
        <Hamburger className="order-3 inline-flex md:hidden" />
      </div>
      <div id="mobileMenu" className="absolute flex flex-col gap-2 px-2 top-24 inset-x-0 origin-[top_center] ease-in-out bg-white/80 backdrop-blur-sm md:hidden py-4 md:py-0 rounded-bl-lg rounded-br-lg duration-300 transition-transform scale-y-0 z-50 mx-3 shadow-md rounded-2xl">
        <Navigation />
      </div>
    </header>
  )
}
