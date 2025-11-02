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
    className="group mt-6 relative"
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  >
    <GlassCard className="flex flex-col md:flex-row items-center p-6 hover:border-cyber-purple/50 transition-colors">
      {/* Holographic shine overlay */}
      <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 rounded-xl bg-[linear-gradient(120deg,transparent_0%,rgba(0,217,255,0.1)_30%,rgba(139,92,246,0.1)_50%,rgba(255,0,110,0.1)_70%,transparent_100%)] animate-[shimmer_2s_ease-in-out_infinite]" />
      </div>
      
      {/* Animated border accent */}
      <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute top-0 left-0 w-20 h-[2px] bg-gradient-to-r from-cyber-blue to-transparent" />
        <div className="absolute bottom-0 right-0 w-20 h-[2px] bg-gradient-to-l from-cyber-pink to-transparent" />
      </div>

      <a href={link} target="_blank" rel="noopener noreferrer" className="w-full md:w-1/3 group/image">
        <div className="flex flex-col items-center">
          <div className="relative overflow-hidden rounded-lg">
            <Image
              src={imageSrc}
              alt={imageAlt}
              className="w-full max-w-xs sm:max-w-sm md:max-w-full rounded-lg mb-2 md:mb-0 md:mr-6 transition-all duration-500 ease-out group-hover:scale-[1.05] group-hover:brightness-110"
              width={300}
              height={300}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            {/* Image overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-cyber-blue/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
            {/* Corner frame */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyber-blue opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyber-pink opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span
            className={`inline-block px-4 py-1.5 text-xs font-mono font-bold rounded border-2 mt-3 transition-all duration-300 uppercase tracking-wider ${
              projectType === "personal"
                ? "border-cyber-purple/60 text-cyber-purple bg-cyber-purple/10 hover:bg-cyber-purple/20 hover:shadow-[0_0_15px_rgba(139,92,246,0.4)]"
                : "border-cyber-blue/60 text-cyber-blue bg-cyber-blue/10 hover:bg-cyber-blue/20 hover:shadow-[0_0_15px_rgba(0,217,255,0.4)]"
            }`}
            aria-label={`Project type: ${projectType === "personal" ? "Personal Project" : "Work Project"}`}
          >
            {projectType === "personal" ? "⚡ Personal" : "🏢 Work"}
          </span>
        </div>
      </a>
      <div className="flex-1 md:ml-4 mt-4 md:mt-0 w-full relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white/95 group-hover:text-cyber-blue dark:group-hover:text-cyber-blue transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-3">
            {repoLink && (
              <a
                href={repoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link relative text-cyber-blue dark:text-cyber-blue hover:text-cyber-purple font-semibold transition-colors duration-200 flex items-center gap-1 text-sm"
              >
                <span className="relative">
                  Repository
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyber-purple transform scale-x-0 group-hover/link:scale-x-100 transition-transform origin-left" />
                </span>
                <span className="text-sm transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform">↗</span>
              </a>
            )}
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link relative text-cyber-blue dark:text-cyber-blue hover:text-cyber-purple font-semibold transition-colors duration-200 flex items-center gap-1 text-sm"
              >
                <span className="relative">
                  Website
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyber-purple transform scale-x-0 group-hover/link:scale-x-100 transition-transform origin-left" />
                </span>
                <span className="text-sm transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform">↗</span>
              </a>
            )}
          </div>
        </div>
        <p className="text-sm sm:text-base mt-3 text-slate-700 dark:text-gray-300/90 leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {badges.map((badge) => (
            <Badge key={badge} text={badge} />
          ))}
        </div>
      </div>
    </GlassCard>
  </motion.article>
);
