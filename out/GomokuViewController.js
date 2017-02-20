/**
 * 五子棋游戏 (MVC) 的 Controller 层
 */
var GomokuViewController = (function () {
    function GomokuViewController(playWithAI) {
        if (playWithAI === void 0) { playWithAI = false; }
        this.playWithAI = false;
        this._showChessStep = false;
        this.historiesHaveLoaded = false;
        //Views
        this.gameView = new GomokuView(480, 480, this);
        this.menuView = new MenuView(480, 200, this);
        this.menuView.statusMessage = "执黑子";
        this.dialogView = new DialogView();
        //Models
        this.gomokuGame = new GomokuGame();
        this.gomokuDB = new GomokuDB();
        this.loadHistory();
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
     * 读取数据库,将历史记录写入对话框视图
     */
    GomokuViewController.prototype.loadHistory = function () {
        var _this = this;
        this.gomokuDB.getAll(function (item) {
            //读取并处理一个对象
            var date = item.datetime;
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hour = date.getHours();
            var minute = date.getMinutes();
            var winner = item.actions[item.actions.length - 1].player == GomokuPlayer.Black
                ? "玩家" : "AI";
            _this.dialogView.addItem(year + "\u5E74" + month + "\u6708" + day + "\u65E5-" + hour + "\u65F6" + minute + "\u5206  " + winner + "\u83B7\u80DC"); //Todo
        });
    };
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
        } //检查是否该玩家落子（防乱按
        if (!this.gomokuGame.putChessOn(row, col)) {
            return;
        }
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
            //游戏结束，显示结束信息
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
            this.gomokuDB.add({
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
    /**
     * 显示对话框
     */
    GomokuViewController.prototype.toggleDialog = function () {
        this.dialogView.toggle();
    };
    return GomokuViewController;
}());
//# sourceMappingURL=GomokuViewController.js.map