// app/api/og-png/[memoryId]/route.ts
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  { params }: { params: { memoryId: string } }
) {
  try {
    const { memoryId } = params;

    const origin = req.nextUrl.origin;

    // ✅ PANGGIL OG HOME YANG SUDAH PNG
    const res = await fetch(
      `${origin}/api/og-home?memoryId=${memoryId}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch OG PNG source" },
        { status: 404 }
      );
    }

    const arrayBuffer = await res.arrayBuffer();

    // ✅ LANGSUNG KIRIM PNG TANPA SHARP
    return new NextResponse(new Uint8Array(arrayBuffer), {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err) {
    console.error("OG PNG proxy failed:", err);

    return NextResponse.json(
      { error: "OG PNG generation failed" },
      { status: 500 }
    );
  }
}
