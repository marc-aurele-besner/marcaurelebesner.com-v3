export interface ProjectData {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  link?: string;
  repoLink?: string;
  badges: string[];
  projectType: "personal" | "work";
}

export const projects: ProjectData[] = [
  {
    title: "EternalMint",
    description:
      "A simple web app to build and mint NFTs on the Autonomys Network. Using the Autonomys Auto-SDK to simplify the process of interacting with the blockchain. (Upload both the image and metadata to the Consensus Chain and mint the NFT on the Autonomys EVM Chain)",
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
  },
  {
    title: "AI3.info",
    description:
      "Simple web app that provides real-time insights into the Autonomys Network through an interactive 3D interface. Built with Next.js, React Three Fiber, and powered by the Auto SDK.",
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
  },
  {
    title: "Astral Block Explorer",
    description:
      "Web application for interacting with the Autonomys Network and exploring the consensus chain. Register operators, stake, and nominate on Astral.",
    imageSrc: "/images/projects/astral-block-explorer.png",
    imageAlt: "Astral Block Explorer",
    link: "https://astral.autonomys.xyz/",
    repoLink: "https://github.com/autonomys/astral",
    badges: ["Next.js", "React", "Polkadot.js", "TypeScript", "GraphQL"],
    projectType: "work",
  },
  {
    title: "FileOnChain",
    description:
      "A small file uploader that allows you to upload files to substrate networks. Build in 2 days for the Consensus 2024 Hackathon. (won 3rd place)",
    imageSrc: "/images/projects/fileonchain.png",
    imageAlt: "FileOnChain",
    link: "https://fileonchain.org/",
    repoLink: "https://github.com/marc-aurele-besner/consensus-hackathon-2024",
    badges: ["TypeScript", "Polkadot.js", "IPLD", "IPLD-DAG", "Blockchain"],
    projectType: "personal",
  },
  {
    title: "Autonomys Auto-SDK",
    description:
      "Software development kit for AI and Web3 developers that simplifies interacting with the Autonomys Network for those without a deep understanding of blockchains or smart contracts.",
    imageSrc: "/images/projects/autonomys-auto-sdk.png",
    imageAlt: "Autonomys Auto-SDK",
    link: "https://www.npmjs.com/package/@autonomys/auto-consensus",
    repoLink: "https://github.com/autonomys/auto-sdk",
    badges: ["TypeScript", "SDK", "Web3", "AI", "Blockchain"],
    projectType: "work",
  },
  {
    title: "Oamo App",
    description:
      "Implement a large amount of the business logic for the Oamo app, including web3 wallets, smart contract interactions, and all web2 OAuth flows.",
    imageSrc: "/images/projects/oamo.png",
    imageAlt: "Oamo App",
    link: "https://oamo.io",
    badges: ["TypeScript", "Next.js", "React", "Web3", "Solidity", "OAuth"],
    projectType: "work",
  },
  {
    title: "MyMultisig",
    description:
      "A simple web app that allows you to create and manage multisig wallets.",
    imageSrc: "/images/projects/my-multisig.png",
    imageAlt: "MyMultisig",
    link: "https://mymultisig.app/",
    repoLink: "https://github.com/marc-aurele-besner/mymultisig-contract",
    badges: ["TypeScript", "Next.js", "React", "Web3", "Solidity"],
    projectType: "personal",
  },
  {
    title: "MarcAureleBesner.com (v2)",
    description:
      "A personal 3d portfolio website built with React and React Three Fiber",
    imageSrc: "/images/projects/marc-aurele-besner-v2.png",
    imageAlt: "MarcAureleBesner.com (v2)",
    link: "https://v2.marcaurelebesner.com/",
    repoLink: "https://github.com/marc-aurele-besner/marcaurelebesner.com-v2",
    badges: ["TypeScript", "Three.js", "React"],
    projectType: "personal",
  },
  {
    title: "CollageOfMyself",
    description:
      "A 3d NFTs Gallery built with Next.js, React Three Fiber for a personal NFT collection.",
    imageSrc: "/images/projects/collage-of-myself.png",
    imageAlt: "CollageOfMyself",
    link: "https://collageofmyself.com/",
    repoLink: "https://github.com/collageofmyself/collageofmyself-contract",
    badges: ["TypeScript", "Next.js", "React", "Web3", "Solidity"],
    projectType: "personal",
  },
  {
    title: "PlantSwap Finance",
    description:
      "A decentralized finance (DeFi) platform built with React to provide a user-friendly interface for interacting with multiple smart contracts.",
    imageSrc: "/images/projects/plantswap.png",
    imageAlt: "PlantSwap Finance",
    link: "https://plantswap.finance/",
    repoLink: "https://github.com/PlantSwapFinance/plantswapfinance-contracts",
    badges: ["TypeScript", "Next.js", "React", "Web3", "Solidity"],
    projectType: "personal",
  },
  {
    title: "Golf Alpine",
    description:
      "A simple web app for a local golf club, allowing you to book tee times and view the scorecards and other information.",
    imageSrc: "/images/projects/golf-alpine.png",
    imageAlt: "Golf Alpine",
    link: "https://golfalpine.ca/",
    repoLink: "https://github.com/marc-aurele-besner/golfalpine.ca",
    badges: ["TypeScript", "React", "CSS"],
    projectType: "personal",
  },
  {
    title: "MarcAureleBesner.com (v1)",
    description: "A very simple portfolio website built with React",
    imageSrc: "/images/projects/marc-aurele-besner-v1.png",
    imageAlt: "MarcAureleBesner.com (v1)",
    link: "https://v1.marcaurelebesner.com/",
    repoLink: "https://github.com/marc-aurele-besner/marcaurelebesner.com",
    badges: ["React", "CSS"],
    projectType: "personal",
  },
];
