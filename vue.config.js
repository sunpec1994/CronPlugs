const { defineConfig } = require('@vue/cli-service')
const { DefinePlugin } = require('webpack')
const path = require('path')

module.exports = defineConfig({
  // 解决打包出来还有vue实例的问题
  configureWebpack: {
    resolve: {
      symlinks: false,
      alias: {
        vue: path.resolve('./node_modules/vue')
      }
    },
    plugins: [
      new DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
      })
    ]
  },
  pages: {
    index: {
      entry: "packages/examples/main.js",
      template: "public/index.html",
      filename: "index.html"
    }
  },
  chainWebpack: config => {
    config.module
      .rule('js')
      .include.add(/examples/)
      .end()
      .use('babel')
      .loader('babel-loader')
  },
})