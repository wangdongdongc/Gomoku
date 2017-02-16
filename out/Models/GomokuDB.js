/**
 * 以 IndexedDB 为基础所实现的五子棋数据库模型
 *
 * 用于纪录玩家的对弈历史
 */
var GomokuDB = (function () {
    /**
     * 打开或创建 IndexedDB 数据库
     */
    function GomokuDB() {
        var _this = this;
        this.dbIsReady = false;
        this.dbOpenRequest = window.indexedDB.open(GomokuDB.DBName, GomokuDB.DBVersion);
        this.dbOpenRequest.onsuccess = function (event) {
            _this.db = _this.dbOpenRequest.result;
            _this.dbIsReady = true;
            console.log("GomokuDB Ready.");
        };
        this.dbOpenRequest.onerror = function (event) {
            alert("Database error: " + event.message);
        };
        this.dbOpenRequest.onupgradeneeded = function (event) {
            var db = event.target.result;
            if (!db.objectStoreNames.contains(GomokuDB.HistoryStoreName)) {
                db.createObjectStore(GomokuDB.HistoryStoreName, { keyPath: GomokuDB.HistoryKeyPath });
            }
            console.log("DB version changed from " + event.oldVersion + " to " + event.newVersion);
        };
    }
    GomokuDB.prototype.addNewHistory = function (history) {
        if (!this.dbIsReady)
            return;
        var transaction = this.db.transaction(GomokuDB.HistoryStoreName, "readwrite");
        var store = transaction.objectStore(GomokuDB.HistoryStoreName);
        store.add(history);
    };
    return GomokuDB;
}());
GomokuDB.DBVersion = 2;
GomokuDB.DBName = "gomokudb";
GomokuDB.HistoryStoreName = "history";
GomokuDB.HistoryKeyPath = "datetime";
//# sourceMappingURL=GomokuDB.js.map