'use strict';


var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports =
{
    entry:
    {
        main: './src/main.jsx',
        vendor:
        [
            'babel-polyfill',
            'bootstrap/js/affix',
            'form-urlencoded',
            'history/createBrowserHistory',
            'isomorphic-fetch',
            'jquery',
            'react',
            'react-dom',
            'react-redux',
            'redux',
            'redux-logger',
            'redux-thunk'
        ]
    },
    output:
    {
        path: './dist',
        publicPath: '',
        filename: 'application.js'
    },
    debug: false,
    devtool: 'source-map',
    resolve:
    {
        extensions: ['', '.js', '.jsx'],
    },
    module:
    {
        loaders:
        [
            {
                test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.(ttf|eot|svg)(\?[a-z0-9#=&.]+)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query:
                {
                    presets: ['es2015', 'react'],
                    plugins: ['transform-object-rest-spread']
                }
            }
        ]
    },
    plugins:
    [
        new ExtractTextPlugin('./../dist/application.css'),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'bundle.js'),
        new webpack.ProvidePlugin(
        {
            jQuery: 'jquery',
            $: 'jquery'
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin(
        {
            'process.env':
            {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin(
        {
            compress:
            {
                warnings: false
            }
        })
    ]
};
