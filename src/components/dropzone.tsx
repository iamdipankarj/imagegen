"use client";

import { useMemo, useRef } from 'react';

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

import { cn } from '@/lib/utils';

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize
)

interface DropzoneProps extends React.HTMLAttributes<HTMLDivElement> {
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

export function Dropzone({
  allowMultiple = true,
  maxFiles = 5,
  maxFileSize = '15MB',
  acceptedFileTypes = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'],
  onUploaded,
  onRemoved,
  processUrl = '/api/upload-image',
  revertUrl = '/api/remove-image',
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
        // FilePond sends the file under the "name" prop on the component (see below).
        ondata: (formData) => {
          // Add any extra fields if you want
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

      revert: (
        uniqueFileId,
        load,
        error
      ) => {
        fetch(revertUrl, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ fileName: uniqueFileId.split('/').pop() }),
        })
          .then(async (res) => {
            if (res.ok) {
              load(); // tells FilePond the delete succeeded
            } else {
              const t = await res.text();
              error(t || "Failed to remove image");
            }
          })
          .catch((e) => {
            error(e?.message || "Failed to remove image");
          });
      },
    }),
    [onUploaded, processUrl, revertUrl]
  );

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
    </div>
  )
}
