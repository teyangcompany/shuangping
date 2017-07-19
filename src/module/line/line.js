function init(echarts, data, el) {
    if (!data) {
        return
    }
    ;
    let myChart = echarts.init(el);
    let xAxis = [], arr = [], series = [];
    //console.log(data, "data");

    data.forEach((res) => {
        xAxis.push(res.name);
        arr.push(res.value)
    });

    series.push({
        type: "line",
        symbolSize: 10,
        itemStyle: {
            normal: {
                color: "#00ffff"
            }
        },
        areaStyle: {
            normal: {
                color: "#00a5b1"
            }
        },
        lineStyle: {
            normal: {
                color: "#00ffff"
            }
        },
        data: arr
    })

    let option = {
        yAxis: {
            type: 'value',
            splitLine: {
                show: false
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
            top: "3%",
            left: '3%',
            right: '4%',
            bottom: '15%',
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