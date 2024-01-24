/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      inputvalue:{
       inputvalue: 'w-full border border-gray-300 rounded-md px-3 py-2'
      }
    },
  },
  plugins: [],
}