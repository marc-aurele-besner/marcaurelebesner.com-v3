export interface ProjectData {
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    link: string;
    linkText: string;
    badges: string[];
    projectType: 'personal' | 'work';
  }
  
  export const projects: ProjectData[] = [
    {
      title: 'AI3.info',
      description:
        'Simple web app that provides real-time insights into the Autonomys Network through an interactive 3D interface. Built with Next.js, React Three Fiber, and powered by the Auto SDK.',
      imageSrc: '/images/projects/ai3-info.png',
      imageAlt: 'AI3.info',
      link: 'https://ai3.info',
      linkText: 'Visit Website',
      badges: ['React', 'Next.js', 'Three.js', 'React Three Fiber', 'Tailwind CSS'],
      projectType: 'personal',
    },
    {
      title: 'Astral Block Explorer',
      description:
        'Web application for interacting with the Autonomys Network and exploring the consensus chain. Register operators, stake, and nominate on Astral.',
      imageSrc: '/images/projects/astral-block-explorer.png',
      imageAlt: 'Astral Block Explorer',
      link: 'https://astral.autonomys.xyz/',
      linkText: 'Visit Website',
      badges: ['Next.js', 'React', 'Polkadot.js', 'TypeScript', 'GraphQL'],
      projectType: 'work',
    },
    {
      title: 'Autonomys Auto-SDK',
      description:
        'Software development kit for AI and Web3 developers that simplifies interacting with the Autonomys Network for those without a deep understanding of blockchains or smart contracts.',
      imageSrc: '/images/projects/autonomys-auto-sdk.png',
      imageAlt: 'Autonomys Auto-SDK',
      link: 'https://github.com/autonomys/auto-sdk',
      linkText: 'Visit Repository',
      badges: ['TypeScript', 'SDK', 'Web3', 'AI', 'Blockchain'],
      projectType: 'work',
    },
    {
      title: 'Oamo App',
      description:
        'Implement a large amount of the business logic for the Oamo app, including web3 wallets, smart contract interactions, and all web2 OAuth flows.',
      imageSrc: '/images/projects/oamo.png',
      imageAlt: 'Oamo App',
      link: 'https://oamo.io',
      linkText: 'Visit Website',
      badges: ['TypeScript', 'Next.js', 'React', 'Web3', 'Solidity', 'OAuth'],
      projectType: 'work',
    },
  ];