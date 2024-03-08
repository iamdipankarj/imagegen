import { Dream } from "@/components/dream";

export default function RestorePage() {
  return (
    <main className="app-main">
      <section className="container px-4 mx-auto">
        <Dream className="flex-1 flex flex-col items-center" model="restore" />
      </section>
    </main>
  )
}
