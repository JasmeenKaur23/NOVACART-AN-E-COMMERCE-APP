/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html", // must include index.html
    "./src/**/*.{js,ts,jsx,tsx}", // must include all React files
  ],
   theme: {
    extend: {
      colors: {
        primary: '#3872fa',
      },
      backgroundColor:{
        primary:'#3872fa'
      }
    },
  },
  plugins: [],
};
