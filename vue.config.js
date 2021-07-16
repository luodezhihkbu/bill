/* eslint-disable */
const path = require('path')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/bill-dist/'
    : '/',
  lintOnSave: false,
  chainWebpack: config =>{
    const dir = path.resolve(__dirname, 'src/assets/icons') // 注意路径要根据实际情况改写
    config.module
      .rule('svg-sprite')
      .test(/\.svg$/)
      .include.add(dir).end() // 包含 icons 目录
      .use('svg-sprite-loader').loader('svg-sprite-loader').options({extract:false}).end()
    config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'), [{plainSprite: true}])
    config.module.rule('svg').exclude.add(dir) // 其他 svg loader 排除 icons 目录
  }
}
