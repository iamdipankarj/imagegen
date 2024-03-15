import { cn } from '@/lib/utils'
import Image from 'next/image'

export function Logo({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center space-x-2", className)} {...props}>
      <Image
        src="/logo.png"
        alt="PhotoWorks.ai"
        width={30}
        height={30}
        priority
      />
      <span className="text-base font-bold">PhotoWorks.ai</span>
    </div>
  )
}
