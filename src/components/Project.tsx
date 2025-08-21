import { ProjectData } from "@/constants/projects";
import Image from "next/image";
import { FC } from "react";
import Badge from "./Badge";
import { motion } from "framer-motion";
import GlassCard from "./GlassCard";

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
    className="group mt-6"
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  >
    <GlassCard className="flex flex-col md:flex-row items-center p-6">
      {/* Shine overlay */}
      <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute inset-0 rounded-xl bg-[linear-gradient(120deg,transparent_0%,rgba(0,0,0,0.04)_30%,transparent_60%)] dark:bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.06)_30%,transparent_60%)]" />
      </div>

      <a href={link} target="_blank" rel="noopener noreferrer" className="w-full md:w-1/3">
        <div className="flex flex-col items-center">
          <Image
            src={imageSrc}
            alt={imageAlt}
            className="w-full max-w-xs sm:max-w-sm md:max-w-full rounded-lg mb-2 md:mb-0 md:mr-6 transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            width={300}
            height={300}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <span
            className={`inline-block px-3 py-1 text-xs sm:text-sm font-semibold rounded-full border mt-2 transition-colors duration-300 ${
              projectType === "personal"
                ? "border-[var(--accent-weak)] text-[var(--accent)] bg-transparent hover:bg-[var(--accent-bg-weak)]"
                : "border-[var(--accent-weak)] text-[var(--accent)] bg-transparent hover:bg-[var(--accent-bg-weak)]"
            }`}
            aria-label={`Project type: ${projectType === "personal" ? "Personal Project" : "Work Project"}`}
          >
            {projectType === "personal" ? "Personal Project" : "Work Project"}
          </span>
        </div>
      </a>
      <div className="flex-1 md:ml-4 mt-4 md:mt-0 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h3 className="typography-heading-4 text-[var(--foreground)]">{title}</h3>
          <div className="flex items-center gap-4">
            {repoLink && (
              <a
                href={repoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors duration-200 flex items-center gap-2 font-medium text-sm"
              >
                Repository <span>↗</span>
              </a>
            )}
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors duration-200 flex items-center gap-2 font-medium text-sm"
              >
                Website <span>↗</span>
              </a>
            )}
          </div>
        </div>
        <p className="typography-body text-[var(--foreground)]/75 mt-3">{description}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {badges.map((badge) => (
            <Badge key={badge} text={badge} />
          ))}
        </div>
      </div>
    </GlassCard>
  </motion.article>
);
