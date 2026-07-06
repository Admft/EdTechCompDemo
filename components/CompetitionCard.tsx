import type { Competition } from "@/lib/types";

const categoryStyles: Record<string, string> = {
  STEM: "bg-indigo-50 text-indigo-700 border-indigo-200",
  Coding: "bg-violet-50 text-violet-700 border-violet-200",
  Robotics: "bg-sky-50 text-sky-700 border-sky-200",
  Writing: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
  Art: "bg-pink-50 text-pink-700 border-pink-200",
  History: "bg-amber-50 text-amber-700 border-amber-200",
  Business: "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Civic Leadership": "bg-teal-50 text-teal-700 border-teal-200",
  Math: "bg-blue-50 text-blue-700 border-blue-200",
  "Local & Community": "bg-orange-50 text-orange-700 border-orange-200",
};

const formatLabels: Record<string, string> = {
  online: "🌐 Online",
  "in-person": "📍 In-person",
  hybrid: "🔀 Hybrid",
  unknown: "Format TBD",
};

const costLabels: Record<string, string> = {
  free: "Free",
  paid: "Paid",
  varies: "Cost varies",
  unknown: "Cost TBD",
};

/** Deterministic demo "match score" derived from the competition id. */
function matchScore(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return 84 + (hash % 15);
}

export default function CompetitionCard({
  competition,
  highlight = false,
}: {
  competition: Competition;
  highlight?: boolean;
}) {
  const c = competition;
  const scraped = c.provenance === "scraped+normalized";

  return (
    <article
      className={`card-light group relative flex h-full flex-col rounded-2xl p-6 ${
        highlight ? "ring-gradient-light" : ""
      }`}
    >
      {scraped && (
        <div className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
          Scraped + normalized from official source
        </div>
      )}

      <div className="mb-3 flex items-start justify-between gap-3">
        <span
          className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
            categoryStyles[c.category] ?? "bg-slate-50 text-slate-700 border-slate-200"
          }`}
        >
          {c.category}
        </span>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
            <path d="M10 1l2.6 5.9 6.4.6-4.8 4.3 1.4 6.2L10 14.8 4.4 18l1.4-6.2L1 7.5l6.4-.6L10 1z" />
          </svg>
          {matchScore(c.id)}% match
        </span>
      </div>

      <h3 className="font-display text-lg font-semibold leading-snug text-slate-900">
        {c.title}
      </h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">
        {c.description}
      </p>

      <dl className="mt-4 space-y-1.5 text-xs text-slate-600">
        <div className="flex gap-2">
          <dt className="shrink-0 font-medium text-slate-400">Eligibility</dt>
          <dd className="line-clamp-1">{c.eligibility}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="shrink-0 font-medium text-slate-400">Deadline</dt>
          <dd className="line-clamp-1 font-medium text-amber-600">{c.deadline}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="shrink-0 font-medium text-slate-400">Location</dt>
          <dd className="line-clamp-1">{c.location}</dd>
        </div>
      </dl>

      <div className="mt-4 flex flex-wrap gap-1.5">
        <span className="rounded-md border border-indigo-100 bg-[#f6f4fd] px-2 py-0.5 text-[11px] text-slate-600">
          {formatLabels[c.format]}
        </span>
        <span
          className={`rounded-md border px-2 py-0.5 text-[11px] ${
            c.cost === "free"
              ? "border-emerald-200 bg-emerald-50 font-medium text-emerald-700"
              : "border-indigo-100 bg-[#f6f4fd] text-slate-600"
          }`}
        >
          {costLabels[c.cost]}
        </span>
        <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] capitalize text-slate-600">
          {c.skillLevel.replace("-", " ")}
        </span>
      </div>

      <div className="mt-auto flex items-end justify-between gap-3 pt-5">
        <div className="flex flex-wrap gap-1">
          {c.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[11px] text-slate-400">
              #{tag.replace(/\s+/g, "")}
            </span>
          ))}
        </div>
        <a
          href={c.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-indigo-600 transition-colors hover:text-indigo-500"
        >
          Official site
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3 transition-transform group-hover:translate-x-0.5">
            <path
              fillRule="evenodd"
              d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>

      {c.featured && !scraped && (
        <span className="absolute -top-2.5 right-5 rounded-full border border-fuchsia-300 bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-indigo-300/60">
          Featured
        </span>
      )}
    </article>
  );
}
