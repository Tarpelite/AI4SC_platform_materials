const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    client: {
      overlay: false,
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: process.env.VUE_APP_BASE_API
  }
})
