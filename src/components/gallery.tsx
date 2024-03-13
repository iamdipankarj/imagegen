import Image from "next/image";

const imageList = [
  "/interiors/1.png",
  "/interiors/2.png",
  "/interiors/3.png",
  "/interiors/4.png",
  "/interiors/5.png",
  "/interiors/6.png",
  "/interiors/7.png",
  "/interiors/8.png",
  "/interiors/9.png",
  "/interiors/10.png",
  "/interiors/11.png",
  "/interiors/12.png"
]

export function Gallery() {
  return (
    <div className="flex flex-col lg:flex-row items-center">
      <ul role="list" className="max-w-7xl mx-auto md:columns-2 lg:columns-3 xl:columns-4 space-y-4 md:space-y-6 md:gap-6">
        {imageList.map((image, index) => (
          <li key={index} className="break-inside-avoid max-md:flex justify-center overflow-hidden rounded-xl">
            <div className="max-w-[550px] border border-base-content/20 rounded-xl">
              <Image
                src={image}
                width={300}
                height={200}
                alt="PhotoWorks.ai"
                className="w-full h-[auto]"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
