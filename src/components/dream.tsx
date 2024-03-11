"use client";

import { FormEvent, useState } from "react";
import NSFWFilter from 'nsfw-filter';
import Image from "next/image";
import { UploadDropzone } from '@bytescale/upload-widget-react';
import { UploadWidgetConfig, UploadWidgetOnPreUploadResult } from '@bytescale/upload-widget';
import { UrlBuilder } from "@bytescale/sdk";
import useSWR from "swr";
import { toast } from "sonner";
import { Download, Loader2, Sparkles, Trash } from "lucide-react";
import { rgbDataURL } from "@/lib/blurImage";
import { SwitchToggle } from "@/components/switch-toggle";
import { CompareSlider } from "@/components/compare-slider";
import { appendNewToName, downloadPhoto } from "@/lib/downloadPhoto";
import { cn } from "@/lib/utils";

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
  const [error, setError] = useState<string | null>(null);
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
  
      const { generatedImage } = await response.json();
      setRestoredImage(generatedImage);
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
    <div className={className} {...props}>
      <div className="basis-1/4 shrink-0 w-full">
        <ul className="steps steps-horizontal w-full mb-8">
          <li className={cn("step", {
            "step-info after:!text-white": originalPhoto !== null
          })}>
            <span className="text-sm md:text-base">Choose Image</span>
          </li>
          <li className={cn("step", {
            "step-info after:!text-white": restoredImage !== null
          })}>
            <span className="text-sm md:text-base">Restore</span>
          </li>
        </ul>
      </div>
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
      </div>
      {!restoredImage ? (
        <div className="mb-4">
          <p className="text-sm text-center text-neutral-500">
            {photoName ? `Selected: ${photoName}` : "No Image Selected"}
          </p>
        </div>
      ) : null}
      {restoredImage ? (
        <SwitchToggle enabled={sideBySideEnabled} onChange={(value: boolean) => {
          setSideBySideEnabled(value);
        }} />
      ) : null}
      {restoredImage ? (
        <div className="my-4 rounded-xl overflow-hidden relative">
          {sideBySideEnabled ? (
            <CompareSlider
              original={originalPhoto!}
              restored={restoredImage}
            />
          ) : (
            <img src={restoredImage} />
          )}
          <button onClick={handleDownload} disabled={downloadLoading} className="btn btn-sm btn-primary absolute top-2 right-2">
            {downloadLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            Download
          </button>
        </div>
      ) : null}
      <button
        onClick={handleSubmit}
        className="btn btn-primary text-lg"
        disabled={loading}
      >
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Sparkles className="h-5 w-5" />
        )}
        Generate
      </button>
    </div>
  )
}
