/**
 * Created by Administrator on 2017/7/17 0017.
 */
const init = function (el, echarts, data) {
    let dom = $(el);
    if (parseInt(dom.css("height")) == 0) {
        let H = (window.innerHeight - 100 - 35 - 15) / 2;
        dom.height(H - 40 - 10 - 10 - 25);
    }

    if (!data) {
        return
    }

    let myChart = echarts.init(el);
    $(el).data("refresh", 0)
    let series = [], legend = [];
    let total = {
        name: 'total',
        value: 0,
        itemStyle: {
            normal: {
                color: "#14274e"
            }
        }
    }
    data.forEach((res) => {
        legend.push(`${res.name}:${res.value}`);
        total.value += res.value
    })
    data.forEach((d, i) => {
        let shengyu = $.extend({}, total, {
            value: total.value - d.value
        });
        let width = $(el).data("width") ? $(el).data("width") : 1;
        width = parseFloat(width)
        series.push({
            type: "pie",
            startAngle: i == 0 ? 125 : i == 1 ? 115 : 120,
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                },
                emphasis: {
                    show: false
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            radius: [`${100 - (i + width + 1) * 9}%`, `${100 - (i + width) * 9}%`],
            data: [$.extend({}, d, {
                name: `${d.name}:${d.value}`,
                itemStyle: {
                    normal: {
                        color: i == 0 ? "#00ffff" : i == 1 ? "#089dfb" : "#615afb"
                    }
                }
            }), shengyu],
            zlevel: i,
            z: i + 2
        })
    })
    let option = {
        title: {
            text: dom.attr("title"),
            textAlign: "center",
            z: 10,
            zlevel: 8,
            left: "50%",
            bottom: 0,
            textStyle: {
                color: "#00ffff",
                fontSize: 14
            }
        },
        legend: {
            orient: 'vertical',
            left: 'center',
            top: "center",
            itemWidth: 15,
            itemHeight: 5,
            zlevel: 6,
            z: 8,
            textStyle: {
                color: "#ffffff",
                fontSize: 12
            },
            data: legend
        },
        series: series
    }
    myChart.setOption(option);
}


export default function (echarts) {
    $(".module-pie1").each((index, el) => {
        setInterval((res) => {
            let data = $(el).data("data");
            let refresh = $(el).data("refresh");
            if (refresh && refresh == 1) {
                console.log(refresh, data)
                init(el, echarts, data);
            }
        }, 1000)
    })
}