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

export function InteriorDream({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [renderCount, setRenderCount] = useState<string>("1");
  const [loading, setLoading] = useState<boolean>(false);
  const [outputs, setOutputs] = useState<Array<string>>([]);
  const [originalPhoto, setOriginalPhoto] = useState<string | null>(null);
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

  const handleRenderCount = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRenderCount(event.target.value as string);
  }

  async function handleSubmit(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    setLoading(true);
    return
    if (!originalPhoto) {
      toast.info("Please upload a photo to continue.")
      return;
    }
    setLoading(true)
    try {
      setLoading(true)
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify({
          imageUrl: originalPhoto,
          model: "interior",
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
          <Dropzone
            originalPhoto={originalPhoto}
            photoName={photoName}
            onOriginalPhotoChange={(photoUrl) => setOriginalPhoto(photoUrl)}
            onPhotoNameChange={(name) => setPhotoName(name)}
          />
          <span className="text-xs leading-4 block mt-5">
            Upload a photo of your current room. For best results, make sure it shows the entire room and is well lit. Although the model can handle angled pics, it&apos;s better to have a straight-on view. Try to upload an image in a 90-degree angle facing a wall or a window.
          </span>
        </div>
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
            <h3 className="text-4xl font-semibold text-zinc-600 text-center">Generate your <span className="bg-gradient-glow font-semibold bg-clip-text text-transparent animate-gradient-text bg-[length:200%_auto]">dream interior</span> in seconds.</h3>
            <p className="text-zinc-500 text-center">Upload a photo, select a room type, how many renders do you want to create and hit Generate when you are ready.</p>
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
