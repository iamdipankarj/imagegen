"use client";

import { useTypingEffect } from "@/hooks/use-typing-effect";
import { cn } from "@/lib/utils";

interface PromptBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  placeholderList: Array<string>;
  value: string;
  onPromptChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function PromptBox({
  className,
  placeholderList,
  onPromptChange,
  value,
  ...props
}: PromptBoxProps) {
  const { textToShow } = useTypingEffect({
    isTypeByLetter: true,
    duration: 50,
    texts: placeholderList
  });

  return  (
    <div className={cn("w-full relative bg-base-transparent group")} {...props}>
      <span className="absolute inset-1 bg-gradient-glow opacity-40 group-focus-within:opacity-80 group-focus-within:inset-0 group-hover:opacity-80 group-hover:inset-0 blur-lg duration-300 -z-1" />
      <div className="relative bg-base-100 p-2 rounded-2xl outline outline-base-content/0 group-focus-within:outline-gray-300/50">
        <textarea
          className="input px-2 !text-lg w-full border-none focus:outline-none min-h-[100px]"
          placeholder={textToShow}
          minLength={10}
          maxLength={1000}
          value={value}
          rows={6}
          onChange={onPromptChange}
        />
      </div>
    </div>
  )
}
