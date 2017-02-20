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
        _this.theme = new DefaultTheme();
        _this.stepNumberFont = "15px menlo";
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
        if (chess == Chess.None)
            return;
        var coord = this.getChessPosition(row, col);
        var style = chess == Chess.Black ?
            this.theme.blackChessStyle :
            this.theme.whiteChessStyle;
        new ChessShape({
            radius: style.radius,
            borderColor: style.borderColor,
            borderWidth: style.borderWidth,
            fillColor: style.fillColor
        }, coord.x, coord.y).drawOn(this.context);
    };
    /**
     * 重绘棋盘, 并保持棋局不变
     */
    GomokuView.prototype.redrawChessboard = function (actions) {
        this.drawChessboard();
        for (var i = 0; i < actions.length; i++) {
            this.putChessOn(actions[i].row, actions[i].col, chessOfPlayer(actions[i].player));
        }
    };
    /**
     * 在棋盘上绘制棋局的步数，把代表了步数的数字画在棋子上
     * 数字的颜色取自当前主题
     */
    GomokuView.prototype.drawSteps = function (steps) {
        for (var i = 0; i < steps.length; i++) {
            var num = "" + (i + 1);
            var pos = this.getChessPosition(steps[i].row, steps[i].col);
            var player = steps[i].player;
            var yOffSet = this.horizontalLineGap / 5;
            var stepNum = new TextShape(num, pos.x, pos.y + yOffSet, true);
            stepNum.fillColor = (player == GomokuPlayer.White) ?
                this.theme.blackChessStyle.fillColor :
                this.theme.whiteChessStyle.fillColor;
            stepNum.strokeColor = stepNum.fillColor;
            stepNum.font = this.stepNumberFont;
            stepNum.drawOn(this.context);
        }
    };
    /**
     * 获取第i行第j列的棋子的坐标 (无越界检查)
     * @param {number} row 第i行(1 ~ 15)
     * @param {number} col 第j列(1 ~ 15)
     */
    GomokuView.prototype.getChessPosition = function (row, col) {
        return {
            x: this.theme.chessboardStyle.originY + col * (this.bound.height / 16),
            y: this.theme.chessboardStyle.originX + row * (this.bound.width / 16)
        };
    };
    /**
     * 绘制棋盘
     */
    GomokuView.prototype.drawChessboard = function () {
        this.context.clearRect(0, 0, this.bound.width, this.bound.height);
        new ChessboardShape(this.theme.chessboardStyle, this.bound.width, this.bound.height).drawOn(this.context);
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
}(AbstractCanvasView));
//# sourceMappingURL=GomokuView.js.map