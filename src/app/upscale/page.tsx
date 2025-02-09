import { Metadata } from "next";
import { UpscaleDream } from "@/components/upscale-dream";
import { getMetaData } from "@/lib/seo";

export const metadata: Metadata = getMetaData({
  title: "Upscale Images | imagegen",
  description: "Upscale images with AI."
});

export default function UpscalePage() {
  return (
    <main className="app-main">
      <section className="container px-4 mx-auto">
        <UpscaleDream />
      </section>
    </main>
  )
}
