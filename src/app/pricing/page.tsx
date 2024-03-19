import { Metadata } from "next";
import { currentUser } from "@clerk/nextjs";
import { getMetaData } from "@/lib/seo";
import { PricingComponent } from "@/components/pricing-component";

export const metadata: Metadata = getMetaData({
  title: "Pricing | PhotoWorks.ai",
  description: "Get credits to use PhotoWorks.ai."
});

export default async function Pricing() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 mx-auto my-16 sm:my-20 max-w-3xl">
        <h1 className="text-3xl font-bold text-center">Pricing</h1>
        <p className="text-center">Please sign in to purchase credits.</p>
      </div>
    )
  }

  return (
    <div className="relative flex flex-col md:flex-row items-center md:items-stretch gap-8 mx-auto my-16 sm:my-20 max-w-3xl">
      <PricingComponent />
    </div>
  )
}