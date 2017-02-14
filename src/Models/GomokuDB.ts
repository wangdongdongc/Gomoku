/**
 * 博弈记录
 */
interface GomokuHistory {
    datetime: Date
    actions: GomokuAction[]
}

/**
 * 以 IndexedDB 为基础所实现的五子棋数据库模型
 * 
 * 用于纪录玩家的对弈历史
 */
class GomokuDB {
    /**
     * The version of the database determines the database schema
     */
    static readonly DBVersion = 2
    static readonly DBName = "gomokudb"
    static readonly HistoryStoreName = "history"
    static readonly HistoryKeyPath = "datetime"

    db: IDBDatabase
    dbOpenRequest: IDBOpenDBRequest
    dbIsReady: boolean = false

    /**
     * 打开或创建 IndexedDB 数据库
     */
    constructor() {
        this.dbOpenRequest = window.indexedDB.open(GomokuDB.DBName, GomokuDB.DBVersion)
        this.dbOpenRequest.onsuccess = (event: Event) => {
            this.db = this.dbOpenRequest.result
            this.dbIsReady = true
            console.log("GomokuDB Ready.")
        }
        this.dbOpenRequest.onerror = (event: ErrorEvent) => {
            alert("Database error: " + event.message)
        }
        this.dbOpenRequest.onupgradeneeded = (event: IDBVersionChangeEvent) => {
            let db = <IDBDatabase>(<IDBOpenDBRequest>event.target).result
            if (!db.objectStoreNames.contains(GomokuDB.HistoryStoreName)) {
                db.createObjectStore(GomokuDB.HistoryStoreName, { keyPath: GomokuDB.HistoryKeyPath })
            }
            console.log(`DB version changed for ${event.oldVersion} to ${event.newVersion}`);
        }
    }

    addNewHistory(history: GomokuHistory) {
        if (!this.dbIsReady) return
        let transaction = this.db.transaction(GomokuDB.HistoryStoreName, "readwrite")
        let store = transaction.objectStore(GomokuDB.HistoryStoreName)
        store.add(history)
    }
}