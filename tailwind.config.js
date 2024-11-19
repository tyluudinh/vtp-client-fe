/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ...colors,
        primary: {
          500: "#00B71F",
        },
        basic: {
          500: "#D6D6D6",
          800: "#5C5C5C",
        },
        blue: {
          500: "#00308C",
          "system-500": "var(--color-blue-system-500)",
        },
        dark: {
          system: "var(--color-dark-system)",
        },
        gray: {
          0: "var(--color-gray-0)",
          5: "var(--color-gray-5)",
          10: "var(--color-gray-10)",
          80: "var(--color-gray-80)",
          100: "var(--color-gray-100)",
        },
        secondary: "var(--color-secondary)",
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1536px",
        },
        danger: "var(--color-danger)",
      },
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
      },
      transitionTimingFunction: {
        "in-expo": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.2s ease-out infinite",
      },
      boxShadow: {
        "4xl-green": "0px 0px 0px 4px rgba(0, 183, 31, 0.24)",
      },
    },
  },
  plugins: [],
};
