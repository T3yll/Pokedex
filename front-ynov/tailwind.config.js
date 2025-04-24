/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './index.html',
      './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        fontFamily: {
          pokemon: ['"Pokemon Solid"', 'sans-serif'],
        },
      },
    },
    plugins: [],
  };
  