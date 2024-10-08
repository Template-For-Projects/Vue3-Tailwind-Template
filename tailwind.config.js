/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        88: '22rem',
        104: '26rem',
        112: '28rem',
        120: '30rem',
        128: '32rem',
        144: '36rem',
        200: '50rem',
        240: '60rem',
        256: '64rem',
      },
      boxShadow: {
        '4xl': '0 15px 30px -13px rgba(0, 0, 0, 0.8)',
        '5xl': '0 50px 80px -20px rgba(0, 0, 0, 0.4)',
        '6xl': '0 70px 100px -30px rgba(0, 0, 0, 0.5)',
        'inner-strong': 'inset 0 5px 5px 2px rgba(0, 0, 0, 0.05)',
      },
      colors: {
        'light-blue': '#79C5EF',
        violet: '#a1a0df',
        fuschia: '#CE88F0',
        white: '#f9f9f9',
        'icon-gray': '#9ca3af',
        'gray-p': '#6b7280',
        'dark-gray': '#4b5563',
        'black-gray': '#181818',

        warning: '#e3b02f',
        danger: '#CF6679',
      },
    },
    screens: {
      'big-smartphone': '680px',
      tablet: '780px',
      laptop: '1000px',
      desktop: '1280px',
    },
    fontSize: {
      'custom-xs': '15px',
      sm: '16px',
      md: '18px',
      lg: '24px',
      xl: '30px',
      '2xl': '40px',
      '3xl': '50px',
      '4xl': '80px',
      '6xl': '100px',
    },
  },
};
