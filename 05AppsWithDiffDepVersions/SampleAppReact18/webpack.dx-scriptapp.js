const path = require("path");
const common = require("./webpack.common");
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { DllReferencePlugin } = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = merge(common, {
    mode: "production",
    output: {
        filename: "[name].[contenthash].bundle.js",
        path: path.resolve(__dirname, "dist-dx-scriptapp")
    },
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin(),
            new HTMLWebpackPlugin({
                template: "./public/index.html",
                filename: "./index.html",
                favicon: "./public/favicon.ico",
                manifest: "./public/manifest.json",
                minify: {
                    removeAttributeQuotes: true,
                    removeComments: true,
                    collapseWhitespace: false,
                }
            })
        ]
    },
    plugins: [
        new webpack.IgnorePlugin({
            resourceRegExp: /dxmodules\//,
        }),
        // remove copying of sp-config.json if you're not using DX WebDevToolkit
        new CopyPlugin({
            patterns: [
                './src/sp-config.json',
            ]
        }),
        new DllReferencePlugin({
            context: path.resolve(__dirname, '../DxModule/SubModuleReact18'),
            manifest: require('../DxModule/SubModuleReact18/dx-dll-manifest-react18.json'),
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css"
        }),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
        ]
    },
});
