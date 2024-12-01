import { motion } from "framer-motion";
import Badge from "./Badge";

export default function Experience() {
  return (
    <motion.section
      className="w-full flex flex-col items-center justify-start py-12 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-3xl">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Experience</h2>
        <div className="space-y-8">
          <div className="text-base sm:text-lg">
            <h3 className="font-semibold text-xl sm:text-2xl">
              Senior Software Engineer at Autonomys
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Apr 2024 - Present · Palo Alto, California, United States · Remote
            </p>
            <p className="mt-2">
              As a Senior Software Engineer, working in the product team at Autonomys, I focus on hands-on development to build and enhance blockchain and Web3 solutions, ensuring performance, scalability, and usability for both end-users and developers.
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Indexer Development: Designed and implemented a set of robust indexers powering the Block Explorer, enabling seamless access to blockchain data.</li>
              <li>Front-End Migration: Maintained and migrated the Block Explorer front end from a React SPA to Next.js, achieving significant improvements in performance, scalability, and maintainability.</li>
              <li>User Experience Enhancements: Brainstormed and implemented features to enhance the Block Explorer, including a staking interface, wallet integration, mainnet allocation section, leaderboard functionality, and advanced search and filtering capabilities.</li>
              <li>SDK Development: Created a developer SDK to streamline and simplify interaction with the consensus chain, improving the developer experience.</li>
              <li>Permanent Data Storage: Brainstormed and developed a first proof of concept for an on-chain permanent data storage tool leveraging IPLD and DAG data structure.</li>
              <li>Metamask Snap Integration: Developed a custom Metamask Snap, enabling direct interaction with the Substrate consensus chain through the Metamask browser extension.</li>
              <li>EVM Testnet Tools: Built a suite of tools for the testnet EVM chain, including a faucet Discord bot, a web faucet, and a subgraph.</li>
            </ul>
            <p className="mt-2">
              This role has provided me the opportunity to contribute directly to both user-facing applications and developer tools, leveraging my technical expertise to build scalable and impactful solutions in the blockchain ecosystem.
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
          <div className="text-base sm:text-lg">
            <h3 className="font-semibold text-xl sm:text-2xl">
              Full-Stack Web3 & Solidity Engineer at Oamo
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Mar 2023 - Apr 2024 · Montreal, Quebec, Canada · Remote
            </p>
            <p className="mt-2">
              As a key member of a small, early-stage team at Oamo, I played a pivotal role in building two web applications—one customer-facing and another for organizational use. My contributions spanned across several critical areas:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Smart Contract Development: Authored smart contracts for reward payouts and profile management, seamlessly integrating these with the business logic.</li>
              <li>Decentralized Systems Integration: Implemented features using Ceramic Network (decentralized database) and implemented encryption/decryption flows via Lit Protocol.</li>
              <li>Digital Identity Management: Handled Decentralized Identifiers (DIDs), ensuring robust identity verification and profile management processes.</li>
              <li>Core Business Logic: Envisioned, planned, and implemented significant portions of the core business logic, focusing on Sybil attack protection and developing a comprehensive user profile system.</li>
            </ul>
            <p className="mt-2">
              My role emphasized delivering holistic solutions in a dynamic startup setting, enhancing user engagement and operational efficiency through cutting-edge Web3 technologies.
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
        </div>
      </div>
    </motion.section>
  );
}
