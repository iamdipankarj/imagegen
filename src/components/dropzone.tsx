"use client";

import { useState } from 'react';
import { UploadDropzone } from '@bytescale/upload-widget-react';
import { UrlBuilder } from "@bytescale/sdk";
import Image from "next/image";
import { Trash } from 'lucide-react';
import { toast } from "sonner";
import { UploadWidgetConfig, UploadWidgetOnPreUploadResult } from '@bytescale/upload-widget';
import { rgbDataURL } from "@/lib/blurImage";
import { cn } from '@/lib/utils';

interface DropzoneProps extends React.HTMLAttributes<HTMLDivElement> {
  photo: string | null;
  photoName: string | null;
  onPhotoChange: (photo: string | null) => void;
  onPhotoNameChange: (photoName: string | null) => void;
}

export function Dropzone({
  photo,
  photoName,
  onPhotoNameChange,
  onPhotoChange,
  className,
  ...props
}: DropzoneProps) {
  const [relativeFilePath, setRelativeFilePath] = useState<string | null>(null);

  const options: UploadWidgetConfig = {
    apiKey: process.env.NEXT_PUBLIC_BYTESCALE_API_KEY!,
    maxFileCount: 1,
    mimeTypes: ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'],
    editor: { images: { crop: false } },
    styles: { colors: { primary: '#299850' } }
  };

  const onTrashClick = () => {
    onPhotoChange(null);
    onPhotoNameChange(null);
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
    <div id="uploader" className={cn("rounded-md overflow-hidden w-full max-w-5xl flex flex-col items-center justify-center mb-2", className)} {...props}>
      {photo ? (
        <div className="relative inline-flex my-2">
          <Image
            alt="original photo"
            src={photo}
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
              onPhotoNameChange(imageName);
              setRelativeFilePath(image.filePath);
              onPhotoChange(imageUrl);
            }
          }}
          className="w-2"
          width="670px"
          height="250px"
        />
      )}
      {/* {!originalPhoto ? (
        <span className="label-text-alt">Accepted file types: .jpg, .png</span>
      ) : null} */}
    </div>
  )
}
