import { getMetaData } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = getMetaData({
  title: "Refund Policy | PhotoWorks.ai",
  description: "Refund Policy for PhotoWorks.ai."
});

export default async function RefundPolicyPage() {
  return (
    <section id="refund">
      <div className="bg-[#DFF2E9]">
        <div className="container mx-auto px-4 py-6">
          <h1 className="font-bold text-center">Refund Policy</h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-6 prose">
        <p><strong>Last updated</strong>: February 27, 2024</p>
        <p>At photoworks.ai, we are committed to providing a unique and innovative experience through our AI-generated images. We understand that AI, while powerful and revolutionary, isn&apos;t perfect and may not always produce the results you expect. We want you to be fully aware of this inherent risk before making any purchases.</p>
        <p>We strongly recommend exploring our examples page before any purchase. You can see some of the generated images using this platform which could help you understand the possibilities and limitations of AI art, and will hopefully guide your expectations. We believe in transparency and want you to make an informed decision about our unique service.</p>
        <p>Your understanding and support mean a lot to us. As we continue to improve and enhance our AI, we hope you will join us in this amazing journey of digital creativity.</p>
        <p>If you have any questions about this Refund Policy, You can contact us:</p>
        <ul>
          <li>
            <p>By email: <a href="mailto:photoworkshq@gmail.com">photoworkshq@gmail.com</a></p>
          </li>
          <li>
            <p>By visiting this page on our website: <a href="https://photoworks.ai/refund-policy" rel="external nofollow noopener" target="_blank">https://photoworks.ai/refund-policy</a>
            </p>
          </li>
        </ul>
      </div>
    </section>
  )
}
