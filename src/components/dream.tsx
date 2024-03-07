"use client";

interface DreamProps extends React.HTMLAttributes<HTMLDivElement> {
  model: "restore" | "upscale" | "interior" | "text2img" | "caption";
}

export function Dream({
  className,
  ...props
}: DreamProps) {
  return (
    <section className={className} {...props}>
      Dream
    </section>
  )
}
