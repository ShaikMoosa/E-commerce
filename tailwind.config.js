/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4A7C59", // Green for organic feel
        secondary: "#F9C74F", // Yellow for baby-friendly
        accent: "#F8961E", // Orange for energy
        neutral: "#F4F1DE", // Cream for softness
        "base-100": "#FFFFFF",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        babyFood: {
          primary: "#4A7C59",
          secondary: "#F9C74F",
          accent: "#F8961E",
          neutral: "#F4F1DE",
          "base-100": "#FFFFFF",
        },
      },
    ],
  },
} 