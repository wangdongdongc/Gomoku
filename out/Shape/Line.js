var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 线：
 *  一条线由起始坐标(fromX, fromY)和目标坐标(toX, toY)所确定
 *
 * 样式：
 *  lineWidth、lineColor
 */
var Line = (function (_super) {
    __extends(Line, _super);
    function Line(fromX, fromY, toX, toY) {
        var _this = _super.call(this, fromX, fromY) || this;
        _this.toX = toX;
        _this.toY = toY;
        return _this;
    }
    Object.defineProperty(Line.prototype, "fromX", {
        get: function () {
            return this.originX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Line.prototype, "fromY", {
        get: function () {
            return this.originY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Line.prototype, "lineColor", {
        get: function () {
            return this.strokeColor;
        },
        set: function (color) {
            this.strokeColor = color;
        },
        enumerable: true,
        configurable: true
    });
    Line.prototype.drawOn = function (ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(this.fromX, this.fromY);
        ctx.lineTo(this.toX, this.toY);
        ctx.strokeStyle = this.lineColor;
        ctx.lineWidth = this.lineWidth;
        ctx.stroke();
        ctx.restore();
    };
    return Line;
}(Shape));
//# sourceMappingURL=Line.js.map