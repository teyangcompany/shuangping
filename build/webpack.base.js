/**
 * Created by Administrator on 2017/7/13 0013.
 */
const webpack = require("webpack");
const path = require("path");
const glob = require("glob");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin("static/css/commons.css");
const extractSASS = new ExtractTextPlugin("static/css/style.css");

const nodeArgv = require("lmw-node-argv");
const argvs = nodeArgv();
/*根据argvs["publicPath"]打包生成不同的文件绝对路径*/

const resolve = function (p) {
    return path.resolve(__dirname, "../", p);
}

const cssLoader = function (loads, extractFun) {
    let loaders = ["style-loader"];
    if (process.env.NODE_ENV === "production") {
        return extractFun.extract({
            fallback: "style-loader",
            use: loads
        });
    } else {
        return loaders.concat(loads);
    }

}


let entryDir = glob.sync(resolve('src/app/**/*.js'))
let entryObj = {};
let htmls = [], plugins = [];
if (process.env.NODE_ENV === "production") {
    plugins.push(new webpack.optimize.CommonsChunkPlugin({
        name: "commons",
        filename: "commons.js"
    }));
    plugins.push(extractCSS);
    plugins.push(extractSASS);
}
entryDir.forEach((res) => {
    let key = path.basename(res, '.js');
    entryObj[key] = resolve(res);
    htmls.push(new HtmlWebpackPlugin({
        filename: `${key}.html`,
        template: res.replace(".js", ".ejs"),
        chunks: process.env.NODE_ENV === "production" ? ["commons", key] : [key]
    }))
});
module.exports = {
    entry: entryObj,
    output: {
        path: resolve("dist"),
        publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
        filename: "[name].[hash].js"
    },
    resolve: {
        alias: {
            "swiper": resolve("./static/swiper/swiper-3.4.2.jquery.min.js")
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoader(["css-loader"], extractCSS)
            },
            {
                test: /\.scss$/,
                use: cssLoader(["css-loader", "sass-loader"], extractSASS)
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        outputPath: "static/img/",
                        name: "[name].[ext]?[hash]"
                    }
                }]
            },
            {
                test: /\.ejs$/,
                use: [
                    {
                        loader: "ejs-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        ...htmls,
        ...plugins,
    ]
}