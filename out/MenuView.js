var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MenuView = (function (_super) {
    __extends(MenuView, _super);
    function MenuView(width, height, viewController) {
        var _this = _super.call(this, width, height, "menu") || this;
        _this.viewController = viewController;
        _this.buttonScale = 0.5;
        var buttonGap = _this.bound.width / 4;
        var centerX1 = buttonGap / 2;
        var centerY = _this.bound.height / 4;
        var radius = Math.min(buttonGap / 2, _this.bound.height / 4) * _this.buttonScale;
        _this.button1 = new Circle(centerX1, centerY, radius);
        _this.button2 = new Circle(centerX1 + buttonGap, centerY, radius);
        _this.button3 = new Circle(centerX1 + buttonGap * 2, centerY, radius);
        _this.button4 = new Circle(centerX1 + buttonGap * 3, centerY, radius);
        _this.button1.drawOn(_this.context);
        _this.button2.drawOn(_this.context);
        _this.button3.drawOn(_this.context);
        _this.button4.drawOn(_this.context);
        _this.drawStatusBar();
        return _this;
    }
    MenuView.prototype.drawStatusBar = function () {
    };
    return MenuView;
}(CanvasView));
//# sourceMappingURL=MenuView.js.map