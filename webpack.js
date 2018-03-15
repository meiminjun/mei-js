const path = require('path') // 导入路径包
const webpack = require('webpack')
const env = process.env.NODE_ENV
const isProduction = env === 'production'

const fs = require('fs')
function resolve(dir) {
  return path.join(__dirname, dir)
}

var entry = fs.readdirSync(path.join(__dirname, 'src/')).reduce((entryObj, dir) => {
  const fullDir = path.join(__dirname, 'src/' + dir)
  const entry = path.join(fullDir, 'index.js')
  if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
    entryObj[dir] = entry
  }
  return entryObj
}, {})

let config = {
  entry: entry,
  output: {
    path: resolve('dist'),
    filename: isProduction ? '[name].min.js' : '[name].js',
  },
  mode: isProduction ? "production" : "development",
  devtool: isProduction ? 'none' : '#eval-source-map',
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        include: [resolve('src')]
      }
      // {
      //   test: /\.(js)$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   include: [resolve('src')],
      //   options: {
      //     formatter: require('eslint-friendly-formatter')
      //   }
      // }
    ]
  },
  plugins: isProduction ? [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ] : [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
    // new HtmlWebpackPlugin({
    //   template: resolve('src') + '/index.html',
    //   filename: 'index.html'
    // })
  ]
}

module.exports = config
