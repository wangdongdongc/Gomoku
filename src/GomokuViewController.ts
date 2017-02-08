/**
 * 五子棋游戏 (MVC) 的 Controller 层
 */
class GomokuViewController {
    gameView: GomokuView //控制器持有对其视图的引用
    menuView: MenuView  //控制器持有对其视图的引用
    game: GomokuGame
    AI: GomokuAI
    playWithAI: boolean = false

    constructor(playWithAI: boolean = false) {
        this.gameView = new GomokuView(480, 480, this)
        this.menuView = new MenuView(480, 200, this)
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
    }
}