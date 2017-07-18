/**
 * Created by Administrator on 2017/7/13 0013.
 */
import "./page2.scss";
import $ from "../../lib/jquery-vendor";

import "swiper";
import "../../../static/swiper/swiper-3.4.2.min.css"


import header from "../public/header.ejs";
import time from "../../module/time/time";

import echarts from "echarts";
import pie1 from "../../module/pie1/pie1"

let mainBox = $("body");
$('header', mainBox).html(header({}));
//时间日期展示
time();
let H, W, partH, partW = {};

const init = () => {
    H = window.innerHeight;
    W = window.innerWidth;
    partH = (H - 35 - 15 * 3 - 10) / 3
    $(".wrap", mainBox).css("height", `${partH}px`);
    $(".part1,.part2,.part3").each((i, o) => {
        let size = $(">.wrap", $(o)).length;
        partW[size] = (W - (size - 1) * 15) / size
        $(">.wrap", $(o)).css("width", `${partW[size]}px`);
        $(".swiper-container").css('height', `${partH - 2 - 40}px`)
        $(".online-total,.yygh-total").find("li").css("width", `${(partW[3] - 2) / 3}px`).css('height', `${partH - 2 - 40}px`)
    })
}
init();

$("#yygh-total").data("data", [
    {name: "V", text: "微信(V)", value: 400},
    {name: "A", text: "APP(A)", value: 500},
    {name: "X", text: "线上(X)", value: 800}
])

$("#yygh-mouth").data("data", [
    {name: "V", text: "微信(V)", value: 400},
    {name: "A", text: "APP(A)", value: 500},
    {name: "X", text: "线上(X)", value: 800}
])

$("#yygh-week").data("data", [
    {name: "V", text: "微信(V)", value: 400},
    {name: "A", text: "APP(A)", value: 500},
    {name: "X", text: "线上(X)", value: 800}
])

$("#online-total").data("data", [
    {name: "V", text: "微信(V)", value: 400},
    {name: "A", text: "APP(A)", value: 500},
    {name: "X", text: "线上(X)", value: 800}
])

$("#online-month").data("data", [
    {name: "V", text: "微信(V)", value: 400},
    {name: "A", text: "APP(A)", value: 500},
    {name: "X", text: "线上(X)", value: 800}
])

$("#online-week").data("data", [
    {name: "V", text: "微信(V)", value: 400},
    {name: "A", text: "APP(A)", value: 500},
    {name: "X", text: "线上(X)", value: 800}
])
pie1(echarts);


const swiper1Init = (res) => {
    let mySwiper = new Swiper(".swiper-container", {
        autoplay: 5000,
        loop: true,
    })
}

swiper1Init();