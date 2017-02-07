/**
 * 五子棋游戏 (MVC) 的 Controller 层
 */
class GomokuViewController {
    gameView: GomokuView //控制器持有对其视图的引用
    brain: GomokuBrain

    constructor() {
        this.gameView = new GomokuView(480, 480, this)
        this.brain = new GomokuBrain()
    }

    public handleClickEvent(x: number, y: number) {
        let col = Math.round(x / this.gameView.horizontalLineGap)
        let row = Math.round(y / this.gameView.verticalLineGap)
        this.brain.putChessOn(row, col)
        this.gameView.putChessOn(
            this.brain.lastAction.row, 
            this.brain.lastAction.col, 
            chessOfPlayer(this.brain.lastAction.player)
        )
    }
}