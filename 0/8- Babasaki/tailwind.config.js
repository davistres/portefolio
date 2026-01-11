/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'brown': '#8B4513',
        'green': '#228B22',
        'beige': '#F5F5DC',
        'light-beige': '#F8F7F2',
        // Nouvelles couleurs pour l'harmonisation du header
        'header-start': '#EDE9E0',
        'header-light': '#F0EFE8',
        'header-mid': '#F3F2EC'
      }
    },
  },
  plugins: [],
}
