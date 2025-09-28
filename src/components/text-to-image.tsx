"use client";
import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { ImagePreview } from "@/components/image-preview";
import { useScript } from "@/hooks/use-script";
import { cn } from "@/lib/utils";
import { GenerateButton } from "@/components/generate-button";
import { PromptGuide } from "@/components/prompt-guide";
import { PromptBox } from "@/components/prompt-box";
import { Select } from "@/components/select";

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

const aspectRatios: Array<string> = [
  '21:9',
  '16:9',
  '4:3',
  '3:2',
  '1:1',
  '2:3',
  '3:4',
  '9:16',
  '9:21'
]

export function TextToImage({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [prompt, setPrompt] = useState<string>("");
  const [aspectRatio, setAspectRatio] = useState<string>("1:1");
  const [renderCount, setRenderCount] = useState<string>("1");
  const [loading, setLoading] = useState<boolean>(false);
  const [outputs, setOutputs] = useState<Array<{
    width: number;
    height: number;
    url: string;
  }>>([]);

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

  const handleAspectRatio = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAspectRatio(event.target.value as string);
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
    setOutputs([]);
    setLoading(true)
    try {
      setLoading(true)
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify({
          model: "text2image",
          renderCount,
          aspectRatio,
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
    } catch (e) {
      setLoading(false);
      toast.error(JSON.stringify(e) || "Failed to initiate AI. Please try again.")
    }
  }

  return (
    <div className={cn("flex flex-col md:flex-row items-start gap-6", className)} {...props}>
      <div className="space-y-4 w-full md:basis-1/3">
        <div>
          <PromptBox
            placeholderList={texts}
            value={prompt}
            onPromptChange={handlePromptChange}
          />
          <div className="text-xs leading-4 block mt-5">
            Enter the text you want to generate an image from. You can enter a maximum of 1000 characters. <PromptGuide>
            <p>Provide a concise and clear description of the image you want generated. Include details such as objects, settings, actions, and any specific attributes you desire. Be as specific as possible in your description to guide the AI in generating the desired image accurately. Include relevant dimensions, colors, textures, and any other important visual elements.</p><p><span className="font-semibold">Example:&nbsp;</span>An Image depicting a serene lakeside cabin nestled in a dense forest during autumn. The cabin should be a cozy wooden structure with a stone chimney, surrounded by vibrant fall foliage in shades of red, orange, and yellow.</p></PromptGuide>.
          </div>
        </div>
        <Select
          label="Select Aspect Ratio"
          value={aspectRatio}
          onValueChange={handleAspectRatio}
          options={aspectRatios}
          description="Choose the aspect ratio of the image you want to generate."
        />
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
            <h3 className="text-4xl font-semibold text-zinc-600 text-center">Generate an <span className="highlighted">image</span> in seconds.</h3>
            <p className="text-zinc-500 text-center">Write a prompt, choose your aspect ratio, how many renders do you want to create and hit Generate when you are ready.</p>
            <div className="flex -space-x-4 !mt-8">
              <figure className="shadow-elevate rounded-md overflow-hidden rotate-[4.2deg]">
                <Image
                  src="/samples/sample1.png"
                  width={300}
                  height={300}
                  alt="Generate an image in seconds"
                  className="w-48 h-48"
                  priority
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
          <div className="grid-container">
            {outputs.map((outputImage, index) => (
              <ImagePreview
                key={index}
                src={outputImage.url}
                loading={loading}
                imageWidth={outputImage.width}
                imageHeight={outputImage.height}
                photoName={`photoworksai_output_${index + 1}.png`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
