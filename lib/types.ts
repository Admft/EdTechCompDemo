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

export interface ScrapeResult {
  ok: boolean;
  competition?: Competition;
  /** Raw signals extracted from the page before normalization. */
  extracted?: {
    pageTitle: string;
    metaDescription: string | null;
    headings: string[];
    sourceUrl: string;
    sourceName: string;
  };
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
