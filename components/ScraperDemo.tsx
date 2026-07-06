"use client";

import { useRef, useState } from "react";
import type { Competition, ScrapeResult } from "@/lib/types";
import CompetitionCard from "./CompetitionCard";

const PIPELINE_STEPS = [
  "Approved source checked",
  "Page fetched",
  "Fields extracted",
  "Competition normalized",
  "Added to discovery index",
];

type Status = "idle" | "running" | "success" | "error";

export default function ScraperDemo() {
  const [status, setStatus] = useState<Status>("idle");
  const [activeStep, setActiveStep] = useState(-1);
  const [result, setResult] = useState<ScrapeResult | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const runScraper = async () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setStatus("running");
    setResult(null);
    setActiveStep(0);

    // Stagger the first steps for a readable pipeline animation while
    // the real request runs.
    timers.current.push(setTimeout(() => setActiveStep(1), 500));

    try {
      const res = await fetch("/api/scrape", { method: "POST" });
      const data: ScrapeResult = await res.json();

      if (!data.ok || !data.competition) {
        setStatus("error");
        setResult(data);
        return;
      }

      // Walk the remaining steps, then reveal the card.
      timers.current.push(setTimeout(() => setActiveStep(2), 200));
      timers.current.push(setTimeout(() => setActiveStep(3), 700));
      timers.current.push(setTimeout(() => setActiveStep(4), 1200));
      timers.current.push(
        setTimeout(() => {
          setResult(data);
          setStatus("success");
        }, 1700)
      );
    } catch {
      setStatus("error");
      setResult({
        ok: false,
        error: "Request failed. Seed data for ISEF is still available in the discovery index.",
      });
    }
  };

  const scrapedCompetition: Competition | undefined = result?.competition;

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
      {/* Left: dark technical pipeline panel */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-night-800 to-night-950 p-7 shadow-2xl shadow-indigo-300/50 sm:p-8">
        <div aria-hidden className="orb right-[-4rem] top-[-4rem] h-48 w-48 bg-indigo-600/25" />

        <div className="relative flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-300">
            Live ingestion pipeline
          </span>
        </div>

        <h3 className="font-display relative mt-4 text-2xl font-bold text-white">
          Watch Eship ingest a real competition page
        </h3>
        <p className="relative mt-3 text-sm leading-relaxed text-slate-400">
          Eship can ingest approved, public competition pages and normalize them into
          structured, searchable records. This demo fetches the official{" "}
          <a
            href="https://www.societyforscience.org/isef/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-indigo-300 underline decoration-indigo-400/40 underline-offset-2 hover:text-indigo-200"
          >
            Regeneron ISEF page
          </a>{" "}
          — and only that page. No arbitrary URLs, no bypassing site protections.
        </p>

        <ol className="relative mt-7 space-y-1">
          {PIPELINE_STEPS.map((step, i) => {
            const done =
              status === "success" || (status !== "idle" && i < activeStep);
            const active = status === "running" && i === activeStep;
            const failed = status === "error" && i >= activeStep && i <= 1;
            return (
              <li key={step} className="flex items-center gap-3 py-2">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-all duration-300 ${
                    done
                      ? "border-emerald-400/50 bg-emerald-500/15 text-emerald-300"
                      : active
                        ? "border-indigo-400/60 bg-indigo-500/20 text-indigo-200"
                        : failed
                          ? "border-rose-400/50 bg-rose-500/15 text-rose-300"
                          : "border-white/10 bg-white/5 text-slate-500"
                  }`}
                >
                  {done ? "✓" : active ? (
                    <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-300" />
                  ) : failed ? (
                    "✕"
                  ) : (
                    i + 1
                  )}
                </span>
                <span
                  className={`text-sm transition-colors duration-300 ${
                    done
                      ? "text-emerald-200"
                      : active
                        ? "font-medium text-white"
                        : "text-slate-500"
                  }`}
                >
                  {step}
                </span>
              </li>
            );
          })}
        </ol>

        <button
          onClick={runScraper}
          disabled={status === "running"}
          className="relative mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-900/50 transition-all hover:shadow-fuchsia-900/50 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "running" ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              Scraping official source…
            </>
          ) : (
            <>
              <span>⚡</span> Run ISEF scraper
            </>
          )}
        </button>

        <p className="relative mt-4 text-[11px] leading-relaxed text-slate-500">
          Scrapes a single allowlisted official page. Respects robots.txt and site
          protections. Fields the page doesn&apos;t expose are filled by a curated
          normalization layer and clearly labeled.
        </p>
      </div>

      {/* Right: result panel */}
      <div className="lg:pt-2">
        {status === "idle" && (
          <div className="flex min-h-[320px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-indigo-200 bg-white/70 p-10 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-3xl">
              🛰️
            </div>
            <p className="font-display mt-5 text-lg font-semibold text-slate-700">
              Scraper output appears here
            </p>
            <p className="mt-2 max-w-sm text-sm text-slate-500">
              Run the pipeline to fetch the official ISEF page and watch it become a
              structured competition record in real time.
            </p>
          </div>
        )}

        {status === "running" && (
          <div className="min-h-[320px] rounded-3xl border border-indigo-100 bg-white p-8 shadow-sm shadow-indigo-100/60">
            <div className="h-4 w-40 animate-pulse rounded bg-indigo-100" />
            <div className="mt-5 space-y-3">
              <div className="h-3 w-full animate-pulse rounded bg-indigo-100" />
              <div className="h-3 w-5/6 animate-pulse rounded bg-indigo-100" />
              <div className="h-3 w-2/3 animate-pulse rounded bg-indigo-100" />
            </div>
            <div className="mt-8 flex gap-2">
              <div className="h-6 w-20 animate-pulse rounded-full bg-indigo-100" />
              <div className="h-6 w-24 animate-pulse rounded-full bg-indigo-100" />
            </div>
          </div>
        )}

        {status === "success" && scrapedCompetition && (
          <div className="animate-fade-up">
            <CompetitionCard competition={scrapedCompetition} highlight />
            {result?.extracted && (
              <div className="mt-4 rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm shadow-indigo-100/60">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Raw signals extracted
                </p>
                <dl className="mt-3 space-y-2 text-xs text-slate-500">
                  <div>
                    <dt className="font-medium text-slate-400">Page title</dt>
                    <dd className="mt-0.5 text-slate-700">{result.extracted.pageTitle}</dd>
                  </div>
                  {result.extracted.metaDescription && (
                    <div>
                      <dt className="font-medium text-slate-400">Meta description</dt>
                      <dd className="mt-0.5 line-clamp-2 text-slate-700">
                        {result.extracted.metaDescription}
                      </dd>
                    </div>
                  )}
                  {result.extracted.headings.length > 0 && (
                    <div>
                      <dt className="font-medium text-slate-400">Headings found</dt>
                      <dd className="mt-1 flex flex-wrap gap-1.5">
                        {result.extracted.headings.map((h) => (
                          <span
                            key={h}
                            className="rounded-md border border-indigo-100 bg-[#f6f4fd] px-2 py-0.5 text-[11px] text-slate-600"
                          >
                            {h}
                          </span>
                        ))}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            )}
          </div>
        )}

        {status === "error" && (
          <div className="animate-fade-up rounded-3xl border border-rose-200 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-xl">
                ⚠️
              </span>
              <h4 className="font-display text-lg font-semibold text-slate-900">
                Live fetch unavailable
              </h4>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {result?.error ?? "The source page could not be reached right now."}
            </p>
            <p className="mt-3 text-sm text-slate-600">
              No problem for the demo — ISEF is already in the discovery index from
              seed data, so search and filters above keep working.
            </p>
            <button
              onClick={runScraper}
              className="mt-5 rounded-full border border-indigo-200 bg-indigo-50 px-5 py-2 text-sm font-semibold text-indigo-700 transition-colors hover:bg-indigo-100"
            >
              Try again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
