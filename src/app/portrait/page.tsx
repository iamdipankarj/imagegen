import { Metadata } from "next";
import { getMetaData } from "@/lib/seo";
import { PortraitDream } from "@/components/portrait-dream";

export const metadata: Metadata = getMetaData({
  title: "Interior Design | PhotoWorks.ai",
  description: "Create beautiful interior designs with AI"
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
