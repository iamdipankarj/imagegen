import { Metadata } from "next";
import { getMetaData } from "@/lib/seo";
import { TextToImage } from "@/components/text-to-image";

export const metadata: Metadata = getMetaData({
  title: "Text to Image | imagegen",
  description: "Create beautiful images from text with AI."
});

export default function TextToImagePage() {
  return (
    <main className="app-main justify-start">
      <section className="container px-4 mx-auto">
        <TextToImage />
      </section>
    </main>
  )
}
