const shelljs = require("shelljs");
const {resolve} = require("path");

let dist = resolve(__dirname, "../../../web/gjyy_web/build/echarts"), from = resolve(__dirname, "../dist");

console.log("dist", dist, from);
shelljs.rm("-rf", `${dist}/*`);
shelljs.cp("-Rf", `${from}/*`, dist);