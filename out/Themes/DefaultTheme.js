var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DefaultTheme = (function (_super) {
    __extends(DefaultTheme, _super);
    function DefaultTheme() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.chessboardStyle = {
            originX: 0,
            originY: 0,
            lineWidth: 1,
            lineColor: "black",
            borderWidth: 0.5,
            borderColor: "black",
            backgroudColor: "white"
        };
        _this.blackChessStyle = {
            radius: 13,
            borderWidth: 1,
            borderColor: "rgb(210,210,210)",
            fillColor: "black"
        };
        _this.whiteChessStyle = {
            radius: 13,
            borderWidth: 1,
            borderColor: "black",
            fillColor: "white"
        };
        return _this;
    }
    return DefaultTheme;
}(Theme));
//# sourceMappingURL=DefaultTheme.js.map