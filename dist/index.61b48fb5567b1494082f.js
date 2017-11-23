webpackJsonp([2],{

/***/ 491:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(492);

var _jqueryVendor = __webpack_require__(167);

var _jqueryVendor2 = _interopRequireDefault(_jqueryVendor);

__webpack_require__(168);

__webpack_require__(169);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _jqueryVendor2.default)(document).ready(function () {
  init();
});

function init() {

  var className = '.swiper-container',
      dom = (0, _jqueryVendor2.default)(className);

  setInterval(function (res) {
    var www = window.innerWidth,
        hhh = window.innerHeight;
    console.log("width,height", www, hhh);
    (0, _jqueryVendor2.default)(dom).find("div>div,div>div iframe").css("width", www + "px").css("height", hhh + "px");
  }, 100);

  var mySwiper = new Swiper(className, {
    autoplay: 15000, //可选选项，自动滑动,
    effect: "cube",
    speed: 1500
  });
}

/***/ }),

/***/ 492:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[491]);
//# sourceMappingURL=index.61b48fb5567b1494082f.js.map