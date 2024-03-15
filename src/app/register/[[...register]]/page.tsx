import { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";
import { getMetaData } from "@/lib/seo";

export const metadata: Metadata = getMetaData({
  title: "Register | PhotoWorks.ai",
  description: "Create beautiful interior designs with AI"
});
 
export default function Page() {
  return <SignUp />;
}
