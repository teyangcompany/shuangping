function init(echarts, data, el) {
    if (!data) {
        return
    }


    let areastyleColor = el.dataset.areastyleColor;
    let linestyleColor = el.dataset.linestyleColor
    let myChart = echarts.init(el);
    $(el).data("refresh", 0);

    let xAxis = [], arr = [], series = [], markPointData = [];
    data.forEach((res) => {
        xAxis.push(res.name);
        arr.push(res.value)
        markPointData.push({
            coord: [`${res.name}`, `${res.value}`]
        });
    });
    series.push({
        type: "line",
        symbol: "circle",
        symbolSize: 10,
        markLine: {
            data: [
                {type: 'max', name: '平均值'}
            ]
        },
        markPoint: {
            symbol: "circle",
            symbolSize: 10,
            label: {
                normal: {
                    show: true,
                    position: "top"
                }
            },
            data: markPointData
        },
        itemStyle: {
            normal: {
                color: linestyleColor ? linestyleColor : "#00ffff"
            }
        },
        areaStyle: {
            normal: {
                color: areastyleColor ? areastyleColor : "#00a5b1"
            }
        },
        lineStyle: {
            normal: {
                color: linestyleColor ? linestyleColor : "#00ffff"
            }
        },
        data: arr
    })

    let option = {
        yAxis: {
            type: 'value',
            splitLine: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: "#075ba7"
                }
            }
        },
        xAxis: {
            type: "category",
            axisLine: {
                lineStyle: {
                    color: "#075ba7"
                }
            },
            data: xAxis
        },
        grid: {
            top: "15%",
            left: '7%',
            right: '4%',
            bottom: '17%',
        },
        series: series
    };
    myChart.setOption(option);
}


export default function (echarts) {
    $(".module-line").each((i, o) => {
        setInterval((res) => {
            let data = $(o).data("data")
            let refresh = $(o).data("refresh");
            if (refresh && refresh == 1) {
                init(echarts, data, o);
            }
        }, 1000)

    })
}