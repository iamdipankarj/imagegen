import { cn } from "@/lib/utils";
import { Banknote } from "lucide-react";

export function PayNowButton({
  className, ...restProps
}: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn("btn btn-primary btn-block group", className)} {...restProps}>
      Buy Now
      <Banknote className="w-5 h-5 fill-white/10 group-hover:translate-x-0.5 group-hover:fill-white/20 transition-transform duration-200" />
    </button>
  )
}
