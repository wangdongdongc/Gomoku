var AIChessboard = (function () {
    function AIChessboard() {
        this.board = makeMatrix(15, 15, 0);
    }
    AIChessboard.prototype.get = function (r, c) {
        return this.board[r][c];
    };
    AIChessboard.prototype.set = function (r, c, x) {
        return this.board[r][c] = x;
    };
    return AIChessboard;
}());
//# sourceMappingURL=AIChessboard.js.map