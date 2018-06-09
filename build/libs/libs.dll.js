const webpack = require('webpack');
const libs = require('../config/webpack.libs');

module.exports = {
    entry: {
        'libs': libs.libs
    },
    output: {
        path: __dirname,
        filename: '[name].js',
        library: '[name]_library'
    },
    plugins: [
        new webpack.DllPlugin({
            path: __dirname + '/[name].manifest.json',
            name: '[name]_library',
        })
    ]
};