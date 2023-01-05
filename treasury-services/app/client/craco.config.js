module.exports = {
  style: {
    postcssOptions: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
  devServer: {
    proxy: {
      '/api': 'http://localhost:8081',
    },
  },
};
