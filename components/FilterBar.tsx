"use client";

import type { CompetitionQuery } from "@/lib/types";

const CATEGORIES = [
  "STEM",
  "Coding",
  "Robotics",
  "Writing",
  "Art",
  "History",
  "Business",
  "Civic Leadership",
  "Math",
  "Local & Community",
];

const selectClass =
  "rounded-xl border border-indigo-100 bg-[#f7f5fe] px-3 py-2.5 text-sm text-slate-700 outline-none transition-colors hover:border-indigo-300 focus:border-indigo-400 focus:bg-white";

export default function FilterBar({
  query,
  onChange,
}: {
  query: CompetitionQuery;
  onChange: (next: CompetitionQuery) => void;
}) {
  const set = (patch: Partial<CompetitionQuery>) => onChange({ ...query, ...patch });

  const hasActiveFilters = Boolean(
    query.q || query.category || query.format || query.skillLevel || query.cost
  );

  return (
    <div className="rounded-2xl border border-indigo-100 bg-white p-4 shadow-lg shadow-indigo-200/40 sm:p-5">
      <div className="relative">
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        >
          <path
            fillRule="evenodd"
            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="text"
          value={query.q ?? ""}
          onChange={(e) => set({ q: e.target.value || undefined })}
          placeholder="Search by name, tag, skill, or keyword — try “robotics” or “free”"
          className="w-full rounded-xl border border-indigo-100 bg-[#f7f5fe] py-3 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-indigo-400 focus:bg-white"
        />
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        <select
          aria-label="Category"
          value={query.category ?? ""}
          onChange={(e) => set({ category: e.target.value || undefined })}
          className={selectClass}
        >
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          aria-label="Format"
          value={query.format ?? ""}
          onChange={(e) => set({ format: e.target.value || undefined })}
          className={selectClass}
        >
          <option value="">Any format</option>
          <option value="online">Online</option>
          <option value="in-person">In-person</option>
          <option value="hybrid">Hybrid</option>
        </select>

        <select
          aria-label="Skill level"
          value={query.skillLevel ?? ""}
          onChange={(e) => set({ skillLevel: e.target.value || undefined })}
          className={selectClass}
        >
          <option value="">Any skill level</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
          <option value="all-levels">All levels</option>
        </select>

        <select
          aria-label="Cost"
          value={query.cost ?? ""}
          onChange={(e) => set({ cost: e.target.value || undefined })}
          className={selectClass}
        >
          <option value="">Any cost</option>
          <option value="free">Free</option>
          <option value="paid">Paid</option>
          <option value="varies">Varies</option>
        </select>
      </div>

      {hasActiveFilters && (
        <button
          onClick={() => onChange({})}
          className="mt-3 text-xs font-medium text-indigo-600 transition-colors hover:text-indigo-500"
        >
          ✕ Clear all filters
        </button>
      )}
    </div>
  );
}
