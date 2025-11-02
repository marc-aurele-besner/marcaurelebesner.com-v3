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

      <a href={link} target="_blank" rel="noopener noreferrer" className="w-full md:w-1/3 group/image">
        <div className="flex flex-col items-center">
          <Image
            src={imageSrc}
            alt={imageAlt}
            className="w-full max-w-xs sm:max-w-sm md:max-w-full rounded-lg mb-2 md:mb-0 md:mr-6 transition-all duration-500 ease-out group-hover:scale-[1.02] group-hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] border border-transparent group-hover:border-[var(--cyber-cyan)]/50"
            width={300}
            height={300}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <span
            className={`inline-block px-3 py-1 text-xs sm:text-sm font-semibold rounded-full border mt-2 transition-all duration-300 ${
              projectType === "personal"
                ? "border-[var(--accent-weak)] dark:border-[var(--cyber-cyan)]/50 text-[var(--accent)] dark:text-[var(--cyber-cyan)] bg-transparent hover:bg-[var(--accent-bg-weak)] dark:hover:bg-[var(--cyber-cyan)]/10 hover:shadow-[0_0_15px_rgba(0,255,255,0.4)]"
                : "border-[var(--accent-weak)] dark:border-[var(--cyber-cyan)]/50 text-[var(--accent)] dark:text-[var(--cyber-cyan)] bg-transparent hover:bg-[var(--accent-bg-weak)] dark:hover:bg-[var(--cyber-cyan)]/10 hover:shadow-[0_0_15px_rgba(0,255,255,0.4)]"
            }`}
            aria-label={`Project type: ${projectType === "personal" ? "Personal Project" : "Work Project"}`}
          >
            {projectType === "personal" ? "Personal Project" : "Work Project"}
          </span>
        </div>
      </a>
      <div className="flex-1 md:ml-4 mt-4 md:mt-0 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900 dark:text-white/95 group-hover:text-[var(--accent)] dark:group-hover:text-[var(--cyber-cyan)] transition-all duration-300">{title}</h3>
          <div className="flex items-center gap-4">
            {repoLink && (
              <a
                href={repoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] dark:text-[var(--cyber-cyan)] hover:brightness-110 transition-all duration-200 flex items-center gap-1 hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]"
              >
                Repository <span className="text-sm">↗</span>
              </a>
            )}
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] dark:text-[var(--cyber-cyan)] hover:brightness-110 transition-all duration-200 flex items-center gap-1 hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]"
              >
                Website <span className="text-sm">↗</span>
              </a>
            )}
          </div>
        </div>
        <p className="text-sm sm:text-lg mt-2 text-slate-700 dark:text-gray-200/90">{description}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {badges.map((badge) => (
            <Badge key={badge} text={badge} />
          ))}
        </div>
      </div>
    </GlassCard>
  </motion.article>
);
