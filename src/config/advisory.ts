export interface AdvisoryService {
  name: string;
  description: string;
}

/**
 * Single source of truth for advisory offerings, shared by the
 * homepage Advisory section, the dedicated /advisory page, and the
 * Service schema published in JSON-LD.
 */
export const advisoryServices: ReadonlyArray<AdvisoryService> = [
  {
    name: "Smart Contract Architecture",
    description:
      "Design and review of Solidity contracts, security best practices, gas optimization, and upgrade patterns.",
  },
  {
    name: "SDK & DevTooling",
    description:
      "Build developer-friendly SDKs, APIs, and tooling that accelerate adoption and improve DX.",
  },
  {
    name: "Product & Engineering Strategy",
    description:
      "Technical roadmap planning, architecture decisions, and helping teams ship faster with fewer missteps.",
  },
  {
    name: "Team Augmentation",
    description:
      "Embedded engineering support for critical launches, migrations, or capacity gaps.",
  },
];
