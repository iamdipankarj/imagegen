import { cn } from '@/lib/utils'
import Image from 'next/image'

export function Logo({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center space-x-2", className)} {...props}>
      
      <span className="text-base font-bold">PhotoWorks</span>
    </div>
  )
}
