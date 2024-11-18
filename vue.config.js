const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  filenameHashing: false,
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      symlinks: false,
      alias: {
        vue: path.resolve('./node_modules/vue')
      }
    },
  },
  pages: {
    index: {
      entry: "packages/examples/main.js",
      template: "public/index.html",
      filename: "index.html"
    }
  },
  transpileDependencies: false,
  chainWebpack: config => {
    config.module
      .rule('eslint')
      .exclude.add(path.resolve('lib'))
      .end()

    config.module
      .rule('js')
      .include
      .add('/lib/')
      .end()
      .include.add(/examples/)
      .end()
      .use('babel')
      .loader('babel-loader')

    config.plugin('define')
      .tap((definitions) => {
        Object.assign(definitions[0], {
          __VUE_OPTIONS_API__: 'true',
          __VUE_PROD_DEVTOOLS__: 'false',
          __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
        })
        return definitions
      })
  }
})