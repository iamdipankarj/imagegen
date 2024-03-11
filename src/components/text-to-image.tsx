"use client";
import { useTypingEffect } from "@/hooks/use-typing-effect";
import { Sparkles } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { ImagePreview } from "@/components/image-preview";
import { useScript } from "@/hooks/use-script";

export function TextToImage({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [outputs, setOutputs] = useState<Array<string>>([
    "https://replicate.delivery/pbxt/WZ8IYkfFzNU9Bq5TnYeeH41XAk7qXaMFeDIiREetvprWRkxTC/out-0.png",
    "https://replicate.delivery/pbxt/WZ8IYkfFzNU9Bq5TnYeeH41XAk7qXaMFeDIiREetvprWRkxTC/out-0.png",
    "https://replicate.delivery/pbxt/WZ8IYkfFzNU9Bq5TnYeeH41XAk7qXaMFeDIiREetvprWRkxTC/out-0.png",
    "https://replicate.delivery/pbxt/WZ8IYkfFzNU9Bq5TnYeeH41XAk7qXaMFeDIiREetvprWRkxTC/out-0.png"
  ]);

  const { ready: lightboxReady } = useScript('https://cdn.jsdelivr.net/gh/mcstudios/glightbox/dist/js/glightbox.min.js')

  useEffect(() => {
    if (lightboxReady) {
      if (window.GLightbox) {
        window.GLightbox({
          closeOnOutsideClick: true
        })
      }
    }
  }, [lightboxReady, outputs])

  const handlePromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert("will generate image from text")
  }

  const { textToShow } = useTypingEffect({
    isTypeByLetter: true,
    duration: 50
  });

  return (
    <div className={className} {...props}>
      <form onSubmit={handleSubmit} className="relative w-full bg-base-transparent group">
        <span className="absolute inset-1 bg-gradient-glow opacity-40 group-focus-within:opacity-80 group-focus-within:inset-0 group-hover:opacity-80 group-hover:inset-0 blur-lg duration-300 -z-1" />
        <div className="relative bg-base-100 p-3 rounded-3xl outline outline-base-content/0 group-focus-within:outline-gray-300/50">
          <div className="flex item-center">
            <div className="flex-1">
              <input
                className="input input-sm md:input-md !pl-2 md:!pl-4 w-full border-none focus:outline-none"
                placeholder={textToShow}
                minLength={10}
                maxLength={1000}
                value={prompt}
                onChange={handlePromptChange}
              />
            </div>
            <button type="submit" className="btn btn-sm md:btn-md bg-gradient-glow !animate-none group-focus-within:!animate-shimmer rounded-xl shadow group-hover:shadow-lg group-focus-within:shadow-lg gap-1">
              <Sparkles className="hidden md:inline w-[18px] h-[18px]" />
              Generate
            </button>
          </div>
        </div>
      </form>
      {outputs.length > 0 ? (
        <div className="flex flex-wrap gap-2 md:gap-4 mt-8 mx-auto md:max-w-4xl justify-center">
          {outputs.map((outputImage, index) => (
            <ImagePreview
              key={index}
              src={outputImage}
              loading={loading}
              photoName={`photoworksai_output_${index + 1}.png`}
              className="flex-1"
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
