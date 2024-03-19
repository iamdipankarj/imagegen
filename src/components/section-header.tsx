import { cn } from "@/lib/utils";

export function SectionHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-center mx-auto font-semibold text-xl md:text-2xl", className)} {...props}>
      {children}
    </h3>
  )
}
