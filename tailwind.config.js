/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'black': '#121212',
      'white': '#FFFDF8',
      'white-transparent': '#FFFDF8E0',
      'filter-home': '#FFFFFFB3',
      'filter-white': '#FFFFFF4D',
      'red': '#BD1000',
      'yellow': '#d69f09',
      'transparent-title': '#3B383873',
      'transparent-home': '#1212124D',
      DEFAULT: '#121212'
    },
    fontFamily: {
      'main': ['Montserrat', 'sans-serif'],
      'second': ['Kodchasan', 'sans-serif'],
      'sans': ['Montserrat', 'sans-serif',
      defaultTheme.fontFamily.sans]
    },
    borderRadius: {
      'main': '25px',
      'mobile': '20px',
      'input': '16px',
    },
    boxShadow: {
      'main': '0px 0px 15px #00000029',
    },
    fontSize: {
      xxs: '.5rem',
      xs: '.75rem',
      sm: '1rem',
      base: '1.2rem',
      lg: '1.3rem',
      xl: '1.5rem',
      '2xl': '1.8rem',
      '3xl': '2rem',
      '4xl': '3rem',
      '5xl': '4rem',
      '6xl': '4.5rem',
    },
    extend: {
      backgroundImage: {
        'home': "url('/img/accueil-asya-food.jpg')",
        'account': "url('/img/compte-asya-food.jpg')",
        'login': "url('/img/connexion-asya-food.jpg')",
        'register': "url('/img/inscription-asya-food.jpg')",
        'list': "url('/img/liste-asya-food.jpg')",
        'legals': "url('/img/legales-asya-food.jpg')",
        'confidentiality': "url('/img/confidentialite-asya-food.jpg')",
        'cgu': "url('/img/cgu-asya-food.jpg')",
        'notFound': "url('/img/not-found-asya-food.jpg')",
        'forgotPassword': "url('/img/forgot-password-asya-food.jpg')",
        'resetPassword': "url('/img/reset-password-asya-food.jpg')",
        'ingredients': "url('/img/ingredients-asya-food.jpg')",
      },
      height: {
        'section-img': '90vh',
        'section-img-xl': '75vh',
        'section-img-mobile': '90vh',
        'category-img' : '65vh',
        'category-img-mobile' : '50vh',
      },
      lineHeight: {
        'large' : '1.8rem',
        'xl': '2rem',
        '2xl': '2.5rem',
        '3xl': '3rem',
        '4xl': '3.5rem',
        '6xl': '5.5rem'
      }
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
}

