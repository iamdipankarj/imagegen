import { FeatureCard } from "@/components/feature-card";
import { Armchair, Sparkle, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col flex-1 items-stretch justify-center space-y-2">
      <section className="container px-4 mx-auto">
        <h1 className="text-5xl text-center my-10">What do you want to create today?</h1>
        <div className="grid grid-cols-2 gap-4 auto-rows-fr">
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
    </main>
  );
}
