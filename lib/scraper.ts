import * as cheerio from "cheerio";
import type { Competition, FieldMapping, ScrapeResult } from "./types";

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

  // Only keep headings that look competition-related — the page also
  // carries navigation and volunteer/outreach headings we don't want.
  const RELEVANT_HEADING = /award|final|fair|competition|student|regeneron|isef|judg|project|winner/i;
  const headings: string[] = [];
  $("h1, h2, h3").each((_, el) => {
    const text = $(el).text().replace(/\s+/g, " ").trim();
    if (
      text &&
      text.length <= 120 &&
      RELEVANT_HEADING.test(text) &&
      !headings.includes(text)
    ) {
      headings.push(text);
    }
  });

  const bodyText = $("body").text().replace(/\s+/g, " ").toLowerCase();

  const extracted = {
    pageTitle,
    metaDescription,
    headings: headings.slice(0, 5),
    sourceUrl: ALLOWED_SOURCE.url,
    sourceName: ALLOWED_SOURCE.name,
  };

  const { competition, fieldMap } = normalizeIsef(extracted, bodyText);

  return {
    ok: true,
    extracted,
    competition,
    fieldMap,
    note: "Scraped + normalized from official source",
  };
}

/**
 * Normalization layer: turns raw page signals into a well-formed
 * Competition, and records per-field provenance — extracted straight
 * from the page, detected via keywords on the page, or curated from
 * the approved-source profile when the page doesn't expose the field.
 */
function normalizeIsef(
  extracted: {
    pageTitle: string;
    metaDescription: string | null;
    headings: string[];
    sourceUrl: string;
    sourceName: string;
  },
  bodyText: string
): { competition: Competition; fieldMap: FieldMapping[] } {
  const fieldMap: FieldMapping[] = [];

  const cleanedTitle = extracted.pageTitle.replace(/\s*[-|–]\s*Society for Science\s*$/i, "");
  const titleMatched = /science and engineering fair|isef/i.test(cleanedTitle);
  const title = titleMatched
    ? "Regeneron International Science and Engineering Fair (ISEF)"
    : cleanedTitle;
  fieldMap.push({
    field: "title",
    value: title,
    source: "extracted",
    note: titleMatched
      ? "From the page <title> tag, matched to the known competition name"
      : "From the page <title> tag",
  });

  const description =
    extracted.metaDescription ??
    "The world's largest global pre-college science competition, where students present independent research and compete for millions in awards.";
  fieldMap.push({
    field: "description",
    value: description,
    source: extracted.metaDescription ? "extracted" : "curated",
    note: extracted.metaDescription
      ? "From the page's meta description"
      : "Page has no meta description — official description on file",
  });

  const stemDetected = bodyText.includes("science") && bodyText.includes("engineering");
  fieldMap.push({
    field: "category",
    value: "STEM",
    source: stemDetected ? "detected" : "curated",
    note: stemDetected
      ? "Keywords “science” and “engineering” found on the page"
      : "From the approved-source profile",
  });

  const eligibilityDetected = /high school|grades? 9|pre-college|9th grade/.test(bodyText);
  fieldMap.push({
    field: "eligibility",
    value: "High school students (grades 9–12) who qualify via an affiliated fair",
    source: eligibilityDetected ? "detected" : "curated",
    note: eligibilityDetected
      ? "“High school” / “pre-college” language found on the page"
      : "From the approved-source profile",
  });

  fieldMap.push(
    {
      field: "deadline",
      value: "Varies by regional affiliate fair",
      source: "curated",
      note: "Deadlines live on regional affiliate pages — tracked per region",
    },
    {
      field: "format",
      value: "in-person",
      source: "curated",
      note: "From the approved-source profile",
    },
    {
      field: "cost",
      value: "free",
      source: "curated",
      note: "From the approved-source profile",
    },
    {
      field: "skill level",
      value: "advanced",
      source: "curated",
      note: "From the approved-source profile",
    }
  );

  const competition: Competition = {
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

  return { competition, fieldMap };
}
