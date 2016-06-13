var webpack = require('webpack')
var path = require('path')
var autoprefixer = require('autoprefixer')

module.exports = {
    entry: './index.js',
    output: {
        path: './',
        filename: 'bundle.js',
        publicPath: ''
    },
    module: {
        preLoaders: [
            { test: /\.html$/, loader: 'riotjs' }
        ],
        loaders: [
            {
                test: /\.(jpe?g|png|gif|svg|mp4)$/i,
                loader:'file-loader'
            },
            { test: /\.less$/, loader: 'style!css!postcss!less' },
            { test: /\.js$|\.html$/, loader: 'babel', query: { presets: 'es2015-riot' } }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            riot: 'riot'
        }),
        new webpack.optimize.UglifyJsPlugin({warnings: false})
    ],
    postcss: function () {
        return [autoprefixer({browsers: 'last 2 versions'})];
    },
    devServer: {
        port: 7070,
        outputPath: __dirname,
        inline: false,
        progress: true,
    },
}
