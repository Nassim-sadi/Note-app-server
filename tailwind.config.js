/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
};
module.exports = {
  content: ['./views/**/*.{html,js,hbs}'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography', require('@tailwindcss/forms'))],
};
