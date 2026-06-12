/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        branin: {
          darkBg: '#090705',       // Deep obsidian charcoal-brown
          amber: '#e17233',        // Pure glowing amber
          orange: '#d95d2c',       // Heavy brand orange
          darkOrange: '#160f0a',   // Base for card structures
          bezel: '#181410',        // Display frame bezel color
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}