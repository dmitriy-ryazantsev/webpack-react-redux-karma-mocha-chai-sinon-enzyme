'use strict';

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require("path");


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
    devServer:
    {
        host: 'localhost',
        port: 8081
    },
    output:
    {
        publicPath: '/dist/',
        filename: 'application.js'
    },
    debug: true,
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
                test: /.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query:
                {
                    presets: ['es2015', 'react', 'react-hmre'],
                    plugins: ['transform-object-rest-spread']
                }
            }
        ]
    },
    plugins:
	[
        new ExtractTextPlugin('application.css'),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.CommonsChunkPlugin('vendor', 'bundle.js'),
		new webpack.ProvidePlugin(
		{
			jQuery: 'jquery',
			$: 'jquery'
		}),
        new webpack.DefinePlugin(
		{
			'process.env':
			{
				NODE_ENV: JSON.stringify('development')
			}
		})
	]
};
