"use client"

import { useEffect, useMemo } from "react"
import Link from "next/link"
import { Coins } from "lucide-react"
import useSWR from "swr";
import { cn } from "@/lib/utils";

export function CreditCounter({
  className,
  ...props
}: React.HTMLAttributes<HTMLAnchorElement>) {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, mutate } = useSWR("/api/credits", fetcher);
  const credits = data?.credits || 0;

  useEffect(() => {
    const handleUpdate = () => {
      mutate();
    };

    window.addEventListener('creditsUpdated', handleUpdate);

    return () => {
      window.removeEventListener('creditsUpdated', handleUpdate);
    };
  }, [])

  const creditsLeft = useMemo(() => {
    if (credits > 0) {
      return `${credits} Credits Left`
    } else if (credits === 0) {
      return "Buy Credits"
    }
    return `${credits} Credit Left`
  }, [credits])

  return (
    <Link href="/pricing" className={cn("btn btn-sm btn-success text-white", className)} {...props}>
      <Coins className="h-5 w-5" />
      {!data ? (
        <span className="loading loading-spinner loading-sm" />
      ) : creditsLeft}
    </Link>
  )
}
