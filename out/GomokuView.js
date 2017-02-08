var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 五子棋游戏 (MVC) 的 View 层
 */
var GomokuView = (function (_super) {
    __extends(GomokuView, _super);
    function GomokuView(width, height, viewController) {
        var _this = _super.call(this, width, height, "game") || this;
        _this.chessboardStyle = {
            originX: 0,
            originY: 0,
            width: _this.bound.width,
            height: _this.bound.height,
            lineWidth: 1,
            lineColor: "black",
            borderWidth: 0.5,
            borderColor: "black",
            backgroudColor: "white"
        };
        _this.styleForBlackChess = {
            radius: 13,
            borderWidth: 1,
            borderColor: "rgb(210,210,210)",
            fillColor: "black"
        };
        _this.styleForWhiteChess = {
            radius: 13,
            borderWidth: 1,
            borderColor: "black",
            fillColor: "white"
        };
        _this.viewController = viewController;
        _this.drawChessboard();
        _this.registerEvents();
        return _this;
    }
    Object.defineProperty(GomokuView.prototype, "horizontalLineGap", {
        get: function () {
            return this.bound.height / 16;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GomokuView.prototype, "verticalLineGap", {
        get: function () {
            return this.bound.width / 16;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 在第i行第j列放置一个棋子 (无越界检查)
     * @param {number} row 第i行(1 ~ 15)
     * @param {number} col 第j列(1 ~ 15)
     */
    GomokuView.prototype.putChessOn = function (row, col, chess) {
        if (chess == Chessman.None)
            return;
        var coord = this.getChessPosition(row, col);
        var style = chess == Chessman.Black ?
            this.styleForBlackChess :
            this.styleForWhiteChess;
        new ChessmanShape({
            centerX: coord.x,
            centerY: coord.y,
            radius: style.radius,
            borderColor: style.borderColor,
            borderWidth: style.borderWidth,
            fillColor: style.fillColor
        }).drawOn(this.context);
    };
    /**
     * 获取第i行第j列的棋子的坐标 (无越界检查)
     * @param {number} row 第i行(1 ~ 15)
     * @param {number} col 第j列(1 ~ 15)
     */
    GomokuView.prototype.getChessPosition = function (row, col) {
        return {
            x: this.chessboardStyle.originY + col * (this.chessboardStyle.height / 16),
            y: this.chessboardStyle.originX + row * (this.chessboardStyle.width / 16)
        };
    };
    /**
     * 绘制棋盘
     */
    GomokuView.prototype.drawChessboard = function () {
        new ChessboardShape(this.chessboardStyle).drawOn(this.context);
    };
    /**
     * 注册Canvas事件, 设置事件处理函数 (将事件交由Controller处理)
     *
     *  警告: 不能直接将控制器的方法作为闭包传入回调
     *        这将导致控制器方法中的this指针指向canvas对象而不是控制器对象
     */
    GomokuView.prototype.registerEvents = function () {
        var _this = this;
        this.addEventListener("click", function (event) {
            _this.viewController.handleClickEvent(event.offsetX, event.offsetY);
        });
    };
    return GomokuView;
}(CanvasView));
//# sourceMappingURL=GomokuView.js.map