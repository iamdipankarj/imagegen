"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Download, FilePlus, Loader2 } from "lucide-react";
import { SwitchToggle } from "@/components/switch-toggle";
import { CompareSlider } from "@/components/compare-slider";
import { appendNewToName, downloadPhoto } from "@/lib/downloadPhoto";
import { cn } from "@/lib/utils";
import { GenerateButton } from "@/components/generate-button";
import { Dropzone } from "@/components/dropzone";

export function RestoreDream({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [originalPhoto, setOriginalPhoto] = useState<string | null>(null);
  const [restoredImage, setRestoredImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [sideBySideEnabled, setSideBySideEnabled] = useState<boolean>(false);
  const [downloadLoading, setDownloadLoading] = useState<boolean>(false);

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
          model: "restore"
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
    } catch (e) {
      setLoading(false);
      toast.error(JSON.stringify(e) || "Failed to initiate AI. Please try again.")
    }
  }

  const handleNewPhoto = (e: FormEvent) => {
    e.preventDefault();
    setOriginalPhoto(null);
    setRestoredImage(null);
  }

  const handleDownload = (e: FormEvent) => {
    e.preventDefault();
    setDownloadLoading(true);
    setTimeout(() => {
      downloadPhoto(
        restoredImage!,
        'output'
      );
    }, 500);
    setTimeout(() => {
      setDownloadLoading(false);
    }, 1000);
  }

  return (
    <div className={cn("flex flex-col md:flex-row items-start gap-6", className)} {...props}>
      <div className="space-y-4 w-full md:basis-1/3">
        <Dropzone
          onUploaded={(photoUrl) => {
            console.log({photoUrl})
            setOriginalPhoto(photoUrl)
          }}
          onRemoved={() => setOriginalPhoto(null)}
        />
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
              <FilePlus className="h-4 w-4" />
              New Photo
            </button>
          </div>
        ) : (
          <>
            <GenerateButton
              onClick={handleSubmit}
              loading={loading}
            />
          </>
        )}
      </div>
      <div className="w-full md:basis-2/3">
        {loading ? (
          <div className="mt-4 text-center">
            <span className="loading loading-spinner text-primary loading-lg" />
          </div>
        ) : null}
        {!loading && restoredImage ? (
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
        ) : null}
        {!loading && !restoredImage ? (
          <div className="flex items-center flex-col space-y-4 w-full justify-center md:px-10">
            <h3 className="text-4xl font-semibold text-zinc-600 text-center">Restore your <span className="highlighted">photos</span> in seconds.</h3>
            <p className="text-zinc-500 text-center">
              Upload a photo and hit Generate to restore it. You can also compare the original and restored image side by side a toggle that will be visible after the image is restored.
            </p>
            <div className="flex -space-x-4 !mt-8">
              <Image
                src="/restore.png"
                width={1054}
                height={760}
                alt="Restore an image in seconds"
                className="max-w-[500px]"
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
