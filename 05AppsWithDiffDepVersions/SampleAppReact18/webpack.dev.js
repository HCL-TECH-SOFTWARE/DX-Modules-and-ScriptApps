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
const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge'); // New import based on the 5.0.3 changelog
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = merge (common, {
    mode: "development",
    devtool: 'eval',
    entry: {
        dxmodulesstyles: path.resolve(__dirname, '../DxModule/SubModuleReact18/styles-index.css'),
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist-dev"),
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./public/index.html",
            filename: "./index.html",
            favicon: "./public/favicon.ico",
            manifest: "./public/manifest.json"
        })
    ],
    module: {
        rules: [
        ]
    }
});
