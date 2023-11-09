/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js",
    "node_modules/preline/dist/*.js"],
    theme: {
      extend: {
        fontFamily: {
          titulo: ['Bebas Neue', 'sans-serif'], 
          navegacion: ['Inter Tight', 'sans-serif']
        },
        backgroundImage: {
          'caro1': "url('./public/img/caro2.PNG')",
          'caro2': "url('./public/img/caro1.jpg')",
          'caro3': "url('./public/img/caro3.jpg')",
          'caroR': "url('./public/img/caroR.jpg')",
        },

        screens: {
          'cel': '350px',

          'sm': '640px',
          // => @media (min-width: 640px) { ... }
    
          'md': '768px',
          // => @media (min-width: 768px) { ... }
    
          'lg': '1024px',
          // => @media (min-width: 1024px) { ... }
    
          'xl': '1280px',
          // => @media (min-width: 1280px) { ... }
    
          '2xl': '1536px',
          // => @media (min-width: 1536px) { ... }
        }
      },
    },
  plugins: [require("tw-elements/dist/plugin.cjs"),
  require('preline/plugin')],
  darkMode: "class"
}