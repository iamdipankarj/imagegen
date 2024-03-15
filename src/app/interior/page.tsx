import { Metadata } from "next";
import { getMetaData } from "@/lib/seo";
import { InteriorDream } from "@/components/interior-dream";

export const metadata: Metadata = getMetaData({
  title: "Interior Design | PhotoWorks.ai",
  description: "Create beautiful interior designs with AI"
});

export default function InteriorPage() {
  return (
    <main className="app-main">
      <section className="container px-4 mx-auto">
        <InteriorDream />
      </section>
    </main>
  )
}
