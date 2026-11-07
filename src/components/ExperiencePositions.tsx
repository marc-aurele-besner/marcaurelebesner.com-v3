import { ExperiencePosition } from "@/config/experience";
import { FC } from "react";
import DateRange from "./DateRange";

interface ExperiencePositionsProps {
  positions: ExperiencePosition[];
  className?: string;
}

/**
 * Lists each title held at one company with its own date range, newest
 * first, the way LinkedIn groups positions under a company.
 */
export const ExperiencePositions: FC<ExperiencePositionsProps> = ({
  positions,
  className = "",
}) => (
  <ul className={`space-y-1 ${className}`} aria-label="Positions">
    {positions.map((position) => (
      <li
        key={`${position.title}-${position.startDate}`}
        className="flex flex-wrap items-baseline gap-x-2"
      >
        <span className="font-medium text-slate-800 dark:text-gray-100">
          {position.title}
        </span>
        <span className="text-sm text-slate-500 dark:text-grayTone">
          <DateRange
            startDate={position.startDate}
            endDate={position.endDate}
          />
        </span>
      </li>
    ))}
  </ul>
);

export default ExperiencePositions;
