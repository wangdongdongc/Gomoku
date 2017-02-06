/**
 * 包含棋子的棋盘
 */
class Chessboard {
    /**
     * 存储棋子对象的二维数组
     */
    private chessboard: Chessman[][]
    private numberOfRows: number
    private numberOfColumns: number

    constructor(numberOfRows, numberOfColumns) {
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
    hasChessOn(row: number, col: number): boolean {
        return this.validRowAndCol(row, col) ? this.chessboard[row - 1][col - 1] != Chessman.None : undefined
    }
    getChessOn(row: number, col: number): Chessman {
        return this.validRowAndCol(row, col) ? this.chessboard[row - 1][col - 1] : undefined
    }
    setChessOn(row: number, col: number, chess: Chessman) {
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