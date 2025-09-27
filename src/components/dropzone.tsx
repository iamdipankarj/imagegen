"use client";

import { useMemo, useRef, useState } from 'react';
import Image from "next/image";
import { Trash } from 'lucide-react';
import { toast } from "sonner";

import { FilePondFile } from 'filepond';
import { FilePond, FilePondProps, registerPlugin } from 'react-filepond'

// Filepond styles
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

// Filepond plugins
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';

import { rgbDataURL } from "@/lib/blurImage";
import { cn } from '@/lib/utils';

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize
)

interface DropzoneProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Auth token for your API, if required */
  authToken?: string;
  /** Allow multiple files */
  allowMultiple?: boolean;
  /** Max files when multiple */
  maxFiles?: number;
  /** Max file size (e.g. "15MB") */
  maxFileSize?: string;
  /** Allowed MIME types */
  acceptedFileTypes?: string[];
  /**
   * This is whatever your API returns (id or url) and is what FilePond stores internally.
   */
  onUploaded?: (url: string) => void;
  /** Called when a file is removed in the UI */
  onRemoved?: (file: FilePondFile) => void;
  /** Override endpoint if needed (defaults to `/api/photoworks/upload-image`) */
  processUrl?: string;
  /** Optional revert endpoint for deletes (send DELETE) */
  revertUrl?: string;
  /** Field name your API expects (default "file") */
  fieldName?: string;
  /** Disable credits label in UI (MIT license allows this; consider donating to FilePond) */
  hideCredits?: boolean;
};

// interface DropzoneProps extends React.HTMLAttributes<HTMLDivElement> {
//   photo: string | null;
//   photoName: string | null;
//   onPhotoChange: (photo: string | null) => void;
//   onPhotoNameChange: (photoName: string | null) => void;
// }

export function Dropzone({
  authToken,
  allowMultiple = true,
  maxFiles = 5,
  maxFileSize = '15MB',
  acceptedFileTypes = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'],
  onUploaded,
  onRemoved,
  processUrl = '/api/photoworks/upload-image',
  revertUrl, // optional: e.g. '/api/photoworks/upload-image'
  fieldName = 'file',
  hideCredits = true,
  className,
  ...props
}: DropzoneProps) {
  const pondRef = useRef<FilePond | null>(null);

  const serverConfig = useMemo<NonNullable<FilePondProps['server']>>(
    () => ({
      // Use the URL-object style for perfect TS compatibility
      process: {
        url: processUrl,
        method: 'POST',
        headers: authToken ? { Authorization: `Bearer ${authToken}` } : undefined,
        // FilePond sends the file under the "name" prop on the component (see below).
        ondata: (formData) => {
          // Add any extra fields if you want
          formData.append('source', 'filepond');
          return formData;
        },
        // Convert the response to the serverId string FilePond needs to store internally
        onload: (resText) => {
          try {
            const data = JSON.parse(resText);
            const url = data?.url ?? resText; // API should return { url: "..." }
            if (url) onUploaded?.(url);
            return url; // FilePond stores this internally
          } catch {
            onUploaded?.(resText);
            return resText;
          }
        },
        onerror: (resText) => {
          try {
            const msg = JSON.parse(resText)?.error || resText;
            return msg;
          } catch {
            return resText;
          }
        },
        withCredentials: false,
        timeout: 0,
      },

      // Optional delete hook if you support it in your API
      revert: revertUrl
        ? {
            url: revertUrl,
            method: 'DELETE',
            headers: authToken ? { Authorization: `Bearer ${authToken}` } : undefined,
            // If your API needs JSON body, FilePond’s revert URL style hits without a body.
            // In that case, consider using a custom "process" function variant instead,
            // or encode the id in the URL (e.g., `${revertUrl}?id=...`) by using server hooks.
            onload: () => '',
            onerror: (res) => res,
          }
        : undefined,

      // You can also wire load/restore/fetch if you show existing files by id/url.
      // load: '/api/...',
      // restore: '/api/...',
      // fetch: '/api/...',
    }),
    [authToken, onUploaded, processUrl, revertUrl]
  );

  // const onTrashClick = () => {
  //   onPhotoChange(null);
  //   onPhotoNameChange(null);
  //   fetch('/api/remove-image', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       filePath: relativeFilePath
  //     }),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   }).then((response) => response.json()).then((_: any) => {
  //     toast.info("Photo removed successfully.")
  //   }).catch((error: any) => {
  //     toast.error(JSON.stringify(error) || "Failed to initiate AI. Please try again.")
  //   })
  // }

  return (
    <div id="uploader" className={cn("mt-2", className)} {...props}>
      <FilePond
        ref={pondRef as any}
        name={fieldName}
        allowMultiple={allowMultiple}
        maxFiles={maxFiles}
        acceptedFileTypes={acceptedFileTypes}
        allowFileTypeValidation
        maxFileSize={maxFileSize}
        allowFileSizeValidation
        instantUpload={true}
        credits={hideCredits ? false : undefined}
        server={serverConfig}
        labelIdle='Drag & Drop images or <span class="filepond--label-action">Browse</span>'
        onremovefile={(_, file) => onRemoved?.(file)}
      />
      {/* {photo ? (
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
      )} */}
      {/* {!originalPhoto ? (
        <span className="label-text-alt">Accepted file types: .jpg, .png</span>
      ) : null} */}
    </div>
  )
}
