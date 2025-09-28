"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { ImagePreview } from "@/components/image-preview";
import { useScript } from "@/hooks/use-script";
import { cn } from "@/lib/utils";
import { GenerateButton } from "@/components/generate-button";
import { Dropzone } from "@/components/dropzone";
import { PromptGuide } from "@/components/prompt-guide";
import { PromptBox } from "@/components/prompt-box";
import { Select } from "@/components/select";
import { OutputImage } from "@/lib/types";

const texts = [
  "A photo of a girl walking down the streets of NYC, surrounded by buildings.",
  "A photo of a man sitting on a bench in a park, reading a book."
];

export function PortraitDream({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [prompt, setPrompt] = useState<string>("");
  const [renderCount, setRenderCount] = useState<string>("1");
  const [loading, setLoading] = useState<boolean>(false);
  const [outputs, setOutputs] = useState<Array<OutputImage>>([]);
  const [images, setImages] = useState<Array<string>>([]);

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

  const handlePromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(event.target.value);
  }

  const handleRenderCount = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRenderCount(event.target.value as string);
  }

  async function handleSubmit(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!prompt) {
      toast.info("Please enter a prompt along with an image to continue.")
      return;
    }
    if (images.length === 0) {
      toast.info("Please upload atleast one photo to continue.")
      return;
    }
    window.scrollTo(0, 0);
    setLoading(true);
    setOutputs([]);
    try {
      setLoading(true)
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify({
          prompt,
          images,
          model: "photomaker",
          renderCount
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
    } catch (e) {
      setLoading(false);
      toast.error(JSON.stringify(e) || "Failed to initiate AI. Please try again.")
    }
  }

  return (
    <div className={cn("flex flex-col md:flex-row items-start gap-6", className)} {...props}>
      <div className="space-y-4 w-full md:basis-1/3">
        <Dropzone
          onUploaded={(photoUrl) => {
            setImages((prev) => [...prev, photoUrl])
          }}
          onRemoved={(file) => {
            setImages((prev) => prev.filter((url) => url !== file?.getMetadata("url")))
          }}
          allowMultiple
          maxFiles={4}
        />
        <div>
          <PromptBox
            placeholderList={texts}
            value={prompt}
            onPromptChange={handlePromptChange}
          />
          <div className="text-sm leading-5 block mt-5">
            Enter the pose or action you apply to the generated image. <PromptGuide><p>Provide a clear and concise desription of the pose or action that you want the generated image photo to have.</p>
            <p><span className="font-semibold">Example:&nbsp;</span>A photo of a girl walking down the streets of NYC, surrounded by buildings.</p></PromptGuide>.
          </div>
        </div>
        {/* Render Count */}
        <Select
          label="Number of renders"
          value={renderCount}
          onValueChange={handleRenderCount}
          options={[1, 2, 3, 4]}
          description="Choose the number of renders you want to generate. Note that, more renders will take longer to generate. This option is provided in case you want to generate multiple variations of the same prompt."
        />
        <GenerateButton onClick={handleSubmit} loading={loading} />
      </div>
      <div className="w-full md:basis-2/3">
        {loading ? (
          <div className="mt-4 text-center">
            <span className="loading loading-spinner text-primary loading-lg" />
          </div>
        ) : null}
        {!loading && outputs.length === 0 ? (
          <div className="flex items-center flex-col space-y-4 w-full justify-center md:px-10">
            <h3 className="text-4xl font-semibold text-zinc-600 text-center">Generate your <span className="highlighted">beautiful portraits</span> in seconds.</h3>
            <p className="text-zinc-500 text-center">Upload a photo, write a prompt of an action or pose, select a style, choose how many renders do you want to create and hit Generate when you are ready.</p>
            <div className="flex -space-x-4 !mt-8">
              <Image
                src="/portrait/style2.png"
                width={1054}
                height={760}
                alt="Restore an image in seconds"
                className="max-w-[500px]"
              />
            </div>
          </div>
        ) : null}
        {outputs.length > 0 ? (
          <div className="grid-container">
            {outputs.map((outputImage, index) => (
              <ImagePreview
                key={index}
                src={outputImage.url}
                imageWidth={outputImage.width}
                imageHeight={outputImage.height}
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
