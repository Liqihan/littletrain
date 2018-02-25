/**
 * User: wuliang (wuliang@benditoutiao.com)
 * Date: 2016/08/29
 * Time: 18:09
 *
 */

var path = require("path");
var webpack = require("webpack");
var fs = require("fs");
module.exports = {
    entry: {
        // https://github.com/webpack/webpack/issues/300
        main: ["./src/main.js"]
    },

    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js",
        publicPath: "/dist/"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                // exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: JSON.parse(
                        fs.readFileSync(require.resolve("./.babelrc"), "utf-8")
                    )
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader?minimize"
            },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader?minimize!less-loader"
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
                loader: "file-loader",
                query: {
                    name: "[name].[ext]?[hash]"
                }
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            }
        ]
    },
    resolve: {
        extensions: [".js", ".json"]
    },
    plugins: []
};
