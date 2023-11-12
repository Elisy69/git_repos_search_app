import { watchImmediate } from "@vueuse/core";

const plugin = require("tailwindcss/plugin");
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        loader: "loader 0.6s infinite alternate",
      },
      keyframes: {
        loader: {
          to: {
            opacity: 0.1,
            transform: "translate3d(0, -1rem, 0)",
          },
        },
      },
      colors: {
        "dark-text": "#00cc00",
        "light-text": "white",
      },
      fontFamily: {
        "monoFont": ["monoFont"],
      },
      textShadow: {
        sm: "0 0 2px, 0 0 2px var(--tw-shadow-color)",
        DEFAULT: "0 0 2px, 0 0 4px var(--tw-shadow-color)",
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
};
