const webpack = require("webpack");
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BabelMinifyPlugin = require("babel-minify-webpack-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WatchTimePlugin = require('webpack-watch-time-plugin');
const Autoprefixer = require('autoprefixer');

var buildConfig = (dev) => {
    console.log("Dev: ", dev);

    return {
        entry: './assets/js/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'template.js'
        },
        devtool: dev ? 'source-map' : 'none',
        // Minify output CSS
        optimization: {
            minimizer: [
                new OptimizeCSSAssetsPlugin()
            ]
        },
        plugins: [
            // Allow CSS files to be output separately
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: "template.css"
                // chunkFilename: "[id].css"
            }),
            // Make jQuery available
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery"
            }),
            // Show times next to new builds when watching
            new WatchTimePlugin()
        ],
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: ['@babel/plugin-transform-runtime']
                        }
                    }
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        'file-loader'
                    ]
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: dev
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: dev
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                ident: 'postcss',
                                plugins: [
                                    new Autoprefixer()
                                ],
                                sourceMap: dev
                            }
                        }
                    ],
                },
                {
                    test: /\.woff$/,
                    use: {
                        loader: "url-loader",
                        options: {
                            limit: 50000,
                        },
                    },
                },
            ]
        },
    }
};

module.exports = (env, argv) => {
    var config = buildConfig(argv.mode === 'development');

    if (argv.mode === 'development') {
        // do stuff specific to dev
    }

    if (argv.mode === 'production') {
        config.plugins.push(new BabelMinifyPlugin());
    }

    return config;
}
