/**
 * Created by Administrator on 2017/7/13 0013.
 */
import "./page1.scss";
import $ from "../../lib/jquery-vendor";

import header from "../public/header.ejs";
import time from "../../module/time/time";
import number from "../../module/number/number";
import echarts from "echarts"
import "../../lib/china";
import "swiper";
import "../../../static/swiper/swiper-3.4.2.min.css"

import pie1 from "../../module/pie1/pie1"
import tuli from "../../module/tuli/tuli"

import pie2 from "../../module/pie2/pie2"
import bar1 from "../../module/bar1/bar1"
import map from "../../module/map/map"
import slide from "../../module/slide/slide"
import ssyyqkTpl from "./tpl/ssyyqk.ejs"
import timeformat from "lmw-time-format";

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


const H = parseInt(window.innerHeight);
const partH = (H - 35 - 100 - 10 - 30) / 2;

const init = (res) => {
    $(".charts>div").css("height", `${partH}px`)
    $(".charts .wrap .container").css("height", `${partH - 40 - 2}px`);
    $(".pielist ul li").css("height", `${partH - 40 - 2 - 25 - 20}px`);
    $("#map").css("height", `${(partH * 2) * 0.7}px`)
    $("#slide").css("height", `${(partH * 2) * 0.3}px`)
    $("#swiper,#server_bar").css("height", `${partH - 40 - 2 - 20}px`)
    $("#slide").css("width", `${window.innerWidth / 4}px`)
}

const swiper1Init = (res) => {
    let mySwiper = new Swiper("#swiper", {
        autoplay: 5000,
        loop: true,
        onInit: () => {
            ['download', 'reg'].forEach((res) => {
                $(`.${res}-pie`).each((index, o) => {
                    $(o).data("refresh", 1)
                });
            })
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
        onSlideChangeStart: (swiper) => {
            pie2(echarts);
            let index = (swiper.realIndex)
            $(".pie .title span").eq(index).addClass('current').siblings().removeClass("current");
            $(".pie").find("ol li").eq(index).addClass('current').siblings().removeClass("current");
        }
    })
}


$(document).ready(function () {
    init();
    tuli();
    pie1(echarts);
    swiper1Init();
    pie2(echarts);
    bar1(echarts)
    map(echarts)
})


/*$("#total-reg").data("data", [
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

$("#day-reg").data("data", )*/

/*$("#server_bar").data("data", [
    {name: "浙江", value: 11623},
    {name: "上海", value: 4745},
    {name: "新疆", value: 200},
    {name: "山东", value: 5300},
    {name: "河北", value: 8400}])*/


const getData = function () {
    return [
        {name: "V", text: "微信(V)", value: Math.round(Math.random() * 1000)},
        {name: "A", text: "APP(A)", value: Math.round(Math.random() * 1000)},
        {name: "X", text: "线上(X)", value: Math.round(Math.random() * 1000)}
    ]
};

["total", "month", "week", "day"].forEach((res) => {
    $(`#${res}-reg`).data("refresh", 1)
    $(`#${res}-reg`).data("width", 2.5);
    $(`#${res}-reg`).data("data", getData())
})

$("#server_bar").data("refresh", 1);
$("#server_bar").data("data", [
    {name: "浙江", value: Math.round(Math.random() * 10000)},
    {name: "上海", value: Math.round(Math.random() * 10000)},
    {name: "新疆", value: Math.round(Math.random() * 10000)},
    {name: "山东", value: Math.round(Math.random() * 10000)},
    {name: "河北", value: Math.round(Math.random() * 10000)}])


const getGPS = (place) => {
    let url = `//api.map.baidu.com/geocoder/v2/?address=${place}&output=json&ak=ygxQc0Ydvnc33iCdP8LcR8kc&callback=?`
    return $.getJSON(url).then(function (response) {
        if (response.status == 0) {
            return Object.assign({}, response.result, {name: place});
        }
    })
}

let area = ["浙江省", "山东省", "新疆维吾尔族自治区", "上海市", "四川省", "江苏省", "广东省", "江西省", "北京市", "福建省"];

function getLoc() {
    getGPS(area[Math.floor(area.length * Math.random())])
        .then(function (loc) {
            $("#map").data("refresh", 1)
            $("#map").data("data", [{
                name: loc.name,
                value: [loc.location.lng, loc.location.lat, Math.round(Math.random() * 1000), Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            }]);
            setTimeout((res) => {
                getLoc();
            }, 5000)
        })

}

getLoc();

const getData2 = (res) => {
    let arr = [];
    for (let i = 0; i < 5; i++) {
        let str = "请问日体育哦派阿萨德法国红酒快乐自行车卖你吧"
        let time = timeformat(new Date().getTime() + i * 60 * 1000, "%H：%M");
        arr.push({
            time: time,
            name: str.substr(Math.floor(Math.random() * str.length), 1),
            hos: ["浙医二院", "长兴医院"][Math.floor(Math.random() * 2)],
            dept: ["呼吸", "消化", "内分泌"][Math.floor(Math.random() * 3)] + "科",
            doc: str.substr(Math.floor(Math.random() * str.length), 3),
            content: str.substr(Math.floor(Math.random() * str.length))
        })
    }
    return arr;
}

$("#slide").data("refresh", 1);
$("#slide").data("data", getData2())
slide("#slide", ssyyqkTpl);