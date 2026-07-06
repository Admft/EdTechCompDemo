import type { Competition, CompetitionQuery } from "./types";

export const competitions: Competition[] = [
  {
    id: "regeneron-isef",
    title: "Regeneron International Science and Engineering Fair (ISEF)",
    category: "STEM",
    description:
      "The world's largest pre-college STEM competition. Students advance through affiliated regional and state fairs to present original research to judges from industry and academia, competing for nearly $9M in awards.",
    eligibility: "High school students (grades 9–12) who qualify via an affiliated fair",
    deadline: "Varies by regional affiliate fair (typically Dec–Mar)",
    format: "in-person",
    location: "Rotating US host city (international qualifiers)",
    cost: "free",
    skillLevel: "advanced",
    tags: ["science fair", "research", "international", "scholarships"],
    officialUrl: "https://www.societyforscience.org/isef/",
    sourceName: "Society for Science",
    featured: true,
    provenance: "seed",
  },
  {
    id: "congressional-app-challenge",
    title: "Congressional App Challenge",
    category: "Coding",
    description:
      "The official app competition of the U.S. House of Representatives. Students design and build an original app and submit it to their congressional district — winners are honored on Capitol Hill.",
    eligibility: "US middle and high school students",
    deadline: "November 1, 2026",
    format: "online",
    location: "Your congressional district (submit online)",
    cost: "free",
    skillLevel: "all-levels",
    tags: ["app development", "congress", "beginner friendly", "national"],
    officialUrl: "https://www.congressionalappchallenge.us/",
    sourceName: "U.S. House of Representatives",
    featured: true,
    provenance: "seed",
  },
  {
    id: "national-history-day",
    title: "National History Day Contest",
    category: "History",
    description:
      "A year-long research program where students create documentaries, exhibits, papers, performances, or websites around an annual theme, advancing from school to national finals.",
    eligibility: "Students in grades 6–12",
    deadline: "Regional contests begin February 2026",
    format: "hybrid",
    location: "Local → State → National finals at University of Maryland",
    cost: "varies",
    skillLevel: "all-levels",
    tags: ["research", "documentary", "exhibits", "humanities"],
    officialUrl: "https://www.nhd.org/",
    sourceName: "National History Day",
    featured: false,
    provenance: "seed",
  },
  {
    id: "scholastic-art-writing",
    title: "Scholastic Art & Writing Awards",
    category: "Art",
    description:
      "The nation's longest-running recognition program for creative teens across 28 categories of art and writing. Past winners include Andy Warhol, Sylvia Plath, and Amanda Gorman.",
    eligibility: "Students in grades 7–12 in the US or Canada",
    deadline: "December 2026 (varies by region)",
    format: "online",
    location: "Submit online, regional adjudication",
    cost: "varies",
    skillLevel: "all-levels",
    tags: ["portfolio", "creative writing", "visual art", "scholarships"],
    officialUrl: "https://www.artandwriting.org/",
    sourceName: "Alliance for Young Artists & Writers",
    featured: true,
    provenance: "seed",
  },
  {
    id: "mathcounts",
    title: "MATHCOUNTS Competition Series",
    category: "Math",
    description:
      "The premier US middle school math competition — fast-paced chapter, state, and national rounds culminating in the famous televised Countdown Round.",
    eligibility: "US middle school students (grades 6–8)",
    deadline: "School registration closes December 2026",
    format: "in-person",
    location: "Chapters nationwide → National finals",
    cost: "paid",
    skillLevel: "intermediate",
    tags: ["problem solving", "middle school", "teams", "national"],
    officialUrl: "https://www.mathcounts.org/",
    sourceName: "MATHCOUNTS Foundation",
    featured: false,
    provenance: "seed",
  },
  {
    id: "first-robotics",
    title: "FIRST Robotics Competition",
    category: "Robotics",
    description:
      "Teams of students build and program 120-pound robots in six weeks to compete in a new game each season — combining engineering, strategy, and alliance play under real deadlines.",
    eligibility: "High school students (ages 14–18), team-based",
    deadline: "Team registration opens September 2026",
    format: "in-person",
    location: "Regional events worldwide",
    cost: "paid",
    skillLevel: "all-levels",
    tags: ["engineering", "teams", "mentorship", "scholarships"],
    officialUrl: "https://www.firstinspires.org/robotics/frc",
    sourceName: "FIRST",
    featured: true,
    provenance: "seed",
  },
  {
    id: "deca-competitive-events",
    title: "DECA Competitive Events",
    category: "Business",
    description:
      "Role-play and case-study competitions in marketing, finance, hospitality, and entrepreneurship. Students advance from district to state to the International Career Development Conference.",
    eligibility: "High school DECA members",
    deadline: "District events begin January 2026",
    format: "in-person",
    location: "Districts nationwide → ICDC",
    cost: "paid",
    skillLevel: "intermediate",
    tags: ["entrepreneurship", "role-play", "case studies", "networking"],
    officialUrl: "https://www.deca.org/compete",
    sourceName: "DECA Inc.",
    featured: false,
    provenance: "seed",
  },
  {
    id: "future-problem-solving",
    title: "Future Problem Solving Program International",
    category: "Civic Leadership",
    description:
      "Students apply a six-step creative problem-solving process to complex future scenarios — from AI governance to food security — competing individually or in teams.",
    eligibility: "Students grades 4–12",
    deadline: "Affiliate registration varies (fall 2026)",
    format: "hybrid",
    location: "Affiliate programs worldwide + International Conference",
    cost: "varies",
    skillLevel: "all-levels",
    tags: ["critical thinking", "futures", "global issues", "teams"],
    officialUrl: "https://www.fpspi.org/",
    sourceName: "FPSPI",
    featured: false,
    provenance: "seed",
  },
  {
    id: "civics-unplugged",
    title: "Civics Unplugged Fellowship & Challenges",
    category: "Civic Leadership",
    description:
      "A national program where high schoolers design and launch real civic projects for their communities, with funding, mentorship, and a builder-focused fellowship.",
    eligibility: "High school students nationwide",
    deadline: "Rolling cohorts (next: Fall 2026)",
    format: "online",
    location: "Fully remote",
    cost: "free",
    skillLevel: "beginner",
    tags: ["civic tech", "community projects", "fellowship", "leadership"],
    officialUrl: "https://www.civicsunplugged.org/",
    sourceName: "Civics Unplugged",
    featured: false,
    provenance: "seed",
  },
  {
    id: "youngarts-writing",
    title: "YoungArts National Writing Competition",
    category: "Writing",
    description:
      "A national competition for emerging writers across creative nonfiction, novel, play/script, poetry, short story, and spoken word — with cash awards up to $10,000 and lifelong artist support.",
    eligibility: "US students ages 15–18 or grades 10–12",
    deadline: "October 2026",
    format: "online",
    location: "Submit online; winners attend National YoungArts Week in Miami",
    cost: "paid",
    skillLevel: "advanced",
    tags: ["poetry", "fiction", "spoken word", "awards"],
    officialUrl: "https://youngarts.org/",
    sourceName: "YoungArts Foundation",
    featured: false,
    provenance: "seed",
  },
  {
    id: "community-innovation-challenge",
    title: "Neighborhood Innovation Challenge",
    category: "Local & Community",
    description:
      "A city-level challenge where student teams pitch practical solutions to local problems — transit, food access, public spaces — judged by community leaders with micro-grants for winning ideas.",
    eligibility: "Students ages 13–19 in participating cities",
    deadline: "Spring 2026 (varies by city)",
    format: "in-person",
    location: "Participating cities & community centers",
    cost: "free",
    skillLevel: "beginner",
    tags: ["local impact", "pitch", "micro-grants", "community"],
    officialUrl: "https://example.org/neighborhood-innovation",
    sourceName: "Eship Community Network (demo)",
    featured: false,
    provenance: "seed",
  },
  {
    id: "hack-the-future",
    title: "Hack the Future — Student Hackathon",
    category: "Coding",
    description:
      "A 36-hour beginner-friendly hackathon where students ship a working project with mentors on call — no experience required, laptops and Wi-Fi provided.",
    eligibility: "High school and early college students",
    deadline: "Registration closes 2 weeks before each event",
    format: "hybrid",
    location: "Rotating host schools + remote track",
    cost: "free",
    skillLevel: "beginner",
    tags: ["hackathon", "36 hours", "mentors", "beginner friendly"],
    officialUrl: "https://example.org/hack-the-future",
    sourceName: "Eship Community Network (demo)",
    featured: false,
    provenance: "seed",
  },
];

const norm = (s: string) => s.trim().toLowerCase();

export function filterCompetitions(
  data: Competition[],
  query: CompetitionQuery
): Competition[] {
  const q = query.q ? norm(query.q) : null;
  return data.filter((c) => {
    if (query.category && norm(c.category) !== norm(query.category)) return false;
    if (query.format && c.format !== norm(query.format)) return false;
    if (query.skillLevel && c.skillLevel !== norm(query.skillLevel)) return false;
    if (query.cost && c.cost !== norm(query.cost)) return false;
    if (q) {
      const haystack = [
        c.title,
        c.description,
        c.category,
        c.eligibility,
        c.location,
        c.sourceName,
        ...c.tags,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}
