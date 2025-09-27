import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getFormattedError } from "@/lib/errorHandler";

export const maxDuration = 300;
export const dynamic = "force-dynamic";

const FIELD_NAME = "file";
const EXT_API = "https://app.summerofapps.com/api/photoworks/upload-image";

/**
 * Accepts exactly ONE file under FIELD_NAME, forwards to external API,
 * and returns a normalized JSON: { url: string }
 */
export async function POST(req: Request) {
  const { isAuthenticated } = await auth();
  if (!isAuthenticated) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    // Parse incoming multipart/form-data
    const formData = await req.formData();

    // Narrow (string | File)[] -> File[]
    const entries = formData.getAll(FIELD_NAME);
    const files = entries.filter((v): v is File => v instanceof File);

    if (files.length === 0) {
      return NextResponse.json({ error: `Missing '${FIELD_NAME}'` }, { status: 400 });
    }
    if (files.length > 1) {
      return NextResponse.json({ error: `Only one '${FIELD_NAME}' allowed` }, { status: 400 });
    }

    // The single file
    const file = files[0];
    const filename = file.name || "upload";
    const arrayBuf = await file.arrayBuffer();
    const fileLike = new File([arrayBuf], filename, {
      type: file.type || "application/octet-stream",
    });

    // Forward to SummerOfApps single-file endpoint
    const externalForm = new FormData();
    externalForm.append(FIELD_NAME, fileLike, filename);

    const resp = await fetch(EXT_API, {
      method: "POST",
      headers: {
        Authorization: `Basic ${process.env.SOA_INTERNAL_KEY!}`
      },
      body: externalForm,
    });

    if (!resp.ok) {
      const errText = await resp.text().catch(() => "");
      return NextResponse.json(
        { error: errText || `External API ${resp.status}` },
        { status: resp.status },
      );
    }

    const data = await resp.json().catch(() => ({} as any));
    const url: string | undefined = data?.publicUrl;
    const fileName: string | undefined = data?.fileName;
    if (!url) {
      return NextResponse.json({ error: "External API did not return a URL" }, { status: 502 });
    }

    return NextResponse.json({ url, fileName }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: getFormattedError(e) }, { status: 500 });
  }
}
