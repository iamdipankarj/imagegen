import { getMetaData } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = getMetaData({
  title: "Terms of Service | imagegen",
  description: "Terms of Service for imagegen."
});

export default async function TermsOfServicePage() {
  return (
    <section id="tos">
      <div className="bg-[#DFF2E9]">
        <div className="container mx-auto px-4 py-6">
          <h1 className="font-bold text-center">Terms of Service</h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-6 prose">
        <h2>1. Introduction</h2>
        <p>By using imagegen, you confirm your acceptance of, and agree to be bound by, these terms and conditions.</p>

        <h2>2. Agreement to Terms and Conditions</h2>
        <p>This Agreement takes effect on the date on which you first use the imagegen application.</p>

        <h2>3. Unlimited Access Software License with Termination Rights</h2>
        <p>The imagegen Software License facilitates the acquisition of imagegen software through a single purchase, granting users unrestricted and perpetual access to its comprehensive functionalities. Tailored for interior designers, decorators, and homeowners, imagegen empowers users to generate AI-based photo suggestions based on their inputs.</p>
        <p>This license entails a straightforward and flexible arrangement, exempting users from recurring fees or subscriptions. However, it is important to acknowledge that the licensor retains the right to terminate the license without conditions or prerequisites. This termination provision enables the licensor to exercise control over software distribution and utilization.</p>
        <p>Opting for the imagegen Software License enables users to enjoy the benefits of the software while recognizing the licensor&apos;s unrestricted termination rights, which provide adaptability and address potential unforeseen circumstances.</p>

        <h2>4. Refunds</h2>
        <p>Due to the nature of digital products, the imagegen software cannot be refunded or exchanged once access is granted.</p>

        <h2>5. Disclaimer</h2>
        <p>It is not warranted that imagegen will meet your requirements or that its operation will be uninterrupted or error-free. All express and implied warranties or conditions not stated in this Agreement (including without limitation, loss of profits, loss or corruption of data, business interruption, or loss of contracts), so far as such exclusion or disclaimer is permitted under the applicable law, are excluded and expressly disclaimed. This Agreement does not affect your statutory rights.</p>

        <h2>6. Warranties and Limitation of Liability</h2>
        <p>imagegen does not give any warranty, guarantee, or other term as to the quality, fitness for purpose, or otherwise of the software. imagegen shall not be liable to you by reason of any representation (unless fraudulent), or any implied warranty, condition, or other term, or any duty at common law, for any loss of profit or any indirect, special, or consequential loss, damage, costs, expenses, or other claims (whether caused by imagegen&apos;s negligence or the negligence of its servants or agents or otherwise) which arise out of or in connection with the provision of any goods or services by imagegen. imagegen shall not be liable or deemed to be in breach of contract by reason of any delay in performing, or failure to perform, any of its obligations if the delay or failure was due to any cause beyond its reasonable control. Notwithstanding contrary clauses in this Agreement, in the event that imagegen is deemed liable to you for breach of this Agreement, you agree that imagegen&apos;s liability is limited to the amount actually paid by you for your services or software, which amount is calculated in reliance upon this clause. You hereby release imagegen from any and all obligations, liabilities, and claims in excess of this limitation.</p>

        <h2>7. Responsibilities</h2>
        <p>imagegen is not responsible for how the user uses the AI-generated interior design suggestions.</p>

        <h2>8. General Terms and Law</h2>
        <p>This Agreement is governed by the laws of India. You acknowledge that no joint venture, partnership, employment, or agency relationship exists between you and imagegen as a result of your use of these services. You agree not to hold yourself out as a representative, agent, or employee of imagegen. You agree that imagegen will not be liable by reason of any representation, act, or omission to act by you.</p>

        <h2>9. Contact Us</h2>
        <p>If you have any questions or concerns about these Terms or our services, please contact us at <a href="mailto:photoworkshq@gmail.com" className="link link-primary">photoworkshq@gmail.com</a>.</p>
      </div>
    </section>
  )
}
