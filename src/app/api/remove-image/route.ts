import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getFormattedError } from "@/lib/errorHandler";

export const maxDuration = 120;
export const dynamic = "force-dynamic";

const EXT_API = "https://app.summerofapps.com/api/photoworks/remove-image";

export async function DELETE(req: Request) {
  const { isAuthenticated } = await auth();
  if (!isAuthenticated) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { fileName } = await req.json().catch(() => ({} as any));

    if (!fileName || typeof fileName !== "string") {
      return NextResponse.json({ error: "Missing 'fileName'" }, { status: 400 });
    }

    const resp = await fetch(EXT_API, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${process.env.SOA_INTERNAL_KEY!}`,
      },
      body: JSON.stringify({ fileName }),
    });

    if (!resp.ok) {
      const t = await resp.text().catch(() => "");
      return NextResponse.json(
        { error: t || `External API ${resp.status}` },
        { status: resp.status }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { error: getFormattedError(e) },
      { status: 500 }
    );
  }
}
