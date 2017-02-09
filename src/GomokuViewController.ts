/**
 * 五子棋游戏 (MVC) 的 Controller 层
 */
class GomokuViewController {
    gameView: GomokuView //游戏视图
    menuView: MenuView  //菜单视图
    game: GomokuGame
    AI: GomokuAI
    playWithAI: boolean = false

    constructor(playWithAI: boolean = false) {
        this.gameView = new GomokuView(480, 480, this)
        this.menuView = new MenuView(480, 200, this)
        this.menuView.statusMessage = "执黑子"
        this.game = new GomokuGame()
        if (playWithAI) {
            this.playWithAI = true
            this.AI = new TestAI_1()
        }
        //AI先落子
        (<TestAI_1>this.AI).putFirstChessInMiddle()
        this.game.putChessOn(8, 8) //game默认白子开局
        this.gameView.putChessOn(8, 8, Chessman.White)
    }

    /**
     * 响应棋盘上的点击
     */
    public handleClickEvent(x: number, y: number) {
        if (this.game.gameIsOver) return
        //玩家落子
        let col = Math.round(x / this.gameView.horizontalLineGap)
        let row = Math.round(y / this.gameView.verticalLineGap)
        this.game.putChessOn(row, col)
        if (this.game.currentPlayer != GomokuPlayer.White) {return} //防止乱按
        this.gameView.putChessOn(
            this.game.lastAction.row,
            this.game.lastAction.col, 
            chessOfPlayer(this.game.lastAction.player)
        )
        //AI落子
        if (this.playWithAI && !this.game.gameIsOver) {
            this.AI.analysAction(this.game.lastAction)
            let action = this.AI.nextAction()
            this.game.putChessOn(action.row, action.col)
            this.gameView.putChessOn(
                action.row,
                action.col,
                chessOfPlayer(action.player)
            )
        }
        if (this.game.gameIsOver) {
            this.menuView.statusMessage = this.game.currentPlayer == 1 ? "白子胜" : "黑子胜"
        }
    }

    public changeTheme(theme: Theme) {
        this.gameView.theme = theme
        this.gameView.redrawChessboard(this.game.allActions)
        if (theme instanceof DefaultTheme) {
            this.menuView.statusMessage = "执黑子"
        } else if (theme instanceof VividTheme) {
            this.menuView.statusMessage = "执蓝子"
        }
    }
}