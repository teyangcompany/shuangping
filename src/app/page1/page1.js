/**
 * Created by Administrator on 2017/7/13 0013.
 */
import "./page1.scss";
import $ from "../../lib/jquery-vendor";

import header from "../public/header.ejs";
import time from "../../module/time/time";
import number from "../../module/number/number";

let mainBox = $("body");
$('header', mainBox).html(header({}));
time();

number(".module-number")

setInterval((res) => {
    let t = $("#user_total", mainBox).attr("total");
    t = parseInt(t) + Math.round(Math.random() * 100);
    $("#user_total", mainBox).attr("total", t);
}, 10000)

//import echarts from "echarts";
