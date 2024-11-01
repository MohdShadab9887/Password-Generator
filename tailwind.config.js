/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens:{
        xs: {
          'sm': '240px'-'639px',
        },
      },
    },
  },
  plugins: [],
};
