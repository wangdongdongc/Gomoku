var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 棋子：
 *  一个圆
 */
var Chessman = (function (_super) {
    __extends(Chessman, _super);
    function Chessman(style) {
        var _this = _super.call(this, style.centerX, style.centerY, style.radius) || this;
        _this.borderWidth = style.borderWidth;
        _this.borderColor = style.borderColor;
        _this.fill = true;
        _this.fillColor = style.fillColor;
        return _this;
    }
    Chessman.prototype.drawOn = function (ctx) {
        _super.prototype.drawOn.call(this, ctx);
    };
    return Chessman;
}(Circle));
//# sourceMappingURL=Chessman.js.map