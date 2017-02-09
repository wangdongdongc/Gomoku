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
        _this.buttonBoderWidth = 0.5;
        _this.button1Alpha = 0.5;
        _this.button2Alpha = 0.5;
        _this.drawButtons();
        _this._statusMessage = "";
        _this.drawStatusBar();
        _this.registerEvents();
        return _this;
    }
    Object.defineProperty(MenuView.prototype, "statusMessage", {
        get: function () {
            return this._statusMessage;
        },
        set: function (s) {
            this._statusMessage = s;
            this.drawStatusBar();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 根据当前设定, 重绘 Menu 视图
     */
    MenuView.prototype.redrawAll = function () {
        this.drawButtons();
        this.drawStatusBar();
    };
    MenuView.prototype.drawButtons = function () {
        this.context.clearRect(0, 0, this.bound.width, this.bound.height / 2);
        if (!this.buttonScale) {
            this.buttonScale = 0.45;
        }
        this.buttonGap = this.bound.width / 4;
        var centerX1 = this.buttonGap / 2;
        var centerY = this.bound.height / 4;
        var radius = Math.min(this.buttonGap / 2, this.bound.height / 4) * this.buttonScale;
        this.button1 = new TwoHalfButton(centerX1, centerY, radius, "white", "black");
        this.button2 = new TwoHalfButton(centerX1 + this.buttonGap, centerY, radius, "rgb(225,233,243)", "rgb(30,157,255)");
        this.button3 = new Circle(centerX1 + this.buttonGap * 2, centerY, radius);
        this.button4 = new Circle(centerX1 + this.buttonGap * 3, centerY, radius);
        this.button1.borderWidth = this.buttonBoderWidth;
        this.button2.borderWidth = this.buttonBoderWidth;
        this.button3.borderWidth = this.buttonBoderWidth;
        this.button4.borderWidth = this.buttonBoderWidth;
        this.context.save();
        this.context.globalAlpha = 0.5;
        this.button1.drawOn(this.context);
        this.button2.drawOn(this.context);
        this.button3.drawOn(this.context);
        this.button4.drawOn(this.context);
        this.context.restore();
    };
    MenuView.prototype.redrawButton1 = function () {
        this.context.clearRect(0, 0, this.buttonGap, this.bound.height / 2);
        this.context.save();
        this.context.globalAlpha = this.button1Alpha;
        this.button1.drawOn(this.context);
        this.context.restore();
    };
    MenuView.prototype.redrawButton2 = function () {
        this.context.clearRect(this.buttonGap, 0, this.buttonGap, this.bound.height / 2);
        this.context.save();
        this.context.globalAlpha = this.button2Alpha;
        this.button2.drawOn(this.context);
        this.context.restore();
    };
    /**
     * 在状态栏绘制状态信息
     */
    MenuView.prototype.drawStatusBar = function () {
        this.context.clearRect(0, this.bound.height / 2, this.bound.width, this.bound.height / 2);
        new TextShape(this._statusMessage, this.bound.width / 2, this.bound.height / 3 * 2, 300, true)
            .drawOn(this.context);
    };
    MenuView.prototype.registerEvents = function () {
        var _this = this;
        this.addEventListener("click", function (event) {
            if (Math.pow(event.offsetX - _this.button1.centerX, 2) + Math.pow(event.offsetY - _this.button1.centerY, 2) < Math.pow(_this.button1.radius, 2)) {
                _this.viewController.changeTheme(new DefaultTheme());
            }
            if (Math.pow(event.offsetX - _this.button2.centerX, 2) + Math.pow(event.offsetY - _this.button2.centerY, 2) < Math.pow(_this.button2.radius, 2)) {
                _this.viewController.changeTheme(new VividTheme());
            }
        });
        this.addEventListener("mousemove", function (event) {
            if (Math.pow(event.offsetX - _this.button1.centerX, 2) + Math.pow(event.offsetY - _this.button1.centerY, 2) < Math.pow(_this.button1.radius, 2)) {
                _this.button1Alpha = 1;
                _this.redrawButton1();
            }
            else {
                _this.button1Alpha = 0.5;
                _this.redrawButton1();
            }
            if (Math.pow(event.offsetX - _this.button2.centerX, 2) + Math.pow(event.offsetY - _this.button2.centerY, 2) < Math.pow(_this.button2.radius, 2)) {
                _this.button2Alpha = 1;
                _this.redrawButton2();
            }
            else {
                _this.button2Alpha = 0.5;
                _this.redrawButton2();
            }
        });
    };
    return MenuView;
}(CanvasView));
//# sourceMappingURL=MenuView.js.map