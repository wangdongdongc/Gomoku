/**
 * 五子棋游戏 (MVC) 的 Controller 层
 */
var GomokuViewController = (function () {
    function GomokuViewController(playWithAI) {
        if (playWithAI === void 0) { playWithAI = false; }
        this.playWithAI = false;
        this.gameView = new GomokuView(480, 480, this);
        this.menuView = new MenuView(480, 200, this);
        this.game = new GomokuGame();
        if (playWithAI) {
            this.playWithAI = true;
            this.AI = new TestAI_1();
        }
        //AI先落子
        this.AI.putFirstChessInMiddle();
        this.game.putChessOn(8, 8); //game默认白子开局
        this.gameView.putChessOn(8, 8, Chessman.White);
    }
    GomokuViewController.prototype.handleClickEvent = function (x, y) {
        if (this.game.gameIsOver)
            return;
        //玩家落子
        var col = Math.round(x / this.gameView.horizontalLineGap);
        var row = Math.round(y / this.gameView.verticalLineGap);
        this.game.putChessOn(row, col);
        this.gameView.putChessOn(this.game.lastAction.row, this.game.lastAction.col, chessOfPlayer(this.game.lastAction.player));
        //AI落子
        if (this.playWithAI && !this.game.gameIsOver) {
            this.AI.analysAction(this.game.lastAction);
            var action = this.AI.nextAction();
            this.game.putChessOn(action.row, action.col);
            this.gameView.putChessOn(action.row, action.col, chessOfPlayer(action.player));
        }
    };
    return GomokuViewController;
}());
//# sourceMappingURL=GomokuViewController.js.map