/**
 * 包含棋子的棋盘
 */
class Chessboard {
    /**
     * 存储棋子对象的二维数组
     */
    private chessboard: Chessman[][]
    readonly numberOfRows: number
    readonly numberOfColumns: number

    constructor(numberOfRows = 15, numberOfColumns = 15) {
        this.chessboard = []
        this.numberOfRows = numberOfRows
        this.numberOfColumns = numberOfColumns
        for (let i = 0; i < numberOfRows; i++) {
            let row: Chessman[] = []
            for (let j = 0; j < numberOfColumns; j++) {
                row.push(Chessman.None)
            }
            this.chessboard.push(row)
        }
    }

    /**
     * 判断坐标是否有棋子(可以指定棋子类型)
     * 
     * 坐标越界则返回 undefined
     * @param {Chessman} givenChess 指定棋子的类型
     */
    hasChess(row: number, col: number, givenChess?: Chessman): boolean {
        if (givenChess) {
            return this.validRowAndCol(row, col) ? this.chessboard[row - 1][col - 1] != givenChess : undefined
        } else {
            return this.validRowAndCol(row, col) ? this.chessboard[row - 1][col - 1] != Chessman.None : undefined
        }
    }

    getChess(row: number, col: number): Chessman {
        return this.validRowAndCol(row, col) ? this.chessboard[row - 1][col - 1] : undefined
    }

    putChess(row: number, col: number, chess: Chessman) {
        if (this.validRowAndCol(row, col)) {
            this.chessboard[row - 1][col - 1] = chess
        }
    }
    
    validRowAndCol(row: number, col: number): boolean {
        return 1 <= row && row <= this.numberOfRows
            && 1 <= col && col <= this.numberOfColumns ?
             true : false 
    }
}