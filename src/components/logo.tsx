import { cn } from '@/lib/utils'
import Image from 'next/image'

export function Logo({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center space-x-2", className)} {...props}>
      <Image
        src="/logo.svg"
        alt="PhotoWorks"
        width={30}
        height={30}
        priority
      />
      <span className="text-2xl font-bold">PhotoWorks</span>
    </div>
  )
}
