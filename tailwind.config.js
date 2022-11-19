/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true
    },
    extend: {
      colors: {
        ...defaultTheme.colors,
        lightyellow: '#FFFCF7',
        whiteyellow: '#FFF7EA',
        theme: '#F6BF63',
        darkGray: '#545454',
        lightWhite: '#F6F6F6',
        blue: '#1F81DE',
        yellow: '#FCF945',
        lightPurple: '#E7E5FC',
        redColor: '#F12C0E',
        redLight: '#F70505',
        pink: '#F3216E',
        braun: '#58382D',
        // indigo: "#445D9D",
        greenLight: '#18D69C',
        green: '#059c05',
        orange: '#FC8C43'
      }
    }
  },
  plugins: []
};
