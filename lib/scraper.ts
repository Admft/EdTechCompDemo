import * as cheerio from "cheerio";
import type { Competition, ScrapeResult } from "./types";

/**
 * Single allowlisted source. The scraper never accepts user-supplied URLs —
 * it only fetches this official, public page.
 */
export const ALLOWED_SOURCE = {
  url: "https://www.societyforscience.org/isef/",
  name: "Society for Science",
} as const;

const FETCH_TIMEOUT_MS = 10_000;

/**
 * Fetches the allowlisted ISEF page, extracts lightweight signals
 * (title, meta description, headings), and normalizes them into one
 * Competition record. Missing fields are filled from a safe normalization
 * layer and the result is clearly labeled as scraped + normalized.
 */
export async function scrapeIsef(): Promise<ScrapeResult> {
  let html: string;
  try {
    const res = await fetch(ALLOWED_SOURCE.url, {
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      headers: {
        "User-Agent": "EshipDemoBot/0.1 (+ed-tech demo; respects robots.txt)",
        Accept: "text/html",
      },
      // Always fetch fresh for the live demo.
      cache: "no-store",
    });
    if (!res.ok) {
      return {
        ok: false,
        error: `Source responded with HTTP ${res.status}. Seed data for ISEF is still available in the discovery index.`,
      };
    }
    html = await res.text();
  } catch {
    return {
      ok: false,
      error:
        "Could not reach the source page (network error or timeout). Seed data for ISEF is still available in the discovery index.",
    };
  }

  const $ = cheerio.load(html);

  const pageTitle = $("title").first().text().trim() || "Regeneron ISEF";
  const metaDescription =
    $('meta[name="description"]').attr("content")?.trim() ||
    $('meta[property="og:description"]').attr("content")?.trim() ||
    null;

  const headings: string[] = [];
  $("h1, h2, h3").each((_, el) => {
    const text = $(el).text().replace(/\s+/g, " ").trim();
    if (text && text.length <= 120 && !headings.includes(text)) {
      headings.push(text);
    }
  });

  const extracted = {
    pageTitle,
    metaDescription,
    headings: headings.slice(0, 6),
    sourceUrl: ALLOWED_SOURCE.url,
    sourceName: ALLOWED_SOURCE.name,
  };

  return {
    ok: true,
    extracted,
    competition: normalizeIsef(extracted),
    note: "Scraped + normalized from official source",
  };
}

/**
 * Normalization layer: turns raw page signals into a well-formed
 * Competition. Fields the page doesn't reliably expose (category,
 * eligibility, format, skill level, cost) come from curated defaults
 * for this known source.
 */
function normalizeIsef(extracted: {
  pageTitle: string;
  metaDescription: string | null;
  headings: string[];
  sourceUrl: string;
  sourceName: string;
}): Competition {
  const title = extracted.pageTitle.includes("ISEF")
    ? "Regeneron International Science and Engineering Fair (ISEF)"
    : extracted.pageTitle;

  const description =
    extracted.metaDescription ??
    "The world's largest global pre-college science competition, where students present independent research and compete for millions in awards.";

  return {
    id: "regeneron-isef-scraped",
    title,
    category: "STEM",
    description,
    eligibility: "High school students (grades 9–12) who qualify via an affiliated fair",
    deadline: "Varies by regional affiliate fair",
    format: "in-person",
    location: "Rotating US host city (international qualifiers)",
    cost: "free",
    skillLevel: "advanced",
    tags: ["science fair", "research", "scraped", "official source"],
    officialUrl: extracted.sourceUrl,
    sourceName: extracted.sourceName,
    featured: true,
    provenance: "scraped+normalized",
  };
}
