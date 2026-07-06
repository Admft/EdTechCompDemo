import { NextResponse } from "next/server";
import { scrapeIsef, ALLOWED_SOURCE } from "@/lib/scraper";

// The scraper takes no input: it only ever fetches the single
// allowlisted official source defined in lib/scraper.ts.
export async function POST() {
  try {
    const result = await scrapeIsef();
    return NextResponse.json(
      { source: ALLOWED_SOURCE, ...result },
      { status: result.ok ? 200 : 502 }
    );
  } catch {
    return NextResponse.json(
      {
        source: ALLOWED_SOURCE,
        ok: false,
        error:
          "Unexpected scraper error. Seed data for ISEF is still available in the discovery index.",
      },
      { status: 500 }
    );
  }
}
