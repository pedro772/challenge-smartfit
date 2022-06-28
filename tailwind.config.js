/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        gothamBlack: ['Gotham Black', 'sans-serif'],
        gothamLight: ['Gotham Light', 'sans-serif'],
        gothamBold: ['Gotham Bold', 'sans-serif'],
        gothamBook: ['Gotham Book', 'sans-serif']
      },
      colors: {
        gray: {
          500: "#828282",
          700: "#444444",
          800: "#333333"
        },
        yellow: {
          500: "#f5b843"
        },
        green: {
          600: "#60bc40"
        },
        red: {
          700: "#cb2e27"
        }
      }
    },
  },
  plugins: [],
}
