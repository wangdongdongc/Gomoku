class AIChessboard {
    /**
     * 1: 己方棋子
     * 0: 无棋子
     * -1: 敌方棋子
     */
    board: number[][]
    get(r, c): number {
        return this.board[r][c]
    }

    set(r, c, x) {
        return this.board[r][c] = x
    }

    constructor() {
        this.board = makeMatrix(15, 15, 0)
    }
}