import { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";
import { getMetaData } from "@/lib/seo";

export const metadata: Metadata = getMetaData({
  title: "Register | imagegen",
  description: "Register for imagegen."
});
 
export default function Page() {
  return (
    <main className="app-main">
      <div className="container mx-auto px-4 flex items-center justify-center">
        <SignUp />
      </div>
    </main>
  )
}
