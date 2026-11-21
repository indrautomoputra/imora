/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        fg: "var(--fg)",
        "muted-fg": "var(--muted-fg)",
        ink: "var(--ink)",
        surface: "var(--surface)",
        accent: "var(--accent)",
        "on-pop": "var(--on-pop)",
        "pop-yellow": "var(--pop-yellow)",
        "pop-blue": "var(--pop-blue)",
        "pop-green": "var(--pop-green)",
        "pop-pink": "var(--pop-pink)",
        "pop-purple": "var(--pop-purple)",
        "pop-orange": "var(--pop-orange)",
      },
      fontFamily: {
        display: ['"Archivo Black"', "sans-serif"],
        body: ['"Space Grotesk"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
