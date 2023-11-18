/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  daisyui: {
    themes: [
      {
        my_theme: {
          "primary": "#00C2FF",
          "secondary": "#16a34a",
          "accent": "#1FB2A6",
          "neutral": "#191D24",
          "base-100": "#ffffff",
          "info": "#e11d48",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
      },
      {
        my_dark: {
          "primary": "#00C2FF",
          "secondary": "#16a34a",
          "accent": "#1FB2A6",
          "neutral": "#191D24",
          "base-100": "#ffffff",
          "info": "#e11d48",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
      },
      "light",
      "dracula",
    ],
  },
  plugins: [require("daisyui")],
};
