"use client";

import { useFormStatus } from "react-dom";
import { Banknote, Loader2 } from "lucide-react";

export function PayNowButton({ className, ...restProps }: React.HTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus();

  return (
    <button
      className="btn btn-primary btn-block group"
      disabled={pending}
      type="submit"
      {...restProps}
    >
      {pending ? (
        <Loader2 className="animate-spin" />
      ) : null}
      Buy Now
      <Banknote className="w-5 h-5 fill-white/10 group-hover:translate-x-0.5 group-hover:fill-white/20 transition-transform duration-200" />
    </button>
  )
}
