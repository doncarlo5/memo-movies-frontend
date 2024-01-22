/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f4e9cdff",
        parchement: "#031926ff",
        teal: "#468189ff",
        "cambridge-blue": "#77aca2ff",
        "ash-gray": "#9dbebbff",
      },
    },
  },
  plugins: [],
};
