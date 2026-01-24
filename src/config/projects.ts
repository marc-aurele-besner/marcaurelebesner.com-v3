export interface ProjectData {
  slug: string;
  title: string;
  summary: string;
  description: string;
  highlights?: string[];
  imageSrc: string;
  imageAlt: string;
  link?: string;
  repoLink?: string;
  badges: string[];
  projectType: "personal" | "work";
  featured: boolean;
}

export const projects: ProjectData[] = [
  {
    slug: "eternal-mint",
    title: "EternalMint",
    summary: "Build and mint NFTs on the Autonomys Network with permanent on-chain storage.",
    description:
      "A simple web app to build and mint NFTs on the Autonomys Network. Using the Autonomys Auto-SDK to simplify the process of interacting with the blockchain. (Upload both the image and metadata to the Consensus Chain and mint the NFT on the Autonomys EVM Chain)",
    highlights: [
      "Uses Autonomys Auto-SDK for simplified blockchain interaction",
      "Uploads images and metadata to the Consensus Chain",
      "Mints NFTs on the Autonomys EVM Chain",
      "Permanent on-chain data storage using IPLD/DAG structures",
    ],
    imageSrc: "/images/projects/eternal-mint.png",
    imageAlt: "EternalMint",
    link: "https://eternalmint.xyz/",
    repoLink: "https://github.com/marc-aurele-besner/eternalmint-xyz",
    badges: [
      "TypeScript",
      "Auto-SDK",
      "IPLD",
      "IPLD-DAG",
      "Blockchain",
      "Solidity",
    ],
    projectType: "personal",
    featured: true,
  },
  {
    slug: "ai3-info",
    title: "AI3.info",
    summary: "Interactive 3D visualization of real-time Autonomys Network insights.",
    description:
      "Simple web app that provides real-time insights into the Autonomys Network through an interactive 3D interface. Built with Next.js, React Three Fiber, and powered by the Auto SDK.",
    highlights: [
      "Real-time network statistics visualization",
      "Interactive 3D interface with React Three Fiber",
      "Powered by Auto SDK for live data",
    ],
    imageSrc: "/images/projects/ai3-info.png",
    imageAlt: "AI3.info",
    link: "https://ai3.info",
    repoLink: "https://github.com/marc-aurele-besner/ai3-info",
    badges: [
      "React",
      "Next.js",
      "Three.js",
      "React Three Fiber",
      "Tailwind CSS",
    ],
    projectType: "personal",
    featured: true,
  },
  {
    slug: "astral-block-explorer",
    title: "Astral Block Explorer",
    summary: "Full-featured block explorer for the Autonomys Network with staking interface.",
    description:
      "Web application for interacting with the Autonomys Network and exploring the consensus chain. Register operators, stake, and nominate on Astral.",
    highlights: [
      "Complete blockchain data exploration",
      "Operator registration and management",
      "Staking and nomination interface",
      "Wallet integration support",
    ],
    imageSrc: "/images/projects/astral-block-explorer.png",
    imageAlt: "Astral Block Explorer",
    link: "https://astral.autonomys.xyz/",
    repoLink: "https://github.com/autonomys/astral",
    badges: ["Next.js", "React", "Polkadot.js", "TypeScript", "GraphQL"],
    projectType: "work",
    featured: true,
  },
  {
    slug: "fileonchain",
    title: "FileOnChain",
    summary: "File uploader for substrate networks. Built in 2 days, won 3rd place at Consensus 2024.",
    description:
      "A small file uploader that allows you to upload files to substrate networks. Build in 2 days for the Consensus 2024 Hackathon. (won 3rd place)",
    highlights: [
      "Built in 48 hours at Consensus 2024 Hackathon",
      "Won 3rd place",
      "Permanent file storage on substrate chains",
      "Uses IPLD and DAG data structures",
    ],
    imageSrc: "/images/projects/fileonchain.png",
    imageAlt: "FileOnChain",
    link: "https://fileonchain.org/",
    repoLink: "https://github.com/marc-aurele-besner/consensus-hackathon-2024",
    badges: ["TypeScript", "Polkadot.js", "IPLD", "IPLD-DAG", "Blockchain"],
    projectType: "personal",
    featured: true,
  },
  {
    slug: "autonomys-auto-sdk",
    title: "Autonomys Auto-SDK",
    summary: "SDK simplifying Autonomys Network interaction for AI and Web3 developers.",
    description:
      "Software development kit for AI and Web3 developers that simplifies interacting with the Autonomys Network for those without a deep understanding of blockchains or smart contracts.",
    highlights: [
      "Simplified blockchain interaction APIs",
      "Designed for developers new to Web3",
      "Full TypeScript support",
      "Comprehensive documentation",
    ],
    imageSrc: "/images/projects/autonomys-auto-sdk.png",
    imageAlt: "Autonomys Auto-SDK",
    link: "https://www.npmjs.com/package/@autonomys/auto-consensus",
    repoLink: "https://github.com/autonomys/auto-sdk",
    badges: ["TypeScript", "SDK", "Web3", "AI", "Blockchain"],
    projectType: "work",
    featured: true,
  },
  {
    slug: "oamo",
    title: "Oamo App",
    summary: "Web3 app with wallet integration, smart contracts, and OAuth flows.",
    description:
      "Implement a large amount of the business logic for the Oamo app, including web3 wallets, smart contract interactions, and all web2 OAuth flows.",
    highlights: [
      "Web3 wallet integration",
      "Smart contract interactions",
      "Web2 OAuth authentication flows",
      "User profile and rewards systems",
    ],
    imageSrc: "/images/projects/oamo.png",
    imageAlt: "Oamo App",
    link: "https://oamo.io",
    badges: ["TypeScript", "Next.js", "React", "Web3", "Solidity", "OAuth"],
    projectType: "work",
    featured: true,
  },
  {
    slug: "mymultisig",
    title: "MyMultisig",
    summary: "Create and manage multisig wallets with a simple interface.",
    description:
      "A simple web app that allows you to create and manage multisig wallets.",
    highlights: [
      "Easy multisig wallet creation",
      "Transaction management interface",
      "Multi-owner approval workflows",
    ],
    imageSrc: "/images/projects/my-multisig.png",
    imageAlt: "MyMultisig",
    link: "https://mymultisig.app/",
    repoLink: "https://github.com/marc-aurele-besner/mymultisig-contract",
    badges: ["TypeScript", "Next.js", "React", "Web3", "Solidity"],
    projectType: "personal",
    featured: false,
  },
  {
    slug: "collage-of-myself",
    title: "CollageOfMyself",
    summary: "3D NFT gallery built with React Three Fiber.",
    description:
      "A 3d NFTs Gallery built with Next.js, React Three Fiber for a personal NFT collection.",
    highlights: [
      "Interactive 3D gallery experience",
      "NFT minting and management",
      "Built with React Three Fiber",
    ],
    imageSrc: "/images/projects/collage-of-myself.png",
    imageAlt: "CollageOfMyself",
    link: "https://collageofmyself.com/",
    repoLink: "https://github.com/collageofmyself/collageofmyself-contract",
    badges: ["TypeScript", "Next.js", "React", "Web3", "Solidity"],
    projectType: "personal",
    featured: false,
  },
  {
    slug: "plantswap-finance",
    title: "PlantSwap Finance",
    summary: "DeFi platform with DEX and yield farming on BSC.",
    description:
      "A decentralized finance (DeFi) platform built with React to provide a user-friendly interface for interacting with multiple smart contracts.",
    highlights: [
      "Decentralized exchange functionality",
      "Yield farming dashboards",
      "Liquidity provider incentives",
      "Built on Binance Smart Chain",
    ],
    imageSrc: "/images/projects/plantswap.png",
    imageAlt: "PlantSwap Finance",
    link: "https://plantswap.finance/",
    repoLink: "https://github.com/PlantSwapFinance/plantswapfinance-contracts",
    badges: ["TypeScript", "Next.js", "React", "Web3", "Solidity"],
    projectType: "personal",
    featured: false,
  },
  {
    slug: "golf-alpine",
    title: "Golf Alpine",
    summary: "Web app for a local golf club with tee time booking.",
    description:
      "A simple web app for a local golf club, allowing you to book tee times and view the scorecards and other information.",
    highlights: [
      "Tee time booking system",
      "Scorecard viewing",
      "Club information display",
    ],
    imageSrc: "/images/projects/golf-alpine.png",
    imageAlt: "Golf Alpine",
    link: "https://golfalpine.ca/",
    repoLink: "https://github.com/marc-aurele-besner/golfalpine.ca",
    badges: ["TypeScript", "React", "CSS"],
    projectType: "personal",
    featured: false,
  },
];
