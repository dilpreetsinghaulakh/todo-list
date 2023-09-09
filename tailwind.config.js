module.exports = {
  mode: "jit",
  darkMode: "media",
  content: ["./**/*.html", "./**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
      },
      colors: {
        "spl-blue": "#186AFD",
      },
      boxShadow: {
        "center-red": "0 0 0 3px #ef4444",
        "center-gray": "0 0 0 3px #64748b",
        "center-green": "0 0 0 3px #84cc16",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwindcss")],
};
