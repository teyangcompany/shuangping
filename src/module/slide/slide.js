const init = function (el, data, tplFun) {
    if (!data) {
        return
    }
    let timer;
    $(el).data("refresh", 0)
    let html = tplFun({
        list: data
    });
    let h = $(el).css("height");
    $(el).html(html);
    let lis = $("ul", $(el)).html();
    $("ul", $(el)).html(lis + lis)
    el.dataset.pos = 0
    $("ul li", $(el)).css("height", `${parseInt(h) / 5}px`);

    if (timer) {
        return
    }

    //console.log($(el).find("ul"));
    timer = setInterval((res) => {
        let pos = parseInt(el.dataset.pos);
        pos++;
        if (pos > parseInt(h)) {
            pos = 0
        }
        el.dataset.pos = pos;
        $(el).find("ul").css("transform", `translate(0px,${0 - pos}px)`)
    }, 50)
}
export default function (selector, tplFun) {
    let el = $(selector)[0];
    console.log(el);
    setInterval(function () {
        let data = $(el).data("data")
        let refresh = $(el).data("refresh");
        if (refresh && refresh == 1) {
            init(el, data, tplFun);
        }
    }, 1000)
}