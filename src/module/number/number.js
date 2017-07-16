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

const animate = (el) => {
    let num = el.attr("number");
    let ol = $('ol', el);
    let cur = el.attr('current');
    if (!cur) {
        cur = 0;
    }
    if (cur == num) {
        return
    }

    let cha = 0;
    $("li", ol).each((i, o) => {
        if ($(o).text() == num) {
            cha = i;
        }
    })

    ol.css("transform", `translateY(-${cha * 50}px)`)
    ol.off("transitionend").on("transitionend", () => {
        ol.css("transform", "")
        makeNumberQueue(el, num);
        el.attr("current", num);
    })


}


const init = (el) => {
    let total = el.attr("total") + "";
    let c = el.attr("current");
    let label = el.attr("label");
    if (label) {
        $("ul>div", el).text(label);
    }
    if (c == total) {
        return;
    }
    el.attr("current", total);
    while (total.length < 8) {
        total = "0" + total;
    }
    $("ul>li:not('.nonumber')", el).each((index, li) => {
        $(li).attr('number', total.substr(index, 1));
        animate($(li));
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