import {API_URL} from "./config";

/**
 * 解析url参数
 * @param from
 * @returns {{protocol: *, hostname: *, port: *, path: *, query: *, hash: *}}
 */
export function getParamsFromUrl(from) {
  let protocol = url("protocol", from);
  let hostname = url("hostname", from);
  let port = url("port", from);
  let path = url("path", from);
  let query = url("?", from);
  let hash = url("hash", from);
  return {protocol, hostname, port, path, query, hash}
}

export function getEnvFromUrl() {
  let hostname = window.location.host;
  for (let key in API_URL) {
    if (API_URL[key].host.indexOf(hostname) >= 0) {
      return key;
    }
  }
  return "";

}

/**
 * 生成跳转链接
 * @param options
 * @returns {string}
 */
export function makeUrl(options) {
  let url = "";
  if (options.protocol) {
    url += options.protocol + "://"
  }
  if (options.hostname) {
    url += options.hostname
  }
  if (options.port && options.port != 80) {
    url += ":" + options.port
  }
  if (options.path) {
    url += options.path
  }
  if (options.query) {
    let q = "";
    for (let key in options.query) {
      if (options.query[key]) {
        q += `&${key}=${options.query[key]}`
      } else {
        q += `&${key}`
      }

    }
    q = q.substr(1);
    url += "?" + q
  }
  if (options.hash) {
    url += "#" + options.hash;
  }
  return url;
}
