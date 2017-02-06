/**
 * 五子棋游戏 (MVC) 的 Model 层
 */
var GobangBrain = (function () {
    function GobangBrain() {
        this.maxRow = 15;
        this.maxCol = 15;
        this.currentPlayer = Player.Black;
        this.gameIsOver = false;
        this.chessboard = new Chessboard(this.maxRow, this.maxCol);
    }
    /**
     * (当坐标可用且上面没有棋子时) 在该坐标上放置当前玩家的一枚棋子。
     * 放置完成后变更当前玩家
     */
    GobangBrain.prototype.putChessOn = function (row, col) {
        if (this.gameIsOver)
            return;
        if (this.chessboard.validRowAndCol(row, col) && !this.chessboard.hasChessOn(row, col)) {
            this.chessboard.setChessOn(row, col, chessOfPlayer(this.currentPlayer));
            this.lastAction = {
                row: row,
                col: col,
                player: this.currentPlayer
            };
            this.checkLastAction();
            if (this.gameIsOver) {
            }
            else {
                this.currentPlayer = changePlayer(this.currentPlayer);
            }
        }
    };
    /**
     * 判断最终动作是否使一方获胜)
     */
    GobangBrain.prototype.checkLastAction = function () {
        //Todo
        return false;
    };
    return GobangBrain;
}());
//# sourceMappingURL=GobangBrain.js.map