const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        primary: '#27374D',
        secondary: '#526D82',
        tertiary: '#9DB2BF',
        quaternary: '#DDE6ED'
      }
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}

