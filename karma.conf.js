const path = require('path');

module.exports = function (config)
{
    let configuration =
    {
        browsers: [ 'Chrome' ],
        files: [ './test/main.js' ],
        frameworks: [ 'mocha', 'chai' ],
        plugins:
        [
          'karma-chrome-launcher',
          'karma-chai',
          'karma-mocha',
          'karma-html-reporter',
          'karma-html-live-reporter',
          'karma-coverage',
          'karma-coveralls',
          'karma-mocha-reporter',
          'karma-sourcemap-loader',
          'karma-webpack',
        ],
        preprocessors:
        {
            './test/main.js': [ 'webpack', 'sourcemap' ]
        },
        reporters: [ 'mocha', 'coverage', 'coveralls', 'html', 'live-html' ],
        coverageReporter:
        {
            dir: 'statistics',
            reporters:
            [
                {
                    type: 'lcov', // lcov or lcovonly are required for generating lcov.info files
                    dir: 'coverage/'
                },
                {
                    type: 'html',
                    subdir: 'coverage'
                },
                {
                    'type': 'text'
                },
            ],
        },
        htmlReporter:
        {
            pageTitle: 'ProcuratorUI Tests',
            outputDir: 'statistics',
            focusOnFailures: false,
            namedFiles: true,
            reportName: 'tests',
            urlFriendlyName: false,
            preserveDescribeNesting: false,
            foldAll: false,
        },
        singleRun: true,
        webpack:
        {
            externals:
            {
                'cheerio': 'window',
                'react/addons': true,
                'react/lib/ExecutionEnvironment': true,
                'react/lib/ReactContext': true
            },
            devtool: 'inline-source-map',
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
                    {
                        test: /sinon\.js$/,
                        loader: "imports?define=>false,require=>false"
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
                    }
                ],
                preLoaders:
                [
                    {
                      test: /\.js|\.jsx$/,
                      loader: 'isparta-loader',
                      include: path.resolve('src'),
                      exclude: path.resolve('node_modules'),
                    }
                ]
            }
        },
        webpackMiddleware:
        {
            noInfo: true,
        }
    };

    if(process.env.TRAVIS)
    {
        configuration.browsers = ['Chrome_travis_ci'];
        configuration.customLaunchers =
        {
            Chrome_travis_ci:
            {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        };
    }

    config.set(configuration);
};
