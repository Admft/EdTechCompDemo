import DiscoverySection from "@/components/DiscoverySection";
import ScraperDemo from "@/components/ScraperDemo";

const CALENDAR_URL = "https://calendar.app.google/AX1fCWGdukco55z47";

const STATS = [
  { value: "12", label: "demo competitions" },
  { value: "10", label: "categories" },
  { value: "1", label: "live scraper" },
  { value: "∞", label: "built for every zip code" },
];

const CATEGORY_PILLS = [
  "STEM",
  "Coding",
  "Writing",
  "Art",
  "Robotics",
  "Business",
  "Civic",
  "Math",
];

const AUDIENCES = [
  {
    icon: "🎓",
    title: "Students",
    body: "Discover competitions matched to your interests, eligibility, and skill level — even the ones your school has never heard of.",
    accent: "from-indigo-100 to-transparent",
  },
  {
    icon: "👪",
    title: "Parents",
    body: "See every legitimate opportunity in one place, with deadlines, costs, and formats up front — no insider network required.",
    accent: "from-fuchsia-100 to-transparent",
  },
  {
    icon: "🧭",
    title: "Coaches",
    body: "Guide entire classrooms and clubs into the right competitions, and track deadlines across every category you mentor.",
    accent: "from-sky-100 to-transparent",
  },
  {
    icon: "🏆",
    title: "Organizers",
    body: "Reach talented students everywhere — not just the schools that already know you. Grow participation beyond your usual pipeline.",
    accent: "from-emerald-100 to-transparent",
  },
];

const PROBLEMS = [
  {
    icon: "🗣️",
    title: "Word of mouth decides who competes",
    body: "Most students hear about competitions from a teacher, a friend, or a parent who happens to know. If nobody around you knows, you never enter.",
  },
  {
    icon: "🏫",
    title: "School resources vary wildly",
    body: "Well-resourced schools have coaches, clubs, and pipelines into national competitions. Others have none — and their students vanish from the talent map.",
  },
  {
    icon: "🧩",
    title: "Opportunities are scattered everywhere",
    body: "Deadlines, eligibility rules, and applications live across hundreds of unconnected websites, PDFs, and mailing lists. Nobody can track them all.",
  },
];

const TRUST_SIGNALS = [
  {
    icon: "💚",
    title: "Free & paid opportunities",
    body: "Cost is shown up front on every listing — and many of the best competitions are completely free to enter.",
  },
  {
    icon: "🌍",
    title: "Online and local competitions",
    body: "Compete from your bedroom or in your own community. Format and location are always clearly labeled.",
  },
  {
    icon: "🎒",
    title: "Middle school to high school",
    body: "Opportunities across grades 6–12 and every experience level, from first-time entrants to national finalists.",
  },
  {
    icon: "🔗",
    title: "Official source links",
    body: "Every listing links directly to the organizer's official page, so families always register at the source.",
  },
];

function HeroMiniCard({
  className,
  category,
  categoryClass,
  title,
  match,
  meta,
  floatDelay = false,
}: {
  className: string;
  category: string;
  categoryClass: string;
  title: string;
  match: number;
  meta: string;
  floatDelay?: boolean;
}) {
  return (
    <div
      className={`glass absolute hidden w-60 rounded-2xl p-4 shadow-2xl shadow-indigo-950/60 xl:block ${
        floatDelay ? "animate-float-delayed" : "animate-float"
      } ${className}`}
    >
      <div className="flex items-center justify-between">
        <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${categoryClass}`}>
          {category}
        </span>
        <span className="text-[10px] font-bold text-indigo-300">★ {match}% match</span>
      </div>
      <p className="mt-2.5 text-sm font-semibold leading-snug text-white">{title}</p>
      <p className="mt-1.5 text-[11px] text-slate-400">{meta}</p>
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative m-0 overflow-x-clip p-0">
      {/* ===== Nav (fixed, flush to viewport top) ===== */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-night-950 shadow-[0_8px_32px_rgba(0,0,0,0.55)]">
        <nav className="relative mx-auto flex h-14 max-w-7xl items-center px-5 sm:px-8">
          <a href="#" className="relative z-10 flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-600 font-display text-sm font-bold text-white shadow-lg shadow-indigo-900/50">
              E
            </span>
            <span className="font-display text-xl font-bold tracking-tight text-white">
              Eship
            </span>
          </a>
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 text-sm font-medium text-slate-200 md:flex">
            <a href="#problem" className="transition-colors hover:text-white">Problem</a>
            <a href="#solution" className="transition-colors hover:text-white">Solution</a>
            <a href="#discover" className="transition-colors hover:text-white">Discover</a>
            <a href="#scraper" className="transition-colors hover:text-white">Live scraper</a>
          </div>
          <a
            href={CALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 ml-auto rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-900/40 transition-all hover:brightness-110 sm:px-5 sm:text-sm"
          >
            Book a meeting
          </a>
        </nav>
      </header>

      {/* ===== Dark zone: hero + problem ===== */}
      <div className="relative bg-night-950">
        {/* Background glow layer */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="orb animate-glow-pulse left-[-10%] top-[-5%] h-[34rem] w-[34rem] bg-indigo-600/30" />
          <div className="orb animate-glow-pulse right-[-12%] top-[12%] h-[30rem] w-[30rem] bg-fuchsia-600/20" />
          <div className="orb left-[30%] top-[55rem] h-[24rem] w-[24rem] bg-violet-700/15" />
          <div
            className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 0%, rgba(99,102,241,0.14), transparent 45%)",
            }}
          />
        </div>

        {/* ===== Hero ===== */}
        <section className="relative mx-auto max-w-7xl px-5 pb-24 pt-24 sm:px-8 sm:pt-32">
          <HeroMiniCard
            className="left-0 top-40"
            category="Robotics"
            categoryClass="border-sky-400/30 bg-sky-500/15 text-sky-300"
            title="FIRST Robotics Competition"
            match={93}
            meta="In-person · Teams · Scholarships"
          />
          <HeroMiniCard
            className="right-0 top-32"
            category="Coding"
            categoryClass="border-violet-400/30 bg-violet-500/15 text-violet-300"
            title="Congressional App Challenge"
            match={97}
            meta="Online · Free · All levels"
            floatDelay
          />
          <HeroMiniCard
            className="right-24 top-[26rem]"
            category="Art"
            categoryClass="border-pink-400/30 bg-pink-500/15 text-pink-300"
            title="Scholastic Art & Writing Awards"
            match={89}
            meta="Online · Grades 7–12"
          />

          <div className="mx-auto max-w-3xl text-center">
            <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-indigo-400/25 bg-indigo-500/10 px-4 py-1.5 text-xs font-medium text-indigo-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Now indexing competitions across 10 categories
            </div>

            <h1
              className="font-display animate-fade-up mt-7 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl"
              style={{ animationDelay: "80ms" }}
            >
              Find competitions that match your{" "}
              <span className="text-gradient">talent</span> — not your zip code.
            </h1>

            <p
              className="animate-fade-up mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg"
              style={{ animationDelay: "160ms" }}
            >
              The best opportunities for students are scattered across school networks,
              word of mouth, and hundreds of websites. Eship brings them into one
              place — so any student, anywhere, can compete with the best.
            </p>

            <p
              className="animate-fade-up mt-5 text-sm font-medium italic text-indigo-200/90"
              style={{ animationDelay: "200ms" }}
            >
              Built for students who have the talent — but not always the network.
            </p>

            <div
              className="animate-fade-up mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
              style={{ animationDelay: "240ms" }}
            >
              <a
                href="#discover"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-indigo-900/50 transition-all hover:shadow-fuchsia-900/50 hover:brightness-110 sm:w-auto"
              >
                Find your first competition
                <span className="transition-transform group-hover:translate-y-0.5">↓</span>
              </a>
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="glass inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white transition-all hover:border-indigo-400/40 hover:bg-white/10 sm:w-auto"
              >
                Book a discovery meeting <span aria-hidden>→</span>
              </a>
            </div>

            <div
              className="animate-fade-up mt-10 flex flex-wrap items-center justify-center gap-2"
              style={{ animationDelay: "320ms" }}
            >
              {CATEGORY_PILLS.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-indigo-400/40 hover:text-white"
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>

          {/* Stats band */}
          <div
            className="animate-fade-up mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4"
            style={{ animationDelay: "400ms" }}
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="glass glass-hover rounded-2xl px-4 py-5 text-center">
                <div className="font-display text-3xl font-bold text-gradient">{stat.value}</div>
                <div className="mt-1 text-xs text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== Problem (dark) ===== */}
        <section id="problem" className="mx-auto max-w-7xl scroll-mt-28 px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-fuchsia-400">
              The problem
            </span>
            <h2 className="font-display mt-3 text-3xl font-bold text-white sm:text-4xl">
              Talent is everywhere. Discovery isn&apos;t.
            </h2>
            <p className="mt-4 text-slate-400">
              Whether a student is recognized as one of the nation&apos;s best — or never
              considered at all — too often comes down to luck: the right school, the
              right neighborhood, the right connections.
            </p>
          </div>
          <div className="mt-12 grid gap-5 pb-8 md:grid-cols-3">
            {PROBLEMS.map((p) => (
              <div key={p.title} className="glass glass-hover rounded-2xl p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500/20 to-rose-500/5 text-2xl">
                  {p.icon}
                </div>
                <h3 className="font-display mt-5 text-lg font-semibold text-white">{p.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-400">{p.body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ===== Bridge: dark → lavender ===== */}
      <div aria-hidden className="bridge-dark-to-light relative -mt-24 h-72 w-full sm:-mt-32 sm:h-[28rem]">
        <div className="orb left-[12%] top-12 h-72 w-72 bg-indigo-500/22" />
        <div className="orb right-[10%] top-24 h-80 w-80 bg-fuchsia-400/16" />
        <div className="orb left-[45%] top-32 h-64 w-64 bg-violet-400/18" />
      </div>

      {/* ===== Light zone: solution → scraper ===== */}
      <div className="zone-light relative overflow-x-clip text-slate-900">
        {/* Soft lavender/blue glow for the light zone */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="orb left-[-8%] top-[6rem] h-[28rem] w-[28rem] bg-indigo-300/40" />
          <div className="orb right-[-10%] top-[48rem] h-[30rem] w-[30rem] bg-sky-300/30" />
          <div className="orb left-[18%] top-[105rem] h-[28rem] w-[28rem] bg-violet-300/35" />
          <div className="orb right-[15%] top-[155rem] h-[24rem] w-[24rem] bg-fuchsia-300/25" />
        </div>

        {/* ===== Solution ===== */}
        <section id="solution" className="relative mx-auto max-w-7xl scroll-mt-28 px-5 pb-20 pt-20 sm:px-8 sm:pt-28">
          <div className="ring-gradient-light overflow-hidden rounded-3xl bg-white/95 shadow-xl shadow-indigo-100/60 backdrop-blur-sm">
            <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
                  The solution
                </span>
                <h2 className="font-display mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
                  One discovery engine for every competition
                </h2>
                <p className="mt-4 leading-relaxed text-slate-600">
                  Eship centralizes competitions from official sources into a single,
                  searchable index — normalized by category, eligibility, format,
                  location, deadline, cost, and skill level. Students search by who they
                  are and what they love; organizers reach talent they&apos;d never find
                  otherwise.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-slate-700">
                  {[
                    "Structured records from approved official sources",
                    "Search by interest, eligibility, format, cost, and skill level",
                    "Opportunity match scores that surface the right fit first",
                    "Built for students, parents, coaches, and organizers",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-700">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mini pipeline visual */}
              <div className="rounded-2xl border border-indigo-100 bg-[#f6f4fd] p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  How a competition enters Eship
                </p>
                <div className="mt-5 space-y-0">
                  {[
                    { label: "Official source approved", sub: "Allowlisted, robots.txt respected" },
                    { label: "Page ingested", sub: "Title, description, structure extracted" },
                    { label: "Record normalized", sub: "Category, eligibility, format, cost, skill" },
                    { label: "Live in discovery", sub: "Searchable by every student, everywhere" },
                  ].map((step, i, arr) => (
                    <div key={step.label} className="relative flex gap-4 pb-6 last:pb-0">
                      {i < arr.length - 1 && (
                        <span className="absolute left-[13px] top-8 h-full w-px bg-gradient-to-b from-indigo-300 to-transparent" />
                      )}
                      <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-indigo-200 bg-indigo-50 text-xs font-bold text-indigo-600">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{step.label}</p>
                        <p className="mt-0.5 text-xs text-slate-500">{step.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Audiences ===== */}
        <section className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
              Who it&apos;s for
            </span>
            <h2 className="font-display mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Everyone in the competition ecosystem
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {AUDIENCES.map((a) => (
              <div key={a.title} className="card-light relative overflow-hidden rounded-2xl p-7">
                <div
                  aria-hidden
                  className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${a.accent}`}
                />
                <div className="relative">
                  <span className="text-3xl">{a.icon}</span>
                  <h3 className="font-display mt-4 text-lg font-semibold text-slate-900">{a.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{a.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== Trust signals ===== */}
        <section className="relative mx-auto max-w-7xl px-5 pb-20 sm:px-8">
          <div className="rounded-3xl border border-indigo-100 bg-white/70 p-8 shadow-lg shadow-indigo-100/50 backdrop-blur sm:p-10">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-sky-600">
                Built on trust
              </span>
              <h2 className="font-display mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
                Clear, honest information for every family
              </h2>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {TRUST_SIGNALS.map((t) => (
                <div key={t.title} className="card-light rounded-2xl p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-sky-50 text-2xl">
                    {t.icon}
                  </span>
                  <h3 className="font-display mt-4 text-base font-semibold text-slate-900">
                    {t.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{t.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Discovery marketplace ===== */}
        <section id="discover" className="relative mx-auto max-w-7xl scroll-mt-28 px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-fuchsia-600">
              Competition discovery
            </span>
            <h2 className="font-display mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Explore the discovery index
            </h2>
            <p className="mt-4 text-slate-600">
              Search across categories, formats, skill levels, and costs — powered by the
              live <code className="rounded bg-indigo-50 px-1.5 py-0.5 text-xs text-indigo-700">/api/competitions</code> endpoint.
            </p>
          </div>
          <div className="mt-10">
            <DiscoverySection />
          </div>
        </section>

        {/* ===== Scraper demo ===== */}
        <section id="scraper" className="relative z-10 mx-auto max-w-7xl scroll-mt-28 px-5 py-20 pb-48 sm:px-8 sm:pb-56">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
              Live scraper demo
            </span>
            <h2 className="font-display mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              From official page to structured record
            </h2>
            <p className="mt-4 text-slate-600">
              The long-term vision: an ingestion pipeline that keeps the index fresh from
              approved sources. Here&apos;s a working proof of concept.
            </p>
          </div>
          <div className="mt-12">
            <ScraperDemo />
          </div>
        </section>
      </div>

      {/* ===== Bridge: lavender → dark (mirrors top bridge) ===== */}
      <div aria-hidden className="bridge-light-to-dark relative -mt-24 h-72 w-full sm:-mt-32 sm:h-[28rem]">
        <div className="orb left-[12%] top-12 h-72 w-72 bg-violet-400/22" />
        <div className="orb right-[10%] top-24 h-80 w-80 bg-indigo-400/18" />
        <div className="orb left-[45%] top-32 h-64 w-64 bg-fuchsia-400/16" />
      </div>

      {/* ===== Final CTA (dark premium) ===== */}
      <div className="relative bg-night-950">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="orb animate-glow-pulse left-[10%] top-[-2rem] h-80 w-80 bg-indigo-600/22" />
          <div className="orb right-[8%] top-[4rem] h-72 w-72 bg-fuchsia-600/14" />
        </div>

        <section className="relative mx-auto max-w-7xl px-5 pb-20 pt-20 sm:px-8 sm:pt-24">
          <div className="ring-gradient relative overflow-hidden rounded-3xl p-10 text-center shadow-2xl shadow-indigo-950/40 sm:p-16">
            <div aria-hidden className="orb left-1/2 top-[-6rem] h-56 w-[32rem] -translate-x-1/2 bg-indigo-600/20" />
            <h2 className="font-display relative text-3xl font-bold text-white sm:text-4xl">
              Opportunity shouldn&apos;t depend on luck.
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-slate-400">
              We&apos;re building Eship with students, parents, coaches, and organizers.
              See the demo live, or grab time with us to talk about what&apos;s next.
            </p>
            <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#discover"
                className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-indigo-900/50 transition-all hover:brightness-110 sm:w-auto"
              >
                Find your first competition
              </a>
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="glass inline-flex w-full items-center justify-center rounded-full px-8 py-3.5 text-sm font-semibold text-white transition-all hover:border-indigo-400/40 hover:bg-white/10 sm:w-auto"
              >
                Book a discovery meeting →
              </a>
            </div>
          </div>
        </section>

        {/* ===== Footer (dark) ===== */}
        <footer className="relative border-t border-white/5 bg-night-950">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-10 text-sm text-slate-500 sm:flex-row sm:px-8">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-600 font-display text-xs font-bold text-white">
                E
              </span>
              <span>
                Eship — connecting talent to opportunity through competitions.
              </span>
            </div>
            <p className="text-xs">
              Demo build · Competition data from official public sources
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
