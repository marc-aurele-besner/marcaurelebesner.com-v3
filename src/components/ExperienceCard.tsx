"use client";

import { ExperienceData } from "@/constants/experience";
import { motion } from "framer-motion";
import Link from "next/link";
import { FC } from "react";
import Badge from "./Badge";
import GlassCard from "./GlassCard";

interface ExperienceCardProps extends ExperienceData {
  minimal?: boolean;
}

export const ExperienceCard: FC<ExperienceCardProps> = ({
  slug,
  title,
  company,
  location,
  type,
  startDate,
  endDate,
  summary,
  skills,
  companyUrl,
  isWeb3,
  minimal = false,
}) => {
  if (minimal) {
    return (
      <motion.article
        className="group"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <GlassCard className="p-4 sm:p-5 hover:scale-[1.01] transition-transform duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h3 className="font-semibold text-lg text-slate-900 dark:text-white/95">
                {title} at {company}
              </h3>
              <p className="text-sm text-slate-500 dark:text-grayTone">
                {startDate} - {endDate}
              </p>
            </div>
            <Link
              href={`/experience/${slug}`}
              className="text-[var(--accent)] hover:brightness-110 transition-all duration-200 flex items-center gap-1.5 font-medium text-sm hover:gap-2"
            >
              Read more{" "}
              <span className="text-sm transition-transform group-hover:translate-x-0.5">
                &rarr;
              </span>
            </Link>
          </div>
        </GlassCard>
      </motion.article>
    );
  }

  return (
    <motion.article
      className="group"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <GlassCard className="p-6 lg:p-8 hover:scale-[1.01] transition-transform duration-300">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
              <div>
                <h3 className="font-bold text-xl sm:text-2xl text-slate-900 dark:text-white/95 group-hover:text-[var(--accent)] transition-colors duration-300">
                  {title}
                </h3>
                <p className="text-base sm:text-lg text-slate-700 dark:text-gray-200/90 mt-1">
                  {companyUrl ? (
                    <a
                      href={companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[var(--accent)] transition-colors"
                    >
                      {company}
                    </a>
                  ) : (
                    company
                  )}
                </p>
              </div>
              <div className="text-sm text-slate-500 dark:text-grayTone text-right">
                <p>{startDate} - {endDate}</p>
                <p className="capitalize">{location} · {type}</p>
              </div>
            </div>

            <p className="text-slate-700 dark:text-gray-200/90 leading-relaxed mb-4">
              {summary}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {skills.slice(0, 6).map((skill) => (
                <Badge key={skill} text={skill} />
              ))}
              {skills.length > 6 && (
                <span className="text-sm text-slate-500 dark:text-grayTone self-center">
                  +{skills.length - 6} more
                </span>
              )}
            </div>

            <Link
              href={`/experience/${slug}`}
              className="inline-flex items-center gap-1.5 text-[var(--accent)] hover:brightness-110 transition-all duration-200 font-medium text-sm hover:gap-2"
            >
              Read more{" "}
              <span className="text-sm transition-transform group-hover:translate-x-0.5">
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </GlassCard>
    </motion.article>
  );
};
