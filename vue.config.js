const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  configureWebpack: {
    plugins: [
      new StyleLintPlugin({
        files: ['src/**/*.{vue,scss}'],
      }),
    ],
  },
  css: {
    loaderOptions: {
      scss: {
        // eslint-disable-next-line global-require
        implementation: require('sass'),
        additionalData: `@import "./src/scss/main.scss";`,
      },
    },
  },
};
