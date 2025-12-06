import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getFormattedError } from "@/lib/errorHandler";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@/lib/r2";

export const maxDuration = 300;
export const dynamic = "force-dynamic";

const BUCKET_NAME = process.env.R2_BUCKET_NAME!;

export async function POST(req: Request) {
  const { isAuthenticated, userId } = await auth();
  if (!isAuthenticated || !userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await req.json().catch(() => null) as { key?: string } | null;

    if (!body || !body.key) {
      return NextResponse.json(
        { error: "Missing 'key' in request body" },
        { status: 400 }
      );
    }

    const { key } = body;

    const userPrefix = `uploads/${userId}/`;
    if (!key.startsWith(userPrefix)) {
      return NextResponse.json(
        { error: "You are not allowed to delete this object" },
        { status: 403 }
      );
    }

    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    await s3Client.send(command);

    return NextResponse.json({
      success: true,
      key,
      bucket: BUCKET_NAME,
    });
  } catch (e) {
    return NextResponse.json(
      { error: getFormattedError(e) },
      { status: 500 }
    );
  }
}
