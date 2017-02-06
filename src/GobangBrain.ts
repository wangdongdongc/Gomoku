
/**
 * 五子棋游戏的操作单元：player 在 (row, col) 位置放置一个棋子
 * 
 * row与col的取值均为1-15
 */
interface GobangAction {
    row: number
    col: number
    player: Player
}

/**
 * 五子棋游戏 (MVC) 的 Model 层
 */
class GobangBrain {
    readonly maxRow = 15
    readonly maxCol = 15

    /**
     * 包含15x15个棋子的二维数组。
     */
    chessboard: Chessboard
    lastAction: GobangAction
    currentPlayer: Player = Player.Black
    gameIsOver: boolean = false

    /**
     * (当坐标可用且上面没有棋子时) 在该坐标上放置当前玩家的一枚棋子。
     * 放置完成后变更当前玩家
     */
    putChessOn(row: number, col: number) {
        if (this.gameIsOver) return
        if (this.chessboard.validRowAndCol(row, col) && !this.chessboard.hasChessOn(row, col)) {
            this.chessboard.setChessOn(row, col, chessOfPlayer(this.currentPlayer))
            this.lastAction = {
                row: row,
                col: col,
                player: this.currentPlayer
            }
            this.checkLastAction()
            if (this.gameIsOver) {

            } else {
                this.currentPlayer = changePlayer(this.currentPlayer)
            }
        }
    }

    /**
     * 判断最终动作是否使一方获胜)
     */
    private checkLastAction(): boolean {
        //Todo
        return false
    }

    constructor() {
        this.chessboard = new Chessboard(this.maxRow, this.maxCol)
    }
}