import "../../lib/china"
import timeFormat from "lmw-time-format"

const PROVINCES = ["广东", "广西", "云南", "黑龙江", "吉林", "辽宁", "内蒙古", "新疆", "河北", "北京", "天津", "陕西", "山西", "山东", "河南", "安徽", "浙江", "江苏", "湖北", "上海", "重庆", "四川", "湖南", "江西", "福建", "贵州", "海南", "西藏", "青海", "甘肃", "宁夏", "海南", "台湾", "中国", "香港", "澳门"];
const getData = (arr) => {
    return arr.map((item) => {
        let data = {name: item, selected: true};
        if (["海南", "台湾"].indexOf(data.name) >= 0) {
            data = Object.assign({}, data, {
                itemStyle: {
                    normal: {
                        borderWidth: 1,
                        borderColor: "#1467af"
                    }
                }
            })
        } else if (["中国"].indexOf(data.name) >= 0) {
            data = Object.assign({}, data, {
                itemStyle: {
                    normal: {
                        borderWidth: 5,
                        borderColor: "#1467af"
                    }
                }
            })
        } else {
            data = Object.assign({}, data, {
                itemStyle: {
                    normal: {
                        borderWidth: 1
                    }
                }
            })
        }
        return data;
    })
}


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
            zlevel: 2,
            top: 0,
            bottom: 0
        },
        series: [
            {
                name: "中国",
                type: "map",
                map: "china",
                selectedMode: "multiple",
                zlevel: 10,
                label: {
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        areaColor: "#14274e"
                    },
                    emphasis: {
                        areaColor: "#1f2f4f"
                    }
                },
                data: data.concat(getData(PROVINCES)),
                top: 0,
                bottom: 0
            },
            {
                name: "data",
                type: "effectScatter",
                coordinateSystem: "geo",
                data: data,
                selectedMode: "multiple",
                symbolSize: 20,
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: (params) => {
                            return `${params.name}\n\n下载量：${params.data.value[2]}\n\n注册量：${params.data.value[3]}\n\n服务量：${params.data.value[4]}`
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
                zlevel: 20
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
                console.log("地图初始化",timeFormat(new Date().getTime(),"%Y-%m-%d %H:%M:%S"));
                init(el, echarts, data)
            }
        }, 1000)
    })
}