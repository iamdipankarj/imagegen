"use client";

import { useTypingLine } from "@/hooks/use-typing-line";
import { useEffect, useState } from "react";

interface TextTypingEffectProps {
  isTypeByLetter?: boolean;
  duration?: number;
  texts: string[];
};

export function useTypingEffect({
  isTypeByLetter = true,
  duration = 50,
  texts
}: TextTypingEffectProps) {
  const [textIndex, setTextIndex] = useState(0);
  const textToShow = useTypingLine(
    texts[textIndex],
    duration,
    isTypeByLetter
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTextIndex((prevIndex) =>
        prevIndex >= texts.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return {
    textIndex,
    textToShow
  };
};
