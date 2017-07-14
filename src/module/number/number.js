/**
 * Created by Administrator on 2017/7/14 0014.
 */
import "./css.scss";
import tpl from "./tpl.ejs";
import numbersTpl from "./numbers.ejs";

const makeNumberQueue = (el, number) => {
    let str = "";
    let start = parseInt(number);
    while (str.length < 10) {
        if (start > 9) {
            start = 10 - start;
        }
        str += start;
        start++;
    }
    el.html(numbersTpl({
        list: str.split("")
    }))
}


const init = (el) => {
    let total = el.attr("total") + "";
    let c = el.attr("current");
    if (c == total) {
        return;
    }
    el.attr("current", total);
    while (total.length < 8) {
        total = "0" + total;
    }
    $("ul>li:not('.nonumber')", el).each((index, li) => {
        $(li).attr('number', total.substr(index, 1));
        $(li).addClass("yesnumber");
    })
}


export default () => {
    let el = $(".module-number");
    el.each((i, o) => {
        let el = $(o);
        $(o).html(tpl())
        setInterval((res) => {
            init(el);
        }, 1000)
    })
}