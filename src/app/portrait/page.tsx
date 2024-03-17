import { Metadata } from "next";
import { getMetaData } from "@/lib/seo";
import { PortraitDream } from "@/components/portrait-dream";

export const metadata: Metadata = getMetaData({
  title: "Portrait Design | PhotoWorks.ai",
  description: "Create a portrait design with PhotoWorks.ai."
});

export default function PortraitPage() {
  return (
    <main className="app-main">
      <section className="container px-4 mx-auto">
        <PortraitDream />
      </section>
    </main>
  )
}
