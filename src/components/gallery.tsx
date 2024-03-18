"use client";

import { useScript } from "@/hooks/use-script";
import Image from "next/image";
import { useEffect } from "react";

const imageList = [
  "/text-to-image/1.png",
  "/text-to-image/2.png",
  "/text-to-image/3.png",
  "/text-to-image/4.png",
  "/text-to-image/5.png",
  "/text-to-image/6.png",
  "/text-to-image/7.png",
  "/text-to-image/8.png",
  "/text-to-image/9.png",
  "/text-to-image/10.png",
  "/text-to-image/11.png",
  "/text-to-image/12.png",
  "/text-to-image/13.png",
  "/text-to-image/14.png",
  "/text-to-image/15.png",
  "/text-to-image/16.png"
]

export function Gallery() {
  const { ready: lightboxReady } = useScript('https://cdn.jsdelivr.net/gh/mcstudios/glightbox/dist/js/glightbox.min.js')

  useEffect(() => {
    if (lightboxReady) {
      if (window.GLightbox) {
        window.GLightbox({
          closeOnOutsideClick: true
        })
      }
    }
  }, [lightboxReady])

  return (
    <div className="flex flex-col lg:flex-row items-center">
      <ul role="list" className="max-w-7xl mx-auto md:columns-2 lg:columns-3 xl:columns-4 space-y-4 md:space-y-6 md:gap-6">
        {imageList.map((image, index) => (
          <li key={index} className="break-inside-avoid max-md:flex justify-center overflow-hidden rounded-xl">
            <a className="max-w-[550px] border border-base-content/20 rounded-xl glightbox block" href={image}>
              <Image
                src={image}
                width={300}
                height={200}
                alt="PhotoWorks.ai"
                className="w-full h-[auto]"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
