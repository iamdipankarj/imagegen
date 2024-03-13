import Image from "next/image";
import Link from "next/link";
import { Wand } from "lucide-react";

export function Banner() {
  return (
    <div className="mt-4 flex flex-col lg:flex-row items-center">
      <div className="hero-copy w-full lg:w-2/3">
        <h1 className="font-[500] text-4xl lg:text-5xl xl:text-5xl text-[#1b1b1b]">
          Your personal AI Image Generator
        </h1>
        <p
          className="text-base lg:text-lg xl:text-lg my-5 lg:w-[88%] xl:w-[80%]"
          style={{ lineHeight: "175%" }}
        >
          Let AI design the perfect icon for your app. No more expensive
          time-consuming traditional app icon design.
        </p>
        <ul className="mb-8">
          <li className="my-2">
            ✍️ <Link href="/" className="link">Describe your image</Link>, get it in seconds
          </li>
          <li className="my-2">
            🏠 <Link href="/" className="link">Redesign your room</Link> instantly
          </li>
          <li className="my-2">
            🌇 <Link href="/" className="link">Upscale your photos</Link> in an easy way
          </li>
          <li className="my-2">
            📷 <Link href="/" className="link">Restore your memories</Link> from any old photograph
          </li>
        </ul>
        <div className="cursor-pointer w-fit" tabIndex={0}>
          <Link className="btn border-none btn-md bg-gradient-cta bg-[length:200%_200%] animate-shimmer rounded-badge shadow-lg gap-1 w-full text-xl" href="/text-to-image">
            <div className="blue-overlay" />
            <Wand className="hidden md:inline w-[18px] h-[18px]" />
            Create Now
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
