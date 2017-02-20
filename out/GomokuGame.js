/**
 * 五子棋游戏 (MVC) 的 Model 层
 *
 * 控制游戏规则，判断胜负
 */
var GomokuGame = (function () {
    function GomokuGame(playWithAI) {
        if (playWithAI === void 0) { playWithAI = false; }
        this.maxRow = 15;
        this.maxCol = 15;
        this.currentPlayer = GomokuPlayer.White; //白子(AI)先行
        this.gameIsOver = false;
        this.chessboard = new Chessboard(this.maxRow, this.maxCol);
        this.allActions = [];
    }
    /**
     * 当前玩家在坐标上落子,成功落子后返回 true
     * (将充分检查以确保安全落子)
     *  落子后将变更当前玩家
     * @param {number} row 行坐标
     * @param {number} col 列坐标
     */
    GomokuGame.prototype.putChessOn = function (row, col) {
        if (this.gameIsOver)
            return false;
        if (this.chessboard.validRowAndCol(row, col) && !this.chessboard.hasChess(row, col)) {
            this.chessboard.putChess(row, col, chessOfPlayer(this.currentPlayer));
            this.lastAction = {
                row: row,
                col: col,
                player: this.currentPlayer
            };
            this.allActions.push(this.lastAction);
            this.checkLastAction();
            this.currentPlayer = changePlayer(this.currentPlayer);
            return true;
        }
        return false;
    };
    /**
     * 使用指定的棋局复盘
     * 当前棋局将被覆盖
     */
    GomokuGame.prototype.replay = function () {
        //Todo
    };
    /**
     * 判断最近的一次游戏动作是否使一方获胜
     *  (以最近的一次落子坐标为基准,分别检查横向、纵向、主对角线、副对角线方向是否存在获胜棋组
     *   并保存获胜棋组)
     */
    GomokuGame.prototype.checkLastAction = function () {
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
    GomokuGame.prototype.checkRow = function (row, forPlayer) {
        if (this.gameIsOver)
            return;
        this.winningChesses = [];
        for (var col = 1; col <= this.maxCol; col++) {
            if (this.chessboard.getChess(row, col) == chessOfPlayer(forPlayer)) {
                this.winningChesses.push(this.chessboard.getChess(row, col));
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
    GomokuGame.prototype.checkColumn = function (col, forPlayer) {
        if (this.gameIsOver)
            return;
        for (var row = 1; row <= this.maxRow; row++) {
            if (this.chessboard.getChess(row, col) == chessOfPlayer(forPlayer)) {
                this.winningChesses.push(this.chessboard.getChess(row, col));
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
    GomokuGame.prototype.checkMainDiagonal = function (row, col, forPlayer) {
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
            if (this.chessboard.getChess(fromR, fromC) == chessOfPlayer(forPlayer)) {
                this.winningChesses.push(this.chessboard.getChess(fromR, fromC));
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
    GomokuGame.prototype.checkSubDiagonal = function (row, col, forPlayer) {
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
            if (this.chessboard.getChess(fromR, fromC) == chessOfPlayer(forPlayer)) {
                this.winningChesses.push(this.chessboard.getChess(fromR, fromC));
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
    return GomokuGame;
}());
//# sourceMappingURL=GomokuGame.js.map