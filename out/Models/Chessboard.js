/**
 * 包含棋子的棋盘
 */
var Chessboard = (function () {
    function Chessboard(numberOfRows, numberOfColumns) {
        this.chessboard = [];
        this.numberOfRows = numberOfRows;
        this.numberOfColumns = numberOfColumns;
        for (var i = 0; i < numberOfRows; i++) {
            var row = [];
            for (var j = 0; j < numberOfColumns; j++) {
                row.push(Chessman.None);
            }
            this.chessboard.push(row);
        }
    }
    Chessboard.prototype.hasChessOn = function (row, col) {
        return this.validRowAndCol(row, col) ? this.chessboard[row - 1][col - 1] != Chessman.None : undefined;
    };
    Chessboard.prototype.getChessOn = function (row, col) {
        return this.validRowAndCol(row, col) ? this.chessboard[row - 1][col - 1] : undefined;
    };
    Chessboard.prototype.setChessOn = function (row, col, chess) {
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