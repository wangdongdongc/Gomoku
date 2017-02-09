var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var VividTheme = (function (_super) {
    __extends(VividTheme, _super);
    function VividTheme() {
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
            borderWidth: 0.5,
            borderColor: "grey",
            fillColor: "rgb(30,157,255)"
        };
        _this.whiteChessStyle = {
            radius: 13,
            borderWidth: 0.5,
            borderColor: "grey",
            fillColor: "rgb(225,233,243)"
        };
        return _this;
    }
    return VividTheme;
}(Theme));
//# sourceMappingURL=VividTheme.js.map