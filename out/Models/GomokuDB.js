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
        /**
         * 当数据库尚未准备完毕时,将请求数据库的操作做成闭包放入 onReady。
         * 当 dbIsReady 被设置为 true 时，将自动执行这些操作
         */
        this.onReady = [];
        this._dbIsReady = false;
        this.onReady = [];
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
    Object.defineProperty(GomokuDB.prototype, "dbIsReady", {
        get: function () {
            return this._dbIsReady;
        },
        set: function (value) {
            this._dbIsReady = value;
            if (this.dbIsReady) {
                //Todo: do something
                for (var _i = 0, _a = this.onReady; _i < _a.length; _i++) {
                    var func = _a[_i];
                    func();
                }
                this.onReady = [];
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 添加新的纪录
     * @param {GomokuHistory} history 新的历史记录条目
     */
    GomokuDB.prototype.add = function (history) {
        var _this = this;
        if (!this.dbIsReady) {
            this.onReady.push(function () {
                _this.add(history);
            });
            return;
        }
        var transaction = this.db.transaction(GomokuDB.HistoryStoreName, "readwrite");
        var store = transaction.objectStore(GomokuDB.HistoryStoreName);
        store.add(history);
    };
    /**
     * 获取所有的历史记录
     */
    GomokuDB.prototype.getAll = function (callback) {
        var _this = this;
        if (!this.dbIsReady) {
            this.onReady.push(function () {
                _this.getAll(callback);
            });
            return;
        }
        var transaction = this.db.transaction(GomokuDB.HistoryStoreName);
        var store = transaction.objectStore(GomokuDB.HistoryStoreName);
        // return []
        var req = store.openCursor();
        req.onsuccess = function (event) {
            var cursor = event.target.result;
            if (cursor) {
                callback(cursor.value);
                cursor.continue();
            }
        };
    };
    return GomokuDB;
}());
GomokuDB.DBVersion = 2;
GomokuDB.DBName = "gomokudb";
GomokuDB.HistoryStoreName = "history";
GomokuDB.HistoryKeyPath = "datetime";
//# sourceMappingURL=GomokuDB.js.map