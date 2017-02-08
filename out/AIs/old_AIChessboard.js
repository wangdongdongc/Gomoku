/**
 * AI 使用的棋子 (AI执白子)
 */
var old_AIChess = (function () {
    function old_AIChess(chess) {
        this.up = {
            adjChessNum: 0,
            isBlocked: false
        };
        this.down = {
            adjChessNum: 0,
            isBlocked: false
        };
        this.left = {
            adjChessNum: 0,
            isBlocked: false
        };
        this.right = {
            adjChessNum: 0,
            isBlocked: false
        };
        this.upLeft = {
            adjChessNum: 0,
            isBlocked: false
        };
        this.upRight = {
            adjChessNum: 0,
            isBlocked: false
        };
        this.downLeft = {
            adjChessNum: 0,
            isBlocked: false
        };
        this.downRight = {
            adjChessNum: 0,
            isBlocked: false
        };
        this.chess = chess;
    }
    Object.defineProperty(old_AIChess.prototype, "isBlack", {
        get: function () {
            return this.chess == Chessman.Black;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(old_AIChess.prototype, "isWhite", {
        get: function () {
            return this.chess == Chessman.White;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(old_AIChess.prototype, "isNone", {
        get: function () {
            return this.chess == Chessman.None;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(old_AIChess.prototype, "belongToAI", {
        get: function () {
            return this.isWhite;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(old_AIChess.prototype, "belongToPlayer", {
        get: function () {
            return this.isBlack;
        },
        enumerable: true,
        configurable: true
    });
    return old_AIChess;
}());
/**
 * AI 使用的棋盘
 *
 * 注1: row: 0-14、 col: 0-14
 *
 * 注2: 不进行越界检查
 */
var old_AIChessboard = (function () {
    function old_AIChessboard() {
        this.chessboard = new Array(15);
        for (var i = 0; i < 15; i++)
            for (var j = 0; j < 15; j++)
                this.chessboard[i].push(new old_AIChess(Chessman.None));
        for (var r = 0; r < 15; r++) {
            this.chessboard[r][0].left.isBlocked = true;
            this.chessboard[r][14].right.isBlocked = true;
        }
        for (var c = 0; c < 15; c++) {
            this.chessboard[0][c].up.isBlocked = true;
            this.chessboard[14][c].down.isBlocked = true;
        }
        this.chessboard[0][0].upLeft.isBlocked = true;
        this.chessboard[0][14].upRight.isBlocked = true;
        this.chessboard[14][0].downLeft.isBlocked = true;
        this.chessboard[14][14].downRight.isBlocked = true;
    }
    old_AIChessboard.prototype.hasChessOn = function (zRow, zCol) {
        return !this.chessboard[zRow][zCol].isNone;
    };
    old_AIChessboard.prototype.putChessOn = function (zRow, zCol, chess) {
        if (!this.hasChessOn(zRow, zCol)) {
            this.chessboard[zRow][zCol] = chess;
            var current = this.chessboard[zRow][zCol];
            var up = this.up(zRow, zCol);
            if (up) {
                switch (up.chess) {
                    case Chessman.Black:
                        // 相互 Block
                        current.up.isBlocked = true;
                        up.down.isBlocked = true;
                        break;
                    case Chessman.White:
                        // 相互 +1
                        current.up.adjChessNum++;
                        up.down.adjChessNum++;
                        // 继承 Block 属性
                        current.up.isBlocked = up.up.isBlocked;
                        // 传递 Block 属性
                        // Todo
                        break;
                    case Chessman.None:
                }
            }
            var upLeft = this.upLeft(zRow, zCol);
            if (upLeft) {
                switch (upLeft.chess) {
                    case Chessman.Black:
                        current.upLeft.isBlocked = true;
                        upLeft.downRight.isBlocked = true;
                        break;
                    case Chessman.White:
                        current.upLeft.adjChessNum++;
                        upLeft.downRight.adjChessNum++;
                        current.upLeft.isBlocked = upLeft.upLeft.isBlocked;
                        break;
                    case Chessman.None:
                }
            }
            var left = this.left(zRow, zCol);
            if (left) {
                switch (left.chess) {
                    case Chessman.Black:
                        current.left.isBlocked = true;
                        left.right.isBlocked = true;
                        break;
                    case Chessman.White:
                        current.left.adjChessNum++;
                        left.right.adjChessNum++;
                        current.left.isBlocked = left.left.isBlocked;
                        break;
                    case Chessman.None:
                }
            }
            var downLeft = this.downLeft(zRow, zCol);
            if (downLeft) {
                switch (downLeft.chess) {
                    case Chessman.Black:
                        break;
                    case Chessman.White:
                        break;
                    case Chessman.None:
                }
            }
            var down = this.down(zRow, zCol);
            if (down) {
                switch (down.chess) {
                    case Chessman.Black:
                        break;
                    case Chessman.White:
                        break;
                    case Chessman.None:
                }
            }
            var downRight = this.downRight(zRow, zCol);
            if (downRight) {
                switch (downRight.chess) {
                    case Chessman.Black:
                        break;
                    case Chessman.White:
                        break;
                    case Chessman.None:
                }
            }
            var right = this.right(zRow, zCol);
            if (right) {
                switch (right.chess) {
                    case Chessman.Black:
                        break;
                    case Chessman.White:
                        break;
                    case Chessman.None:
                }
            }
            var upRight = this.upRight(zRow, zCol);
            if (upRight) {
                switch (upRight.chess) {
                    case Chessman.Black:
                        break;
                    case Chessman.White:
                        break;
                    case Chessman.None:
                }
            }
        }
    };
    old_AIChessboard.prototype.left = function (zRow, zCol) {
        return zCol > 0 ? this.chessboard[zRow][zCol - 1] : undefined;
    };
    old_AIChessboard.prototype.right = function (zRow, zCol) {
        return zCol < 14 ? this.chessboard[zRow][zCol + 1] : undefined;
    };
    old_AIChessboard.prototype.up = function (zRow, zCol) {
        return zRow > 0 ? this.chessboard[zRow - 1][zCol] : undefined;
    };
    old_AIChessboard.prototype.down = function (zRow, zCol) {
        return zRow < 14 ? this.chessboard[zRow + 1][zCol] : undefined;
    };
    old_AIChessboard.prototype.upLeft = function (zRow, zCol) {
        return zCol > 0 && zRow > 0 ? this.chessboard[zCol - 1][zRow - 1] : undefined;
    };
    old_AIChessboard.prototype.upRight = function (zRow, zCol) {
        return zCol < 14 && zRow > 0 ? this.chessboard[zCol + 1][zRow - 1] : undefined;
    };
    old_AIChessboard.prototype.downLeft = function (zRow, zCol) {
        return zCol > 0 && zRow < 14 ? this.chessboard[zCol - 1][zRow + 1] : undefined;
    };
    old_AIChessboard.prototype.downRight = function (zRow, zCol) {
        return zCol < 14 && zRow < 14 ? this.chessboard[zCol + 1][zRow + 1] : undefined;
    };
    return old_AIChessboard;
}());
//# sourceMappingURL=old_AIChessboard.js.map