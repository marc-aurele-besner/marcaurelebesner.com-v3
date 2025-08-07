import { ProjectData } from "@/constants/projects";
import Image from "next/image";
import { FC } from "react";
import Badge from "./Badge";
import { motion } from "framer-motion";

export const Project: FC<ProjectData> = ({
  title,
  description,
  imageSrc,
  imageAlt,
  link,
  repoLink,
  badges,
  projectType,
}) => (
  <motion.article
    className="group flex flex-col md:flex-row items-center border border-lightCyan/30 hover:border-lightCyan/60 p-6 rounded-lg mt-6 bg-white/0 hover:bg-white/[0.02] shadow-sm hover:shadow-md transition-all duration-300"
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  >
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full md:w-1/3"
    >
      <div className="flex flex-col items-center">
        <Image
          src={imageSrc}
          alt={imageAlt}
          className="w-full max-w-xs sm:max-w-sm md:max-w-full rounded-lg mb-2 md:mb-0 md:mr-6 transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          width={300}
          height={300}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <button
          className={`inline-block px-3 py-1 text-xs sm:text-sm font-semibold rounded-full border mt-2 transition-colors duration-300 ${
            projectType === "personal"
              ? "border-lightCyan/60 text-lightCyan bg-transparent hover:bg-lightCyan/10"
              : "border-lightCyan/60 text-lightCyan bg-transparent hover:bg-lightCyan/10"
          }`}
        >
          {projectType === "personal" ? "Personal Project" : "Work Project"}
        </button>
      </div>
    </a>
    <div className="flex-1 md:ml-4 mt-4 md:mt-0 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h3 className="text-lg sm:text-xl font-semibold">{title}</h3>
        <div className="flex items-center gap-4">
          {repoLink && (
            <a
              href={repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lightCyan hover:text-cyan-400 transition-colors duration-200 flex items-center gap-1"
            >
              Repository <span className="text-sm">↗</span>
            </a>
          )}
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lightCyan hover:text-cyan-400 transition-colors duration-200 flex items-center gap-1"
            >
              Website <span className="text-sm">↗</span>
            </a>
          )}
        </div>
      </div>
      <p className="text-sm sm:text-lg mt-2">{description}</p>
      <div className="flex flex-wrap gap-2 mt-3">
        {badges.map((badge) => (
          <Badge key={badge} text={badge} />
        ))}
      </div>
    </div>
  </motion.article>
);
