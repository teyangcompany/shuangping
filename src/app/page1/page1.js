/**
 * Created by Administrator on 2017/7/13 0013.
 */
import "./page1.scss";
import $ from "../../lib/jquery-vendor";

import header from "../public/header.ejs";
import time from "../../module/time/time";
import number from "../../module/number/number";

import echarts from "echarts";
import "../../lib/china"

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
                    console.log(params);
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

