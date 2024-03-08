import { PayNowButton } from "@/components/pay-now";
import { PriceColumn } from "@/components/price-column";

export default async function Pricing() {
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
        <form>
          <PayNowButton />
        </form>
      </PriceColumn>
      <PriceColumn
        heading="50 Credits"
        price={9}
        lineItems={[
          "50 Image Generations",
          "Every Feature Available"
        ]}
      >
        <form>
          <PayNowButton />
        </form>
      </PriceColumn>
      <PriceColumn
        heading="100 Credits"
        price={14}
        lineItems={[
          "100 Image Generations",
          "Every Feature Available"
        ]}
      >
        <form>
          <PayNowButton />
        </form>
      </PriceColumn>
    </div>
  )
}