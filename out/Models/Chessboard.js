/**
 * 包含棋子的棋盘
 */
var Chessboard = (function () {
    function Chessboard(numberOfRows, numberOfColumns) {
        if (numberOfRows === void 0) { numberOfRows = 15; }
        if (numberOfColumns === void 0) { numberOfColumns = 15; }
        this.chessboard = [];
        this.numberOfRows = numberOfRows;
        this.numberOfColumns = numberOfColumns;
        for (var i = 0; i < numberOfRows; i++) {
            var row = [];
            for (var j = 0; j < numberOfColumns; j++) {
                row.push(Chess.None);
            }
            this.chessboard.push(row);
        }
    }
    /**
     * 判断坐标是否有棋子(可以指定棋子类型)
     *
     * 坐标越界则返回 undefined
     * @param {Chessman} givenChess 指定棋子的类型
     */
    Chessboard.prototype.hasChess = function (row, col, givenChess) {
        if (givenChess) {
            return this.validRowAndCol(row, col) ? this.chessboard[row - 1][col - 1] != givenChess : undefined;
        }
        else {
            return this.validRowAndCol(row, col) ? this.chessboard[row - 1][col - 1] != Chess.None : undefined;
        }
    };
    Chessboard.prototype.getChess = function (row, col) {
        return this.validRowAndCol(row, col) ? this.chessboard[row - 1][col - 1] : undefined;
    };
    Chessboard.prototype.putChess = function (row, col, chess) {
        if (this.validRowAndCol(row, col)) {
            this.chessboard[row - 1][col - 1] = chess;
        }
    };
    Chessboard.prototype.validRowAndCol = function (row, col) {
        return 1 <= row && row <= this.numberOfRows
            && 1 <= col && col <= this.numberOfColumns ?
            true : false;
    };
    return Chessboard;
}());
//# sourceMappingURL=Chessboard.js.map