export type CompetitionFormat = "online" | "in-person" | "hybrid" | "unknown";
export type CompetitionCost = "free" | "paid" | "varies" | "unknown";
export type SkillLevel = "beginner" | "intermediate" | "advanced" | "all-levels";

export type CompetitionCategory =
  | "STEM"
  | "Coding"
  | "Robotics"
  | "Writing"
  | "Art"
  | "History"
  | "Business"
  | "Civic Leadership"
  | "Math"
  | "Local & Community";

export interface Competition {
  id: string;
  title: string;
  category: CompetitionCategory;
  description: string;
  eligibility: string;
  deadline: string;
  format: CompetitionFormat;
  location: string;
  cost: CompetitionCost;
  skillLevel: SkillLevel;
  tags: string[];
  officialUrl: string;
  sourceName: string;
  featured: boolean;
  /** Present when the record came from the live scraper pipeline. */
  provenance?: "seed" | "scraped+normalized";
}

/**
 * Explains how one field of the normalized Competition was produced:
 * pulled straight off the page, inferred from keywords found on the
 * page, or filled from the curated profile for this approved source.
 */
export interface FieldMapping {
  field: string;
  value: string;
  source: "extracted" | "detected" | "curated";
  note: string;
}

export interface ScrapeResult {
  ok: boolean;
  competition?: Competition;
  /** Raw signals extracted from the page before normalization. */
  extracted?: {
    pageTitle: string;
    metaDescription: string | null;
    /** Headings that matched competition-related keywords. */
    headings: string[];
    sourceUrl: string;
    sourceName: string;
  };
  /** Per-field provenance for the normalized competition. */
  fieldMap?: FieldMapping[];
  note?: string;
  error?: string;
}

export interface CompetitionQuery {
  q?: string;
  category?: string;
  format?: string;
  skillLevel?: string;
  cost?: string;
}
