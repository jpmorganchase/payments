module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],

  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 5s linear infinite',
      },
    },
  },
  plugins: [require('autoprefixer')],
};
