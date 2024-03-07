import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { currentUser, auth } from "@clerk/nextjs";
import prisma from "@/lib/db";
import { getFormattedError } from "@/lib/errorHandler";

export const dynamic = 'force-dynamic'

export async function GET(req: Request, _: NextApiResponse) {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  
  try {
    const clerkUser = await currentUser();
    const userEmail = clerkUser?.emailAddresses[0]?.emailAddress;

    if (!userEmail) {
      return new NextResponse("Email not found", { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
      select: {
        credits: true,
      },
    });
    return NextResponse.json({
      revalidated: true,
      credits: user?.credits || 0
    }, { status: 200 });
  } catch (e) {
    return NextResponse.json({
      revalidated: false,
      message: getFormattedError(e)
    }, { status: 400 });
  }
}
