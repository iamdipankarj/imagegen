import { cn } from "@/lib/utils";

export function SectionHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-center relative mx-auto before:content-[''] before:absolute before:h-px before:z-[-1] before:top-2/4 before:inset-x-0 before:bg-gradient-section", className)} {...props}>
      <span className="px-3 w-max bg-white font-semibold text-xl md:text-2xl">{children}</span>
    </h3>
  )
}
