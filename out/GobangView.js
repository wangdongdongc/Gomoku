var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 五子棋游戏的视图
 */
var GobangView = (function (_super) {
    __extends(GobangView, _super);
    function GobangView(width, height, viewController) {
        var _this = _super.call(this, width, height) || this;
        _this.chessboardStyle = {
            originX: 0,
            originY: 0,
            width: _this.bound.width,
            height: _this.bound.height,
            lineWidth: 1.5,
            lineColor: "black",
            borderWidth: 1,
            borderColor: "black",
            backgroudColor: "rgb(212,212,212)"
        };
        _this.viewController = viewController;
        _this.drawChessboard();
        _this.registerEvents();
        return _this;
    }
    Object.defineProperty(GobangView.prototype, "horizontalLineGap", {
        get: function () {
            return this.bound.height / 16;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GobangView.prototype, "verticalLineGap", {
        get: function () {
            return this.bound.width / 16;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 注册事件, 并将事件交由Controller处理
     */
    GobangView.prototype.registerEvents = function () {
        var _this = this;
        this.addEventListener("click", function (event) {
            _this.viewController.handleClickEvent(event.offsetX, event.offsetY);
        });
    };
    /**
     * 获取第i行第j列的棋子的坐标 (无越界检查)
     * @param {number} row 第i行(1 ~ 15)
     * @param {number} col 第j列(1 ~ 15)
     */
    GobangView.prototype.getChessPosition = function (row, col) {
        return {
            x: this.chessboardStyle.originY + col * (this.chessboardStyle.height / 16),
            y: this.chessboardStyle.originX + row * (this.chessboardStyle.width / 16)
        };
    };
    /**
     * 在第i行第j列放置一个棋子 (无越界检查)
     * @param {number} row 第i行(1 ~ 15)
     * @param {number} col 第j列(1 ~ 15)
     */
    GobangView.prototype.putChessOn = function (row, col, chess) {
        if (chess == Chess.None)
            return;
        var coord = this.getChessPosition(row, col);
        var style = (chess == Chess.Black) ? GobangView.styleForBlackChess : GobangView.styleForWhiteChess;
        new Chessman({
            centerX: coord.x,
            centerY: coord.y,
            radius: style.radius,
            borderColor: style.borderColor,
            borderWidth: style.borderWidth,
            fillColor: style.fillColor
        }).drawOn(this.context);
    };
    GobangView.prototype.drawChessboard = function () {
        new Chessboard(this.chessboardStyle).drawOn(this.context);
    };
    return GobangView;
}(UIView));
GobangView.styleForBlackChess = {
    radius: 13,
    borderWidth: 1,
    borderColor: "grey",
    fillColor: "rgb(57,57,57)"
};
GobangView.styleForWhiteChess = {
    radius: 13,
    borderWidth: 1,
    borderColor: "grey",
    fillColor: "white"
};
//# sourceMappingURL=GobangView.js.map