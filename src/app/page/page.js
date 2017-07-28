const indexedDB = window.indexedDB;

function getDB(name) {
    let db = indexedDB.open(name, new Date().getTime());
    db.onerror = function () {

    }
    db.onsuccess = function () {

    }
    return db;
}

let db = getDB("demo");

db.onupgradeneeded = function (e) {
    let mydb = (e.target.result);
    let tx = mydb.transaction('t1',                        //事务操作的对象存储空间名
        'readwrite');
    console.log(tx)
}


