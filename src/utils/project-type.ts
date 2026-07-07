// Maps a projectType slug to its display label. Used by the project card,
// detail page badge, and OG/Twitter image metadata so the label stays in
// sync everywhere.
export function formatProjectType(type: "personal" | "work") {
  return type === "personal" ? "Personal Project" : "Work Project";
}