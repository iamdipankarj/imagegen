import { Metadata } from "next";
import { getMetaData } from "@/lib/seo";
// import { InteriorDream } from "@/components/interior-dream";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = getMetaData({
  title: "Interior Design | imagegen",
  description: "Create beautiful interior designs with AI"
});

export default function InteriorPage() {
  return (
    <main className="app-main">
      <section className="container px-4 mx-auto">
        <ComingSoon />
        {/* <InteriorDream /> */}
      </section>
    </main>
  )
}
