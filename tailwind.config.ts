import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f4efe6",
        foreground: "#172033",
        card: "#fffdf8",
        border: "#d6c8ae",
        muted: "#6a7282",
        primary: "#0f5d73",
        secondary: "#f0aa52",
        accent: "#d65f4d",
        ring: "#0f5d73"
      },
      boxShadow: {
        panel: "0 16px 50px rgba(23, 32, 51, 0.08)"
      },
      fontFamily: {
        sans: ["Noto Sans TC", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(15,93,115,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(15,93,115,0.08) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
