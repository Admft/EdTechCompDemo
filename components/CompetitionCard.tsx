import type { Competition } from "@/lib/types";

const categoryStyles: Record<string, string> = {
  STEM: "bg-indigo-500/15 text-indigo-300 border-indigo-400/30",
  Coding: "bg-violet-500/15 text-violet-300 border-violet-400/30",
  Robotics: "bg-sky-500/15 text-sky-300 border-sky-400/30",
  Writing: "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-400/30",
  Art: "bg-pink-500/15 text-pink-300 border-pink-400/30",
  History: "bg-amber-500/15 text-amber-300 border-amber-400/30",
  Business: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
  "Civic Leadership": "bg-teal-500/15 text-teal-300 border-teal-400/30",
  Math: "bg-blue-500/15 text-blue-300 border-blue-400/30",
  "Local & Community": "bg-orange-500/15 text-orange-300 border-orange-400/30",
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
      className={`glass glass-hover group relative flex h-full flex-col rounded-2xl p-6 ${
        highlight ? "ring-gradient" : ""
      }`}
    >
      {scraped && (
        <div className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Scraped + normalized from official source
        </div>
      )}

      <div className="mb-3 flex items-start justify-between gap-3">
        <span
          className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
            categoryStyles[c.category] ?? "bg-slate-500/15 text-slate-300 border-slate-400/30"
          }`}
        >
          {c.category}
        </span>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-indigo-400/25 bg-indigo-500/10 px-2.5 py-1 text-xs font-semibold text-indigo-300">
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
            <path d="M10 1l2.6 5.9 6.4.6-4.8 4.3 1.4 6.2L10 14.8 4.4 18l1.4-6.2L1 7.5l6.4-.6L10 1z" />
          </svg>
          {matchScore(c.id)}% match
        </span>
      </div>

      <h3 className="font-display text-lg font-semibold leading-snug text-white">
        {c.title}
      </h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-400">
        {c.description}
      </p>

      <dl className="mt-4 space-y-1.5 text-xs text-slate-400">
        <div className="flex gap-2">
          <dt className="shrink-0 font-medium text-slate-500">Eligibility</dt>
          <dd className="line-clamp-1">{c.eligibility}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="shrink-0 font-medium text-slate-500">Deadline</dt>
          <dd className="line-clamp-1 text-amber-300/90">{c.deadline}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="shrink-0 font-medium text-slate-500">Location</dt>
          <dd className="line-clamp-1">{c.location}</dd>
        </div>
      </dl>

      <div className="mt-4 flex flex-wrap gap-1.5">
        <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-slate-300">
          {formatLabels[c.format]}
        </span>
        <span
          className={`rounded-md border px-2 py-0.5 text-[11px] ${
            c.cost === "free"
              ? "border-emerald-400/25 bg-emerald-500/10 text-emerald-300"
              : "border-white/10 bg-white/5 text-slate-300"
          }`}
        >
          {costLabels[c.cost]}
        </span>
        <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] capitalize text-slate-300">
          {c.skillLevel.replace("-", " ")}
        </span>
      </div>

      <div className="mt-auto flex items-end justify-between gap-3 pt-5">
        <div className="flex flex-wrap gap-1">
          {c.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[11px] text-slate-500">
              #{tag.replace(/\s+/g, "")}
            </span>
          ))}
        </div>
        <a
          href={c.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-indigo-300 transition-colors hover:text-indigo-200"
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
        <span className="absolute -top-2.5 right-5 rounded-full border border-fuchsia-400/40 bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-fuchsia-900/40">
          Featured
        </span>
      )}
    </article>
  );
}
