var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 圆：
 *  一个圆由中心点(centerX, centerY)和半径(radius)所确定
 *
 * 样式：
 *  borderWidth、borderColor
 */
var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle(centerX, centerY, radius, arc) {
        var _this = _super.call(this, centerX, centerY) || this;
        _this.fill = false;
        _this.radius = radius;
        if (arc) {
            _this.arc = arc;
        }
        return _this;
    }
    Object.defineProperty(Circle.prototype, "centerX", {
        get: function () {
            return this.originX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Circle.prototype, "centerY", {
        get: function () {
            return this.originY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Circle.prototype, "borderColor", {
        get: function () {
            return this.strokeColor;
        },
        set: function (color) {
            this.strokeColor = color;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Circle.prototype, "borderWidth", {
        get: function () {
            return this.lineWidth;
        },
        set: function (width) {
            this.lineWidth = width;
        },
        enumerable: true,
        configurable: true
    });
    Circle.prototype.drawOn = function (ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = this.strokeColor;
        ctx.lineWidth = this.lineWidth;
        if (this.arc) {
            ctx.arc(this.centerX, this.centerY, this.radius, this.arc.radian1, this.arc.radian2);
        }
        else {
            ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI);
        }
        if (this.fill) {
            ctx.fillStyle = this.fillColor;
            ctx.fill();
        }
        ctx.stroke();
        ctx.restore();
    };
    return Circle;
}(Shape));
//# sourceMappingURL=Circle.js.map