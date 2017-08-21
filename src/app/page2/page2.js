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
import sspjqkTpl from "./tpl/sspjqk.ejs"
import slide from "../../module/slide/slide"
import api from "../../lib/api"

const DAY_COUNT = 7;
let mainBox = $("body");
$('header', mainBox).html(header({}));
//时间日期展示
time();
let H, W, partH, partW = {};

const init = () => {
    H = window.innerHeight;
    W = window.innerWidth;
    partH = (H - 35 - 10 * 3 - 30) / 3;
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

const swiper1Init = (resdata) => {
    let mySwiper = new Swiper(".hot-swiper", {
        autoplay: 5000,
        loop: true,
        onInit: () => {
            ["doc", "dept"].forEach(function (className) {
                let key = `hot${className.substr(0, 1).toUpperCase() + className.substr(1)}List`;
                let data = resdata[key];
                data = data.map((res) => {
                    res.name = (res.docName) ? res.docName.substr(0, 3) : res.deptName ? res.deptName : "普外科";
                    res.value = res.total;
                    return res
                })
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
                for (let i = 0; i < DAY_COUNT; i++) {
                    let day = timeformat(new Date().getTime() - (DAY_COUNT - i) * 24 * 3600 * 1000, "%m月%d日");
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

const swiper3Init = (resdata) => {
    let mySwiper = new Swiper(".hot2-swiper", {
        autoplay: 5000,
        loop: true,
        onInit: () => {
            ["doc", "dept"].forEach(function (className) {
                let key = `good${className.substr(0, 1).toUpperCase() + className.substr(1)}List`;
                let data = resdata[key], graphic = [];
                data = data.map((res, index) => {
                    graphic.push({
                        type: "image",
                        left: 6,
                        top: (5 / (partH - 2 - 40 - 30) * (partH - 2 - 40 - 30)) + (partH - 2 - 40 - 30) / 5 * (index),
                        style: {
                            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAMCAYAAAC5tzfZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCQjRFNjAyMTgzMkQxMUU3ODU5MEJBQjRCRDFGQUFCQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCQjRFNjAyMjgzMkQxMUU3ODU5MEJBQjRCRDFGQUFCQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkJCNEU2MDFGODMyRDExRTc4NTkwQkFCNEJEMUZBQUJDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkJCNEU2MDIwODMyRDExRTc4NTkwQkFCNEJEMUZBQUJDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+42sypQAAALdJREFUeNpi/H0jkQELkATiZ0CsCMQP0CWZsGgAiW2HsrcAMSMxmpSBWB/K1gZiBXQFLEDMA8QqUEkQnYymBmTbPCC+C3XqHUagn94CGUIMxINXIOc5AvEbYjUAsRNI0yUgtoCGFj7wGIgtgfgqLCBA7nUioMkZiO+hhx4fAU182IJcFU3RVzS+EjZNtlAa5Lc0IBYE4hQgfgEVt8OmCRSC5UAsC8Szgfg3EM8FYhkgrkQOYYAAAwAnDCFh7k9INAAAAABJRU5ErkJggg==",
                            width: 12,
                            height: 12
                        }
                    })
                    res.name = (res.docName) ? res.docName.substr(0, 3) : res.docDeptName ? res.docDeptName : "普外科";
                    res.value = res.docScoure;
                    return res
                })
                $(".hot2-" + className).each(function (index, o) {
                    $(o).data('refresh', 1);
                    $(o).data("graphic", graphic);
                    if (className == "doc") {
                        $(o).data("grid", {
                            left: 70,
                            top: 0,
                            right: 35,
                            bottom: 30
                        });
                    }
                    if (className == "dept") {
                        $(o).data("grid", {
                            left: 90,
                            top: 0,
                            right: 35,
                            bottom: 30
                        });
                    }
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
    swiper2Init();
    pie1(echarts);
    bar2(echarts);
    line(echarts);
    slide("#slide-sszxqk", sszxqkTpl)
})


api("nethos.demo.area.count", {}).then((res) => {
    console.log("data1", res);
    /*热门医生/热门科室*/
    swiper1Init(res.obj);
    /*实时咨询情况*/
    let consultInfoList = res.obj.consultInfoList;
    /*{
            time: time,
            name: str.substr(Math.floor(Math.random() * str.length), 1),
            hos: ["浙医二院", "长兴医院"][Math.floor(Math.random() * 2)],
            dept: ["呼吸", "消化", "内分泌"][Math.floor(Math.random() * 3)] + "科",
            doc: str.substr(Math.floor(Math.random() * str.length), 3),
            content: str.substr(Math.floor(Math.random() * str.length))
        }*/
    consultInfoList = consultInfoList.map((consult) => {
        consult.time = timeformat(consult.createTime, "%m-%d");
        consult.name = consult.consulterName.substr(0, 1);
        consult.hos = "浙医二院";
        consult.dept = consult.consultTypeName;
        consult.doc = "";
        consult.content = consult.consultContent;
        return consult
    });
    $("#slide-sszxqk").data("refresh", 1);
    $("#slide-sszxqk").data("data", consultInfoList);
    slide("#slide-sszxqk", sszxqkTpl);

    /*实时评价情况*/
    let commentLsit = res.obj.commentLsit;
    commentLsit = commentLsit.map((comment) => {
        comment.time = timeformat(comment.sysComment.createTime, "%H:%M");
        comment.name = comment.patName.substr(0, 1);
        comment.hos = "浙医二院";
        comment.dept = comment.deptName;
        comment.doc = comment.docName;
        comment.content = "评分为" + comment.sysComment.score + "分";
        return comment
    })
    $("#slide-sspjqk").data("refresh", 1);
    $("#slide-sspjqk").data("data", commentLsit)
    slide("#slide-sspjqk", sspjqkTpl);

    /*热门预约医生/热门预约科室*/
    swiper3Init(res.obj);


})
api("nethos.demo.bookorder.list", {}).then((res) => {
    console.log(res);
})

const bili = Math.random();

function getDemoValue(max) {
    return Math.round(bili * parseInt(max)
    )
}


$("#yygh-total").data("refresh", 1);
$("#yygh-total").data("data", [
    {name: "V", text: "微信(V)", value: getDemoValue(400)},
    {name: "A", text: "APP(A)", value: getDemoValue(380)},
    {name: "X", text: "线上(X)", value: getDemoValue(360)}
])

$("#yygh-mouth").data("refresh", 1)
$("#yygh-mouth").data("data", [
    {name: "V", text: "微信(V)", value: getDemoValue(100)},
    {name: "A", text: "APP(A)", value: getDemoValue(95)},
    {name: "X", text: "线上(X)", value: getDemoValue(90)}
])
$("#yygh-week").data("refresh", 1)
$("#yygh-week").data("data", [
    {name: "V", text: "微信(V)", value: getDemoValue(25)},
    {name: "A", text: "APP(A)", value: getDemoValue(24)},
    {name: "X", text: "线上(X)", value: getDemoValue(20)}
])
$("#online-total").data("refresh", 1)
$("#online-total").data("data", [
    {name: "V", text: "微信(V)", value: getDemoValue(550)},
    {name: "A", text: "APP(A)", value: getDemoValue(600)},
    {name: "X", text: "线上(X)", value: getDemoValue(500)}
])
$("#online-month").data("refresh", 1)
$("#online-month").data("data", [
    {name: "V", text: "微信(V)", value: getDemoValue(140)},
    {name: "A", text: "APP(A)", value: getDemoValue(150)},
    {name: "X", text: "线上(X)", value: getDemoValue(135)}
])
$("#online-week").data("refresh", 1)
$("#online-week").data("data", [
    {name: "V", text: "微信(V)", value: getDemoValue(17)},
    {name: "A", text: "APP(A)", value: getDemoValue(20)},
    {name: "X", text: "线上(X)", value: getDemoValue(15)}
])

let yyghLine = [];

for (let i = 0; i < DAY_COUNT; i++) {
    let day = timeformat(new Date().getTime() - (DAY_COUNT - i) * 24 * 3600 * 1000, "%m月%d日");
    yyghLine.push({name: day, value: Math.round(Math.random() * 1000)})
}
$("#yygh-line").data("refresh", 1);
$("#yygh-line").data("data", yyghLine);

