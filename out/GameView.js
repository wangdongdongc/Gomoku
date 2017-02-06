var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView(width, height) {
        var _this = _super.call(this, width, height) || this;
        _this.drawChessboard();
        return _this;
    }
    GameView.prototype.drawChessboard = function () {
        new Chessboard({
            originX: 0,
            originY: 0,
            width: 480,
            height: 480,
            lineWidth: 1.5,
            lineColor: "black",
            borderWidth: 1,
            borderColor: "black",
            backgroudColor: "rgb(212,212,212)"
        }).drawOn(this.context);
    };
    return GameView;
}(UIView));
var game = new GameView(480, 480);
//# sourceMappingURL=GameView.js.map