var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * This is the Webpack configuration file for production.
 */
module.exports = {
    entry: "./src/main",

    output: {
        path: __dirname + "/../build/",
        filename: "app.js"
    },

    plugins: [
        new ExtractTextPlugin('style.css', {allChunks: false})
    ],

    module: {
        loaders: [
            {test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader"},
            {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')}
        ]
    },

    resolve: {
        extensions: ['', '.js', '.jsx', '.css']
    },

    postcss: [
        require('autoprefixer'),
        require('postcss-nested')
    ]
}
