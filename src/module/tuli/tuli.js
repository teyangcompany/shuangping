/**
 * Created by Administrator on 2017/7/17 0017.
 */
import tpl from "./tpl.ejs";
import "./css.scss"
export default function () {
    let list = [{name: "wei", value: "微信(V)"}, {name: "app", value: "APP(A)"}, {name: "online", value: "线上(X)"}];
    $(".module-tuli").html(tpl({
        list: list.map((res) => {
            let arr = (res.value.match(/([^\(]+?)(\([A-Z]+?\))/));
            res.v1 = arr[1];
            res.v2 = arr[2];
            return res
        })
    }))
}