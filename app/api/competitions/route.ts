import { NextRequest, NextResponse } from "next/server";
import { competitions, filterCompetitions } from "@/lib/competitions";

export function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const results = filterCompetitions(competitions, {
    q: params.get("q") ?? undefined,
    category: params.get("category") ?? undefined,
    format: params.get("format") ?? undefined,
    skillLevel: params.get("skillLevel") ?? undefined,
    cost: params.get("cost") ?? undefined,
  });

  return NextResponse.json({
    count: results.length,
    total: competitions.length,
    competitions: results,
  });
}
