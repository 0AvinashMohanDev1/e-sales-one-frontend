/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  safelist: [
    "text-gray-800",
    "text-black",
    "text-white",
    "text-red-500",
    "text-yellow-800",
    "text-green-600",
  ],
  plugins: [],
};
