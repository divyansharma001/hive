// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hive-black': '#000000',
        'hive-gold': '#FFDB00',
        'hive-dark-100': 'rgb(23,23,24)', // For card backgrounds
        'hive-dark-200': 'rgb(15,16,18)', // For slightly darker elements or create post bg
        'hive-gray-light': '#a7acaf',    // For secondary text
        'hive-gray-medium': '#7d8081', // For timestamps or less important text
        'hive-gray-dark': '#363636',    // For borders or subtle dividers
      }
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        hivetheme: { // Custom DaisyUI theme (optional, or just use Tailwind classes)
          "primary": "#FFDB00",
          "secondary": "#f6d860",
          "accent": "#37cdbe",
          "neutral": "#3d4451",
          "base-100": "#000000", // Page background
           // ... other daisyUI colors if needed
        },
      },
    ],
  },
}
