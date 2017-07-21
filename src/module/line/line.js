function init(echarts, data, el) {
    if (!data) {
        return
    }
    let areastyleColor = el.dataset.areastyleColor;
    let linestyleColor = el.dataset.linestyleColor

    //console.log(areastyleColor, "#color");

    let myChart = echarts.init(el);
    let xAxis = [], arr = [], series = [];
    data.forEach((res) => {
        xAxis.push(res.name);
        arr.push(res.value)
    });
    series.push({
        type: "line",
        symbol: "circle",
        symbolSize: 10,
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
                    color: "blue"
                }
            }
        },
        xAxis: {
            type: "category",
            axisLine: {
                lineStyle: {
                    color: "blue"
                }
            },
            data: xAxis
        },
        grid: {
            top: "10%",
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
            init(echarts, data, o);
        }, 1000)

    })
}