/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js",
    "node_modules/preline/dist/*.js"],
  theme: {
    extend: {},
  },
  plugins: [require("tw-elements/dist/plugin.cjs"),
  require('preline/plugin')],
  darkMode: "class"
}