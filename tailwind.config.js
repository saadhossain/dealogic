/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {
          colors: {
            "innova": "#FE5E05",
            "secondary": "#FC970E"
          }
        },
    },
    plugins: [require("daisyui")],
      daisyui: {
        themes: ["light", "dark", ]
      },
}