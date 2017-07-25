/**
 * Created by Administrator on 2017/7/17 0017.
 */
const init = function (el, echarts, data) {
    let myChart = echarts.init(el);
    $(el).data("refresh", 0);
    if (!data) {
        return
    }
    let series = [{
        type: 'pie',
        radius: '90%',
        center: ['50%', '50%'],
        color: ["#00ffff", "#2280fb", "#fa9d09"],
        label: {
            normal: {
                formatter: "{b}\n{d}%",
                position: 'inner'
            }
        },
        labelLine: {
            normal: {
                show: false
            }
        },
        data: data
    }];
    let option = {
        series: series
    }
    myChart.setOption(option);
};

export  default function (echarts) {
    $(".module-pie2").each((index, el) => {
        setInterval((res) => {
            let data = $(el).data("data");
            let refresh = $(el).data("refresh");
            if (refresh && refresh == 1) {
                init(el, echarts, data);
            }
        }, 1000)
    })
}