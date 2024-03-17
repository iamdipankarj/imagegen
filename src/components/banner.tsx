import Image from "next/image";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { Wand } from "lucide-react";

export function Banner() {
  return (
    <div className="mt-4 flex flex-col lg:flex-row items-center">
      <div className="hero-copy w-full lg:w-2/3">
        <h1 className="font-bold text-3xl lg:text-5xl xl:text-5xl text-zinc-700">
          Your personal AI Image Generator
        </h1>
        <p className="text-base lg:text-lg xl:text-lg my-5 lg:w-[88%] xl:w-[80%]">
          Let AI design the perfect image for you. Just describe your image and get it in seconds.
        </p>
        <ul className="mb-8">
          <li className="my-2">
            ✍️ <Link href="/text-to-image" className="link">Describe your image</Link>, get it in seconds
          </li>
          <li className="my-2">
            🏠 <Link href="/portrait" className="link">Generate High Quality Portraits</Link> instantly
          </li>
          <li className="my-2">
            🌇 <Link href="/upscale" className="link">Upscale your photos</Link> in an easy way
          </li>
          <li className="my-2">
            📷 <Link href="/restore" className="link">Restore your memories</Link> from any old photograph
          </li>
        </ul>
        <div className="cursor-pointer w-fit flex gap-4">
          <Link className="btn border-none btn-md bg-gradient-cta bg-[length:200%_200%] animate-shimmer rounded-badge shadow-lg gap-1 text-xl inline-flex" href="/text-to-image">
            <div className="blue-overlay" />
            <Wand className="hidden md:inline w-[18px] h-[18px]" />
            Create Now
          </Link>
          <Link className="btn btn-outline rounded-badge shadow-lg gap-1 text-xl text-zinc-700 inline-flex" href="/#examples">
            <div className="blue-overlay" />
            <ArrowDown className="hidden md:inline w-[18px] h-[18px]" />
            View Examples
          </Link>
        </div>
      </div>
      <div className="hero-examples hidden lg:block w-1/3">
      <div className="flex -space-x-4 !mt-8">
        <figure className="shadow-elevate rounded-md overflow-hidden rotate-[4.2deg]">
          <Image
            src="/samples/sample1.png"
            width={300}
            height={300}
            alt="Generate an image in seconds"
            className="w-48 h-48"
            priority
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
    </div>
  ) 
}
