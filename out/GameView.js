var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 五子棋游戏的 View 部分
 */
var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView(width, height) {
        var _this = _super.call(this, width, height) || this;
        _this.chessboardStyle = {
            originX: 0,
            originY: 0,
            width: 480,
            height: 480,
            lineWidth: 1.5,
            lineColor: "black",
            borderWidth: 1,
            borderColor: "black",
            backgroudColor: "rgb(212,212,212)"
        };
        _this.chessmanStyle = {
            centerX: 0,
            centerY: 0,
            radius: 10,
            borderWidth: 3,
            borderColor: "black",
            fillColor: "black"
        };
        _this.drawChessboard();
        _this.putChessman(3, 6);
        return _this;
    }
    /**
     * 获取第i行第j列的棋子的坐标 (无越界检查)
     * @param {number} row 第i行(1 ~ 15)
     * @param {number} col 第j列(1 ~ 15)
     */
    GameView.prototype.getChessmanPosition = function (row, col) {
        return {
            x: this.chessboardStyle.originY + col * (this.chessboardStyle.height / 16),
            y: this.chessboardStyle.originX + row * (this.chessboardStyle.width / 16)
        };
    };
    /**
     * Todo: 黑子或白子应有不同的格式
     * 在第i行第j列放置一个棋子 (无越界检查)
     * @param {number} row 第i行(1 ~ 15)
     * @param {number} col 第j列(1 ~ 15)
     */
    GameView.prototype.putChessman = function (row, col) {
        var coord = this.getChessmanPosition(row, col);
        new Chessman({
            centerX: coord.x,
            centerY: coord.y,
            radius: this.chessmanStyle.radius,
            borderColor: this.chessmanStyle.borderColor,
            borderWidth: this.chessmanStyle.borderWidth,
            fillColor: this.chessmanStyle.fillColor
        }).drawOn(this.context);
    };
    GameView.prototype.drawChessboard = function () {
        new Chessboard(this.chessboardStyle).drawOn(this.context);
    };
    return GameView;
}(UIView));
var game = new GameView(480, 480);
//# sourceMappingURL=GameView.js.map