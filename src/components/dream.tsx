"use client";

import { FormEvent, useState } from "react";
import NSFWFilter from 'nsfw-filter';
import Image from "next/image";
import { UploadDropzone } from '@bytescale/upload-widget-react';
import { UploadWidgetConfig, UploadWidgetOnPreUploadResult } from '@bytescale/upload-widget';
import { UrlBuilder } from "@bytescale/sdk";
import useSWR from "swr";
import { toast } from "sonner";
import { Download, FilePlus, Loader2, Trash } from "lucide-react";
import { rgbDataURL } from "@/lib/blurImage";
import { SwitchToggle } from "@/components/switch-toggle";
import { CompareSlider } from "@/components/compare-slider";
import { appendNewToName, downloadPhoto } from "@/lib/downloadPhoto";
import { cn } from "@/lib/utils";
import { GenerateButton } from "@/components/generate-button";

interface DreamProps extends React.HTMLAttributes<HTMLDivElement> {
  model: "restore" | "upscale" | "interior" | "text2image" | "caption";
}

export function Dream({
  className,
  model,
  ...props
}: DreamProps) {
  const [originalPhoto, setOriginalPhoto] = useState<string | null>(null);
  const [restoredImage, setRestoredImage] = useState<string | null>(null);
  const [relativeFilePath, setRelativeFilePath] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [sideBySideEnabled, setSideBySideEnabled] = useState<boolean>(false);
  const [downloadLoading, setDownloadLoading] = useState<boolean>(false);
  const [photoName, setPhotoName] = useState<string | null>(null);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, mutate } = useSWR('/api/credits', fetcher);

  const options: UploadWidgetConfig = {
    apiKey: process.env.NEXT_PUBLIC_BYTESCALE_API_KEY!,
    maxFileCount: 1,
    mimeTypes: ['image/jpeg', 'image/png', 'image/jpg'],
    editor: { images: { crop: false } },
    styles: { colors: { primary: '#299850' } },
    onPreUpload: async (
      file: File
    ): Promise<UploadWidgetOnPreUploadResult | undefined> => {
      let isSafe = false;
      try {
        isSafe = await NSFWFilter.isSafe(file);
        if (!isSafe) {
          toast.error("NSFW Image detected. Please use a different image.")
        }
      } catch (error) {
        console.error('NSFW predictor threw an error', error);
      }
      if (!isSafe) {
        return { errorMessage: 'Detected a NSFW image which is not allowed.' };
      }
      // if (data.credits === 0) {
      //   return { errorMessage: 'No Credits Left. Buy Credits to create more images.' };
      // }
      return undefined;
    }
  };

  async function handleSubmit() {
    if (!originalPhoto) {
      toast.info("Please upload a photo to continue.")
      return;
    }
    try {
      setLoading(true)
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify({
          imageUrl: originalPhoto,
          model
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
      setRestoredImage(outputs[0]);
      setLoading(false);
      window.dispatchEvent(new CustomEvent("creditsUpdated"));
    } catch (e) {
      setLoading(false);
      toast.error(JSON.stringify(e) || "Failed to initiate AI. Please try again.")
    }
  }

  const onTrashClick = () => {
    setOriginalPhoto(null);
    setPhotoName(null);
    fetch('/api/remove-image', {
      method: 'POST',
      body: JSON.stringify({
        filePath: relativeFilePath
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json()).then((_: any) => {
      toast.info("Photo removed successfully.")
    }).catch((error: any) => {
      toast.error(JSON.stringify(error) || "Failed to initiate AI. Please try again.")
    })
  }

  const handleNewPhoto = (e: FormEvent) => {
    e.preventDefault();
    setOriginalPhoto(null);
    setPhotoName(null);
    setRestoredImage(null);
  }

  const handleDownload = (e: FormEvent) => {
    e.preventDefault();
    setDownloadLoading(true);
    setTimeout(() => {
      downloadPhoto(
        restoredImage!,
        appendNewToName(photoName!)
      );
    }, 500);
    setTimeout(() => {
      setDownloadLoading(false);
    }, 1000);
  }

  return (
    <div className={cn("flex flex-col md:flex-row items-start gap-6", className)} {...props}>
      <div className="space-y-4 w-full md:basis-1/3">
        <div id="uploader" className="rounded-md overflow-hidden w-full max-w-5xl flex flex-col items-center justify-center mb-5">
          {originalPhoto ? (
            <div className="relative inline-flex">
              <Image
                alt="original photo"
                src={originalPhoto}
                className="rounded-2xl h-96 block"
                placeholder="blur"
                blurDataURL={rgbDataURL(237, 181, 6)}
                width={300}
                height={300}
                style={{
                  width: 300,
                  height: 'auto'
                }}
              />
              <button onClick={onTrashClick} className="absolute top-2 right-2 btn btn-sm btn-circle btn-neutral">
                <Trash className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <UploadDropzone
              options={options}
              minWidth="100%"
              onUpdate={({ uploadedFiles }) => {
                if (uploadedFiles.length !== 0) {
                  const image = uploadedFiles[0];
                  const imageName = image.originalFile.originalFileName;
                  const imageUrl = UrlBuilder.url({
                    accountId: image.accountId,
                    filePath: image.filePath,
                    options: {
                      transformation: "preset",
                      transformationPreset: "thumbnail"
                    }
                  });
                  setPhotoName(imageName);
                  setRelativeFilePath(image.filePath);
                  setOriginalPhoto(imageUrl);
                }
              }}
              className="w-2"
              width="670px"
              height="250px"
            />
          )}
          {!originalPhoto ? (
            <span className="label-text-alt">Accepted file types: .jpg, .png</span>
          ) : null}
        </div>
        {restoredImage ? (
          <SwitchToggle enabled={sideBySideEnabled} onChange={(value: boolean) => {
            setSideBySideEnabled(value);
          }} />
        ) : null}
        {restoredImage ? (
          <div className="flex flex-col gap-4">
            <button onClick={handleDownload} disabled={downloadLoading} className="btn btn-md btn-accent mx-auto flex-1 w-full">
              {downloadLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              Download Restored Photo
            </button>
            <button onClick={handleNewPhoto} className="btn btn-md btn-info mx-auto flex-1 w-full">
              {downloadLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FilePlus className="h-4 w-4" />}
              New Photo
            </button>
          </div>
        ) : (
          <GenerateButton
            onClick={handleSubmit}
            loading={loading}
          />
        )}
      </div>
      <div className="w-full md:basis-2/3">
        {restoredImage ? (
          <div className="text-center">
            {sideBySideEnabled ? (
              <CompareSlider
                className="md:max-w-[600px] mx-auto"
                original={originalPhoto!}
                restored={restoredImage}
              />
            ) : (
              <Image
                src={restoredImage}
                width={600}
                height={300}
                className="block mx-auto rounded-xl"
                alt="Generate an image in seconds"
              />
            )}
          </div>
        ) : (
          <div className="flex items-center flex-col space-y-4 w-full justify-center md:px-10">
            <h3 className="text-4xl font-semibold text-zinc-600 text-center">Restore your <span className="bg-gradient-glow font-semibold bg-clip-text text-transparent animate-gradient-text bg-[length:200%_auto]">photos</span> in seconds.</h3>
            <p className="text-zinc-500 text-center">
              Upload a photo and hit Generate to restore it. You can also compare the original and restored image side by side a toggle that will be visible after the image is restored.
            </p>
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
        )}
      </div>
    </div>
  )
}
