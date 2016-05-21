var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './js/main.js',
    output: {
        path: __dirname,
        filename: 'dist/main-bundle.js'
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: /\.js$/,
                query: {
                  presets: ['es2015', 'stage-2'],
                },
            }
        ]
    },
    plugins: [
        // Avoid publishing files when compilation fails
        new webpack.NoErrorsPlugin()
    ],
    stats: {
        // Nice colored output
        colors: true
    },
};