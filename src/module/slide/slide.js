const init = function (el, data, tplFun) {
    if (!data) {
        return
    }
    $(el).data("refresh", 0)

}
export default function (selector, tplFun) {
    let el = $(selector)[0];
    setInterval(function () {
        let data = $(el).data("data")
        let refresh = $(el).data("refresh");
        if (refresh && refresh == 1) {
            init(el, data, tplFun);
        }
    }, 1000)
}