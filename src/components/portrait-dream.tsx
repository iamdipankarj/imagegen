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

const texts = [
  "A photo of a girl walking down the streets of NYC, surrounded by buildings.",
  "A photo of a man sitting on a bench in a park, reading a book."
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
    if (!image1 && !image2 && !image3 && !image4) {
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
          inputImage1: image1 || image2 || image3 || image4 || null,
          inputImage2: image2 || image3 || image4 || null,
          inputImage3: image3 || image4 || null,
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
          <div className="text-sm leading-5 block mt-5">
            Enter the pose or action you apply to the generated image. <PromptGuide><p>Provide a clear and concise desription of the pose or action that you want the generated image photo to have.</p>
            <p><span className="font-semibold">Example:&nbsp;</span>A photo of a girl walking down the streets of NYC, surrounded by buildings.</p></PromptGuide>.
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
          <span className="text-sm leading-5 block mt-2">
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
          <span className="text-sm leading-5 block mt-2">
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
          <span className="text-sm leading-5 block mt-2">
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
          <span className="text-sm leading-5 block mt-2">
            Additional photo, for example in another angle or pose.
          </span>
        </div>
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
