enum Player {
    Black = 1,
    White = 2
}

/**
 * 改变当前玩家, 返回新的玩家
 * @param {Player} player 当前玩家
 * @return {Player} 新玩家
 */
function changePlayer(player: Player): Player {
    if (player == Player.Black) {
        return Player.White
    } else {
        return Player.Black
    }
}

enum Chess {
    None = 0,
    Black = Player.Black,
    White = Player.White
}

/**
 * 返回玩家持有的棋子
 * @param {Player} player 玩家
 * @return {Chess} 玩家的棋子
 */
function chessOfPlayer(player: Player): Chess {
    return Chess[Player[player]]
}

interface GameAction {
    row: number
    col: number
    chess: Chess
}

class GobangBrain {
    static minRow = 1
    static maxRow = 15
    static minCol = 1
    static maxCol = 15
    chessboard: Chess[][]
    lastAction: GameAction
    currentPlayer: Player = Player.Black

    hasChessOn(row: number, col: number): boolean {
        return this.validRowAndCol(row, col) ? this.chessboard[row][col] != Chess.None : undefined
    }
    getChessOn(row: number, col: number): Chess {
        return this.validRowAndCol(row, col) ? this.chessboard[row][col] : undefined
    }
    validRowAndCol(row: number, col: number): boolean {
        return GobangBrain.minRow <= row && row <= GobangBrain.maxRow
            && GobangBrain.minCol <= col && col <= GobangBrain.maxCol ?
             true : false 
    }

    /**
     * (当坐标可用且上面没有棋子时) 在该坐标上放置当前玩家的一枚棋子。
     * 放置完成后变更当前玩家
     */
    putChessOn(row: number, col: number) {
        if (this.validRowAndCol(row, col) && !this.hasChessOn(row, col)) {
            this.chessboard[row][col] = chessOfPlayer(this.currentPlayer)
            this.lastAction = {
                row: row,
                col: col,
                chess: chessOfPlayer(this.currentPlayer)
            }
            this.currentPlayer = changePlayer(this.currentPlayer)
        }
    }

    private initChessboard() {
        this.chessboard = []
        for (let i = 0; i < GobangBrain.maxRow; i++) {
            let row: Chess[] = []
            for (let j = 0; j < GobangBrain.maxCol; j++) {
                row.push(Chess.None)
            }
            this.chessboard.push(row)
        }
    }

    constructor() {
        this.initChessboard()
    }
}