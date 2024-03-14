import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getFormattedError } from "@/lib/errorHandler";
import { creditMap } from "@/lib/credits";

export const dynamic = 'force-dynamic'

const webhookSecret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET || ``;

export async function POST(req: Request, _: NextApiResponse) {
  try {
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
