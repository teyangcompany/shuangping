import axios from "axios";
import {API_URL, basicParam, password} from "./config"
import {getEnvFromUrl} from "./utils";

function getRandom() {
  let random = "";
  for (let i = 0; i < 4; i++) {
    random += "1234567890".substr(Math.floor(Math.random() * 10), 1);
  }
  return random;
}

/**
 * 获得api_url
 * @param callback
 * @returns {string}
 */
function getApiUrl() {
  let query = url("?");
  if (query && query.env) {
    var env = query.env;
  } else {
    var env = getEnvFromUrl();
  }


  let api_url = "";
  for (let key in API_URL) {
    if (env == key) {
      api_url = API_URL[key].api;
    }
  }
  if (!api_url) {
    api_url = API_URL[Object.keys(API_URL)[0]].api;
  }
  return api_url;
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

  console.log("env", getEnvFromUrl())

  let url = getApiUrl();
  return axios.post(url, fdata, config)
    .then((res) => {
      if (res.status == 200) {
        return res.data;
      } else {
        return res;
      }
    });
}
