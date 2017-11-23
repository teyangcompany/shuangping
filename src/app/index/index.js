import "./index.scss";
import $ from "../../lib/jquery-vendor";
import "swiper";
import "../../../static/swiper/swiper-3.4.2.min.css"


$(document).ready(function () {
  init()
});

function init() {

  let className = '.swiper-container',
    dom = $(className);

  setInterval((res) => {
    let www = window.innerWidth,
      hhh = window.innerHeight;
    console.log("width,height", www, hhh);
    $(dom).find("div>div,div>div iframe").css("width", `${www}px`).css("height", `${hhh}px`);
  }, 100)


  let mySwiper = new Swiper(className, {
    autoplay: 15000,//可选选项，自动滑动,
    effect: "cube",
    speed: 1500
  })
}