import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getFormattedError } from "@/lib/errorHandler";
import { creditMap } from "@/lib/credits";
// import crypto from 'crypto';

export const dynamic = 'force-dynamic'

export async function POST(req: Request, _: NextApiResponse) {
  try {
    // const text = await req.text();
    // const hmac = crypto.createHmac("sha256", process.env.LEMONSQUEEZY_WEBHOOK_SECRET!);
    // const digest = Buffer.from(hmac.update(text).digest("hex"), "utf8");
    // const signature = Buffer.from(req.headers.get("X-Signature") as string, "utf8");

    // if (!crypto.timingSafeEqual(digest, signature)) {
    //   console.log("Invalid Request Signature")
    //   return NextResponse.json(
    //     { data: "Invalid Request Signature" },
    //     { status: 400 }
    //   )
    // }
    
    const body = await req.json()

    if (body?.meta?.event_name === "order_created") {
      const priceId = body?.meta?.custom_data?.price_id;
      const userEmail = body?.meta?.custom_data?.user_email;
      const credits = creditMap[priceId];

      console.log("Updating credits for user", userEmail, "with", credits, "credits")

      await prisma.user.update({
        where: {
          email: userEmail
        },
        data: {
          credits: {
            increment: credits
          }
        }
      });
    }
    return NextResponse.json(
      { data: "Credits Updated" },
      { status: 200 }
    )
  } catch (e) {
    console.error(e)
    return NextResponse.json(
      { data: getFormattedError(e) },
      { status: 400 }
    )
  }
}
