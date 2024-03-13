import { Accordion } from "@/components/accordion";
import { FeatureCard } from "@/components/feature-card";
import { Armchair, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="app-main justify-start">
      <section className="container px-4 mx-auto">
        <h1 className="text-5xl text-center mb-10">What do you want to create today?</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-fr">
          <FeatureCard
            heading="Interior Design"
            iconClass="bg-model-purple"
            href="/interior"
            icon={(
              <Armchair className="text-white" />
            )}>
            Redesign your interior instantly. Upload a Photo, select a style and hit Generate.
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
      </section>
      <section id="faq" className="mt-20">
        <div className="container mx-auto px-4">
          <h3 className="text-center relative mx-auto before:content-[''] before:absolute before:h-px before:z-[-1] before:top-2/4 before:inset-x-0 before:bg-gradient-section">
            <span className="px-3 w-max bg-white font-semibold text-xl md:text-2xl">Frequently Asked Questions</span>
          </h3>
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
                  Some of the models generate multiple outputs. You can choose the number of renders you want to generate. However, each time you hit Generate, you will get a different output and <strong>1 Credit</strong> will be consumed.
                </p>
              </div>
              <div className="my-2">
                <h3 className="text-zinc-700 font-semibold text-md md:text-xl">
                  What happens if there is an error while generating an image?
                </h3>
                <p className="mt-2 text-zinc-500 leading-7">
                  If our servers encounter any error, your credits will not be consumed. You shall be able to try again. In case you face any issue, feel free to reach out to us at <a className="font-semibold underline-offset-2 underline" href="mailto:photoworkshq@gmail.com">photoworkshq@gmail.com</a>.
                </p>
              </div>
              <div className="my-2">
                <h3 className="text-zinc-700 font-semibold text-md md:text-xl">Is payment secure?</h3>
                <p className="mt-2 text-zinc-500 leading-7">
                  Yes, our transactions are processed through Lemon Squeezy. We do not
                  store any of your credit card information.
                </p>
              </div>
            </div>
            <div className="flex-1 flex flex-col content-stretch justify-start gap-8">
              <div className="my-2">
                <h3 className="text-zinc-700 font-semibold text-md md:text-xl">
                  What do you do with my photos?
                </h3>
                <p className="mt-2 text-zinc-500 leading-7">
                  We train our AI model with your input photo, and this model stored very securely. The photos will be used ONLY for training the model.
                </p>
              </div>
              <div className="my-2">
                <h3 className="text-zinc-700 font-semibold text-md md:text-xl">
                  Can I use my photos anywhere?
                </h3>
                <p className="mt-2 text-zinc-500 leading-7">
                  Absolutely, you can use those photos any way you wish, for personal use and commercial use both.
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
                  Yes, an invoice for your purchase can be provided. Shoot us an email
                  at photoworkshq@gmail.com, and we will send the invoice asap.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
