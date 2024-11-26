import { motion } from "framer-motion";
import Badge from "./Badge";

export default function Experience() {
  return (
    <motion.section
      className="min-h-screen flex flex-col items-center justify-center py-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-3xl">
        <h2 className="text-3xl font-bold">Experience</h2>
        <div className="mt-4 text-lg">
          <h3 className="font-semibold">
            Senior Product Engineer at Autonomys
          </h3>
          <p>
            Apr 2024 - Present · Palo Alto, California, United States · Remote
          </p>
          <p>
            Building the foundation layer for AI & Web 3.0, focusing on
            full-stack development with Next.js, TypeScript, and Solidity.
          </p>
          <div className="flex space-x-2 mt-2">
            <Badge text="Solidity" />
            <Badge text="TypeScript" />
            <Badge text="React.js" />
            <Badge text="Next.js" />
            <Badge text="Polkadot.js" />
            <Badge text="Python" />
            <Badge text="MetaMask Snap" />
          </div>
        </div>
        <div className="mt-6 text-lg">
          <h3 className="font-semibold">
            Full-Stack Web3 & Solidity Engineer at Oamo
          </h3>
          <p>
            Mar 2023 - Apr 2024 · Montreal, Quebec, Canada · Remote
          </p>
          <p>
            As a key member of a small, early-stage team at Oamo, I played a
            pivotal role in building two web applications—one customer-facing
            and another for organizational use. My contributions spanned across
            several critical areas:
          </p>
          <ul className="list-disc ml-5">
            <li>
              Smart Contract Development: Authored smart contracts for reward
              payouts and profile management, seamlessly integrating these with
              the business logic.
            </li>
            <li>
              Decentralized Systems Integration: Implemented features using
              Ceramic Network (decentralized database) and implemented
              encryption/decryption flows via Lit Protocol.
            </li>
            <li>
              Digital Identity Management: Handled Decentralized Identifiers
              (DIDs), ensuring robust identity verification and profile
              management processes.
            </li>
            <li>
              Core Business Logic: Envisioned, planned, and implemented
              significant portions of the core business logic, focusing on Sybil
              attack protection and developing a comprehensive user profile
              system.
            </li>
          </ul>
          <p>
            My role emphasized delivering holistic solutions in a dynamic
            startup setting, enhancing user engagement and operational
            efficiency through cutting-edge Web3 technologies.
          </p>
          <div className="flex space-x-2 mt-2">
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
        <div className="mt-6 text-lg">
          <h3 className="font-semibold">Smart Contract Engineer at Gluwa</h3>
          <p>
            Feb 2022 - 2023 · San Francisco, California, United States · Remote
          </p>
          <p>
            Core Responsibilities: Developed and tested smart contracts for
            financial applications including staking, DAOs, and multi-signature
            wallets using Solidity, Hardhat, and Foundry.
          </p>
          <p>
            Tool Development: Engineered tools to enhance smart contract
            interaction and efficiency for developers not specialized in Web3
            technologies:
          </p>
          <ul className="list-disc ml-5">
            <li>
              UI Dashboard: Facilitated easier contract interaction for
              developers unfamiliar with Solidity.
            </li>
            <li>
              Automated Reporting: Provided tools for streamlined performance
              and transaction monitoring.
            </li>
            <li>
              Malicious Transaction Detection: Improved security with proactive
              detection systems.
            </li>
          </ul>
          <div className="flex space-x-2 mt-2">
            <Badge text="Solidity" />
            <Badge text="Smart Contracts" />
            <Badge text="Security" />
            <Badge text="Ethers.js" />
            <Badge text="React.js" />
            <Badge text="Ethereum" />
          </div>
        </div>
        <div className="mt-6 text-lg">
          <h3 className="font-semibold">
            Blockchain Programming & Smart Contracts Instructor at Indigo
            Blockchain School
          </h3>
          <p>
            Jan 2023 - Apr 2023 · France · Remote
          </p>
          <p>
            Led a hands-on course on Blockchain Programming & Smart Contracts,
            teaching students how to write, test, and deploy smart contracts in
            Solidity using Hardhat and Foundry. Key projects included:
          </p>
          <ul className="list-disc ml-5">
            <li>
              NFT Contracts: Guided students through the creation of NFTs.
            </li>
            <li>
              NFT Marketplace Contracts: Collaborated on developing functional
              NFT marketplaces.
            </li>
            <li>
              Multi-signature Wallets: Developed secure multi-signature contract
              implementations.
            </li>
          </ul>
          <p>
            This course was highly interactive, focusing not only on
            demonstrating coding techniques but also on engaging students in
            writing code collaboratively. I actively participated in coding
            alongside students, reviewing and debugging their work, and teaching
            essential skills such as using GitHub and conducting peer code
            reviews.
          </p>
          <div className="flex space-x-2 mt-2">
            <Badge text="Communication" />
            <Badge text="Ethereum" />
            <Badge text="Smart Contracts" />
            <Badge text="Online Teaching" />
            <Badge text="Solidity" />
            <Badge text="Blockchain" />
          </div>
        </div>
        <div className="mt-6 text-lg">
          <h3 className="font-semibold">Développeur at Collage of Myself</h3>
          <p>
            Dec 2021 - 2022 · Remote
          </p>
          <p>
            In this self-directed project, I developed a portfolio piece that
            combined blockchain technology with a creative 3D web experience.
            Key highlights include:
          </p>
          <ul className="list-disc ml-5">
            <li>
              NFT Smart Contract Creation: Authored a smart contract for NFTs,
              enabling the secure minting and management of digital assets.
            </li>
            <li>
              3D Web Gallery Development: Utilized Three.js to build an
              interactive 3D web gallery that allowed users to view, mint, and
              manage their NFTs.
            </li>
            <li>
              User Experience Design: Crafted a dedicated holder section to
              enhance user engagement and interaction with the digital art
              pieces.
            </li>
          </ul>
          <p>
            This project showcased my ability to integrate advanced web
            technologies and blockchain to create a unique and immersive digital
            art experience, enhancing my portfolio in both technical scope and
            creative execution.
          </p>
          <div className="flex space-x-2 mt-2">
            <Badge text="Solidity" />
            <Badge text="TypeScript" />
            <Badge text="React Three Fiber" />
            <Badge text="React" />
            <Badge text="Ethers.js" />
          </div>
        </div>
        <div className="mt-6 text-lg">
          <h3 className="font-semibold">Developer at Plantswap</h3>
          <p>
            May 2021 - 2022 · 9 mos
          </p>
          <p>
            [dev in prod] Development of a decentralized autonomous foundation
            focused on helping ecological non-profits, with the help of
            decentralized finance and gamification.
          </p>
          <div className="flex space-x-2 mt-2">
            <Badge text="React.js" />
            <Badge text="Solidity" />
            <Badge text="Ethers.js" />
            <Badge text="Ethereum" />
            <Badge text="Smart Contracts" />
            <Badge text="TypeScript" />
          </div>
        </div>
        <div className="mt-6 text-lg">
          <h3 className="font-semibold">
            Technical Support Specialist at PayFacto
          </h3>
          <p>
            Jun 2020 - Apr 2021 · 11 mos · Montreal, Quebec, Canada · Remote
          </p>
          <div className="flex space-x-2 mt-2">
            <Badge text="PHP" />
            <Badge text="WordPress" />
            <Badge text="Node.js" />
            <Badge text="MySQL" />
            <Badge text="Employee Training" />
          </div>
        </div>
        <div className="mt-6 text-lg">
          <h3 className="font-semibold">Content Creator at YouTube</h3>
          <p>
            Aug 2019 - Nov 2019 · 4 mos · Canada
          </p>
          <p>
            Cryptocurrency News Presenter
          </p>
          <div className="flex space-x-2 mt-2">
            <Badge text="Blockchain" />
            <Badge text="Video Editing" />
            <Badge text="Content Creation" />
            <Badge text="YouTube" />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
