import { Metadata } from "next";
import { currentUser } from "@clerk/nextjs";
import { PayNowButton } from "@/components/pay-now";
import { PriceColumn } from "@/components/price-column";
import { PLUS_PRICE_ID, PRO_PRICE_ID, STARTER_PRICE_ID } from "@/lib/credits";
import { getMetaData } from "@/lib/seo";

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

  const userEmail = clerkUser.emailAddresses?.[0]?.emailAddress;

  function getStarterCheckoutLink(priceId: string): string {
    if (clerkUser) {
      return `https://photoworksai.lemonsqueezy.com/checkout/buy/a5bc9402-5aee-4e7c-bd61-1662ed373a68?checkout[custom][clerk_user_id]=${clerkUser.id}&checkout[custom][price_id]=${priceId}&checkout[custom][user_email]=${userEmail}`
    }
    return "#"
  }

  function getPlusCheckoutLink(priceId: string): string {
    if (clerkUser) {
      return `https://photoworksai.lemonsqueezy.com/checkout/buy/70258e49-d508-4e70-8689-bbcfddffb8f7?checkout[custom][clerk_user_id]=${clerkUser.id}&checkout[custom][price_id]=${priceId}&checkout[custom][user_email]=${userEmail}`
    }
    return "#"
  }

  function getProCheckoutLink(priceId: string): string {
    if (clerkUser) {
      return `https://photoworksai.lemonsqueezy.com/checkout/buy/b4ae4c3d-1eed-44a5-8820-83d24ce27c30?checkout[custom][clerk_user_id]=${clerkUser.id}&checkout[custom][price_id]=${priceId}&checkout[custom][user_email]=${userEmail}`
    }
    return "#"
  }

  return (
    <div className="relative flex flex-col md:flex-row items-center md:items-stretch gap-8 mx-auto my-16 sm:my-20 max-w-3xl">
      <span className="absolute -inset-6 bg-gradient-glow opacity-20 rounded-3xl blur-2xl scale-x-[-1] rotate-3" />
      <PriceColumn
        heading="20 Credits"
        price={5}
        lineItems={[
          "20 Image Generations",
          "Every Feature Available"
        ]}
      >
        <PayNowButton href={getStarterCheckoutLink(STARTER_PRICE_ID)} rel="nofollow" />
      </PriceColumn>
      <PriceColumn
        heading="50 Credits"
        price={9}
        lineItems={[
          "50 Image Generations",
          "Every Feature Available"
        ]}
      >
        <PayNowButton href={getPlusCheckoutLink(PLUS_PRICE_ID)} rel="nofollow" />
      </PriceColumn>
      <PriceColumn
        heading="100 Credits"
        price={14}
        lineItems={[
          "100 Image Generations",
          "Every Feature Available"
        ]}
      >
        <PayNowButton href={getProCheckoutLink(PRO_PRICE_ID)} rel="nofollow" />
      </PriceColumn>
    </div>
  )
}