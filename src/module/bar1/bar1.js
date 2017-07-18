/**
 * Created by Administrator on 2017/7/17 0017.
 */
const init = function (el, echarts, data) {
    let dom = $(el);
    dom.height(dom.parent().parent().height() - 40 - 20);
    let myChart = echarts.init(el);
    if (!data) {
        return
    }
    let xAxis = [], shandow = [], arr = [], max = 0;
    data.sort((a, b) => {

        return a.value > b.value ? -1 : 1;
    })

    data.forEach((res, index) => {
        xAxis.push(res.name);
        arr.push(res.value);
        max = Math.max(max, parseInt(res.value));
        shandow.push(res.value);
    });

    shandow = shandow.map((res, index) => {
        return [index, max + Math.round(max * 0.2), res];
    })

    let series = [{
        silent: true,
        type: "bar",
        barWidth: "20%",
        barGap: "-100%",
        label: {
            normal: {
                show: true,
                position: "top",
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
                    color: "#fa9d09"
                }
            }
        },
        itemStyle: {
            normal: {
                borderWidth: 1,
                borderColor: "#644333",
                color: "#14274e"
            }
        },
        data: shandow
    }];

    series.push({
        type: "bar",
        barWidth: "20%",
        itemStyle: {
            normal: {
                color: "#fa9d09"
            }
        },
        data: arr
    })


    myChart.setOption({
        xAxis: {
            type: "category",
            axisTick: {
                show: false
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: "#0ff"
                }
            },
            data: xAxis
        },
        yAxis: {
            show: false,
            type: "value"
        },
        grid: {
            left: "5%",
            top: "10%",
            right: "5%",
            bottom: "15%",
        },
        series: series
    })
}


export default function (echarts) {
    $(".module-bar1").each((index, el) => {
        setInterval((res) => {
            let data = $(el).data("data");
            init(el, echarts, data);
        }, 1000)
    })
}