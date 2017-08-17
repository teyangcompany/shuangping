const nodeArgv = require("lmw-node-argv");
const argvs = nodeArgv();
/*根据argvs["publicPath"]打包生成不同的文件绝对路径*/

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

const getPublicPath = function () {
    if (process.env.NODE_ENV === "production") {
        if (argvs && argvs["publicPath"]) {
            return argvs["publicPath"]
        } else {
            return "./"
        }
    } else {
        return "/"
    }
}
exports.cssLoader = cssLoader;
exports.getPublicPath = getPublicPath;