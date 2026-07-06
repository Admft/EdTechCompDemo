"use client";

import { useEffect, useMemo, useState } from "react";
import type { Competition, CompetitionQuery } from "@/lib/types";
import CompetitionCard from "./CompetitionCard";
import FilterBar from "./FilterBar";

export default function DiscoverySection() {
  const [query, setQuery] = useState<CompetitionQuery>({});
  const [results, setResults] = useState<Competition[] | null>(null);
  const [total, setTotal] = useState(0);

  // Query the real API route so the demo exercises the backend end to end.
  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) {
      if (value) params.set(key, value);
    }
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/competitions?${params}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        setResults(data.competitions);
        setTotal(data.total);
      } catch {
        // Aborted or transient error — keep previous results.
      }
    }, 150);
    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [query]);

  const featured = useMemo(
    () => (results ?? []).filter((c) => c.featured),
    [results]
  );

  const loading = results === null;

  return (
    <div>
      <FilterBar query={query} onChange={setQuery} />

      <div className="mt-6 flex items-center justify-between text-sm text-slate-400">
        <span>
          {loading ? (
            "Loading competitions…"
          ) : (
            <>
              Showing <span className="font-semibold text-white">{results.length}</span> of{" "}
              <span className="font-semibold text-white">{total}</span> competitions
            </>
          )}
        </span>
        {!loading && featured.length > 0 && (
          <span className="hidden text-xs sm:block">
            ★ {featured.length} featured match{featured.length === 1 ? "" : "es"}
          </span>
        )}
      </div>

      {loading ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass h-72 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : results.length === 0 ? (
        <div className="glass mt-6 flex flex-col items-center rounded-2xl px-6 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-2xl">
            🔭
          </div>
          <h3 className="font-display mt-4 text-lg font-semibold text-white">
            No competitions match those filters yet
          </h3>
          <p className="mt-2 max-w-md text-sm text-slate-400">
            Try widening a filter or clearing your search — new competitions are added
            to the index as sources are approved.
          </p>
          <button
            onClick={() => setQuery({})}
            className="mt-5 rounded-full border border-indigo-400/40 bg-indigo-500/10 px-5 py-2 text-sm font-semibold text-indigo-300 transition-colors hover:bg-indigo-500/20"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((c, i) => (
            <div
              key={c.id}
              className="animate-fade-up"
              style={{ animationDelay: `${Math.min(i * 60, 360)}ms` }}
            >
              <CompetitionCard competition={c} highlight={c.featured} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
