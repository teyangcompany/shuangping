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

import bar2 from "../../module/bar2/bar2"

import line from "../../module/line/line"

let mainBox = $("body");
$('header', mainBox).html(header({}));
//时间日期展示
time();
let H, W, partH, partW = {};

const init = () => {
    H = window.innerHeight;
    W = window.innerWidth;
    partH = (H - 35 - 15 * 3 - 10) / 3;
    console.log(H, W, partH);
    $(".wrap", mainBox).css("height", `${partH}px`);
    $(".part1,.part2,.part3").each((i, o) => {
        let size = $(">.wrap", $(o)).length;
        partW[size] = (W - (size - 1) * 15) / size
        $(">.wrap", $(o)).css("width", `${partW[size]}px`);
        $(".swiper-container").css('height', `${partH - 2 - 40}px`)
        $(".online-total,.yygh-total").find("li").css("width", `${(partW[3] - 2) / 3}px`).css('height', `${partH - 2 - 40}px`)
        $(".yygh-line").css('height', `${partH - 2 - 40}px`)
    })
}

const swiper1Init = (res) => {
    let mySwiper = new Swiper(".hot-swiper", {
        autoplay: 5000,
        loop: true,
        onInit: () => {
            $(".hot-doc").each((index, o) => {
                $(o).data("data", [
                    {name: "丁克峰", value: 123},
                    {name: "丁克峰", value: 945},
                    {name: "丁克峰", value: 201},
                    {name: "丁克峰", value: 302},
                    {name: "丁克峰", value: 100}])
            })

            $(".hot-dept").each((index, o) => {
                $(o).data("data", [
                    {name: "呼吸科", value: 123},
                    {name: "呼吸科", value: 445},
                    {name: "呼吸科", value: 398},
                    {name: "呼吸科", value: 675},
                    {name: "呼吸科", value: 765}
                ])
            })
        },
        onSlideChangeEnd: (swiper) => {
            bar2(echarts);
            let index = (swiper.realIndex)
            $("#hot1 .title span").eq(index).addClass('current').siblings().removeClass("current");
            $("#hot1").find("ol li").eq(index).addClass('current').siblings().removeClass("current");
        }
    })
}

const swiper2Init = () => {
    let mySwiper = new Swiper(".liang-swiper", {
        autoplay: 5000,
        loop: true,
        onSlideChangeEnd: (swiper) => {
            let index = (swiper.realIndex)

            $("#liang .title span").eq(index).addClass('current').siblings().removeClass("current");
            $("#liang").find("ol li").eq(index).addClass('current').siblings().removeClass("current");
        }
    })
}

$(document).ready(() => {
    init();
    swiper1Init();
    swiper2Init();
    pie1(echarts);
    bar2(echarts);
    line(echarts);
})


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

let yyghLine = [];
for (let i = 0; i < Math.max(5, Math.random() * 10); i++) {
    yyghLine.push({name: `7月${i + 1}日`, value: Math.round(Math.random() * 1000)})
}
$("#yygh-line").data("data", yyghLine);