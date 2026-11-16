const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  publicPath: '/',

  productionSourceMap: false,

  transpileDependencies: [
    'quasar'
  ],

  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: true
    }
  }
})
