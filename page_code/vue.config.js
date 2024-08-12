const { defineConfig } = require('@vue/cli-service')
const CompressionPlugin = require('compression-webpack-plugin');//引入gzip压缩插件

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
  },
  configureWebpack: config => {
    // 开发环境不配置
    if (process.env.NODE_ENV !== 'production') return
    // 生产环境才去配置
    return {
      plugins: [
        new CompressionPlugin({
            filename: '[path][base].gz',
            algorithm: 'gzip',
            test: /\.js$|\.css$|\.html$|\.ttf$|\.eot$|\.woff$/,
            threshold: 10240,
            minRatio: 0.8, // 最小压缩比率，官方默认0.8
            //是否删除原有静态资源文件，即只保留压缩后的.gz文件，建议这个置为false，还保留源文件。以防：
            // 假如出现访问.gz文件访问不到的时候，还可以访问源文件双重保障
            deleteOriginalAssets: false
        })
      ]
    }
  }
})
