import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.section
      className="flex items-start justify-center pt-4 pb-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-3xl">
        <h2 className="text-3xl font-bold">About Me</h2>
        <p className="mt-4 text-lg">
          Hi there! My name is Marc-Aurèle (or Mark), and I&apos;m a Web3
          full-stack engineer with a passion for blockchain technology, smart
          contract development, and building open-source tools.
        </p>
        <p className="mt-4 text-lg">
          I truly believe that blockchain technology has the potential to
          revolutionize the way we interact online, and I&apos;m committed to
          contributing to its development. I&apos;m always exploring new
          technologies and frameworks to stay ahead of the curve and bring fresh
          ideas to the table.
        </p>
        <p className="mt-4 text-lg">
          I&apos;m dedicated to sharing my knowledge and helping other
          developers. Teaching and mentoring are my passions, and I believe that
          by helping others, we can all grow and advance together.
        </p>
      </div>
    </motion.section>
  );
}
