import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"], // Enable dark mode with the `class` strategy
  content: [
    "./pages/**/*.{ts,tsx}", // Scan all TypeScript files in the `pages` directory
    "./components/**/*.{ts,tsx}", // Scan all TypeScript files in the `components` directory
    "./app/**/*.{ts,tsx}", // Scan all TypeScript files in the `app` directory
    "./src/**/*.{ts,tsx}", // Scan all TypeScript files in the `src` directory
  ],
  prefix: "", // No prefix for Tailwind CSS classes
  theme: {
    container: {
      center: true, // Center the container
      padding: "2rem", // Add padding of 2rem to the container
      screens: {
        "2xl": "1400px", // Set the width for the 2xl screen breakpoint
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))", // Custom color variables for various states
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)", // Custom border-radius values
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
