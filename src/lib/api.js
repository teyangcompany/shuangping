import axios from "axios";
import {API_URL, basicParam, password} from "./config"

function getRandom() {
    let random = "";
    for (let i = 0; i < 4; i++) {
        random += "1234567890".substr(Math.floor(Math.random() * 10), 1);
    }
    return random;
}

export default function (service, options) {
    let random = getRandom();
    basicParam.random = random;
    var fdata = {...basicParam, ...options, service};
    //console.log(fdata);
    let sign = hex_md5(hex_md5(password) + JSON.stringify(fdata));
    //fdata.sign=sign;
    let config = {
        headers: {
            sign: sign,
            "Content-Type": "application/json"
        },
    }
    return axios.post(API_URL, fdata, config)
        .then((res) => {
            if (res.status == 200) {
                return res.data;
            } else {
                return res;
            }
        });
}
