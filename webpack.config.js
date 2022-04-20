const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    output: {
        path: path.join(__dirname, '/build'),
        filename: 'index.bundle.js',
        chunkFilename: '[id].[chunkhash].js',
        publicPath: '/'
    },
    devServer: {
        port: 3000,
        // watchContentBase: true,
        hot: true,
        historyApiFallback: true,
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
        new Dotenv()
    ],
};