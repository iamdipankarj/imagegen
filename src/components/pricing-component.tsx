"use client";

import { PayNowButton } from "@/components/pay-now";
import { PriceColumn } from "@/components/price-column";
import { PLUS_PRICE_ID, PRO_PRICE_ID, STARTER_PRICE_ID } from "@/lib/credits";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export function PricingComponent() {
  const { user: clerkUser } = useUser();
  const router = useRouter();

  const userEmail = clerkUser?.emailAddresses?.[0]?.emailAddress;

  const handleStarterLink = (e: any) => {
    if (clerkUser && userEmail) {
      router.push(`https://photoworksai.lemonsqueezy.com/buy/${process.env.NEXT_PUBLIC_LEMONSQUEEZY_STARTER_PRODUCT_ID}?checkout[custom][clerk_user_id]=${clerkUser.id}&checkout[custom][price_id]=${STARTER_PRICE_ID}&checkout[custom][user_email]=${userEmail}`);
    }
  }

  const handlePlusLink = (e: any) => {
    if (clerkUser && userEmail) {
      router.push(`https://photoworksai.lemonsqueezy.com/buy/${process.env.NEXT_PUBLIC_LEMONSQUEEZY_PLUS_PRODUCT_ID}?checkout[custom][clerk_user_id]=${clerkUser.id}&checkout[custom][price_id]=${PLUS_PRICE_ID}&checkout[custom][user_email]=${userEmail}`)
    }
  }

  const handleProLink = (e: any) => {
    if (clerkUser && userEmail) {
      router.push(`https://photoworksai.lemonsqueezy.com/buy/${process.env.NEXT_PUBLIC_LEMONSQUEEZY_PRO_PRODUCT_ID}?checkout[custom][clerk_user_id]=${clerkUser.id}&checkout[custom][price_id]=${PRO_PRICE_ID}&checkout[custom][user_email]=${userEmail}`)
    }
  }

  return (
    <>
      <span className="absolute -inset-6 bg-gradient-glow opacity-20 rounded-3xl blur-2xl scale-x-[-1] rotate-3" />
        <PriceColumn
          heading="20 Credits"
          price={5}
          lineItems={[
            "20 Image Generations",
            "Every Feature Available"
          ]}
        >
          <PayNowButton onClick={handleStarterLink} />
        </PriceColumn>
        <PriceColumn
          heading="50 Credits"
          price={9}
          lineItems={[
            "50 Image Generations",
            "Every Feature Available"
          ]}
        >
          <PayNowButton onClick={handlePlusLink} />
        </PriceColumn>
        <PriceColumn
          heading="100 Credits"
          price={14}
          lineItems={[
            "100 Image Generations",
            "Every Feature Available"
          ]}
        >
          <PayNowButton onClick={handleProLink} />
        </PriceColumn>
    </>
  )
}
