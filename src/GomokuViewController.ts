/**
 * 五子棋游戏 (MVC) 的 Controller 层
 */
class GomokuViewController {
    gameView: GomokuView //游戏视图
    menuView: MenuView  //菜单视图
    dialogView: DialogView //模态对话框视图
    gomokuGame: GomokuGame
    gomokuDB: GomokuDB
    AI: GomokuAI
    playWithAI: boolean = false

    private _showChessStep: boolean = false
    get showChessStep(): boolean {
        return this._showChessStep
    }
    /**
     * 修改 showChessStep 值的同时会重绘棋盘
     */
    set showChessStep(x: boolean) {
        this._showChessStep = x
        if (this.showChessStep) {
            this.drawChessSteps()
        } else {
            this.gameView.redrawChessboard(this.gomokuGame.allActions)
        }
    }


    private historiesHaveLoaded: boolean = false
    /**
     * 读取数据库,将历史记录写入对话框视图
     */
    private loadHistory() {
        this.gomokuDB.getAll((item: GomokuHistory) => {
            //读取并处理一个对象
            let date = item.datetime
            let year = date.getFullYear()
            let month = date.getMonth() + 1
            let day = date.getDate()
            let hour = date.getHours()
            let minute = date.getMinutes()
            let winner = item.actions[item.actions.length - 1].player == GomokuPlayer.Black
                ? "玩家" : "AI"
            this.dialogView.addItem(`${year}年${month}月${day}日-${hour}时${minute}分  ${winner}获胜`) //Todo
        })
    }

    constructor(playWithAI: boolean = false) {
        //Views
        this.gameView = new GomokuView(480, 480, this)
        this.menuView = new MenuView(480, 200, this)
        this.menuView.statusMessage = "执黑子"
        this.dialogView = new DialogView()
        
        //Models
        this.gomokuGame = new GomokuGame()
        this.gomokuDB = new GomokuDB()
        this.loadHistory()

        if (playWithAI) {
            this.playWithAI = true
            this.AI = new AI.TestAI_2();
            //AI先落子
            (<AI.TestAI_2>this.AI).putFirstChessInMiddle()
            this.gomokuGame.putChessOn(8, 8) //game默认白子开局
            this.gameView.putChessOn(8, 8, Chess.White)
            this.menuView.chessCount = 1
        }
    }

    /**
     * 响应棋盘上的点击
     */
    public handleClickEvent(x: number, y: number) {
        if (this.gomokuGame.gameIsOver) return
        //玩家落子
        let col = Math.round(x / this.gameView.horizontalLineGap)
        let row = Math.round(y / this.gameView.verticalLineGap)
        if (this.gomokuGame.currentPlayer != GomokuPlayer.Black) {return} //检查是否该玩家落子（防乱按
        if (!this.gomokuGame.putChessOn(row, col)) {return}
        this.gameView.putChessOn(
            this.gomokuGame.lastAction.row,
            this.gomokuGame.lastAction.col, 
            chessOfPlayer(this.gomokuGame.lastAction.player)
        )
        this.menuView.chessCount = this.menuView.chessCount + 1
        //AI落子
        if (this.playWithAI && !this.gomokuGame.gameIsOver) {
            this.AI.analysAction(this.gomokuGame.lastAction)
            let action = this.AI.getNextAction()
            this.gomokuGame.putChessOn(action.row, action.col)
            this.gameView.putChessOn(
                action.row,
                action.col,
                chessOfPlayer(action.player)
            )
        }
        this.menuView.chessCount = this.menuView.chessCount + 1
        if (this.gomokuGame.gameIsOver) {
            //游戏结束，显示结束信息
            let whiteWin, blackWin
            if (this.gameView.theme instanceof VividTheme) {
                whiteWin = "青子胜"; blackWin = "蓝子胜"
            } else {
                whiteWin = "白子胜"; blackWin = "黑子胜"
            }
            this.menuView.statusMessage = this.gomokuGame.currentPlayer == 1 ? whiteWin : blackWin
            this.gomokuDB.add({
                datetime: new Date(),
                actions: this.gomokuGame.allActions
            })
        }
    }

    /**
     * 更改棋盘主题
     */
    public changeTheme(theme: Theme) {
        this.gameView.theme = theme
        this.gameView.redrawChessboard(this.gomokuGame.allActions)
        if (this.showChessStep) {
            this.drawChessSteps()
        }
        if (theme instanceof DefaultTheme) {
            this.menuView.statusMessage = "执黑子"
        } else if (theme instanceof VividTheme) {
            this.menuView.statusMessage = "执蓝子"
        }
    }

    /**
     * 在每个棋子上面显示步数
     */
    public drawChessSteps() {
        this.gameView.drawSteps(this.gomokuGame.allActions)
    }

    /**
     * 显示对话框
     */
    public toggleDialog() {
        this.dialogView.toggle()
    }
}