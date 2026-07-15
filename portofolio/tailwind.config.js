/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        text: "var(--color-text)",
        accent: "var(--color-accent)",
        gray: {
          300: "var(--gray-300)",
          400: "var(--gray-400)",
          500: "var(--gray-500)",
          600: "var(--gray-600)",
          700: "var(--gray-700)",
          800: "var(--gray-800)",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        gloria: ['"Gloria Hallelujah"', "cursive"],
      },
    },
  },
  plugins: [],
};
