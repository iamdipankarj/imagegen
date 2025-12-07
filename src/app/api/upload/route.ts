import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { v7 as uuidv7 } from "uuid";
import { getFormattedError } from "@/lib/errorHandler";
import {
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "@/lib/r2";

export const maxDuration = 300;
export const dynamic = "force-dynamic";

const FIELD_NAME = "file";
const BUCKET_NAME = process.env.R2_BUCKET_NAME!;
const SIGNED_URL_EXPIRES_IN_SEC = 60 * 15; // 15 minutes

export async function POST(req: Request) {
  const { isAuthenticated, userId } = await auth();
  if (!isAuthenticated || !userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const formData = await req.formData();

    const entries = formData.getAll(FIELD_NAME);
    const files = entries.filter((v): v is File => v instanceof File);

    if (files.length === 0) {
      return NextResponse.json(
        { error: `Missing '${FIELD_NAME}'` },
        { status: 400 }
      );
    }

    if (files.length > 1) {
      return NextResponse.json(
        { error: `Only one '${FIELD_NAME}' allowed` },
        { status: 400 }
      );
    }

    const file = files[0];

    const originalName = file.name || `upload_${uuidv7()}`;
    const ext = originalName.includes(".")
      ? originalName.split(".").pop()
      : undefined;

    const key = [
      "uploads",
      userId,
      `${uuidv7()}${ext ? `.${ext}` : ""}`,
    ].join("/");

    const contentType = file.type || "application/octet-stream";

    const arrayBuffer = await file.arrayBuffer();
    const body = Buffer.from(arrayBuffer);

    const putCommand = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: body,
      ContentType: contentType,
    });

    await s3Client.send(putCommand);

    const getCommand = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    const signedUrl = await getSignedUrl(s3Client, getCommand, {
      expiresIn: SIGNED_URL_EXPIRES_IN_SEC,
    });

    return NextResponse.json({
      success: true,
      key,
      bucket: BUCKET_NAME,
      signedUrl,
      expiresIn: SIGNED_URL_EXPIRES_IN_SEC,
      contentType,
    });
  } catch (e) {
    return NextResponse.json(
      { error: getFormattedError(e) },
      { status: 500 }
    );
  }
}
