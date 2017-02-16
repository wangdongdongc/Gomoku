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
        this.gomokuDB = new GomokuDB();
        if (playWithAI) {
            this.playWithAI = true;
            this.AI = new AI.TestAI_2();
            //AI先落子
            this.AI.putFirstChessInMiddle();
            this.gomokuGame.putChessOn(8, 8); //game默认白子开局
            this.gameView.putChessOn(8, 8, Chess.White);
            this.menuView.chessCount = 1;
        }
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
        if (this.gomokuGame.currentPlayer != GomokuPlayer.Black) {
            return;
        } //防止乱按先检查
        this.gomokuGame.putChessOn(row, col); //再操作
        this.gameView.putChessOn(this.gomokuGame.lastAction.row, this.gomokuGame.lastAction.col, chessOfPlayer(this.gomokuGame.lastAction.player));
        this.menuView.chessCount = this.menuView.chessCount + 1;
        //AI落子
        if (this.playWithAI && !this.gomokuGame.gameIsOver) {
            this.AI.analysAction(this.gomokuGame.lastAction);
            var action = this.AI.getNextAction();
            this.gomokuGame.putChessOn(action.row, action.col);
            this.gameView.putChessOn(action.row, action.col, chessOfPlayer(action.player));
        }
        this.menuView.chessCount = this.menuView.chessCount + 1;
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
            this.gomokuDB.addNewHistory({
                datetime: new Date(),
                actions: this.gomokuGame.allActions
            });
        }
    };
    /**
     * 更改棋盘主题
     */
    GomokuViewController.prototype.changeTheme = function (theme) {
        this.gameView.theme = theme;
        this.gameView.redrawChessboard(this.gomokuGame.allActions);
        if (this.showChessStep) {
            this.drawChessSteps();
        }
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