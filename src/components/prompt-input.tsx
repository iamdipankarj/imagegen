"use client";

import { useTypingEffect } from "@/hooks/use-typing-effect";
import { Sparkles } from "lucide-react";

export function PromptInput() {
  const { textIndex, textToShow } = useTypingEffect({
    isTypeByLetter: true,
    duration: 50,
  });

  return (
    <form className="relative w-full bg-base-transparent group">
      <span className="absolute inset-1 bg-gradient-glow opacity-40 group-focus-within:opacity-80 group-focus-within:inset-0 group-hover:opacity-80 group-hover:inset-0 blur-lg duration-300 -z-1" />
      <div className="relative bg-base-100 p-3 rounded-3xl outline outline-base-content/0 group-focus-within:outline-gray-300/50">
        <div className="flex item-center">
          <div className="flex-1">
            <input
              className="input input-sm md:input-md !pl-2 md:!pl-4 w-full border-none focus:outline-none"
              placeholder={textToShow}
              minLength={10}
              maxLength={1000}
              defaultValue=""
            />
          </div>
          <button className="btn btn-sm md:btn-md bg-gradient-glow !animate-none group-focus-within:!animate-shimmer rounded-xl shadow group-hover:shadow-lg group-focus-within:shadow-lg gap-1">
            <Sparkles className="hidden md:inline w-[18px] h-[18px]" />
            Generate
          </button>
        </div>
      </div>
    </form>
  )
}
