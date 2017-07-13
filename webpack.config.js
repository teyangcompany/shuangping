const Merge = require("webpack-merge");
const BaseConfig = require("./build/webpack.base");
module.exports = Merge(BaseConfig, {
    devtool: process.env.NODE_ENV === "production" ? "source-map" : "cheap-eval-source-map"
});