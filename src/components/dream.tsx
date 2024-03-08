"use client";

import { useState } from "react";
import NSFWFilter from 'nsfw-filter';
import Image from "next/image";
import { UploadDropzone } from '@bytescale/upload-widget-react';
import { UploadWidgetConfig, UploadWidgetOnPreUploadResult } from '@bytescale/upload-widget';
import { UrlBuilder } from "@bytescale/sdk";
import useSWR from "swr";
import { toast } from "sonner";
import { Trash } from "lucide-react";
import { rgbDataURL } from "@/lib/blurImage";

interface DreamProps extends React.HTMLAttributes<HTMLDivElement> {
  model: "restore" | "upscale" | "interior" | "text2img" | "caption";
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

  return (
    <div className={className} {...props}>
      <div className="basis-1/4 shrink-0 w-full">
        <ul className="steps steps-horizontal w-full mb-8">
          <li className="step step-info after:!text-white">
            <span className="text-sm md:text-base">Choose Image</span>
          </li>
          <li className="step">
            <span className="text-sm md:text-base">Select Quality</span>
          </li>
          <li className="step">
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
      <button className="btn btn-primary">Generate</button>
    </div>
  )
}
