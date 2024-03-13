"use client";
import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { useTypingEffect } from "@/hooks/use-typing-effect";
import { ImagePreview } from "@/components/image-preview";
import { useScript } from "@/hooks/use-script";
import { cn } from "@/lib/utils";
import { GenerateButton } from "@/components/generate-button";
import { CreditInfo } from "@/components/credit-info";

const texts = [
  "A mysterious forest cloaked in twilight.",
  "A futuristic cityscape bustling with energy.",
  "A tranquil beach at sunrise, with pastel hues.",
  "An enchanted castle atop a misty mountain.",
  "A cosmic voyage through swirling galaxies.",
  "A vibrant marketplace alive with colors and culture.",
  "A surreal dreamscape filled with floating islands.",
  "A majestic waterfall cascading into a serene pool.",
  "A magical garden blooming with fantastical flora.",
  "A bustling metropolis seen from above, aglow with city lights."
];

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
  const [resolution, setResolution] = useState<string>("1024");
  const [renderCount, setRenderCount] = useState<string>("1");
  const [loading, setLoading] = useState<boolean>(false);
  const [outputs, setOutputs] = useState<Array<string>>([]);

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

  const handlePromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(event.target.value);
  }

  async function handleSubmit(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!prompt) {
      toast.info("Please enter a prompt to generate an image.")
      return;
    } else if (prompt.length < 10) {
      toast.info("Please enter a prompt with at least 10 characters.")
      return;
    }
    setLoading(true)
    try {
      setLoading(true)
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify({
          model: "text2image",
          renderCount,
          resolution,
          prompt
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
  
      if (response.status !== 200) {
        setLoading(false);
        toast.error("Failed to initiate AI. Please try again.")
        return;
      }
  
      const { outputs } = await response.json();
      setOutputs(outputs);
      setLoading(false);
      window.dispatchEvent(new CustomEvent("creditsUpdated"));
    } catch (e) {
      setLoading(false);
      toast.error(JSON.stringify(e) || "Failed to initiate AI. Please try again.")
    }
  }

  const { textToShow } = useTypingEffect({
    isTypeByLetter: true,
    duration: 50,
    texts
  });

  return (
    <div className={cn("flex flex-col md:flex-row items-start gap-6", className)} {...props}>
      <div className="space-y-4 w-full md:basis-1/3">
        <div>
          <div className="w-full relative bg-base-transparent group">
            <span className="absolute inset-1 bg-gradient-glow opacity-40 group-focus-within:opacity-80 group-focus-within:inset-0 group-hover:opacity-80 group-hover:inset-0 blur-lg duration-300 -z-1" />
            <div className="relative bg-base-100 p-2 rounded-2xl outline outline-base-content/0 group-focus-within:outline-gray-300/50">
              <textarea
                className="input px-2 !text-lg w-full border-none focus:outline-none min-h-[100px]"
                placeholder={textToShow}
                minLength={10}
                maxLength={1000}
                value={prompt}
                rows={6}
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
        <GenerateButton onClick={handleSubmit} loading={loading} />
        <CreditInfo />
      </div>
      <div className="w-full md:basis-2/3">
        {loading ? (
          <div className="mt-4 text-center">
            <span className="loading loading-spinner text-primary loading-lg" />
          </div>
        ) : null}
        {!loading && outputs.length === 0 ? (
          <div className="flex items-center flex-col space-y-4 w-full justify-center md:px-10">
            <h3 className="text-4xl font-semibold text-zinc-600 text-center">Generate an <span className="bg-gradient-glow font-semibold bg-clip-text text-transparent animate-gradient-text bg-[length:200%_auto]">image</span> in seconds.</h3>
            <p className="text-zinc-500 text-center">Write a prompt, choose your resolution, how many renders do you want to create and hit Generate when you are ready.</p>
            <div className="flex -space-x-4 !mt-8">
              <figure className="shadow-elevate rounded-md overflow-hidden rotate-[4.2deg]">
                <Image
                  src="/samples/sample1.png"
                  width={300}
                  height={300}
                  alt="Generate an image in seconds"
                  className="w-48 h-48"
                />
              </figure>
              <figure className="shadow-elevate rounded-md overflow-hidden rotate-[-4.2deg] translate-y-[0.5em]">
                <Image
                  src="/samples/sample2.png"
                  width={300}
                  height={300}
                  alt="Generate an image in seconds"
                  className="w-48 h-48"
                />
              </figure>
            </div>
          </div>
        ) : null}
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
