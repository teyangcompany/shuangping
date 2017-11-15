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
    let scrollHeight = $("ul li", $(el)).length * (parseInt(h) / 5);
    let initStatus = $(el).data("initStatus");
    if (initStatus) {
        return
    }
    if (timer) {
        clearInterval(timer);
        timer = null
    }
    //console.log($(el).find("ul"));
    timer = setInterval((res) => {
        $(el).data("initStatus", 1);
        let pos = parseInt(el.dataset.pos);
        pos++;
        if (pos > parseInt(scrollHeight / 2)) {
            pos = 0
        }
        el.dataset.pos = pos;
        $(el).find("ul").css("transform", `translate(0px,${0 - pos}px)`);
        $(el).find("ul li").each((index, li) => {
            let top = $(li).position().top;
            $(li).attr("data-top", top).css("opacity", top / (parseInt(h) / 5) * 2);

        })
    }, 100)
}
export default function (selector, tplFun) {
    let el = $(selector)[0], interval = null, initStatus = $(el).data("initStatus");
    if (initStatus && initStatus == 1) {
        return
    }
    let data = $(el).data("data")
    let refresh = $(el).data("refresh");
    if (refresh && refresh == 1) {
        init(el, data, tplFun);
    }
}