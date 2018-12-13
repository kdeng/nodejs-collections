'use strict'

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const projectRoot = path.resolve(__dirname)
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const appPath = 'app'

function assetsPath (_path) {
  return path.posix.join('assets', _path)
}

const webpackConfig = {
  mode: 'production',
  stats: {
    children: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Vue SPA',
      contextPath: `/`,
      filename: `index.html`,
      template: path.join(__dirname, 'src', 'index.html.ejs'),
      inject: true,
      // favicon: 'src/favicon.ico',
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: assetsPath('css/[name].[hash].css')
    }),
  ],
  devtool: 'source-map',
  entry: {
    app: `./src/index.js`
  },
  externals: {
    config: 'config'
  },
  output: {
    publicPath: '/',
    path: path.resolve(projectRoot, 'dist'),
    filename: assetsPath('js/[name].[hash].js'),
  },
  resolve: {
    extensions: ['.js', '.vue', '.css', '.json'],
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
          MiniCssExtractPlugin.loader,
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
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: `/${appPath}` }
      ],
      verbose: true
    }
  },
  // See https://github.com/webpack/webpack/issues/3486
  performance: {
    hints: false
  }
}

module.exports = webpackConfig
