/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        mutant: {
          primary: '#e31c25',
          secondary: '#ffd700',
          bg: '#0a0a0a',
          card: '#1a0a0a',
        }
      }
    },
  },
  plugins: [],
}
