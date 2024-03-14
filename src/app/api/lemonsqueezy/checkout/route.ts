import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { getFormattedError } from "@/lib/errorHandler";

export const dynamic = 'force-dynamic'

export async function POST(req: Request, _: NextApiResponse) {
  console.log("Creating checkout...")
  
  try {
    const body = await req.json()
    const { clerkId, userEmail, credits } = body || {}
    const response = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
      method: "POST",
      body: JSON.stringify({
        data: {
          "type": "checkouts",
          "attributes": {
            "checkout_data": {
              "custom": {
                "clerkId": clerkId,
                "userEmail": userEmail,
                "credits": String(credits)
              }
            }
          },
          "relationships": {
            "store": {
              "data": {
                "type": "stores",
                "id": `${process.env.LEMONSQUEEZY_STORE_ID}`
              }
            },
            "variant": {
              "data": {
                "type": "variants",
                "id": "292506"
              }
            }
          }
        }
      }),
      headers: {
        "Accept": "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        "Authorization": `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`
      }
    })

    const jsonResponse = await response.json();

    return NextResponse.json(
      { ...jsonResponse },
      { status: 200 }
    )
  } catch (e) {
    console.log(e)
    return NextResponse.json(
      { data: getFormattedError(e) },
      { status: 400 }
    )
  }
}
