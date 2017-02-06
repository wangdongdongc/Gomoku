var GobangViewController = (function () {
    function GobangViewController() {
        this.gameView = new GobangView(480, 480, this);
        this.brain = new GobangBrain();
    }
    GobangViewController.prototype.handleClickEvent = function (x, y) {
        var col = Math.round(x / this.gameView.horizontalLineGap);
        var row = Math.round(y / this.gameView.verticalLineGap);
        this.brain.putChessOn(row, col);
        this.gameView.putChessOn(this.brain.lastAction.row, this.brain.lastAction.col, this.brain.lastAction.chess);
    };
    return GobangViewController;
}());
//# sourceMappingURL=GobangViewController.js.map