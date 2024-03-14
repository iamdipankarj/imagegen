import { cn } from "@/lib/utils";
import { Banknote } from "lucide-react";

export function PayNowButton({ className, href, ...restProps }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn("btn btn-primary btn-block group", className)}
      href={href}
      {...restProps}
    >
      Buy Now
      <Banknote className="w-5 h-5 fill-white/10 group-hover:translate-x-0.5 group-hover:fill-white/20 transition-transform duration-200" />
    </a>
  )
}
