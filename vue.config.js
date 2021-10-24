const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/', // 公共路径
  lintOnSave: false,
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
    },
  },

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('less', resolve('./src/assets/less'))
      .set('img', resolve('./src/assets/img'))
      .set('components', resolve('./src/components'))
      .set('config', resolve('./src/config'))
      .set('views', resolve('./src/views'))
      .set('utils', resolve('./src/utils'))
  },
}
