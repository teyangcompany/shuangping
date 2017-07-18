/**
 * Created by Administrator on 2017/7/17 0017.
 */
const init = function (el, echarts, data) {
    let dom = $(el);

    if (!dom.css("height")) {
        let H = (window.innerHeight - 100 - 35 - 15) / 2;
        dom.height(H - 40 - 10 - 10 - 25);
    }

    if (!data) {
        return
    }

    let myChart = echarts.init(el);
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
            radius: [`${100 - (i + 2) * 10}%`, `${100 - (i + 1) * 10}%`],
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
            bottom: 0,
            z: 8,
            zlevel: 6,
            left: "50%",
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
            zlevel: 8,
            z: 10,
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
            init(el, echarts, data);
        }, 1000)
    })
}