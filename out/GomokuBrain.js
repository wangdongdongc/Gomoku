/**
 * 五子棋游戏 (MVC) 的 Model 层
 */
var GomokuBrain = (function () {
    function GomokuBrain() {
        this.maxRow = 15;
        this.maxCol = 15;
        this.currentPlayer = Player.Black; //黑子先行
        this.gameIsOver = false;
        this.chessboard = new Chessboard(this.maxRow, this.maxCol);
    }
    /**
     * 当前玩家在坐标上落子
     * (将充分检查以确保安全落子)
     *  落子后将变更当前玩家
     * @param {number} row 行坐标
     * @param {number} col 列坐标
     */
    GomokuBrain.prototype.putChessOn = function (row, col) {
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
                return;
            }
            else {
                this.currentPlayer = changePlayer(this.currentPlayer);
            }
        }
    };
    /**
     * 判断最近的一次游戏动作是否使一方获胜
     *  (以最近的一次落子坐标为基准,分别检查横向、纵向、主对角线、副对角线方向是否存在获胜棋组
     *   并保存获胜棋组)
     */
    GomokuBrain.prototype.checkLastAction = function () {
        this.checkRow(this.lastAction.row, this.lastAction.player);
        this.checkColumn(this.lastAction.col, this.lastAction.player);
        this.checkMainDiagonal(this.lastAction.row, this.lastAction.col, this.lastAction.player);
        this.checkSubDiagonal(this.lastAction.row, this.lastAction.col, this.lastAction.player);
    };
    /**
     * 检查玩家是否在指定的行上获胜
     * @param {number} row 行坐标
     * @param {Player} forPlayer 指定的玩家
     */
    GomokuBrain.prototype.checkRow = function (row, forPlayer) {
        if (this.gameIsOver)
            return;
        this.winningChesses = [];
        for (var col = 1; col <= this.maxCol; col++) {
            if (this.chessboard.getChessOn(row, col) == chessOfPlayer(forPlayer)) {
                this.winningChesses.push(this.chessboard.getChessOn(row, col));
                if (this.winningChesses.length == 5) {
                    this.gameIsOver = true;
                    return;
                }
            }
            else {
                this.winningChesses = [];
            }
        }
    };
    /**
     * 检查玩家是否在指定的列上获胜
     * @param {number} col 列坐标
     * @param {Player} forPlayer 玩家
     */
    GomokuBrain.prototype.checkColumn = function (col, forPlayer) {
        if (this.gameIsOver)
            return;
        for (var row = 1; row <= this.maxRow; row++) {
            if (this.chessboard.getChessOn(row, col) == chessOfPlayer(forPlayer)) {
                this.winningChesses.push(this.chessboard.getChessOn(row, col));
                if (this.winningChesses.length == 5) {
                    this.gameIsOver = true;
                    return;
                }
            }
            else {
                this.winningChesses = [];
            }
        }
    };
    /**
     * 检查玩家是否在指定点的主对角线上获胜
     * @param {number} row 行坐标
     * @param {number} col 列坐标
     * @param {Player} forPlayer 玩家
     */
    GomokuBrain.prototype.checkMainDiagonal = function (row, col, forPlayer) {
        if (this.gameIsOver)
            return;
        var fromR, fromC, toR, toC;
        if (col >= row) {
            fromR = 1;
            fromC = col - row + 1;
            toR = 15 - col + row;
            toC = 15;
        }
        else {
            fromR = row - col + 1;
            fromC = 1;
            toR = 15;
            toC = 15 + col - row;
        }
        while (fromR <= toR && fromC <= toC) {
            if (this.chessboard.getChessOn(fromR, fromC) == chessOfPlayer(forPlayer)) {
                this.winningChesses.push(this.chessboard.getChessOn(fromR, fromC));
                if (this.winningChesses.length == 5) {
                    this.gameIsOver = true;
                    return;
                }
            }
            else {
                this.winningChesses = [];
            }
            fromR++;
            fromC++;
        }
    };
    /**
     * 检查玩家是否在指定点的副对角线上获胜
     * @param {number} row 行坐标
     * @param {number} col 列坐标
     * @param {Player} forPlayer 玩家
     */
    GomokuBrain.prototype.checkSubDiagonal = function (row, col, forPlayer) {
        if (this.gameIsOver)
            return;
        var fromR, fromC, toR, toC;
        if (col + row <= 16) {
            fromR = 1;
            fromC = row + col - 1;
            toR = row + col - 1;
            toC = 1;
        }
        else {
            fromR = row + col - 15;
            fromC = 15;
            toR = 15;
            toC = row + col - 15;
        }
        while (fromR <= toR && fromC >= toC) {
            if (this.chessboard.getChessOn(fromR, fromC) == chessOfPlayer(forPlayer)) {
                this.winningChesses.push(this.chessboard.getChessOn(fromR, fromC));
                if (this.winningChesses.length == 5) {
                    this.gameIsOver = true;
                    return;
                }
            }
            else {
                this.winningChesses = [];
            }
            fromR++;
            fromC--;
        }
    };
    return GomokuBrain;
}());
//# sourceMappingURL=GomokuBrain.js.map