"use client";

import { useTypingLine } from "@/hooks/use-typing-line";
import { useEffect, useState } from "react";

const texts = [
  "This is a simple text typing effect in React",
  "This effect is created using React Hooks",
  "We can use this effect to create a typing effect for our portfolio",
  "We can also use this effect to create a typing effect for our resume",
  "or for your blog",
  "or for your landing page",
  "let's go",
];

interface TextTypingEffectProps {
  isTypeByLetter?: boolean;
  duration?: number;
};

export function useTypingEffect({
  isTypeByLetter = true,
  duration = 50,
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
