import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: '#1A202C', // Dark background
        secondary: '#4A90E2', // Light blue for accents
        accent: '#FF6F61', // Button highlights
        light: '#F7FAFC',
      },
    },
  },
  plugins: [],
};
export default config;
