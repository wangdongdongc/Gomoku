/**
 * 博弈记录
 */
interface GomokuHistory {
    /**
     * (结束)时间
     */
    datetime: Date

    /**
     * 一盘棋的所有操作
     */
    actions: GomokuAction[]
}

/**
 * 以 IndexedDB 为基础所实现的五子棋数据库模型
 * 
 * 用于纪录玩家的对弈历史
 */
class GomokuDB {
    
    static readonly DBVersion = 2
    static readonly DBName = "gomokudb"
    static readonly HistoryStoreName = "history"
    static readonly HistoryKeyPath = "datetime"

    dbOpenRequest: IDBOpenDBRequest
    db: IDBDatabase

    /**
     * 当数据库尚未准备完毕时,将请求数据库的操作做成闭包放入 onReady。
     * 当 dbIsReady 被设置为 true 时，将自动执行这些操作
     */
    private onReady: (()=>void)[] = []
    private _dbIsReady: boolean = false
    get dbIsReady(): boolean {
        return this._dbIsReady
    }
    set dbIsReady(value) {
        this._dbIsReady = value
        if (this.dbIsReady) {
            //Todo: do something
            for (let func of this.onReady) {
                func()
            }
            this.onReady = []
        }
    }


    /**
     * 打开或创建 IndexedDB 数据库
     */
    constructor() {
        this.onReady = []
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
                db.createObjectStore(
                    GomokuDB.HistoryStoreName, 
                    { keyPath: GomokuDB.HistoryKeyPath }
                )
            }
            console.log(`DB version changed from ${event.oldVersion} to ${event.newVersion}`)
        }
    }

    /**
     * 添加新的纪录
     * @param {GomokuHistory} history 新的历史记录条目
     */
    add(history: GomokuHistory) {
        if (!this.dbIsReady) {
            this.onReady.push(() => {
                this.add(history)
            })
            return
        }
        let transaction = this.db.transaction(GomokuDB.HistoryStoreName, "readwrite")
        let store = transaction.objectStore(GomokuDB.HistoryStoreName)
        store.add(history)
    }

    /**
     * 获取所有的历史记录
     */
    getAll(callback: (item: GomokuHistory)=>void) {
        if (!this.dbIsReady) {
            this.onReady.push(() => {
                this.getAll(callback)
            })
            return
        }
        let transaction = this.db.transaction(GomokuDB.HistoryStoreName)
        let store = transaction.objectStore(GomokuDB.HistoryStoreName)
        // return []
        var req = store.openCursor()
        req.onsuccess = (event: Event) => {
            let cursor = <IDBCursorWithValue>(<IDBRequest>event.target).result
            if (cursor) {
                callback(<GomokuHistory>cursor.value)
                cursor.continue()
            }
        }
    }
}