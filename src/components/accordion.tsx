"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AccordionProps extends React.HTMLAttributes<HTMLElement> {
  heading: ReactNode | null
}

export function Accordion({
  className,
  heading,
  children,
  ...props
}: AccordionProps) {
  const [expanded, setExpanded] = useState(false)
  const contentRef = useRef<any>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [contentRef, expanded]);

  const handleToggle = () => {
    setExpanded(!expanded)
  }

  return (
    <div className={className} {...props}>
      <button
        className="relative z-20 flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10"
        aria-expanded={expanded}
        type="button"
        onClick={handleToggle}
      >
        <span className={cn("flex-1", {
          "text-primary": expanded,
          "text-base-content": !expanded
        })}>{heading}</span>
        <svg
          className="flex-shrink-0 w-4 h-4 ml-auto fill-current"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y={7}
            width={16}
            height={2}
            rx={1}
            className={cn("transform origin-center transition duration-200 ease-out false", {
              "rotate-180": expanded
            })}
          />
          <rect
            y={7}
            width={16}
            height={2}
            rx={1}
            className={cn("transform origin-center rotate-90 transition duration-200 ease-out false", {
              "rotate-180 hidden": expanded
            })}
          />
        </svg>
      </button>
      <div ref={contentRef} className="transition-all duration-300 ease-in-out opacity-80 overflow-hidden" style={{
        opacity: expanded ? 1 : 0,
        maxHeight: expanded ? contentHeight : 0
      }}>
        <div className="pb-5 leading-relaxed">
          <div className="space-y-2 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
