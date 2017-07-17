/**
 * Created by Administrator on 2017/7/17 0017.
 */
const init = function (el, echarts, data) {
    let dom = $(el);
    dom.height(dom.parent().parent().height() - 40 - 20);
    let myChart = echarts.init(el);
    myChart.setOption({
        title: {
            text: "bar"
        },
        xAxis: {
            type: "category",
            data: ['周一', '周二']
        },
        yAxis: {
            type: "value"
        },
        series: [
            {
                type: "bar",
                data: [1, 2]
            }
        ]
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