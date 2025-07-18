// tailwind.config.js
module.exports = {
  content: [
    "./views/**/*.{html,ejs}",
    "./public/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        fire: {
          light: '#FF7043',     // Light Fire Orange
          DEFAULT: '#FF5722',    // Fire Red
          dark: '#D32F2F',       // Dark Fire Red
          yellow: '#FFEB3B',     // Fire Yellow
          deep: '#B71C1C',       // Deep Red for accents
          darkYellow: '#FF9800', // Darker Yellow
          amber: '#FFC107',      // Amber (for highlights)
        },
      },
    },
  },
  plugins: [require("daisyui")],
}
