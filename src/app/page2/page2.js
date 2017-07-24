/**
 * Created by Administrator on 2017/7/13 0013.
 */
import "./page2.scss";
import $ from "../../lib/jquery-vendor";

import "swiper";
import "../../../static/swiper/swiper-3.4.2.min.css"

import timeformat from "lmw-time-format";

import header from "../public/header.ejs";
import time from "../../module/time/time";

import echarts from "echarts";
import pie1 from "../../module/pie1/pie1"

import bar2 from "../../module/bar2/bar2"

import line from "../../module/line/line"

import sszxqkTpl from "./tpl/sszxqk.ejs"
import slide from "../../module/slide/slide"

let mainBox = $("body");
$('header', mainBox).html(header({}));
//时间日期展示
time();
let H, W, partH, partW = {};

const init = () => {
    H = window.innerHeight;
    W = window.innerWidth;
    partH = (H - 35 - 15 * 3 - 10) / 3;
    $(".wrap", mainBox).css("height", `${partH}px`);
    $(".part1,.part2,.part3").each((i, o) => {
        let size = $(">.wrap", $(o)).length;
        partW[size] = (W - (size - 1) * 15) / size
        $(">.wrap", $(o)).css("width", `${partW[size]}px`);
        $(".swiper-container").css('height', `${partH - 2 - 40}px`)
        $(".online-total,.yygh-total").find("li").css("width", `${(partW[3] - 2) / 3}px`).css('height', `${partH - 2 - 40}px`)
        $(".yygh-line,.module-slide").css('height', `${partH - 2 - 40}px`)
    })
}

const swiper1Init = (res) => {
    let mySwiper = new Swiper(".hot-swiper", {
        autoplay: 5000,
        loop: true,
        onInit: () => {
            ["doc", "dept"].forEach(function (className) {
                var str = "请问日体育哦派阿萨德法国红酒快乐自行车卖你吧", data = []
                for (var i = 0; i < 5; i++) {
                    var name = str.substr(Math.floor(str.length * Math.random()), 3);
                    data.push({name: name, value: Math.round(Math.random() * 1000)})
                }
                $(".hot-" + className).each(function (index, o) {
                    $(o).data('refresh', 1)
                    $(o).data("data", data);
                })
            })
        },
        onSlideChangeStart: (swiper) => {
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
        onInit: function () {
            let typeArr = ['fz', 'zz', 'hz', 'wz'];
            typeArr.forEach((type) => {
                let line = [];
                for (let i = 0; i < 7; i++) {
                    let day = timeformat(new Date().getTime() + i * 24 * 3600 * 1000, "%m月%d日");
                    line.push({name: day, value: Math.round(Math.random() * 1000)})
                }
                $(".liang-" + type).each(function (index, o) {
                    $(o).data('refresh', 1)
                    $(o).data("data", line);
                })
            });
        },
        onSlideChangeStart: (swiper) => {
            line(echarts)
            let index = (swiper.realIndex)
            $("#liang .title span").eq(index).addClass('current').siblings().removeClass("current");
        }
    })
}

const swiper3Init = (res) => {
    let mySwiper = new Swiper(".hot2-swiper", {
        autoplay: 5000,
        loop: true,
        onInit: () => {
            ["doc", "dept"].forEach(function (className) {
                var str = "请问日体育哦派阿萨德法国红酒快乐自行车卖你吧", data = []
                for (var i = 0; i < 5; i++) {
                    var name = str.substr(Math.floor(str.length * Math.random()), 3);
                    data.push({name: name, value: Math.round(Math.random() * 1000)})
                }
                $(".hot2-" + className).each(function (index, o) {
                    $(o).data('refresh', 1)
                    $(o).data("data", data);
                })
            })
        },
        onSlideChangeStart: (swiper) => {
            bar2(echarts);
            let index = (swiper.realIndex)
            $("#hot2 .title span").eq(index).addClass('current').siblings().removeClass("current");
            $("#hot2").find("ol li").eq(index).addClass('current').siblings().removeClass("current");
        }
    })
}

$(document).ready(() => {
    init();
    swiper1Init();
    swiper2Init();
    swiper3Init();
    pie1(echarts);
    bar2(echarts);
    line(echarts);
    slide("#slide-sszxqk", sszxqkTpl)
})

$("#yygh-total").data("refresh", 1);
$("#yygh-total").data("data", [
    {name: "V", text: "微信(V)", value: 400},
    {name: "A", text: "APP(A)", value: 500},
    {name: "X", text: "线上(X)", value: 800}
])

$("#yygh-mouth").data("refresh", 1)
$("#yygh-mouth").data("data", [
    {name: "V", text: "微信(V)", value: 400},
    {name: "A", text: "APP(A)", value: 500},
    {name: "X", text: "线上(X)", value: 800}
])
$("#yygh-week").data("refresh", 1)
$("#yygh-week").data("data", [
    {name: "V", text: "微信(V)", value: 400},
    {name: "A", text: "APP(A)", value: 500},
    {name: "X", text: "线上(X)", value: 800}
])
$("#online-total").data("refresh", 1)
$("#online-total").data("data", [
    {name: "V", text: "微信(V)", value: 400},
    {name: "A", text: "APP(A)", value: 500},
    {name: "X", text: "线上(X)", value: 800}
])
$("#online-month").data("refresh", 1)
$("#online-month").data("data", [
    {name: "V", text: "微信(V)", value: 400},
    {name: "A", text: "APP(A)", value: 500},
    {name: "X", text: "线上(X)", value: 800}
])
$("#online-week").data("refresh", 1)
$("#online-week").data("data", [
    {name: "V", text: "微信(V)", value: 400},
    {name: "A", text: "APP(A)", value: 500},
    {name: "X", text: "线上(X)", value: 800}
])

let yyghLine = [];
for (let i = 0; i < Math.max(5, Math.random() * 10); i++) {
    let day = timeformat(new Date().getTime() + i * 24 * 3600 * 1000, "%m月%d日");
    yyghLine.push({name: day, value: Math.round(Math.random() * 1000)})
}
$("#yygh-line").data("refresh", 1);
$("#yygh-line").data("data", yyghLine);

let sszxqkArr = [];
for (let i = 0; i < 5; i++) {
    let str = "请问日体育哦派阿萨德法国红酒快乐自行车卖你吧"
    let time = timeformat(new Date().getTime() + i * 60 * 1000, "%H：%");
    sszxqkArr.push({
        time: time,
        name: str.substr(Math.floor(Math.random() * str.length), 1),
        hos: ["浙江大学医学院附属第二医院", "长兴医院"][Math.floor(Math.random() * 2)],
        dept: ["呼吸", "消化", "内分泌"][Math.floor(Math.random() * 3)]+"科",
        doc: str.substr(Math.floor(Math.random() * str.length), 1),
        content: "发起咨询:" + str.substr(Math.floor(Math.random() * str.length))
    })
}
console.log(sszxqkArr);