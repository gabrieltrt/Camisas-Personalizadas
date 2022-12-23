/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.js",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/modules/**/components/**/*.{js,ts,jsx,tsx}",
    "./src/common/**/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("flowbite/plugin")
  ],
}
