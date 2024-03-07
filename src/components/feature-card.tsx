import React, { ReactNode } from "react";
import { Armchair } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string
  icon: ReactNode | null
  iconClass: string
}

export function FeatureCard({
  className,
  icon,
  heading,
  iconClass,
  children,
  ...props
}: FeatureCardProps) {
  return (
    <div className={cn("shadow-md border rounded-lg p-3 flex items-center flex-row gap-3", className)} {...props}>
      <span className={cn("w-10 h-10 inline-flex rounded-md justify-center items-center shrink-0", iconClass)}>
        {icon}
      </span>
      <div className="flex-1">
        <h3 className="font-bold">{heading}</h3>
        <p className="text-zinc-500">{children}</p>
      </div>
    </div>
  )
}
