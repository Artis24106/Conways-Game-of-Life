var webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: ["./index.js"],
    context: path.resolve(__dirname, "src"),
    output: {
        path: path.resolve(__dirname, "dist")
    },
    optimization: {
        minimize: true
    },
    module: {
        rules: [
            {
                test: /\.pug/i,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            minimize: false
                            // 不壓縮 HTML
                        }
                    },
                    {
                        loader: "pug-html-loader",
                        options: {
                            pretty: true
                            // 美化 HTML 的編排 (不壓縮HTML的一種)
                        }
                    }
                ]
            },
            {
                test: /\.s[ac]ss/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName:
                                    "[name]__[local]___[hash:base64:5]"
                            }
                        }
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src/index.pug"),
            filename: "index.html",
            inject: true,
            // 等於'body',javascript 資源將被放置到body元素的底部
            chunks: ["device", "main"],
            // 指定需要引入的js，沒有設置默認全部引入
            excludeChunks: ["devor.js"],
            // 排除的js
            minify: {
                sortAttributes: true,
                collapseWhitespace: false,
                // 折疊空白字元就是壓縮Html
                collapseBooleanAttributes: true,
                // 折疊布林值属性，例:readonly checked
                removeComments: true,
                // 移除註釋
                removeAttributeQuotes: true
                // 移除屬性的引號
            }
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
};
