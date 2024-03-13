import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface PriceColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string
  price: string | number
  popular?: boolean
  lineItems: string[]
}

export function PriceColumn({
  className,
  heading,
  price,
  lineItems,
  children,
  ...props
}: PriceColumnProps) {
  return (
    <div className={cn("relative z-20 bg-base-100 rounded-xl flex flex-col gap-5 p-5 w-full", className)} {...props}>
      <div className="flex justify-between items-center gap-4">
        <p className="text-lg font-medium">{heading}</p>
      </div>
      <div className="flex gap-2">
        <p className="text-5xl tracking-tight font-bold text-gradient-warm">
          ${price}
        </p>
        <div className="flex flex-col justify-end mb-[3px]">
          <p className="text-xs text-base-content-secondary/80 uppercase font-medium">
            USD
          </p>
        </div>
      </div>
      <ul className="space-y-2.5 leading-relaxed text-sm flex-1">
        {lineItems.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <Check className="w-4 h-4 text-base-content-secondary/80" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="space-y-2">
        {children}
        <p className="text-xs text-center text-base-content-secondary/80 font-medium">
          One-time payment. No subscription
        </p>
      </div>
    </div>
  )
}
