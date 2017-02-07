/**
 * 五子棋游戏 (MVC) 的 Controller 层
 */
var GomokuViewController = (function () {
    function GomokuViewController() {
        this.gameView = new GomokuView(480, 480, this);
        this.brain = new GomokuBrain();
    }
    GomokuViewController.prototype.handleClickEvent = function (x, y) {
        var col = Math.round(x / this.gameView.horizontalLineGap);
        var row = Math.round(y / this.gameView.verticalLineGap);
        this.brain.putChessOn(row, col);
        this.gameView.putChessOn(this.brain.lastAction.row, this.brain.lastAction.col, chessOfPlayer(this.brain.lastAction.player));
    };
    return GomokuViewController;
}());
//# sourceMappingURL=GomokuViewController.js.map