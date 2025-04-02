import { heroui } from "@heroui/theme";

/** @type {import("tailwindcss").Config} */
const config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
        noto: ["var(--font-noto)"],
        roboto: ["var(--font-roboto)"],
        "roboto-mono": ["var(--font-roboto-mono)"]
      },
      screens: {
        xs: "475px"
      }
    }
  },
  darkMode: "class",
  plugins: [heroui()]
};

module.exports = config;