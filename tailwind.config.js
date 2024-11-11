/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
       //COlors used in the project
      colors: {
        primary: "#2B85FF",
        secondary: "#EF863E",
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
    },
  plugins: [],
}
