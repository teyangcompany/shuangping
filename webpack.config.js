const Merge = require("webpack-merge");
const BaseConfig = require("./build/webpack.base");
const path = require("path");
const resolve = (_path) => {
   return path.resolve(__dirname, "./", _path);
}
module.exports = Merge(BaseConfig, {
    devtool: process.env.NODE_ENV === "production" ? "source-map" : "cheap-eval-source-map",
    devServer: {
        contentBase: [resolve('dist'), resolve('./')],
        port: 8080
    }
});