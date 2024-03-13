import { Dream } from "@/components/dream";

export default function UpscalePage() {
  return (
    <main className="app-main">
      <section className="container px-4 mx-auto">
        <Dream className="flex-1 flex flex-col items-center" model="upscale" />
      </section>
    </main>
  )
}
