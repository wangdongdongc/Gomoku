/**
 * 五子棋游戏 (MVC) 的 Controller 层
 */
class GobangViewController {
    gameView: GobangView
    brain: GobangBrain

    constructor() {
        this.gameView = new GobangView(480, 480, this)
        this.brain = new GobangBrain()
    }

    handleClickEvent(x: number, y: number) {
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