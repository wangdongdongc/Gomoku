var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 长方形：
 *  一个长方形由起始坐标(originX, originY)和宽(width)高(height)所确定
 *
 * 样式：
 *  borderWidth、borderColor
 */
var Rectangle = (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle(originX, originY, width, height) {
        var _this = _super.call(this, originX, originY) || this;
        _this.fill = false;
        _this.width = width;
        _this.height = height;
        return _this;
    }
    Object.defineProperty(Rectangle.prototype, "borderColor", {
        get: function () {
            return this.strokeColor;
        },
        set: function (color) {
            this.strokeColor = color;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "borderWidth", {
        get: function () {
            return this.lineWidth;
        },
        set: function (width) {
            this.lineWidth = width;
        },
        enumerable: true,
        configurable: true
    });
    Rectangle.prototype.drawOn = function (ctx) {
        ctx.save();
        ctx.strokeStyle = this.strokeColor;
        ctx.lineWidth = this.lineWidth;
        if (this.fill) {
            ctx.fillStyle = this.fillColor;
            ctx.fillRect(this.originX, this.originY, this.width, this.height);
        }
        ctx.strokeRect(this.originX, this.originY, this.width, this.height);
        ctx.restore();
    };
    Object.defineProperty(Rectangle.prototype, "minX", {
        get: function () {
            return Math.min(this.originX, this.originX + this.width);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "minY", {
        get: function () {
            return Math.min(this.originY, this.originY + this.height);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "maxX", {
        get: function () {
            return Math.max(this.originX, this.originX + this.width);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "maxY", {
        get: function () {
            return Math.max(this.originY, this.originY + this.height);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "midX", {
        get: function () {
            return ((this.originX + this.width) / 2);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "midY", {
        get: function () {
            return ((this.originY + this.height) / 2);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "endX", {
        get: function () {
            return this.originX + this.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "endY", {
        get: function () {
            return this.originY + this.height;
        },
        enumerable: true,
        configurable: true
    });
    return Rectangle;
}(Shape));
//# sourceMappingURL=Rectangle.js.map