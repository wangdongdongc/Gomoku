var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 棋子图形：
 *  一个圆
 */
var ChessmanShape = (function (_super) {
    __extends(ChessmanShape, _super);
    function ChessmanShape(style, centerX, centerY) {
        var _this = _super.call(this, centerX, centerY, style.radius) || this;
        _this.borderWidth = style.borderWidth;
        _this.borderColor = style.borderColor;
        _this.fill = true;
        _this.fillColor = style.fillColor;
        return _this;
    }
    ChessmanShape.prototype.drawOn = function (ctx) {
        _super.prototype.drawOn.call(this, ctx);
    };
    return ChessmanShape;
}(Circle));
//# sourceMappingURL=ChessmanShape.js.map