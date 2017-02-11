var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 由两个半圆拼成的圆形
 */
var TwoHalfCircle = (function (_super) {
    __extends(TwoHalfCircle, _super);
    function TwoHalfCircle(centerX, centerY, radius, leftColor, rightColor) {
        var _this = _super.call(this, centerX, centerY, radius) || this;
        _this.leftHalfCircle =
            new Circle(_this.centerX, _this.centerY, _this.radius, {
                radian1: Math.PI / 4 * 3,
                radian2: Math.PI / 4 * 7
            });
        _this.rightHalfCircle =
            new Circle(_this.centerX, _this.centerY, _this.radius, {
                radian1: Math.PI / 4 * 7,
                radian2: Math.PI / 4 * 3,
            });
        _this.leftHalfCircle.lineWidth = 0.1;
        _this.leftHalfCircle.fill = true;
        _this.leftHalfCircle.fillColor = leftColor;
        _this.rightHalfCircle.lineWidth = 0.1;
        _this.rightHalfCircle.fill = true;
        _this.rightHalfCircle.fillColor = rightColor;
        return _this;
    }
    TwoHalfCircle.prototype.drawOn = function (ctx) {
        _super.prototype.drawOn.call(this, ctx);
        this.leftHalfCircle.drawOn(ctx);
        this.rightHalfCircle.drawOn(ctx);
    };
    return TwoHalfCircle;
}(Circle));
//# sourceMappingURL=TwoHalfCircle.js.map