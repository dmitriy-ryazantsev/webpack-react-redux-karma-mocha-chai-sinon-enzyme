'use strict';


var webpack = require('webpack');


let hostname = 'localhost';
let port = 8080;

module.exports =
{
    entry: 'mocha!./test/main.js',
    devServer:
    {
        host: hostname,
        port: port
    },
    output:
    {
        filename: 'application.js',
        path: '',
        publicPath: 'http://' + hostname + ':' + port + '/tests/'
    },
    externals:
    {
        'cheerio': 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
    },
    resolve:
    {
		extensions: ['', '.js', '.jsx'],
        // alias: { 'sinon': 'sinon/pkg/sinon' },
        // modulesDirectories: ['', 'src', 'node_modules']
    },
    devtool: 'source-map',
    debug: true,
    plugins:
	[
		new webpack.ProvidePlugin(
		{
			jQuery: 'jquery',
			$: 'jquery'
		})
	],
    module:
    {
        loaders:
        [
            {
                test: /\.js|\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query:
                {
                    presets:['react', 'es2015']
                }
            },
            {
                test: /bootstrap\/js\//,
                loader: 'imports?jQuery=jquery'
            },
            {
                test: /\.css$/,
                loader: 'css-loader'
            },
            // {
            //     test: /(\.css|\.less)$/,
            //     loader: 'null-loader',
            //     exclude: [
            //         /build/
            //     ]
            // },
            {
                test: /\.(woff|woff2|ttf|eot|svg)$/,
                loader: 'null-loader'
            },
            {
                test: /sinon\.js$/,
                loader: "imports?define=>false,require=>false"
            }
        ],
        // noParse: [/node_modules\/sinon\//],
    }
};
