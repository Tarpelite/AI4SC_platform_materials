module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-pxtorem': {
      'rootValue': 39,
      'propList': ['*', '!letter-spacing', '!font-size']
    }
  }
};
