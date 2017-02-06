var Player;
(function (Player) {
    Player[Player["Black"] = 1] = "Black";
    Player[Player["White"] = 2] = "White";
})(Player || (Player = {}));
/**
 * 改变当前玩家, 返回新的玩家
 * @param {Player} player 当前玩家
 * @return {Player} 新玩家
 */
function changePlayer(player) {
    if (player == Player.Black) {
        return Player.White;
    }
    else {
        return Player.Black;
    }
}
var Chess;
(function (Chess) {
    Chess[Chess["None"] = 0] = "None";
    Chess[Chess["Black"] = 1] = "Black";
    Chess[Chess["White"] = 2] = "White";
})(Chess || (Chess = {}));
/**
 * 返回玩家持有的棋子
 * @param {Player} player 玩家
 * @return {Chess} 玩家的棋子
 */
function chessOfPlayer(player) {
    return Chess[Player[player]];
}
var GobangBrain = (function () {
    function GobangBrain() {
        this.currentPlayer = Player.Black;
        this.initChessboard();
    }
    GobangBrain.prototype.hasChessOn = function (row, col) {
        return this.validRowAndCol(row, col) ? this.chessboard[row][col] != Chess.None : undefined;
    };
    GobangBrain.prototype.getChessOn = function (row, col) {
        return this.validRowAndCol(row, col) ? this.chessboard[row][col] : undefined;
    };
    GobangBrain.prototype.validRowAndCol = function (row, col) {
        return GobangBrain.minRow <= row && row <= GobangBrain.maxRow
            && GobangBrain.minCol <= col && col <= GobangBrain.maxCol ?
            true : false;
    };
    /**
     * (当坐标可用且上面没有棋子时) 在该坐标上放置当前玩家的一枚棋子。
     * 放置完成后变更当前玩家
     */
    GobangBrain.prototype.putChessOn = function (row, col) {
        if (this.validRowAndCol(row, col) && !this.hasChessOn(row, col)) {
            this.chessboard[row][col] = chessOfPlayer(this.currentPlayer);
            this.lastAction = {
                row: row,
                col: col,
                chess: chessOfPlayer(this.currentPlayer)
            };
            this.currentPlayer = changePlayer(this.currentPlayer);
        }
    };
    GobangBrain.prototype.initChessboard = function () {
        this.chessboard = [];
        for (var i = 0; i < GobangBrain.maxRow; i++) {
            var row = [];
            for (var j = 0; j < GobangBrain.maxCol; j++) {
                row.push(Chess.None);
            }
            this.chessboard.push(row);
        }
    };
    return GobangBrain;
}());
GobangBrain.minRow = 1;
GobangBrain.maxRow = 15;
GobangBrain.minCol = 1;
GobangBrain.maxCol = 15;
//# sourceMappingURL=GobangBrain.js.map