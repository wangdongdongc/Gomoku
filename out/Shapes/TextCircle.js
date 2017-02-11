var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 中间有字的圆形
 * （仅容纳一个字符）
 */
var TextCircle = (function (_super) {
    __extends(TextCircle, _super);
    function TextCircle(centerX, centerY, radius, x) {
        var _this = _super.call(this, centerX, centerY, radius) || this;
        _this.yOffset = radius / 2.5;
        _this.number = x;
        return _this;
    }
    Object.defineProperty(TextCircle.prototype, "number", {
        set: function (x) {
            this.text = new TextShape("" + x, this.centerX, this.centerY + this.yOffset, true);
            this.text.fillColor = "black";
            this.text.strokeColor = "black";
        },
        enumerable: true,
        configurable: true
    });
    TextCircle.prototype.drawOn = function (ctx) {
        _super.prototype.drawOn.call(this, ctx);
        this.text.drawOn(ctx);
    };
    return TextCircle;
}(Circle));
//# sourceMappingURL=TextCircle.js.map