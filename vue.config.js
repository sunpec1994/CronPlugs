const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  filenameHashing: false,
  productionSourceMap: false,
  // 解决打包出来还有vue实例的问题
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
  // 扩展 webpack 配置，使 packages 加入编译
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
      .tap(options => {
        // 修改它的选项...
        return options
      })
  },
})