import { ProjectData } from "@/constants/projects";
import { trackProjectLink } from "@/utils/analytics";
import { motion } from "framer-motion";
import Image from "next/image";
import { FC } from "react";
import Badge from "./Badge";
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
    className="group"
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  >
    <GlassCard className="flex flex-col lg:flex-row items-start p-6 lg:p-8 hover:scale-[1.01] transition-transform duration-300">
      {/* Shine overlay */}
      <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 rounded-xl bg-[linear-gradient(120deg,transparent_0%,rgba(0,0,0,0.04)_30%,transparent_60%)] dark:bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.06)_30%,transparent_60%)]" />
      </div>

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          link ? trackProjectLink(title, "website", link) : undefined
        }
        className="w-full lg:w-2/5 flex-shrink-0 mb-6 lg:mb-0 lg:mr-8"
      >
        <div className="flex flex-col items-center lg:items-start">
          <div className="relative overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800/50">
            <Image
              src={imageSrc}
              alt={imageAlt}
              className="w-full rounded-lg transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              width={400}
              height={300}
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <span
            className={`inline-block px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-full border mt-3 transition-all duration-300 ${
              projectType === "personal"
                ? "border-[var(--accent-weak)] text-[var(--accent)] bg-transparent hover:bg-[var(--accent-bg-weak)] hover:border-[var(--accent)]"
                : "border-[var(--accent-weak)] text-[var(--accent)] bg-transparent hover:bg-[var(--accent-bg-weak)] hover:border-[var(--accent)]"
            }`}
            aria-label={`Project type: ${
              projectType === "personal" ? "Personal Project" : "Work Project"
            }`}
          >
            {projectType === "personal" ? "Personal Project" : "Work Project"}
          </span>
        </div>
      </a>
      <div className="flex-1 w-full">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white/95 group-hover:text-[var(--accent)] transition-colors duration-300">
            {title}
          </h3>
          <div className="flex items-center gap-4 flex-shrink-0">
            {repoLink && (
              <a
                href={repoLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackProjectLink(title, "repository", repoLink)}
                className="text-[var(--accent)] hover:brightness-110 transition-all duration-200 flex items-center gap-1.5 font-medium text-sm sm:text-base hover:gap-2"
              >
                Repository{" "}
                <span className="text-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>
            )}
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackProjectLink(title, "website", link)}
                className="text-[var(--accent)] hover:brightness-110 transition-all duration-200 flex items-center gap-1.5 font-medium text-sm sm:text-base hover:gap-2"
              >
                Website{" "}
                <span className="text-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>
            )}
          </div>
        </div>
        <p className="text-base sm:text-lg mt-3 text-slate-700 dark:text-gray-200/90 leading-relaxed">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {badges.map((badge) => (
            <Badge key={badge} text={badge} />
          ))}
        </div>
      </div>
    </GlassCard>
  </motion.article>
);
