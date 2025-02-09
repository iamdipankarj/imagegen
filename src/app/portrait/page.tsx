import { Metadata } from "next";
import { getMetaData } from "@/lib/seo";
import { PortraitDream } from "@/components/portrait-dream";

export const metadata: Metadata = getMetaData({
  title: "Portrait Design | imagegen",
  description: "Create a portrait design with imagegen."
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
