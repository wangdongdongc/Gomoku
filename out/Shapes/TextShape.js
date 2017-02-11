var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 字体形状
 */
var TextShape = (function (_super) {
    __extends(TextShape, _super);
    function TextShape(content, orginX, originY, fill) {
        if (fill === void 0) { fill = false; }
        var _this = _super.call(this, orginX, originY) || this;
        _this.font = "25px sans-serif";
        _this.maxWidth = 300;
        _this.content = content;
        _this.fill = fill;
        _this.strokeColor = "grey";
        _this.fillColor = "grey";
        return _this;
    }
    TextShape.prototype.drawOn = function (ctx) {
        ctx.save();
        ctx.textAlign = "center";
        ctx.font = this.font;
        if (this.fill) {
            ctx.fillStyle = this.fillColor;
            ctx.fillText(this.content, this.originX, this.originY, this.maxWidth);
        }
        ctx.strokeStyle = this.strokeColor;
        ctx.strokeText(this.content, this.originX, this.originY, this.maxWidth);
        ctx.restore();
    };
    return TextShape;
}(Shape));
//# sourceMappingURL=TextShape.js.map