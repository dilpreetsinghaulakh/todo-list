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
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwindcss")],
};
