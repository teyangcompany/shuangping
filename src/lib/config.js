export const API_URL = {
    "dev": {api: "//nethos.diandianys.com/api/app", socekt: "//nethoswebsocket.diandianys.com", name: "开发环境"},
    "test": {api: "//api-test.gjwlyy.com/api/app", socket: "doc-test.gjwlyy.com", name: "测试环境"},
    "prod": {api: "//api.fangcow.com/?action=index&service=gjwlyy", socket: "socket.gjwlyy.com", name: "正式环境"}
};
export const password = "aAr9MVS9j1";
//var sign = hex_md5(hex_md5(password) + 1001 + random);
export const basicParam = {//服务器交互基本参数
    spid: "1001",
    channel: "4",
    format: "JSON",
    oper: "127.0.0.1"
}