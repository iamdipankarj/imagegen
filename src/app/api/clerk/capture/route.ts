import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from 'next/headers'
import { Webhook } from "svix";

export const maxDuration = 300;

export const dynamic = 'force-dynamic'

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || ``;

async function validateRequest(request: Request) {
  const payloadString = await request.text();
  const headerPayload = headers();

  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id")!,
    "svix-timestamp": headerPayload.get("svix-timestamp")!,
    "svix-signature": headerPayload.get("svix-signature")!,
  };
  const wh = new Webhook(webhookSecret);
  return wh.verify(payloadString, svixHeaders) as WebhookEvent;
}

export async function POST(request: Request) {
  try {
    const payload = await validateRequest(request);

    if (payload.type === 'user.created') {
      const parsedPayload = payload.data as any;
      const emailAddress = parsedPayload?.email_addresses?.[0]?.email_address
      const firstName = parsedPayload?.first_name || ''
      const lastName = parsedPayload?.last_name || ''
      const clerkUserId = parsedPayload?.id || ''
  
      let fullName: string | null = null
      if (firstName && lastName) {
        fullName = `${firstName} ${lastName}`
      } else if (firstName && !lastName) {
        fullName = firstName
      } else if (!firstName && lastName) {
        fullName = lastName
      } else {
        fullName = null
      }
    } else {
      return Response.json({
        message: "Event not subscribed, ignoring."
      }, {
        status: 418
      });
    }
  } catch (error) {
    return Response.json({
      message: "Failed to add user to supabase from clerk"
    }, {
      status: 400
    });
  }
}
