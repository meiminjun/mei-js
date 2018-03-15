const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const fs = require('fs')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

var entry = fs.readdirSync(path.join(__dirname, '..', 'src/')).reduce((entryObj, dir) => {
  const fullDir = path.join(__dirname, '..', 'src/' + dir)
  const entry = path.join(fullDir, 'index.js')
  if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
    entryObj[dir] = entry
  }
  return entryObj
}, {})


const webpackConfig = merge(baseWebpackConfig, {
  entry: entry,
  output: {
    path: resolve('dist'),
    filename: '[name].js',
  },
  mode: "development"
})

// Object.keys(webpackConfig.entry).forEach(function (name) {
//   // baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
//   webpackConfig.plugins.push(new HtmlWebpackPlugin({
//     filename: name + '.html',
//     template: path.resolve(__dirname, '..', './src/pages') + '/' + name + '/index.html',
//     chunks: [
//       name
//     ],
//     title: name + ' App',
//     inject: true,
//     chunksSortMode: 'dependency'
//   }))
// })

module.exports = webpackConfig
