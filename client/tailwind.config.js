// /** @type {import('tailwindcss').Config} */

// export default {
//   darkMode: "class", // enables dark mode with a class
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {
//       colors: {
//         primary: "#ff5252",
//       },
//     },
//   },
// };

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#ff5252' ,
      },
    },
  },
  plugins: [],
};
