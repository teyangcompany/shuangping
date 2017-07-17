/**
 * Created by Administrator on 2017/7/13 0013.
 */
const webpack = require("webpack");
const path = require("path");
const glob = require("glob");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const resolve = function (p) {
    return path.resolve(__dirname, "../", p);
}

let entryDir = glob.sync(resolve('src/app/**/*.js'))
let entryObj = {};
let htmls = [];
entryDir.forEach((res) => {
    let key = path.basename(res, '.js');
    entryObj[key] = resolve(res);
    htmls.push(new HtmlWebpackPlugin({
        filename: `${key}.html`,
        template: res.replace(".js", ".ejs"),
        chunks: [key]
    }))
});


module.exports = {
    entry: entryObj,
    output: {
        path: resolve("dist"),
        publicPath: "/",
        filename: "[name].[hash].js"
    },
    resolve:{
        alias:{
            "swiper":resolve("./static/swiper/swiper-3.4.2.jquery.min.js")
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{loader: "style-loader"}, {loader: "css-loader"}]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
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
                test:/\.(png|jpg|gif)$/,
                use:[{
                    loader:'url-loader',
                    options:{
                        limit:8192,
                        name:"static/img/[name].[ext]?[hash]"
                    }
                }]
            },
            {
                test:/\.ejs$/,
                use:[
                    {
                        loader: "ejs-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        ...htmls
    ]
}