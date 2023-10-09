/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "dealogic": "#FE5E05",
        "secondary": "#FC970E",
        "accent": "#191A1F"
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark",]
  },
}