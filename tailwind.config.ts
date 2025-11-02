import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBlue: "#0a0a0f",
        lightCyan: "#00f3ff",
        grayTone: "#8892b0",
        neonCyan: "#00f3ff",
        neonMagenta: "#ff00ff",
        neonYellow: "#ffff00",
      },
    },
  },
  plugins: [],
} satisfies Config;
