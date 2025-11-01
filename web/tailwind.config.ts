import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./icons/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "2xl": "1450px",
        "3xl": "1670px",
      },
      colors: {
        background: {
          DEFAULT: "#161727", // main app background
          subtle: "#1f2038", // softer background (cards, sections)
          input: "#16172780", // input backgrounds (with opacity)
          accent: "#23253d", // accent background (hover states, nav, etc.)
          sidebar: "#0000001a",
        },
        foreground: {
          DEFAULT: "#ffffff", // main text color
          muted: "#898990", // secondary / muted text
          accent: "#4f6ef7", // links / highlights
          highlightRed: "#E86491",
        },
        border: {
          DEFAULT: "#2d2e45", // general borders
          subtle: "#2e2e38", // subtle dividers
          accent: "#7B7BF0", // focus / active state borders
        },
      },
      fontFamily: {
        bebas: ["var(--font-bebas)", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
