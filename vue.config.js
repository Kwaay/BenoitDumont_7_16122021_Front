const path = require('path');

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        implementation: require('sass'),
        //sassOptions: {
          additionalData: `@import "./src/scss/main.scss";`
          /*includePathss: [
            './src/scss/main.scss'
          ]*/
        //}
      }
    }
  }
};