import { Metadata } from "next";
import { RestoreDream } from "@/components/restore-dream";
import { getMetaData } from "@/lib/seo";

export const metadata: Metadata = getMetaData({
  title: "Restore Photos | imagegen",
  description: "Restore old photos with AI."
});

export default function RestorePage() {
  return (
    <main className="app-main">
      <section className="container px-4 mx-auto">
        <RestoreDream />
      </section>
    </main>
  )
}
