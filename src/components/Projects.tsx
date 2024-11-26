"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Badge from "./Badge";

export default function Projects() {
  return (
    <motion.section
      className="min-h-screen flex flex-col justify-center py-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-8 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Projects</h2>
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center border-2 border-lightCyan p-6 rounded-lg"
          >
            <Image
              src={`https://via.placeholder.com/150?text=Project+${index + 1}`}
              alt={`Project ${index + 1}`}
              className="w-full md:w-1/3 rounded-lg mb-4 md:mb-0 md:mr-6"
            />
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">
                Project {index + 1}
              </h3>
              <p className="text-lg">
                This is a brief description of Project{" "}
                {index + 1}. It showcases some of the work and technologies
                used.
              </p>
              <div className="flex space-x-2 mt-2">
                <Badge text="React" />
                <Badge text="Next.js" />
                <Badge text="Tailwind CSS" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
