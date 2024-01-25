/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "dark-grey": "#212121",
        "white-grey": "#F3F4F6",
        "grey-pill": "#CCCCCC",
        "dark-color-mode": "#131927",
        "dark-color-mode-shadow": "#C9E9FA",
      },
    },
  },
  plugins: [],
};
