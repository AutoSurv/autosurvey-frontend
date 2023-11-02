/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      primary: "Lato",
      secondary: "Roboto",
    },
    container: {
      padding: {
        DEFAULT: "10px",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
    extend: {
      colors: {
        primary: "#ED6D0B",
        secondary: "#F5C82E",
        third: "#FFF2F0",
      },
    },
  },
  plugins: [],
};
