"use client";
import { useTypingEffect } from "@/hooks/use-typing-effect";
import { Loader2, Sparkles } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { ImagePreview } from "@/components/image-preview";
import { useScript } from "@/hooks/use-script";
import { cn } from "@/lib/utils";

const imageResolutions: Array<number> = [
  384,
  512,
  576,
  640,
  704,
  768,
  960,
  1024,
  1152,
  1280,
  1536,
  1792,
  2048
]

export function TextToImage({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [prompt, setPrompt] = useState<string>("");
  const [resolution, setResolution] = useState<string>("512");
  const [renderCount, setRenderCount] = useState<string>("1");
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

  const handleResolution = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setResolution(event.target.value as string);
  }

  const handleRenderCount = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRenderCount(event.target.value as string);
  }

  const handlePromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  }

  async function handleSubmit(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    setLoading(true)
    alert("will generate image from text")
  }

  const { textToShow } = useTypingEffect({
    isTypeByLetter: true,
    duration: 50
  });

  return (
    <div className={cn("flex flex-col md:flex-row items-start gap-6", className)} {...props}>
      <div className="space-y-4 w-full md:basis-1/3">
        <div>
          <div className="w-full relative bg-base-transparent group">
            <span className="absolute inset-1 bg-gradient-glow opacity-40 group-focus-within:opacity-80 group-focus-within:inset-0 group-hover:opacity-80 group-hover:inset-0 blur-lg duration-300 -z-1" />
            <div className="relative bg-base-100 p-3 rounded-2xl outline outline-base-content/0 group-focus-within:outline-gray-300/50">
              <input
                className="input input-sm md:input-md !text-lg !pl-2 md:!pl-4 w-full border-none focus:outline-none"
                placeholder={textToShow}
                minLength={10}
                maxLength={1000}
                value={prompt}
                onChange={handlePromptChange}
              />
            </div>
          </div>
          <span className="text-xs leading-4 block mt-5">
            Enter the text you want to generate an image from. You can enter a maximum of 1000 characters.
          </span>
        </div>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-semibold">Select Resolution</span>
          </div>
          <select value={resolution} onChange={handleResolution} className="select select-bordered disabled:bg-zinc-200 disabled:border-none" disabled={loading}>
            {imageResolutions.map((resolution, index) => (
              <option value={resolution} key={index}>{resolution}x{resolution}</option>
            ))}
          </select>
          <div className="label">
            <span className="label-text-alt">
              Choose the resolution of the image you want to generate. Note that, higher resolution images will take longer to generate.
            </span>
          </div>
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-semibold">Number of renders</span>
          </div>
          <select value={renderCount} onChange={handleRenderCount} className="select select-bordered disabled:bg-zinc-200 disabled:border-none" disabled={loading}>
            {[1, 2, 3, 4].map((count, index) => (
              <option value={count} key={index}>{count}</option>
            ))}
          </select>
          <div className="label">
            <span className="label-text-alt">
              Choose the number of renders you want to generate. Note that, more renders will take longer to generate. This option is provided in case you want to generate multiple variations of the same prompt.
            </span>
          </div>
        </label>
        <button onClick={handleSubmit} className="btn border-none btn-md enabled:bg-gradient-cta bg-[length:200%_200%] animate-shimmer rounded-xl shadow-lg gap-1 w-full" disabled={loading}>
          {loading ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <Sparkles className="hidden md:inline w-[18px] h-[18px]" />
          )}
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>
      <div className="w-full md:basis-2/3">
        {outputs.length > 0 ? (
          <div className="flex flex-wrap gap-2 md:gap-4 mx-auto md:max-w-4xl justify-center">
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
    </div>
  )
}
