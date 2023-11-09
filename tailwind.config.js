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
      sm: "600px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
    extend: {
      colors: {
        primary: "#5C61F4ff",
        secondary: "#F5C82E",
        third: "#EFEFFEff",
        accent:'#4e53dc',
        offline:"#EEC128",
        FormColour:"#ffffff"
      
      },
    },
  },
  plugins: [],
};
