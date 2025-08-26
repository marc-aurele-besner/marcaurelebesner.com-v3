"use client";

import { motion } from "framer-motion";
import Badge from "./Badge";
import SectionHeading from "./SectionHeading";
import GlassCard from "./GlassCard";

export default function Experience() {
  return (
    <motion.section
      id="experience"
      className="w-full flex flex-col items-center justify-start py-12 px-4 sm:px-6 lg:px-8 scroll-mt-28"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-3xl">
        <SectionHeading eyebrow="Career">Experience</SectionHeading>
        <div className="space-y-8">
          {/* Senior Software Engineer at Autonomys */}
          <GlassCard className="p-6">
            <div className="text-base sm:text-lg">
              <h3 className="font-semibold text-xl sm:text-2xl">Senior Software Engineer at Autonomys</h3>
              <p className="text-sm sm:text-base text-gray-400">Apr 2024 - Jun 2025 · Palo Alto, California, United States · Remote</p>
              <p className="mt-2">
                As a Senior Software Engineer in the product team at Autonomys, I
                focus on hands-on development to build and enhance blockchain and
                Web3 solutions, ensuring performance, scalability, and usability
                for both end-users and developers.
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>
                  <strong>Indexer Development:</strong> Designed and implemented a
                  set of robust indexers powering the Block Explorer, enabling
                  seamless access to blockchain data.
                </li>
                <li>
                  <strong>Front-End Migration:</strong> Maintained and migrated
                  the Block Explorer front end from a React SPA to Next.js,
                  achieving significant improvements in performance, scalability,
                  and maintainability.
                </li>
                <li>
                  <strong>User Experience Enhancements:</strong> Brainstormed and
                  implemented features to enhance the Block Explorer, including a
                  staking interface, wallet integration, mainnet allocation
                  section, leaderboard functionality, and advanced search and
                  filtering capabilities.
                </li>
                <li>
                  <strong>SDK Development:</strong> Created a developer SDK to
                  streamline and simplify interaction with the consensus chain,
                  improving the developer experience.
                </li>
                <li>
                  <strong>Permanent Data Storage:</strong> Developed a proof of
                  concept for an on-chain permanent data storage tool leveraging
                  IPLD and DAG data structures.
                </li>
                <li>
                  <strong>Metamask Snap Integration:</strong> Developed a custom
                  Metamask Snap, enabling direct interaction with the Substrate
                  consensus chain through the Metamask browser extension.
                </li>
                <li>
                  <strong>EVM Testnet Tools:</strong> Built a suite of tools for
                  the testnet EVM chain, including a faucet Discord bot, a web
                  faucet, and a subgraph.
                </li>
              </ul>
              <p className="mt-2">
                This role has provided me the opportunity to contribute directly
                to both user-facing applications and developer tools, leveraging
                my technical expertise to build scalable and impactful solutions
                in the blockchain ecosystem.
              </p>
              <div className="flex flex-wrap mt-2 gap-2">
                <Badge text="Solidity" />
                <Badge text="TypeScript" />
                <Badge text="React.js" />
                <Badge text="Next.js" />
                <Badge text="Polkadot.js" />
                <Badge text="Python" />
                <Badge text="MetaMask Snap" />
                <Badge text="IPLD" />
              </div>
            </div>
          </GlassCard>

          {/* Full-Stack Web3 & Solidity Engineer at Oamo */}
          <GlassCard className="p-6">
            <div className="text-base sm:text-lg">
              <h3 className="font-semibold text-xl sm:text-2xl">Full-Stack Web3 & Solidity Engineer at Oamo</h3>
              <p className="text-sm sm:text-base text-gray-400">Mar 2023 - Apr 2024 · Montreal, Quebec, Canada · Remote</p>
              <p className="mt-2">
                As a key member of an early-stage team at Oamo, I played a pivotal
                role in building two web applications—one customer-facing and
                another for organizational use. My contributions spanned several
                critical areas:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>
                  <strong>Smart Contract Development:</strong> Authored smart
                  contracts for reward payouts and profile management, seamlessly
                  integrating these with the business logic.
                </li>
                <li>
                  <strong>Decentralized Systems Integration:</strong> Implemented
                  features using Ceramic Network (decentralized database) and
                  implemented encryption/decryption flows via Lit Protocol.
                </li>
                <li>
                  <strong>Digital Identity Management:</strong> Managed
                  Decentralized Identifiers (DIDs), ensuring robust identity
                  verification and profile management processes.
                </li>
                <li>
                  <strong>Core Business Logic:</strong> Envisioned, planned, and
                  implemented significant portions of the core business logic,
                  focusing on Sybil attack protection and developing a
                  comprehensive user profile system.
                </li>
              </ul>
              <p className="mt-2">
                My role emphasized delivering holistic solutions in a dynamic
                startup setting, enhancing user engagement and operational
                efficiency through cutting-edge Web3 technologies.
              </p>
              <div className="flex flex-wrap mt-2 gap-2">
                <Badge text="Solidity" />
                <Badge text="Web3" />
                <Badge text="Node.js" />
                <Badge text="React.js" />
                <Badge text="Next.js" />
                <Badge text="Lit Protocol" />
                <Badge text="Ceramic" />
                <Badge text="IPFS" />
              </div>
            </div>
          </GlassCard>

          {/* Smart Contract Engineer at Gluwa */}
          <GlassCard className="p-6">
            <div className="text-base sm:text-lg">
              <h3 className="font-semibold text-xl sm:text-2xl">Smart Contract Engineer at Gluwa</h3>
              <p className="text-sm sm:text-base text-gray-400">Feb 2022 - 2023 · San Francisco, California, United States · Remote</p>
              <p className="mt-2">
                <strong>Core Responsibilities:</strong> Developed and tested smart
                contracts for financial applications including staking, DAOs, and
                multi-signature wallets using Solidity, Hardhat, and Foundry.
              </p>
              <p className="mt-2">
                <strong>Tool Development:</strong> Engineered tools to enhance
                smart contract interaction and efficiency for developers not
                specialized in Web3 technologies:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>
                  <strong>UI Dashboard:</strong> Facilitated easier contract
                  interaction for developers unfamiliar with Solidity.
                </li>
                <li>
                  <strong>Automated Reporting:</strong> Provided tools for
                  streamlined performance and transaction monitoring.
                </li>
                <li>
                  <strong>Malicious Transaction Detection:</strong> Improved
                  security with proactive detection systems.
                </li>
              </ul>
              <div className="flex flex-wrap mt-2 gap-2">
                <Badge text="Solidity" />
                <Badge text="Smart Contracts" />
                <Badge text="Security" />
                <Badge text="Ethers.js" />
                <Badge text="React.js" />
                <Badge text="Ethereum" />
              </div>
            </div>
          </GlassCard>

          {/* Blockchain Programming & Smart Contracts Instructor at Indigo Blockchain School */}
          <GlassCard className="p-6">
            <div className="text-base sm:text-lg">
              <h3 className="font-semibold text-xl sm:text-2xl">Blockchain Programming & Smart Contracts Instructor at Indigo Blockchain School</h3>
              <p className="text-sm sm:text-base text-gray-400">Jan 2023 - Apr 2023 · France · Remote</p>
              <p className="mt-2">
                Led a hands-on course on Blockchain Programming & Smart Contracts,
                teaching students how to write, test, and deploy smart contracts
                in Solidity using Hardhat and Foundry. Key projects included:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>
                  <strong>NFT Contracts:</strong> Guided students through the
                  creation of NFTs.
                </li>
                <li>
                  <strong>NFT Marketplace Contracts:</strong> Collaborated on
                  developing functional NFT marketplaces.
                </li>
                <li>
                  <strong>Multi-signature Wallets:</strong> Developed secure
                  multi-signature contract implementations.
                </li>
              </ul>
              <p className="mt-2">
                This course was highly interactive, focusing not only on
                demonstrating coding techniques but also on engaging students in
                writing code collaboratively. I actively participated in coding
                alongside students, reviewing and debugging their work, and
                teaching essential skills such as using GitHub and conducting peer
                code reviews.
              </p>
              <div className="flex flex-wrap mt-2 gap-2">
                <Badge text="Communication" />
                <Badge text="Ethereum" />
                <Badge text="Smart Contracts" />
                <Badge text="Online Teaching" />
                <Badge text="Solidity" />
                <Badge text="Blockchain" />
              </div>
            </div>
          </GlassCard>

          {/* Self-Directed Projects */}
          <GlassCard className="p-6">
            <div className="text-base sm:text-lg">
              <h3 className="font-semibold text-xl sm:text-2xl">Self-Directed Projects</h3>
              <p className="text-sm sm:text-base text-gray-400">May 2021 - 2022 · Remote</p>
              <p className="mt-2">
                Engaged in multiple self-directed projects focused on blockchain
                technology and web development. Key projects include:
              </p>

              {/* Développeur at Collage of Myself */}
              <div className="mt-4">
                <h4 className="font-semibold text-lg sm:text-xl">Développeur at Collage of Myself</h4>
                <p className="mt-1">
                  Developed a portfolio piece that combined blockchain technology
                  with a creative 3D web experience. Key highlights include:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>
                    <strong>NFT Smart Contract Creation:</strong> Authored a smart
                    contract for NFTs, enabling the secure minting and management
                    of digital assets.
                  </li>
                  <li>
                    <strong>3D Web Gallery Development:</strong> Utilized Three.js
                    to build an interactive 3D web gallery that allowed users to
                    view, mint, and manage their NFTs.
                  </li>
                  <li>
                    <strong>User Experience Design:</strong> Crafted a dedicated
                    holder section to enhance user engagement and interaction with
                    the digital art pieces.
                  </li>
                </ul>
                <p className="mt-2">
                  This project showcased my ability to integrate advanced web
                  technologies and blockchain to create a unique and immersive
                  digital art experience, enhancing my portfolio in both technical
                  scope and creative execution.
                </p>
                <div className="flex flex-wrap mt-2 gap-2">
                  <Badge text="Solidity" />
                  <Badge text="TypeScript" />
                  <Badge text="React Three Fiber" />
                  <Badge text="React" />
                  <Badge text="Ethers.js" />
                </div>
              </div>

              {/* PlantSwap Finance */}
              <div className="mt-4">
                <h4 className="font-semibold text-lg sm:text-xl">Developer at PlantSwap Finance</h4>
                <p className="mt-1">
                  Developed PlantSwap Finance, a decentralized exchange (DEX) and
                  farming DeFi platform. Leveraged a fork of PancakeSwap v2 to
                  build and deploy robust smart contracts, and customized the
                  React frontend to enhance user experience and functionality. Key
                  achievements include:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>
                    <strong>Smart Contract Development:</strong> Forked and
                    extended PancakeSwap v2 smart contracts to support additional
                    farming mechanisms and liquidity pools, ensuring security and
                    efficiency.
                  </li>
                  <li>
                    <strong>Deployment & Testing:</strong> Deployed smart
                    contracts on Binance Smart Chain (BSC) testnet and mainnet,
                    utilizing Hardhat for comprehensive testing and optimization.
                  </li>
                  <li>
                    <strong>Frontend Customization:</strong> Enhanced the React
                    frontend by integrating custom features such as advanced
                    staking options, yield farming dashboards, and real-time
                    transaction tracking.
                  </li>
                  <li>
                    <strong>Feature Expansion:</strong> Implemented additional
                    functionalities including liquidity provider incentives,
                    multi-tier farming pools, and user-friendly interfaces for
                    seamless interaction with the platform.
                  </li>
                  <li>
                    <strong>Performance Optimization:</strong> Optimized frontend
                    performance and responsiveness, ensuring a smooth user
                    experience across various devices.
                  </li>
                </ul>
                <p className="mt-2">
                  PlantSwap Finance demonstrates my capability to build scalable
                  and secure DeFi platforms by combining in-depth smart contract
                  development with dynamic frontend enhancements, fostering an
                  engaging and efficient ecosystem for users.
                </p>
                <div className="flex flex-wrap mt-2 gap-2">
                  <Badge text="Solidity" />
                  <Badge text="TypeScript" />
                  <Badge text="React" />
                  <Badge text="Hardhat" />
                  <Badge text="Ethers.js" />
                  <Badge text="Binance Smart Chain" />
                  <Badge text="DeFi" />
                  <Badge text="PancakeSwap Fork" />
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Technical Support Specialist at PayFacto */}
          <GlassCard className="p-6">
            <div className="text-base sm:text-lg">
              <h3 className="font-semibold text-xl sm:text-2xl">Technical Support Specialist at PayFacto</h3>
              <p className="text-sm sm:text-base text-gray-400">Jun 2020 - Apr 2021 · 11 mos · Montreal, Quebec, Canada · Remote</p>
              <p className="mt-2">
                Provided technical support for the company&apos;s point of sale
                (POS) software, assisting both colleagues and customers in
                troubleshooting issues and optimizing the use of internal tools to
                ensure less friction.
              </p>
              <p className="mt-2">
                Enhanced the PHP/SQL backend to streamline workflows, improve data
                management, and increase the overall efficiency of the support
                team. These improvements facilitated easier maintenance and
                scalability of the POS software.
              </p>
              <p className="mt-2">
                Developed multiple Zoho plugins to integrate various tools
                directly into the main support dashboard. This integration reduced
                manual workflow steps, minimized errors, and increased
                productivity by automating routine tasks.
              </p>
              <div className="flex flex-wrap mt-2 gap-2">
                <Badge text="PHP" />
                <Badge text="WordPress" />
                <Badge text="Node.js" />
                <Badge text="MySQL" />
                <Badge text="Employee Training" />
                <Badge text="Zoho" />
                <Badge text="Plugin Development" />
              </div>
            </div>
          </GlassCard>

          {/* Content Creator at YouTube */}
          <GlassCard className="p-6">
            <div className="text-base sm:text-lg">
              <h3 className="font-semibold text-xl sm:text-2xl">Content Creator at YouTube</h3>
              <p className="text-sm sm:text-base text-gray-400">Aug 2019 - Nov 2019 · 4 mos · Canada</p>
              <p className="mt-2">Cryptocurrency News Presenter</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>
                  <strong>Content Production:</strong> Created and published
                  educational content 3-4 times a week, focusing on cryptocurrency
                  news and trends.
                </li>
                <li>
                  <strong>Skill Development:</strong> Learned and applied various
                  skills including public speaking, light engineering, sound
                  engineering, and video editing to enhance video quality.
                </li>
                <li>
                  <strong>Technical Setup:</strong> Managed camera operations,
                  lighting setups, and audio configurations to ensure
                  professional-grade recordings.
                </li>
                <li>
                  <strong>Social Media Promotion:</strong> Executed self-promotion
                  strategies across multiple social media platforms to increase
                  channel visibility and audience engagement.
                </li>
                <li>
                  <strong>Audience Engagement:</strong> Interacted with viewers
                  through comments and live sessions to build a community and
                  gather feedback for content improvement.
                </li>
                <li>
                  <strong>Analytics Monitoring:</strong> Analyzed video
                  performance metrics to optimize content strategy and increase
                  subscriber growth.
                </li>
              </ul>
              <div className="flex flex-wrap mt-2 gap-2">
                <Badge text="Blockchain" />
                <Badge text="Video Editing" />
                <Badge text="Content Creation" />
                <Badge text="YouTube" />
                <Badge text="Public Speaking" />
                <Badge text="Sound Engineering" />
                <Badge text="Lighting Setup" />
                <Badge text="Social Media Marketing" />
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </motion.section>
  );
}
