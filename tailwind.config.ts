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
        darkBlue: "#0a192f",
        lightCyan: "#64ffda",
        grayTone: "#8892b0",
        // Cyberpunk palette
        cyber: {
          pink: "#ff006e",
          blue: "#00d9ff",
          purple: "#8b5cf6",
          yellow: "#ffbe0b",
          green: "#00ff41",
          dark: "#0a0118",
          darker: "#050012",
        },
      },
      animation: {
        'glitch': 'glitch 1s infinite',
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'flicker': 'flicker 3s infinite',
        'scan': 'scan 8s linear infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '33%': { transform: 'translate(-2px, 2px)' },
          '66%': { transform: 'translate(2px, -2px)' },
        },
        'neon-pulse': {
          '0%, 100%': { 
            opacity: '1',
            filter: 'brightness(1) drop-shadow(0 0 10px currentColor)',
          },
          '50%': { 
            opacity: '0.8',
            filter: 'brightness(1.2) drop-shadow(0 0 20px currentColor)',
          },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '41.99%': { opacity: '1' },
          '42%': { opacity: '0.8' },
          '43%': { opacity: '1' },
          '45.99%': { opacity: '1' },
          '46%': { opacity: '0.7' },
          '46.5%': { opacity: '1' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      boxShadow: {
        'neon-cyan': '0 0 5px theme(colors.cyber.blue), 0 0 20px theme(colors.cyber.blue)',
        'neon-pink': '0 0 5px theme(colors.cyber.pink), 0 0 20px theme(colors.cyber.pink)',
        'neon-purple': '0 0 5px theme(colors.cyber.purple), 0 0 20px theme(colors.cyber.purple)',
        'neon-green': '0 0 5px theme(colors.cyber.green), 0 0 20px theme(colors.cyber.green)',
      },
    },
  },
  plugins: [],
} satisfies Config;
