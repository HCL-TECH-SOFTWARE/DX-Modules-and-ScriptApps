const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const svgToMiniDataURI = require('mini-svg-data-uri');

module.exports = {
    entry: {
        main: "./src/index.js",
    },
    resolve: {
        preferRelative: true,
        extensions: [".js", ".jsx", ".module.scss"]
    },
    module: {
        rules: [
            {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env','@babel/preset-react'],
                        cacheDirectory: true,
                    }
                }
            },
            {
                test: /\.(htm|html)$/,
                use: ['html-loader'],
            },
            {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.svg/,
                type: 'asset/inline',
                generator: {
                    dataUrl: content => {
                        content = content.toString();
                        return svgToMiniDataURI(content);
                    }
                }
            },
            {
                test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf|eot)$/,
                type: 'asset'
            },
        ],

    }
};
