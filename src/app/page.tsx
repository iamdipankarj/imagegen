import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 space-y-2">
      <h1 className="font-semibold text-5xl text-tertiary">Coming Soon</h1>
      <button className="btn btn-success font-semibold">Click me</button>
    </main>
  );
}
