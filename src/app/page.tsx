import { FileImage, Sparkles } from "lucide-react";
import { FeatureCard } from "@/components/feature-card";
import { Banner } from "@/components/banner";
import Link from "next/link";
import { Gallery } from "@/components/gallery";
import { SectionHeader } from "@/components/section-header";
import { StyleBanner } from "@/components/style-banner";

export default function Home() {
  return (
    <main className="app-main justify-start space-y-6 md:space-y-10">
      <section className="container px-4 mx-auto">
        <Banner />
      </section>
      {/* <section className="container px-4 mx-auto mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-fr">
          <FeatureCard
            heading="Portraits"
            iconClass="bg-model-purple"
            href="/portrait"
            icon={(
              <FileImage className="text-white" />
            )}>
            Create beautiful portraits with AI. Just upload a photo and hit Generate.
          </FeatureCard>
          <FeatureCard
            heading="Text to Image"
            iconClass="bg-model-yellow"
            href="/text-to-image"
            icon={(
              <Sparkles className="text-white" />
            )}>
            Create Awesome Images from Text. Just type in your text and hit Generate.
          </FeatureCard>
          <FeatureCard
            heading="Upscale Image"
            iconClass="bg-model-red"
            href="/upscale"
            icon={(
              <Sparkles className="text-white" />
            )}>
            Upscale your images. Upload a photo and hit Generate.
          </FeatureCard>
          <FeatureCard
            heading="Restore Photos"
            iconClass="bg-model-teal"
            href="/restore"
            icon={(
              <Sparkles className="text-white" />
            )}>
            Restore your old photos. Upload a photo and hit Generate.
          </FeatureCard>
        </div>
      </section> */}
      <section id="styles" className="py-10">
        <div className="container mx-auto px-4">
          <StyleBanner />
        </div>
      </section>
      <section id="examples" className="py-10">
        <div className="container mx-auto px-4">
          <SectionHeader className="mb-10">
            Generate <Link href="/text-to-image" className="highlighted">Text-to-Image</Link> using imagegen</SectionHeader>
          <Gallery />
        </div>
      </section>
      <section id="faq" className="mt">
        <div className="container mx-auto px-4">
          <SectionHeader>Frequently Asked Questions</SectionHeader>
          <div className="flex flex-col md:flex-row content-stretch justify-center box-border w-full gap-8 mt-10">
            <div className="flex-1 flex flex-col content-stretch justify-start gap-8">
              <div className="my-2">
                <h3 className="text-zinc-700 font-semibold text-md md:text-xl">
                  How long will the image generation take?
                </h3>
                <p className="mt-2 text-zinc-500 leading-7">
                  It highly varies depending in your inputs, number of renders, resolution and other parameters. Typically it takes 10-45 seconds.
                </p>
              </div>
              <div className="my-2">
                <h3 className="text-zinc-700 font-semibold text-md md:text-xl">
                  How many photos can I expect?
                </h3>
                <p className="mt-2 text-zinc-500 leading-7">
                  Some of the models generate multiple outputs. You can choose the number of renders you want to generate.
                </p>
              </div>
            </div>
            <div className="flex-1 flex flex-col content-stretch justify-start gap-8">
              <div className="my-2">
                <h3 className="text-zinc-700 font-semibold text-md md:text-xl">
                  Is there watermark on the generated images?
                </h3>
                <p className="mt-2 text-zinc-500 leading-7">
                  No, there is no watermark on the generated images. You can use them as you wish. We strongly believe your imagination is uniquely yours and should not be watermarked.
                </p>
              </div>
              <div className="my-2">
                <h3 className="text-zinc-700 font-semibold text-md md:text-xl">
                  Can I use my photos anywhere?
                </h3>
                <p className="mt-2 text-zinc-500 leading-7">
                  Absolutely, you can use those photos any way you wish, both for personal use and commercial use.
                </p>
              </div>
              <div className="my-2">
                <h3 className="text-zinc-700 font-semibold text-md md:text-xl">
                  Is Attribution required?
                </h3>
                <p className="mt-2 text-zinc-500 leading-7">
                  Not at all. You can use the generated images without any attribution. But a shoutout to us would be appreciated.
                </p>
              </div>
              <div className="my-2">
                <h3 className="text-zinc-700 font-semibold text-md md:text-xl">Can I get an invoice?</h3>
                <p className="mt-2 text-zinc-500 leading-7">
                  Yes, an invoice for your purchase can be provided. You should be able to generate an invoice by yourself through the purchase confirmation email. If it doesn&apos;t, shoot us an email
                  at <a className="link underline-offset-2 underline font-semibold" href="mailto:photoworkshq@gmail.com">photoworkshq@gmail.com</a>, and we will send the invoice asap.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
