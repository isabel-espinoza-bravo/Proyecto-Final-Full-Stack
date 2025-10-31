/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        fondo: "#e8f2e7",
        rosado: "#f6d6c8",
        beige: "#f9eae1",
        coral: "#e6a893",
        texto: "#5a3e36",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
