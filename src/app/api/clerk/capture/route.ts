import { WebhookEvent } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { headers } from 'next/headers'
import { Webhook } from "svix";

export const dynamic = 'force-dynamic'

const prisma = new PrismaClient()

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

    console.log(JSON.stringify(payload, null, 2))

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

      if (emailAddress) {
        await prisma.user.upsert({
          where: { email: emailAddress },
          update: {},
          create: {
            email: emailAddress,
            name: fullName || null,
            clerkId: clerkUserId,
            credits: 5 // Default Credits
          }
        })
        return Response.json({
          message: "Received"
        }, {
          status: 200
        })
      } else {
        return Response.json({
          message: "No email address found"
        }, {
          status: 400
        });
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
