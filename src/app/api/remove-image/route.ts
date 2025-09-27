import { NextResponse } from "next/server";
import { auth } from '@clerk/nextjs/server'
import { getFormattedError } from "@/lib/errorHandler";

export const maxDuration = 300;

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const { isAuthenticated } = await auth()

  if (!isAuthenticated) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  
  try {
    const body = await req.json()
    const { filePath } = body || {}
    const response = await fetch(`https://api.bytescale.com/v2/accounts/${process.env.BYTESCALE_ACCOUNT_ID}/files?filePath=${filePath}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${process.env.BYTESCALE_SECRET_KEY}`
      }
    })
    return NextResponse.json(
      { data: response.statusText },
      { status: 200 }
    )
  } catch (e) {
    return NextResponse.json(
      { data: getFormattedError(e) },
      { status: 400 }
    )
  }
}
