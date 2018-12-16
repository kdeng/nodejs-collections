'use strict'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const projectRoot = path.resolve(__dirname)
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const config = require('./src/config')

function assetsPath (_path) {
  return path.posix.join('assets', _path)
}

const devMode = {
  name: 'development',
  assetNameFormat: '[name]',
  plugins: [
    // new HtmlWebpackHarddiskPlugin({
    //   outputPath: './src'
    // }),
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoEmitOnErrorsPlugin(),
  ],
  entries: [ 'webpack-hot-middleware/client?path=__webpack_hmr' ],
  styleLoader: 'vue-style-loader',
}

const prodMode = {
  name: 'production',
  assetNameFormat: '[name].[contenthash]',
  plugins: [],
  entries: [],
  styleLoader: MiniCssExtractPlugin.loader,
}

const mode = config.get('webpackDevMode') ? devMode : prodMode

const webpackConfig = {
  mode: mode.name,
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Default Page Title',
      template: 'src/layouts/index.template.html',
      inject: true,
      // favicon: 'src/favicon.ico',
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      // chunksSortMode: 'dependency',
      // Force index template to be written to disk when using dev middleware:
      // alwaysWriteToDisk: true
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: assetsPath(`css/${mode.assetNameFormat}.css`)
    }),
  ].concat(mode.plugins),
  devtool: 'source-map',
  entry: {
    app: [ `./src/entry-client.js` ].concat(mode.entries)
  },
  externals: {
    config: 'config'
  },
  output: {
    publicPath: '/',
    path: path.resolve(projectRoot, 'dist'),
    filename: assetsPath(`js/${mode.assetNameFormat}.js`),
    hotUpdateChunkFilename: `[id].[hash].hot-update.json`,
    hotUpdateMainFilename: `[hash].hot-update.json`,
  },
  resolve: {
    extensions: ['.js', '.vue', '.css', '.json', '.yaml'],
    alias: {
      src: path.resolve(projectRoot, 'src')
    }
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'all',
          test: /node_modules\//,
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          mode.styleLoader,
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.resolve(projectRoot, 'src')
      },
      {
        test: /\.yaml$/,
        use: [ 'json-loader', 'yaml-loader'],
      },
      {
        test: /\.(png|jpg|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  devServer: {
    contentBase: 'src',
  },
  // See https://github.com/webpack/webpack/issues/3486
  performance: {
    hints: false
  }
}

module.exports = webpackConfig
