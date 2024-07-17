/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["DM Sans", "sans-serif"],
      },
      colors: {
        primary: "#2979ff",
      },
    },
  },
  plugins: [],
};
