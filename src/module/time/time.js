/**
 * Created by Administrator on 2017/7/14 0014.
 */
import tpl from "./tpl.ejs";
import timeFormat from "lmw-time-format";

const showtime = () => {
    let time = new Date().getTime();
    return timeFormat(time, "%Y-%m-%d %H:%M:%S") + " 星期" + ["日", "一", "二", "三", "四", "五", "六"][timeFormat(time, "%w")]
}

export default (options) => {
    $(".module-time").each(function (i, o) {
        setInterval(() => {
            $(o).html(tpl({
                time: showtime()
            }));
        }, 1000)
    });
}