import "../../lib/china"

const init = function (el, echarts, data) {
    let mapChart = echarts.init(el);
    $(el).data("refresh", 0)
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
            data: data,
            symbolSize: 20,
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
                normal: {
                    formatter: (params) => {
                        return `${params.name}\n\n下载量：${params.data.value[2]}\n\n下载量：${params.data.value[3]}\n\n下载量：${params.data.value[4]}`
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
                    color: ['#f4e925', "#00ffff", "#2280fb", "#fa9d09"][Math.floor(Math.random() * 4)],
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            zlevel: 1
        }]
    };
    mapChart.setOption(mapOption);
}

export default function (echarts) {
    $(".module-map").each((index, el) => {
        setInterval((res) => {
            let data = $(el).data("data")
            let refresh = $(el).data("refresh")
            if (refresh && refresh == 1) {
                init(el, echarts, data)
            }
        }, 1000)
    })
}