import { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";
import { getMetaData } from "@/lib/seo";

export const metadata: Metadata = getMetaData({
  title: "Login | PhotoWorks.ai",
  description: "Login to PhotoWorks.ai."
});
 
export default function Page() {
  return (
    <main className="app-main">
      <div className="container mx-auto px-4 flex items-center justify-center">
        <SignIn />
      </div>
    </main>
  )
}
