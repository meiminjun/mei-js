const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

const webpackConfig = merge(baseWebpackConfig, {
  entry: {
    mei: './src/common/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: 'mei.js',
    library: 'mei',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  mode: "production"
})

module.exports = webpackConfig
