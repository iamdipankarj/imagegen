import { Metadata } from "next";
import { getMetaData } from "@/lib/seo";

export const metadata: Metadata = getMetaData({
  title: "Restore Photos | PhotoWorks.ai",
  description: "Restore old photos with AI."
});

export default async function SupportPage() {
  return (
    <section id="support">
      <div className="bg-[#DFF2E9]">
        <div className="container mx-auto px-4 py-6">
          <h1 className="font-bold text-center">Help &amp; Support</h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-6 prose">
        <p>If you are facing any issues with the website, you can contact us:</p>
        <ul>
          <li>
            <p>By email: photoworkshq@gmail.com</p>
          </li>
        </ul>
      </div>
    </section>
  )
}
