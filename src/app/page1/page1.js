/**
 * Created by Administrator on 2017/7/13 0013.
 */
import "./page1.scss";
import $ from "../../lib/jquery-vendor";
import api from "../../lib/api";
import provincesArr from "china-province-info";
import {API_URL, TIME_DELAY, TOTAL_1, TOTAL_REG} from "../../lib/config";
import timeformat from "lmw-time-format";
import header from "../public/header.ejs";
import time from "../../module/time/time";
import number from "../../module/number/number";
import echarts from "echarts"
import "../../lib/china";
import "swiper";
import "../../../static/swiper/swiper-3.4.2.min.css"

import pie1 from "../../module/pie1/pie1"
import tuli from "../../module/tuli/tuli"

import pie2 from "../../module/pie2/pie2"
import bar1 from "../../module/bar1/bar1"
import map from "../../module/map/map"
import slide from "../../module/slide/slide"
import ssyyqkTpl from "./tpl/ssyyqk.ejs"
import {getEnvFromUrl, getParamsFromUrl, makeUrl} from "../../lib/utils";


let options = getParamsFromUrl(location.href);
if (options.query && options.query.env) {
  var env = options.query.env
} else {
  var env = getEnvFromUrl();
}
let mainBox = $("body");
$('header', mainBox).html(header({
  list: API_URL,
  env: env,
  makeUrl: makeUrl,
  options: options
}));
//时间日期展示
time();
//数字滚动展示
number()

const H = parseInt(window.innerHeight);
const partH = (H - 35 - 100 - 10 - 30) / 2;
const partW = window.innerWidth / 2;

const init = (res) => {
  $(".charts>div").css("height", `${partH}px`)
  $(".charts .wrap .container").css("height", `${partH - 40 - 2}px`);
  $(".pielist ul li").css("height", `${partH - 40 - 2 - 25 - 20}px`);
  $("#map").css("height", `${(H - 35 - 100 - 30)}px`)
  /*$("#slide").css("height", `${(partH * 2) * 0.3}px`)*/
  $("#swiper,#server_bar").css("height", `${partH - 40 - 2 - 20}px`)
  /*$("#slide").css("width", `${window.innerWidth / 4}px`)*/
  $("#floatslide").css("width", `${300 / 683 * partW}px`)
    .css("height", `${(300 / 683 * partW) * 0.6}px`)
    .css("left", `${20 / 683 * partW}px`);
}

const swiper1Init = (res) => {
  let mySwiper = new Swiper("#swiper", {
    autoplay: 5000,
    loop: true,
    onInit: () => {
      ['download', 'reg'].forEach((res) => {
        $(`.${res}-pie`).each((index, o) => {
          $(o).data("refresh", 1)
        });
      })
      $(".reg-pie").each((index, o) => {
        $(o).data("data", [
          {name: "线上", value: 123},
          {name: "APP", value: 445},
          {name: "微信", value: 200}])
      })
      $(".download-pie").each((index, o) => {
        $(o).data("data", [
          {name: "IOS", value: 123},
          {name: "android", value: 445}
        ])
      })
    },
    onSlideChangeStart: (swiper) => {
      pie2(echarts);
      let index = (swiper.realIndex)
      $(".pie .title span").eq(index).addClass('current').siblings().removeClass("current");
      $(".pie").find("ol li").eq(index).addClass('current').siblings().removeClass("current");
    }
  })
}


$(document).ready(function () {
  init();
  tuli();
  pie1(echarts);
  swiper1Init();
  pie2(echarts);
  bar1(echarts)
  map(echarts)
})


/*$("#total-reg").data("data", [
    {name: "V", text: "微信(V)", value: 400},
    {name: "A", text: "APP(A)", value: 500},
    {name: "X", text: "线上(X)", value: 800}
])

$("#month-reg").data("data", [
    {name: "V", text: "微信(V)", value: 500},
    {name: "A", text: "APP(A)", value: 300},
    {name: "X", text: "线上(X)", value: 900}
])

$("#week-reg").data("data", [
    {name: "V", text: "微信(V)", value: 600},
    {name: "A", text: "APP(A)", value: 700},
    {name: "X", text: "线上(X)", value: 400}
])

$("#day-reg").data("data", )*/

/*$("#server_bar").data("data", [
    {name: "浙江", value: 11623},
    {name: "上海", value: 4745},
    {name: "新疆", value: 200},
    {name: "山东", value: 5300},
    {name: "河北", value: 8400}])*/

const getGPS = (place) => {
  let index = provincesArr.findIndex((res) => {
    return res.province.indexOf(place) >= 0
  })
  return provincesArr[index];
}

//数据统计
total_api();

function total_api() {
  api("nethos.demo.total.count", {}).then((res) => {
    if (res.code == 0) {
      $("#user_total", mainBox).attr("total", res.obj.registerCount + TOTAL_1);
      $("#server_total", mainBox).attr("total", res.obj.serviceCount + TOTAL_1);
    }
    setTimeout(function () {
      total_api();
    }, TIME_DELAY)
  }, function () {
    setTimeout(function () {
      total_api();
    }, TIME_DELAY)
  });
}

area_api();

function area_api() {
  api("nethos.demo.area.count", {}).then((res) => {
    setTimeout(function () {
      area_api();
    }, TIME_DELAY)
    if (res.code != 0) {
      return
    }


    /*地图数据*/
    //let area = ["浙江省", "山东省", "新疆维吾尔族自治区", "上海市", "四川省", "江苏省", "广东省", "江西省", "北京市", "福建省"];
    let area = res.obj.provinceCountList;
    getLoc(area);

    /*服务量按地区排序*/
    let cityServiceCountList = res.obj.cityServiceCountList;
    cityServiceCountList = cityServiceCountList.map((city) => {
      city.name = city.cityName
      city.value = city.name == "杭州" ? city.serviceCount + TOTAL_1 : city.serviceCount
      return city
    });
    let qitaIndex = cityServiceCountList.findIndex((city) => {
      return city.name == "其他"
    })
    let qitaData = cityServiceCountList.splice(qitaIndex, 1);
    //console.log(qitaData);
    cityServiceCountList.sort((a, b) => {
      return b.value - a.value
    });
    $("#server_bar").data("refresh", 1);
    $("#server_bar").data("data", cityServiceCountList.concat(qitaData))

    /*注册用户数四个维度统计*/
    /*let clientRegisterMonthCount = res.obj.clientRegisterMonthCount
    let clientRegisterTodayCount = res.obj.clientRegisterTodayCount
    let clientRegisterTotalCount = res.obj.clientRegisterTotalCount
    let clientRegisterWeekCount = res.obj.clientRegisterWeekCount*/
    let fields = ["wechatRegister-V", "appRegister-A", "webRegister-X"]
    let regDiv = ["total", "month", "week", "today"];
    regDiv.forEach((id) => {
      let key = `clientRegister${id.substr(0, 1).toUpperCase() + id.substr(1)}Count`
      let data = [];
      fields.forEach((fields) => {
        let arr = fields.split("-");
        data.push({
          name: arr[1],
          value: parseInt(res.obj[key][arr[0]]) + TOTAL_REG[id][arr[0]]
        });
      });
      $(`#${id}-reg`).data("refresh", 1);
      $(`#${id}-reg`).data("width", 2.5);
      $(`#${id}-reg`).data("data", data)
    })
  }, function () {
    setTimeout(function () {
      area_api();
    }, TIME_DELAY)
  })
}

list_api()

function list_api() {
  api("nethos.demo.bookorder.list", {}).then((res) => {
    setTimeout(function () {
      list_api();
    }, TIME_DELAY)
    if (res.code != 0) {
      return
    }
    /*最近预约记录*/
    let bookOrderList = res.obj.bookOrderList;
    bookOrderList = bookOrderList.map((book) => {
      book.time = timeformat(book.createTime, "%Y-%m-%d");
      book.name = book.patientName;
      book.dept = book.deptName;
      book.hos = book.hosName.replace("浙江大学医学院附属第二医院", "浙医二院");
      book.doc = book.docName
      book.content = ""

      return book;
    })
    $("#floatslide").data("refresh", 1);
    $("#floatslide").data("data", bookOrderList)
    slide("#floatslide", ssyyqkTpl);
  }, function () {
    setTimeout(function () {
      list_api();
    }, TIME_DELAY)
  })
}


function getLoc(area) {
  let place = area[Math.floor(area.length * Math.random())]
  let loc = getGPS(place.provinceName)
  $("#map").data("refresh", 1)
  $("#map").data("data", [{
    name: loc.province,
    value: [loc.lng, loc.lat, place.downLoadCount + TOTAL_1, place.registerCount + TOTAL_1, place.serviceCount + TOTAL_1],
    selected: true
  }]);
}

