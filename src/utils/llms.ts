import { advisoryServices } from "@/config/advisory";
import { type ExperienceData, experiences } from "@/config/experience";
import {
  type ProjectData,
  isProjectIndexable,
  projects,
} from "@/config/projects";
import { siteConfig } from "@/config/site";

/**
 * Builders for `/llms.txt` and `/llms-full.txt` (https://llmstxt.org).
 *
 * Both files are generated from the same config the pages and sitemap
 * read, so the summary AI assistants see never drifts from the site.
 * Only the short "About" copy is hand-written.
 */

const ABOUT = `${siteConfig.name} is a ${siteConfig.role} based in Canada with 5+ years of experience shipping Web3 products, smart contracts, SDKs, block explorers, and AI agents. He advises early-stage teams on product, engineering, and smart-contract architecture.`;

const SPECIALTIES = [
  "Smart contracts (Solidity, EVM, security, gas optimization, upgrade patterns)",
  "AI agents and AI-assisted developer tooling",
  "Decentralized infrastructure (IPLD, Substrate, Polkadot.js, Ceramic, Lit Protocol)",
  "SDK and developer-tooling design",
  "TypeScript / Next.js / React application development",
];

const PROFILES = [
  ["GitHub", siteConfig.links.github],
  ["LinkedIn", siteConfig.links.linkedin],
  ["X / Twitter", siteConfig.links.twitter],
  ["Instagram", siteConfig.links.instagram],
] as const;

const url = (path: string) => `${siteConfig.url}${path}`;

function dateRange(exp: Pick<ExperienceData, "startDate" | "endDate">) {
  return `${exp.startDate} – ${exp.endDate}`;
}

function currentRoles(): string {
  const current = experiences.filter((exp) => exp.endDate === "Present");
  if (current.length === 0) return "";
  const roles = current
    .map((exp) => `${exp.title} at ${exp.company}`)
    .join("; ");
  return `Currently: ${roles}.`;
}

function header(): string[] {
  return [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    "## About",
    "",
    ABOUT,
    ...(currentRoles() ? ["", currentRoles()] : []),
    "",
    "## Specialties",
    "",
    ...SPECIALTIES.map((item) => `- ${item}`),
  ];
}

function footer(): string[] {
  return [
    "## Profiles",
    "",
    ...PROFILES.map(([label, href]) => `- ${label}: ${href}`),
    "",
    "## Contact",
    "",
    `- Form: ${url("/contact")}`,
    "- Response time: within 2 business days",
    "- Engagement models: hourly, retainer, project-based",
  ];
}

function indexedProjects(): ProjectData[] {
  return projects.filter(isProjectIndexable);
}

/** Short index: who, what, and links to every indexable page. */
export function buildLlmsTxt(): string {
  const lines = [
    ...header(),
    "",
    "## Key pages",
    "",
    `- [Home](${url("/")}): overview and recent work`,
    `- [Projects](${url("/projects")}): full list of Web3, AI, and tooling projects`,
    `- [Experience](${url("/experience")}): career timeline with detailed role descriptions`,
    `- [Advisory](${url("/advisory")}): services, engagement models, and FAQs`,
    `- [Contact](${url("/contact")}): form, response time, and FAQs`,
    `- [Full profile for LLMs](${url("/llms-full.txt")}): every role and project in one Markdown file`,
    "",
    "## Experience",
    "",
    ...experiences.map(
      (exp) =>
        `- [${exp.title} at ${exp.company}](${url(`/experience/${exp.slug}`)}) (${dateRange(exp)}): ${exp.summary}`,
    ),
    "",
    "## Projects",
    "",
    ...indexedProjects().map(
      (project) =>
        `- [${project.title}](${url(`/projects/${project.slug}`)}): ${project.summary}`,
    ),
    "",
    ...footer(),
  ];
  return `${lines.join("\n")}\n`;
}

function experienceSection(exp: ExperienceData): string[] {
  return [
    `### ${exp.title} at ${exp.company}`,
    "",
    `- Dates: ${dateRange(exp)}`,
    `- Location: ${exp.location} (${exp.type})`,
    ...(exp.companyUrl ? [`- Company: ${exp.companyUrl}`] : []),
    `- Page: ${url(`/experience/${exp.slug}`)}`,
    ...(exp.positions && exp.positions.length > 1
      ? [
          `- Positions: ${exp.positions
            .map((pos) => `${pos.title} (${dateRange(pos)})`)
            .join("; ")}`,
        ]
      : []),
    `- Skills: ${exp.skills.join(", ")}`,
    "",
    exp.description,
    ...(exp.highlights.length
      ? ["", ...exp.highlights.map((item) => `- ${item}`)]
      : []),
  ];
}

function projectSection(project: ProjectData): string[] {
  const caseStudy: Array<[string, string | undefined]> = [
    ["Problem", project.problem],
    ["Role", project.role],
    ["Outcome", project.outcome],
  ];
  return [
    `### ${project.title}`,
    "",
    `- Page: ${url(`/projects/${project.slug}`)}`,
    ...(project.link ? [`- Live: ${project.link}`] : []),
    ...(project.repoLink ? [`- Source: ${project.repoLink}`] : []),
    `- Type: ${project.projectType}`,
    `- Stack: ${project.badges.join(", ")}`,
    "",
    project.description,
    ...caseStudy.flatMap(([label, text]) =>
      text ? ["", `**${label}:** ${text}`] : [],
    ),
    ...(project.highlights?.length
      ? ["", ...project.highlights.map((item) => `- ${item}`)]
      : []),
  ];
}

/** Full profile: every role, project, and service as one Markdown file. */
export function buildLlmsFullTxt(): string {
  const lines = [
    ...header(),
    "",
    "## Experience",
    "",
    ...experiences.flatMap((exp) => [...experienceSection(exp), ""]),
    "## Projects",
    "",
    ...indexedProjects().flatMap((project) => [
      ...projectSection(project),
      "",
    ]),
    "## Advisory services",
    "",
    ...advisoryServices.map(
      (service) => `- **${service.name}:** ${service.description}`,
    ),
    `- Details: ${url("/advisory")}`,
    "",
    ...footer(),
  ];
  return `${lines.join("\n")}\n`;
}
