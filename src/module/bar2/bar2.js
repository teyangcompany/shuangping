/**
 * Created by Administrator on 2017/7/17 0017.
 */
const init = function (el, echarts, data) {
    let dom = $(el);
    //dom.height(dom.parent().parent().height() - 40 - 20);
    let myChart = echarts.init(el);
    dom.data("refresh", 0)
    if (!data) {
        return
    }

    let yAxis = [], arr = [], max = 0, shadow = [];
    data.sort((a, b) => {
        return a.value > b.value ? 1 : -1;
    })

    data.forEach((res, index) => {
        yAxis.push(res.name);
        arr.push(res.value);
        max = Math.max(max, res.value)
        shadow.push(res.value);
    });

    shadow = shadow.map((item, index) => {
        return [max, index, item];
    });


    let series = [{
        type: "bar",
        barWidth: "30%",
        barGap: "-100%",
        itemStyle: {
            normal: {
                color: "#14274e"
            }
        },
        label: {
            normal: {
                show: true,
                position: "right",
                formatter: (params) => {
                    let n = params.data[2] + "";
                    let arr = n.split("");
                    for (let i = 0; i < arr.length; i++) {
                        if (arr.length > 3 && i % 3 == 2) {
                            arr[arr.length - 1 - i] = "," + arr[arr.length - 1 - i];
                        }
                    }
                    return arr.join("");
                },
                textStyle: {
                    color: "#00a5b1"
                }
            }
        },
        data: shadow
    }];
    series.push({
        type: "bar",
        barWidth: "30%",
        itemStyle: {
            normal: {
                barBorderRadius: 7,
                color: new echarts.graphic.LinearGradient(
                    0, 0, 1, 0,
                    [
                        {offset: 0, color: '#3977E6'},
                        {offset: 1, color: '#37BBF8'}
                    ]
                )
            }
        },
        data: arr
    })
    myChart.setOption({
        yAxis: {
            type: "category",
            axisTick: {
                show: false
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: "#fff"
                }
            },
            data: yAxis
        },
        xAxis: {
            show: false,
            max: "dataMax",
            type: "value"
        },
        grid: {
            left: 60,
            top: 0,
            right: 30,
            bottom: 30
        },
        series: series
    })
}


export default function (echarts) {
    $(".module-bar2").each((index, el) => {
        setInterval((res) => {
            let data = $(el).data("data");
            let refresh = $(el).data("refresh");
            if (refresh && refresh == 1) {
                init(el, echarts, data);
            }
        }, 1000)
    })
}