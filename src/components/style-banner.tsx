import Link from "next/link";
import Image from "next/image";

export function StyleBanner() {
  return (
    <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">
      <div className="flex-1 text-center md:text-left">
        <h2 className="font-bold text-4xl mb-4">
          Transform <span className="highlighted">any image</span> with just one image.
        </h2>
        <p className="text-[#555F68] dark:text-dark-200 mb-8">
          Optionally you can add more than one image. Having atleast 4 images will give you the best results.
        </p>
        <div>
          <Link href="/portrait" className="btn btn-success btn-lg">Try it now</Link>
        </div>
      </div>
      <div className="flex flex-1 lg:justify-end">
        <Image
          className="w-full"
          src="/portrait/style1.png"
          width={1054}
          height={760}
          alt="Example of style transfer"
        />
      </div>
    </div>
  )
}
