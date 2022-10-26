module.exports = {
  content: ['./src/**/*.{html,js,ts,tsx}'],

  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 5s linear infinite',
      },
    },
  },
  plugins: [require('autoprefixer')],
};
