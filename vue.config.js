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
        implementation: require('sass'),
        //sassOptions: {
        additionalData: `@import "./src/scss/main.scss";`,
        /*includePathss: [
            './src/scss/main.scss'
          ]*/
        //}
      },
    },
  },
};

