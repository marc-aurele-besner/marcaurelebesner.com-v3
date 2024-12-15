import { ProjectData } from "@/constants/projects";
import Image from "next/image";
import { FC } from "react";
import Badge from "./Badge";

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
  <div className="flex flex-col md:flex-row items-center border-2 border-lightCyan p-6 rounded-lg mt-6">
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
          className="w-full max-w-xs sm:max-w-sm md:max-w-full rounded-lg mb-2 md:mb-0 md:mr-6 hover:opacity-90 transition duration-300"
          width={300}
          height={300}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <button
          className={`inline-block px-3 py-1 text-xs sm:text-sm font-semibold rounded-full border-2 mt-2 ${
            projectType === "personal"
              ? "border-lightCyan border-dotted text-lightCyan bg-transparent hover:bg-lightCyan"
              : "border-lightCyan text-lightCyan bg-transparent hover:bg-lightCyan"
          } transition duration-300`}
        >
          {projectType === "personal" ? "Personal Project" : "Work Project"}
        </button>
      </div>
    </a>
    <div className="flex-1 ml-0 md:ml-4 mt-4 md:mt-0">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <h3 className="text-lg sm:text-xl font-semibold">{title}</h3>
        {repoLink && (
          <a
            href={repoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lightCyan hover:text-cyan-400 transition duration-300 flex items-center gap-1 mt-2 sm:mt-0"
          >
            Repository <span className="text-sm">↗</span>
          </a>
        )}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lightCyan hover:text-cyan-400 transition duration-300 flex items-center gap-1 mt-2 sm:mt-0"
          >
            Website <span className="text-sm">↗</span>
          </a>
        )}
      </div>
      <p className="text-sm sm:text-lg mt-2">{description}</p>
      <div className="flex flex-wrap space-x-2 mt-2">
        {badges.map((badge) => (
          <Badge key={badge} text={badge} />
        ))}
      </div>
    </div>
  </div>
);
