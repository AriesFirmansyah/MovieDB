// eslint-disable-next-line no-undef
const path = require('path');
// eslint-disable-next-line no-undef
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// eslint-disable-next-line no-undef
module.exports = {
    output: {
        // eslint-disable-next-line no-undef
        path: path.join(__dirname, '/build'),
        filename: 'index.bundle.js',
    },
    devServer: {
        port: 3010,
        // watchContentBase: true,
        hot: true,
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
                            outputPath: 'images/',
                            publicPath: 'images/'
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
        new MiniCssExtractPlugin()
    ]
};