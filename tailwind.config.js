const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./content/**/*.{mdx,md}",
    "./node_modules/.pnpm/node_modules/@nature-ui/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        code: {
          highlight: "rgb(125 211 252 / 0.1)",
        },
        primary: {
          300: "var(--primary-300)",
          400: "var(--primary-400)",
          500: "var(--primary-500)",
          600: "var(--primary-600)",
          700: "var(--primary-700)",
        },
        dark: {
          100: "var(--dark-100)",
          200: "var(--dark-200)",
          300: "var(--dark-300)",
          400: "var(--dark-400)",
          500: "var(--dark-500)",
          600: "var(--dark-600)",
          700: "var(--dark-700)",
          800: "var(--dark-800)",
        },
        accent: {
          300: "var(--accent-300)",
          400: "var(--accent-400)",
          500: "var(--accent-500)",
          600: "var(--accent-600)",
          700: "var(--accent-700)",
        },
      },
      maxWidth: {
        "8xl": "90rem",
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
        mono: ["Fira Code VF", ...defaultTheme.fontFamily.mono],
        source: ["Source Sans Pro", ...defaultTheme.fontFamily.sans],
        "ubuntu-mono": ["Ubuntu Mono", ...defaultTheme.fontFamily.mono],
      },
      backgroundImage: {
        gradient: "linear-gradient(123.91deg, #FFCD1B -5.26%, #E35A0C 102.43%)",
        "glass-card": "var(--glass-card)",
      },
    },
  },
  plugins: [],
};
