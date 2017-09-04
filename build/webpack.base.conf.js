var webpack = require('webpack')//必须引入
var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}


module.exports = {
  entry: {
    //app: './src/main.js',
    sysadm: './src/components/sysadm/sysadm.js',
    kefu: './src/components/kefu/kefu.js',
    vendor: ['element-ui']
  },
  output: {
    path: path.resolve(__dirname, 'D:/WorkSpaces/Lim/src/main/webapp'),//../dist/static
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: 'static/js/[name].js',
    chunkFilename :'static/js/chunk/[id].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'jquery':path.resolve(__dirname, '../node_modules/jquery/src/jquery'),
      'lib': path.resolve(__dirname, '../static/lib')//新增
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('image/[name].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[ext]')
        }
      }
    ]
  },
  plugins: [//插件，比loader更强大，能使用更多webpack的api      
    new webpack.optimize.UglifyJsPlugin({//webpack 自带的压缩插件      
      compress: {      
        warnings: false      
      }      
    }),
   new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'static/js/vendor.js' ,minChunks: Infinity }),
  ]   
}
