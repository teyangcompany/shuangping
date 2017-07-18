/**
 * Created by Administrator on 2017/7/13 0013.
 */
import "./page1.scss";
import $ from "../../lib/jquery-vendor";

import header from "../public/header.ejs";
import time from "../../module/time/time";
import number from "../../module/number/number";

import echarts from "echarts";
import "../../lib/china";
import tuli from "../../module/tuli/tuli";

import pie1 from "../../module/pie1/pie1";
import "swiper";
import "../../../static/swiper/swiper-3.4.2.min.css"

import pie2 from "../../module/pie2/pie2"

import bar1 from "../../module/bar1/bar1"

let mainBox = $("body");
$('header', mainBox).html(header({}));
//时间日期展示
time();
//数字滚动展示
number()
//模拟数据
setInterval((res) => {
    let t = $("#user_total", mainBox).attr("total");
    t = parseInt(t) + Math.round(Math.random() * 1000);
    $("#user_total", mainBox).attr("total", t);
}, 5000)

const H = $(window).height();
$("#map").height(H - (135) * 2);

let mapChart = echarts.init($("#map")[0]);
let mapOption = {
    title: {
        show: false
    },
    geo: {
        map: "china",
        label: {
            emphasis: {
                show: false
            }
        },
        itemStyle: {
            normal: {
                color: "#14274e"
            },
            emphasis: {
                color: "#1f2f4f"
            }
        },
        top: 0,
        bottom: 0
    },
    series: [{
        name: "demo",
        type: "effectScatter",
        coordinateSystem: "geo",
        data: [
            {name: "浙江省", value: [120.19, 30.26]}
        ],
        symbolSize: 20,
        showEffectOn: 'render',
        rippleEffect: {
            brushType: 'stroke'
        },
        hoverAnimation: true,
        label: {
            normal: {
                formatter: (params) => {
                    return `${params.name}\n\n下载量：1000\n\n下载量：1000\n\n下载量：1000`
                },
                position: 'right',
                show: true,
                textStyle: {
                    color: "#fff"
                }
            }
        },
        itemStyle: {
            normal: {
                color: '#f4e925',
                shadowBlur: 10,
                shadowColor: '#333'
            }
        },
        zlevel: 1
    }]
};
mapChart.setOption(mapOption);

//注册用户数
tuli();

$("#total-reg").data("data", [
    {name: "V", text: "微信(V)", value: 400},
    {name: "A", text: "APP(A)", value: 500},
    {name: "X", text: "线上(X)", value: 800}
])

$("#month-reg").data("data", [
    {name: "V", text: "微信(V)", value: 500},
    {name: "A", text: "APP(A)", value: 300},
    {name: "X", text: "线上(X)", value: 900}
])

$("#week-reg").data("data", [
    {name: "V", text: "微信(V)", value: 600},
    {name: "A", text: "APP(A)", value: 700},
    {name: "X", text: "线上(X)", value: 400}
])

$("#day-reg").data("data", [
    {name: "V", text: "微信(V)", value: 100},
    {name: "A", text: "APP(A)", value: 80},
    {name: "X", text: "线上(X)", value: 180}
])

$("#server_bar").data("data", [
    {name: "浙江", value: 11623},
    {name: "上海", value: 4745},
    {name: "新疆", value: 200},
    {name: "山东", value: 5300},
    {name: "河北", value: 8400}])

pie1(echarts);
//下载量/注册量/服务量
const swiperInit = (selector) => {
    return new Swiper(selector, {
        autoplay: 5000,//可选选项，自动滑动
        loop: true,
        onInit: (res) => {
            $(".reg-pie").each((index, o) => {
                $(o).data("data", [
                    {name: "线上", value: 123},
                    {name: "APP", value: 445},
                    {name: "微信", value: 200}])
            })

            $(".download-pie").each((index, o) => {
                $(o).data("data", [
                    {name: "IOS", value: 123},
                    {name: "ANDROID", value: 445}
                ])
            })
        },
        onSlideChangeEnd: (swiper) => {
            let index = (swiper.activeIndex)
            pie2(echarts);
            $(".pie .title span").eq(3 - index).addClass('current').siblings().removeClass("current");
            $(selector).find("ol li").eq(3 - index).addClass('current').siblings().removeClass("current");
        }
    })
}


const donwloadPartInit = function () {
    let regPartHeight = $(".reg-part").height();
    let h = H - regPartHeight - 35 - 100 - 15 - 10;
    $(".download-part>div").height(h);
    $("#swiper").height(h - 40 - 20)
    bar1(echarts);
    pie2(echarts);
    swiperInit("#swiper");
}
setTimeout(() => {
    donwloadPartInit();
}, 1500);


//