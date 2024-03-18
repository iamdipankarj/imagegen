"use client";

import Link from "next/link";
import Image from "next/image";
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

export function StyleBanner() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  return (
    <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">
      <div className="flex-1 text-center md:text-left">
        <h2 className="font-bold text-4xl mb-4">
          Transform <span className="highlighted">any image</span> with just one image.
        </h2>
        <p className="text-[#555F68] dark:text-dark-200 mb-8">
          Optionally you can add more than one image. The more you add, better the results.
        </p>
        <div>
          <Link href="/portrait" className="btn btn-success btn-lg">Try it now</Link>
        </div>
      </div>
      <div className="embla flex flex-1 lg:justify-end overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          <div className="embla__slide flex-[0_0_100%] min-w-0">
            <Image
              className="w-full"
              src="/portrait/style1.png"
              width={1054}
              height={760}
              alt="Example of style transfer"
              priority
            />
          </div>
          <div className="embla__slide flex-[0_0_100%] min-w-0">
            <Image
              className="w-full"
              src="/portrait/style2.png"
              width={1054}
              height={760}
              alt="Example of style transfer"
              priority
            />
          </div>
          <div className="embla__slide flex-[0_0_100%] min-w-0">
            <Image
              className="w-full"
              src="/portrait/style3.png"
              width={1054}
              height={760}
              alt="Example of style transfer"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}
