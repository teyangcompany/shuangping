export const API_URL = {
  "dev": {
    host: ['localhost:8080', 'nethosweb.diandianys.com'],
    api: "//nethos.diandianys.com/api/app",
    socekt: "//nethoswebsocket.diandianys.com",
    name: "开发环境"
  },
  "test": {
    host: ["pat-test.gjwlyy.com"],
    api: "//api-test.gjwlyy.com/api/app",
    socket: "doc-test.gjwlyy.com",
    name: "测试环境"
  },
  "prod": {
    host: ["www.fangcow.com"],
    api: "//api.fangcow.com/?action=index&service=gjwlyy",
    socket: "socket.gjwlyy.com",
    name: "正式环境"
  }
};
export const password = "aAr9MVS9j1";
//var sign = hex_md5(hex_md5(password) + 1001 + random);
export const basicParam = {//服务器交互基本参数
  spid: "1001",
  channel: "4",
  format: "JSON",
  oper: "127.0.0.1"
}

export const SWIPER_DELAY = 1 * 15 * 1000

export const TIME_DELAY = 1 * 30 * 1000

export const TOTAL_1 = 10000

const T1 = 8000
const T2 = 1000
const T3 = 6000
const T4 = 700
const T5 = 500
export const TOTAL_REG = {
  total: {
    wechatRegister: T2,
    appRegister: T1,
    webRegister: T2
  },
  month: {
    wechatRegister: T4,
    appRegister: T3,
    webRegister: T5
  },
  week: {
    wechatRegister: 100,
    appRegister: 200,
    webRegister: 100
  },
  today: {
    wechatRegister: 0,
    appRegister: 0,
    webRegister: 0
  }
}

export const TOTAL_BOOK = {
  total: {
    wechatBook: 2000,
    appBook: 4000,
    webBook: 2000
  },
  mouth: {
    wechatBook: 1000,
    appBook: 2000,
    webBook: 1000
  },
  week: {
    wechatBook: 0,
    appBook: 0,
    webBook: 0
  }
}

export const TOTAL_SERVICE = {
  total: {
    wechatService: 2000,
    appService: 6000,
    webService: 3000
  },
  month: {
    wechatService: 1000,
    appService: 3000,
    webService: 2000
  },
  week: {
    wechatService: 0,
    appService: 0,
    webService: 0
  }

}