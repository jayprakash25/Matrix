/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        'green-transparent': 'rgba(0, 255, 0, 0.5)', // Adjust the alpha value for transparency
      },
    },
  },
  plugins: [],
};
