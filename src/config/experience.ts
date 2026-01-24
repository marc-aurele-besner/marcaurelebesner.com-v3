export interface ExperienceData {
  slug: string;
  title: string;
  company: string;
  location: string;
  type: "remote" | "onsite" | "hybrid";
  startDate: string;
  endDate: string;
  summary: string;
  description: string;
  highlights: string[];
  skills: string[];
  companyUrl?: string;
  isWeb3: boolean;
}

export const experiences: ExperienceData[] = [
  {
    slug: "autonomys",
    title: "Lead Software Engineer",
    company: "Autonomys Network",
    location: "Palo Alto, California, United States",
    type: "remote",
    startDate: "Apr 2024",
    endDate: "Jun 2025",
    summary:
      "Led design and implementation of production indexing systems, block explorer, developer SDKs, and EVM tooling for the Autonomys blockchain network.",
    description:
      "As a Lead Software Engineer in the product team at Autonomys, I focused on hands-on development to build and enhance blockchain and Web3 solutions, ensuring performance, scalability, and usability for both end-users and developers.",
    highlights: [
      "Led design and implementation of production indexing systems powering the block explorer",
      "Owned migration of block explorer frontend from React SPA to Next.js",
      "Designed and implemented Solidity smart contracts for testnet tooling and stablecoin functionality",
      "Built developer SDKs to simplify chain interaction and improve onboarding",
      "Developed advanced explorer features including staking views and wallet integrations",
      "Prototyped on-chain permanent data storage using IPLD and DAG structures",
      "Led development of a custom MetaMask Snap for Substrate interaction",
      "Built EVM testnet tooling including web and Discord-based faucets",
    ],
    skills: [
      "Solidity",
      "TypeScript",
      "React.js",
      "Next.js",
      "Polkadot.js",
      "Python",
      "MetaMask Snap",
      "IPLD",
    ],
    companyUrl: "https://autonomys.xyz",
    isWeb3: true,
  },
  {
    slug: "oamo",
    title: "Full-Stack Web3 Software Engineer",
    company: "Oamo",
    location: "Montreal, Quebec, Canada",
    type: "remote",
    startDate: "Mar 2023",
    endDate: "Apr 2024",
    summary:
      "Authored Solidity smart contracts for rewards and profiles, integrated decentralized data systems using Ceramic Network and Lit Protocol for encryption workflows.",
    description:
      "As a key member of an early-stage team at Oamo, I played a pivotal role in building two web applications—one customer-facing and another for organizational use.",
    highlights: [
      "Authored Solidity smart contracts for rewards distribution and profile management",
      "Integrated decentralized data systems using Ceramic Network",
      "Implemented encryption workflows using Lit Protocol",
      "Designed decentralized identity flows using DIDs",
      "Implemented Sybil resistance and user reputation systems",
    ],
    skills: [
      "Solidity",
      "Web3",
      "Node.js",
      "React.js",
      "Next.js",
      "Lit Protocol",
      "Ceramic",
      "IPFS",
    ],
    companyUrl: "https://oamo.io",
    isWeb3: true,
  },
  {
    slug: "gluwa",
    title: "Smart Contract Engineer",
    company: "Gluwa",
    location: "San Francisco, California, United States",
    type: "remote",
    startDate: "Feb 2022",
    endDate: "Jun 2023",
    summary:
      "Developed staking systems, DAOs, and multisig wallets. Built internal dashboards and automated reporting tools for contract interaction.",
    description:
      "Developed and tested smart contracts for financial applications including staking, DAOs, and multi-signature wallets using Solidity, Hardhat, and Foundry. Engineered tools to enhance smart contract interaction and efficiency for developers not specialized in Web3 technologies.",
    highlights: [
      "Developed staking systems, DAOs, and multisig wallets",
      "Built internal dashboards to simplify contract interaction for non-Web3 developers",
      "Developed automated reporting and transaction monitoring tools",
      "Contributed to security tooling for malicious transaction detection",
    ],
    skills: [
      "Solidity",
      "Smart Contracts",
      "Security",
      "Ethers.js",
      "React.js",
      "Ethereum",
    ],
    companyUrl: "https://gluwa.com",
    isWeb3: true,
  },
  {
    slug: "indigo",
    title: "Blockchain Programming Instructor",
    company: "Indigo Blockchain School",
    location: "France",
    type: "remote",
    startDate: "Jan 2023",
    endDate: "Apr 2023",
    summary:
      "Led hands-on courses teaching smart contract development with Solidity, Hardhat, and Foundry. Guided students through NFT and marketplace implementations.",
    description:
      "Led a hands-on course on Blockchain Programming & Smart Contracts, teaching students how to write, test, and deploy smart contracts in Solidity using Hardhat and Foundry. This course was highly interactive, focusing on demonstrating coding techniques and engaging students in writing code collaboratively.",
    highlights: [
      "Guided students through the creation of NFT contracts",
      "Collaborated on developing functional NFT marketplaces",
      "Developed secure multi-signature contract implementations",
      "Taught essential skills including GitHub and peer code reviews",
    ],
    skills: [
      "Communication",
      "Ethereum",
      "Smart Contracts",
      "Online Teaching",
      "Solidity",
      "Blockchain",
    ],
    isWeb3: true,
  },
  {
    slug: "self-directed",
    title: "Self-Directed Projects",
    company: "Independent",
    location: "Remote",
    type: "remote",
    startDate: "May 2021",
    endDate: "2022",
    summary:
      "Built multiple blockchain projects including a DeFi platform (PlantSwap Finance) and an NFT gallery with 3D web experience (Collage of Myself).",
    description:
      "Engaged in multiple self-directed projects focused on blockchain technology and web development, building practical experience with smart contracts, DeFi protocols, and creative Web3 applications.",
    highlights: [
      "Developed PlantSwap Finance, a DEX and farming DeFi platform forked from PancakeSwap v2",
      "Built and deployed smart contracts on Binance Smart Chain",
      "Created Collage of Myself, combining NFT smart contracts with a 3D web gallery using Three.js",
      "Implemented advanced staking, yield farming dashboards, and liquidity provider incentives",
    ],
    skills: [
      "Solidity",
      "TypeScript",
      "React",
      "React Three Fiber",
      "Hardhat",
      "Ethers.js",
      "DeFi",
    ],
    isWeb3: true,
  },
  {
    slug: "payfacto",
    title: "Technical Support Specialist",
    company: "PayFacto",
    location: "Montreal, Quebec, Canada",
    type: "remote",
    startDate: "Jun 2020",
    endDate: "Apr 2021",
    summary:
      "Provided technical support for POS software, enhanced PHP/SQL backend, and developed Zoho plugins to automate workflows.",
    description:
      "Provided technical support for the company's point of sale (POS) software, assisting both colleagues and customers in troubleshooting issues and optimizing the use of internal tools.",
    highlights: [
      "Enhanced PHP/SQL backend to streamline workflows and improve data management",
      "Developed multiple Zoho plugins to integrate tools into the support dashboard",
      "Automated routine tasks to reduce manual workflow steps and minimize errors",
    ],
    skills: [
      "PHP",
      "WordPress",
      "Node.js",
      "MySQL",
      "Zoho",
      "Plugin Development",
    ],
    isWeb3: false,
  },
  {
    slug: "youtube",
    title: "Content Creator",
    company: "YouTube",
    location: "Canada",
    type: "onsite",
    startDate: "Aug 2019",
    endDate: "Nov 2019",
    summary:
      "Created cryptocurrency news content 3-4 times weekly, learning video production, public speaking, and social media marketing.",
    description:
      "Cryptocurrency News Presenter creating educational content about cryptocurrency news and trends.",
    highlights: [
      "Created and published educational content 3-4 times a week",
      "Learned public speaking, video editing, light and sound engineering",
      "Managed camera operations, lighting, and audio configurations",
      "Executed self-promotion strategies across social media platforms",
    ],
    skills: [
      "Blockchain",
      "Video Editing",
      "Content Creation",
      "YouTube",
      "Public Speaking",
    ],
    isWeb3: false,
  },
];
