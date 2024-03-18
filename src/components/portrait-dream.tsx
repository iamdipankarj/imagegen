"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { ImagePreview } from "@/components/image-preview";
import { useScript } from "@/hooks/use-script";
import { cn } from "@/lib/utils";
import { GenerateButton } from "@/components/generate-button";
import { CreditInfo } from "@/components/credit-info";
import { Dropzone } from "@/components/dropzone";
import PromptGuide from "@/components/prompt-guide";
import { PromptBox } from "@/components/prompt-box";
import { Select } from "@/components/select";

const texts = [
  "A mysterious forest cloaked in twilight.",
  "A futuristic cityscape bustling with energy."
];

const styleList = [
  "(No style)",
  "Cinematic",
  "Disney Charactor",
  "Digital Art",
  "Photographic (Default)",
  "Fantasy art",
  "Neonpunk",
  "Enhance",
  "Comic book",
  "Lowpoly",
  "Line art"
]

export function PortraitDream({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [prompt, setPrompt] = useState<string>("");
  const [renderCount, setRenderCount] = useState<string>("1");
  const [loading, setLoading] = useState<boolean>(false);
  const [outputs, setOutputs] = useState<Array<string>>([]);

  const [styleName, setStyleName] = useState<string>(styleList[1]);
  const [image1, setImage1] = useState<string | null>(null);
  const [image2, setImage2] = useState<string | null>(null);
  const [image3, setImage3] = useState<string | null>(null);
  const [image4, setImage4] = useState<string | null>(null);

  const [photoName, setPhotoName] = useState<string | null>(null);

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

  const handleStyleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStyleName(event.target.value as string);
  }

  async function handleSubmit(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!prompt) {
      toast.info("Please enter a prompt along with an image to continue.")
      return;
    }
    if (!image1) {
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
          inputImage1: image1 || null,
          inputImage2: image2 || null,
          inputImage3: image3 || null,
          inputImage4: image4 || null,
          styleName,
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
      window.dispatchEvent(new CustomEvent("creditsUpdated"));
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
            Enter the text you want to generate an image from. You can enter a maximum of 1000 characters. <PromptGuide />.
          </div>
        </div>
        {/* Style Name */}
        <Select
          label="Style"
          value={styleName}
          onValueChange={handleStyleChange}
          options={styleList}
          description="Choose the style you want to apply to the generated image. This option is provided in case you want to generate the same prompt with different styles."
        />
        {/* Render Count */}
        <Select
          label="Number of renders"
          value={renderCount}
          onValueChange={handleRenderCount}
          options={[1, 2, 3, 4]}
          description="Choose the number of renders you want to generate. Note that, more renders will take longer to generate. This option is provided in case you want to generate multiple variations of the same prompt."
        />
        <div>
          <span className="label-text font-semibold">Input Photo 1</span>
          <Dropzone
            photo={image1}
            photoName={photoName}
            onPhotoChange={(photoUrl) => setImage1(photoUrl)}
            onPhotoNameChange={(name) => setPhotoName(name)}
          />
          <span className="text-xs leading-4 block mt-2">
            Original Photo. For example, a photo of your face.
          </span>
        </div>
        <div>
          <span className="label-text font-semibold">Input Photo 2</span>
          <Dropzone
            photo={image2}
            photoName={photoName}
            onPhotoChange={(photoUrl) => setImage2(photoUrl)}
            onPhotoNameChange={(name) => setPhotoName(name)}
          />
          <span className="text-xs leading-4 block mt-2">
            Additional photo, for example in another angle or pose.
          </span>
        </div>
        <div>
          <span className="label-text font-semibold">Input Photo 3</span>
          <Dropzone
            photo={image3}
            photoName={photoName}
            onPhotoChange={(photoUrl) => setImage3(photoUrl)}
            onPhotoNameChange={(name) => setPhotoName(name)}
          />
          <span className="text-xs leading-4 block mt-2">
            Additional photo, for example in another angle or pose.
          </span>
        </div>
        <div>
          <span className="label-text font-semibold">Input Photo 4</span>
          <Dropzone
            photo={image4}
            photoName={photoName}
            onPhotoChange={(photoUrl) => setImage4(photoUrl)}
            onPhotoNameChange={(name) => setPhotoName(name)}
          />
          <span className="text-xs leading-4 block mt-2">
            Additional photo, for example in another angle or pose.
          </span>
        </div>
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
            <h3 className="text-4xl font-semibold text-zinc-600 text-center">Generate your <span className="bg-gradient-glow font-semibold bg-clip-text text-transparent animate-gradient-text bg-[length:200%_auto]">beautiful portraits</span> in seconds.</h3>
            <p className="text-zinc-500 text-center">Upload a photo, select a room type, how many renders do you want to create and hit Generate when you are ready.</p>
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
