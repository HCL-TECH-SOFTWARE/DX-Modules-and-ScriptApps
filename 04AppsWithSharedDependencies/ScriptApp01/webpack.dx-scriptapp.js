/*
    Copyright 2022 HCL America, Inc.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/
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
                template: "./src/index.html",
                minify: {
                    removeAttributeQuotes: true,
                    removeComments: true,
                    collapseWhitespace: false,
                }
            })
        ]
    },
    plugins: [
        // remove copying of sp-config.json if you're not using DX WebDevToolkit
        new CopyPlugin({
            patterns: [
                './src/sp-config.json',
            ]
        }),
        new webpack.IgnorePlugin({
            resourceRegExp: /dxmodules\//,
        }),
        new DllReferencePlugin({
            context: path.resolve(__dirname, '../DxModule/SubModule01'),
            manifest: require('../DxModule/SubModule01/dx-dll-manifest.json'),
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
