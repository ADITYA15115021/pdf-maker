/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        'col-b'  : "rgb(18,18,18)",
        'col-b2' : "rgb(15,15,15)",
        'but-1'  : "rgb(36,36,36)"
      }
    },
  },
  plugins: [],
}