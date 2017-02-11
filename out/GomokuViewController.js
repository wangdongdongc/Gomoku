/**
 * 五子棋游戏 (MVC) 的 Controller 层
 */
var GomokuViewController = (function () {
    function GomokuViewController(playWithAI) {
        if (playWithAI === void 0) { playWithAI = false; }
        this.playWithAI = false;
        this._showChessStep = false;
        this.gameView = new GomokuView(480, 480, this);
        this.menuView = new MenuView(480, 200, this);
        this.menuView.statusMessage = "执黑子";
        this.gomokuGame = new GomokuGame();
        if (playWithAI) {
            this.playWithAI = true;
            this.AI = new TestAI_1();
        }
        //AI先落子
        this.AI.putFirstChessInMiddle();
        this.gomokuGame.putChessOn(8, 8); //game默认白子开局
        this.gameView.putChessOn(8, 8, Chessman.White);
        this.menuView.chessCount = 1;
    }
    Object.defineProperty(GomokuViewController.prototype, "showChessStep", {
        get: function () {
            return this._showChessStep;
        },
        /**
         * 修改 showChessStep 值的同时会重绘棋盘
         */
        set: function (x) {
            this._showChessStep = x;
            if (this.showChessStep) {
                this.drawChessSteps();
            }
            else {
                this.gameView.redrawChessboard(this.gomokuGame.allActions);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 响应棋盘上的点击
     */
    GomokuViewController.prototype.handleClickEvent = function (x, y) {
        if (this.gomokuGame.gameIsOver)
            return;
        //玩家落子
        var col = Math.round(x / this.gameView.horizontalLineGap);
        var row = Math.round(y / this.gameView.verticalLineGap);
        this.gomokuGame.putChessOn(row, col);
        if (this.gomokuGame.currentPlayer != GomokuPlayer.White) {
            return;
        } //防止乱按
        this.gameView.putChessOn(this.gomokuGame.lastAction.row, this.gomokuGame.lastAction.col, chessOfPlayer(this.gomokuGame.lastAction.player));
        this.menuView.chessCount = this.menuView.chessCount + 1;
        //AI落子
        if (this.playWithAI && !this.gomokuGame.gameIsOver) {
            this.AI.analysAction(this.gomokuGame.lastAction);
            var action = this.AI.nextAction();
            this.gomokuGame.putChessOn(action.row, action.col);
            this.gameView.putChessOn(action.row, action.col, chessOfPlayer(action.player));
        }
        if (this.gomokuGame.gameIsOver) {
            var whiteWin = void 0, blackWin = void 0;
            if (this.gameView.theme instanceof VividTheme) {
                whiteWin = "青子胜";
                blackWin = "蓝子胜";
            }
            else {
                whiteWin = "白子胜";
                blackWin = "黑子胜";
            }
            this.menuView.statusMessage = this.gomokuGame.currentPlayer == 1 ? whiteWin : blackWin;
        }
        this.menuView.chessCount = this.menuView.chessCount + 1;
    };
    /**
     * 更改棋盘主题
     */
    GomokuViewController.prototype.changeTheme = function (theme) {
        this.gameView.theme = theme;
        this.gameView.redrawChessboard(this.gomokuGame.allActions);
        if (theme instanceof DefaultTheme) {
            this.menuView.statusMessage = "执黑子";
        }
        else if (theme instanceof VividTheme) {
            this.menuView.statusMessage = "执蓝子";
        }
    };
    /**
     * 在每个棋子上面显示步数
     */
    GomokuViewController.prototype.drawChessSteps = function () {
        this.gameView.drawSteps(this.gomokuGame.allActions);
    };
    return GomokuViewController;
}());
//# sourceMappingURL=GomokuViewController.js.map