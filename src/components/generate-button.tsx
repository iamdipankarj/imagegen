import { cn } from "@/lib/utils";
import { Loader2, Sparkles } from "lucide-react";

interface GenerateButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export function GenerateButton({
  className,
  loading = false,
  ...props
}: GenerateButtonProps) {
  return (
    <button className={cn("btn border-none btn-md enabled:bg-gradient-cta bg-[length:200%_200%] animate-shimmer rounded-xl shadow-lg gap-1 w-full", className, {
      'cursor-not-allowed': loading
    })} disabled={loading} {...props}>
      {loading ? (
        <Loader2 className="h-6 w-6 animate-spin" />
      ) : (
        <Sparkles className="hidden md:inline w-[18px] h-[18px]" />
      )}
      {loading ? "Generating..." : "Generate"}
    </button>
  )
}
