"use client";
import { FormEvent, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Download, Loader2 } from "lucide-react";
import { downloadPhoto } from "@/lib/downloadPhoto";

interface ImagePreviewProps extends React.HTMLAttributes<HTMLAnchorElement> {
  photoName: string | null
  src: string
  loading?: boolean
}

export function ImagePreview({
  src,
  loading = false,
  photoName,
  className,
  ...props
}: ImagePreviewProps) {
  const [downloadLoading, setDownloadLoading] = useState(false);

  const handleDownload = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDownloadLoading(true);
    setTimeout(() => {
      downloadPhoto(
        src!,
        photoName!
      );
    }, 500);
    setTimeout(() => {
      setDownloadLoading(false);
    }, 1000);
  }

  return (
    <a href={src} className={cn("flex aspect-4/3 flex-wrap glightbox", {
      "cursor-not-allowed": loading,
      "cursor-pointer": !loading,
      "pointer-events-none": loading
    }, className)} {...props}>
      <figure className="group w-full rounded-2xl overflow-hidden relative cursor-pointer">
        {loading ? (
          <div className="animate-pulse shadow rounded-2xl bg-slate-200 w-full h-[200px] flex items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : (
          <Image
            src={src}
            className="block h-full w-full object-cover object-center transition-transform duration-300 transform md:group-hover:scale-110"
            alt="output"
            width={768}
            height={512}
          />
        )}
        {!loading ? (
          <div className="absolute flex items-center justify-center inset-0 bg-slate-600/50 transition-opacity opacity-0 md:group-hover:opacity-100">
            <button onClick={handleDownload} className="btn btn-md btn-success text-white">
              {downloadLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              Download
            </button>
          </div>
        ) : null}
      </figure>
    </a>
  )
}
