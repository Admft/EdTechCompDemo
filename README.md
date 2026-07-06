# Eship

**Connecting talent to opportunity through competitions — regardless of where a student lives or who they know.**

Eship helps students discover competitions based on interest, eligibility, format, location, deadline, and skill level. Today, competition discovery runs on word of mouth, school resources, and personal networks — which means many students miss opportunities simply because they never hear about them. Eship centralizes discovery so students, parents, coaches, and organizers can connect more easily.

This repo is a demo-ready MVP: a polished landing page, a searchable competition discovery index backed by a real API route, and a working scraper proof of concept for one approved official source.

## Tech stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- Vercel-compatible API routes
- `cheerio` for lightweight HTML parsing
- No database, no auth (yet) — competition data is seeded in `lib/competitions.ts`

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build
npm run lint    # eslint
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) — Vercel auto-detects Next.js.
3. Deploy. No environment variables are required.

Both API routes run as serverless functions out of the box.

## API routes

### `GET /api/competitions`

Returns the seeded competition index. Supports query params, all optional:

| Param | Example | Notes |
|---|---|---|
| `q` | `?q=robotics` | Free-text search across title, description, tags, etc. |
| `category` | `?category=STEM` | Exact category match (case-insensitive) |
| `format` | `?format=online` | `online` \| `in-person` \| `hybrid` |
| `skillLevel` | `?skillLevel=beginner` | `beginner` \| `intermediate` \| `advanced` \| `all-levels` |
| `cost` | `?cost=free` | `free` \| `paid` \| `varies` |

```bash
curl "http://localhost:3000/api/competitions?category=Coding&cost=free"
```

### `POST /api/scrape`

Runs the scraper proof of concept. Takes **no input** — it only ever fetches the single allowlisted source (the official Regeneron ISEF page). Returns raw extracted signals plus one normalized `Competition` object, or a graceful error if the live fetch fails.

```bash
curl -X POST http://localhost:3000/api/scrape
```

## How the scraper works

The scraper (`lib/scraper.ts`) is deliberately narrow:

1. **Approved source checked** — the URL is hardcoded to `https://www.societyforscience.org/isef/`. There is no way to pass a URL in.
2. **Page fetched** — plain `fetch` with a 10s timeout and an identifying user agent.
3. **Fields extracted** — page title, meta description, and top headings via cheerio.
4. **Competition normalized** — extracted signals are merged with a curated normalization layer that fills fields the page doesn't reliably expose (category, eligibility, format, cost, skill level).
5. **Added to discovery index** — the result is returned labeled `"Scraped + normalized from official source"`.

If the live fetch fails (network error, non-200, timeout), the API returns a graceful error and the UI points back to the seed data, which already includes ISEF.

### Legal & ethical scraping note

This demo scrapes exactly one allowlisted, public, official page. It does not accept user-submitted URLs, does not crawl, does not bypass robots.txt, and does not circumvent login walls, paywalls, rate limits, or anti-bot protections. Any future ingestion sources should be individually approved and, ideally, replaced with official APIs or partnerships with organizers.

## Project structure

```
app/
  page.tsx                  # Landing page (hero, problem, solution, audiences, discovery, scraper demo)
  layout.tsx                # Fonts + metadata
  globals.css               # Tailwind v4 theme, glassmorphism, animations
  api/competitions/route.ts # GET — filtered competition index
  api/scrape/route.ts       # POST — allowlisted ISEF scraper
components/
  CompetitionCard.tsx       # Marketplace-style card with badges + match score
  FilterBar.tsx             # Search + category/format/skill/cost filters
  DiscoverySection.tsx      # Client section wired to /api/competitions
  ScraperDemo.tsx           # Live pipeline visualization for /api/scrape
lib/
  types.ts                  # Competition, ScrapeResult, query types
  competitions.ts           # Seed data + filtering
  scraper.ts                # Allowlisted fetch + extract + normalize
```

## Roadmap

- **Real data layer** — Postgres + a proper ingestion queue instead of seed data
- **More approved sources** — organizer partnerships and official APIs before scrapers
- **Accounts & profiles** — save searches, deadlines, and eligibility auto-matching
- **Real match scores** — replace the demo badge with interest/eligibility-based ranking
- **Organizer portal** — let organizers submit and manage their own listings
- **Notifications** — deadline reminders for students, parents, and coaches
