const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

let mode = "development";

module.exports = {
    mode: mode,
    output: {
        path: path.join(__dirname, '/build'),
        filename: 'index.bundle.js',
        chunkFilename: '[id].[chunkhash].js',
        publicPath: '/'
    },
    devServer: {
        port: 3000,
        hot: true,
        historyApiFallback: true,
        open: true,
    },
    devtool: false,
    performance: {
        hints: false,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                include: /images/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: '/images/',
                            publicPath: '/images/'
                        }
                    }
                ]
            },
        ]
    },
    externals: {
        'React': 'react'
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new Dotenv(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, "src", "index.html")
        })
    ],
};