var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MenuView = (function (_super) {
    __extends(MenuView, _super);
    function MenuView(width, height, viewController) {
        var _this = _super.call(this, width, height, MenuView.MenuCanvasID) || this;
        _this._chessCount = 0;
        _this.viewController = viewController;
        _this.buttonBoderWidth = 0.5;
        _this.button1Alpha = MenuView.untouchedButtonAlpha;
        _this.button2Alpha = MenuView.untouchedButtonAlpha;
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
    Object.defineProperty(MenuView.prototype, "chessCount", {
        get: function () {
            return this._chessCount;
        },
        set: function (x) {
            this._chessCount = x;
            this.button3.number = this.chessCount;
            this.redrawButton3();
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
    /**
     * (游戏开始时)初始化并绘制所有按钮
     */
    MenuView.prototype.drawButtons = function () {
        this.context.clearRect(0, 0, this.bound.width, this.bound.height / 2);
        if (!this.buttonScale) {
            this.buttonScale = 0.45;
        }
        this.buttonGap = this.bound.width / 4;
        var centerX1 = this.buttonGap / 2;
        var centerY = this.bound.height / 4;
        var radius = Math.min(this.buttonGap / 2, this.bound.height / 4) * this.buttonScale;
        this.button1 = new TwoHalfCircle(centerX1, centerY, radius, "white", "black");
        this.button2 = new TwoHalfCircle(centerX1 + this.buttonGap, centerY, radius, "rgb(225,233,243)", "rgb(30,157,255)");
        this.button3 = new TextCircle(centerX1 + this.buttonGap * 2, centerY, radius, 3);
        this.button4 = new Circle(centerX1 + this.buttonGap * 3, centerY, radius);
        this.button4.fill = true;
        this.button4.fillColor = "grey";
        this.button1.borderWidth = this.buttonBoderWidth;
        this.button2.borderWidth = this.buttonBoderWidth;
        this.button3.borderWidth = this.buttonBoderWidth;
        this.button4.borderWidth = this.buttonBoderWidth;
        this.context.save();
        this.context.globalAlpha = MenuView.untouchedButtonAlpha;
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
    MenuView.prototype.redrawButton3 = function () {
        this.context.clearRect(this.buttonGap * 2, 0, this.buttonGap, this.bound.height / 2);
        this.context.save();
        this.context.globalAlpha = this.button3Alpha;
        this.button3.drawOn(this.context);
        this.context.restore();
    };
    MenuView.prototype.redrawButton4 = function () {
        this.context.clearRect(this.buttonGap * 3, 0, this.buttonGap, this.bound.height / 2);
        this.context.save();
        this.context.globalAlpha = this.button4Alpha;
        this.button4.drawOn(this.context);
        this.context.restore();
    };
    /**
     * 在状态栏绘制状态信息
     */
    MenuView.prototype.drawStatusBar = function () {
        this.context.clearRect(0, this.bound.height / 2, this.bound.width, this.bound.height / 2);
        new TextShape(this._statusMessage, this.bound.width / 2, this.bound.height / 3 * 2, true)
            .drawOn(this.context);
    };
    MenuView.prototype.registerEvents = function () {
        var _this = this;
        /**
         * 点击菜单栏的按钮：交由控制器处理
         */
        this.addEventListener("click", function (event) {
            if (Math.pow(event.offsetX - _this.button1.centerX, 2) + Math.pow(event.offsetY - _this.button1.centerY, 2) < Math.pow(_this.button1.radius, 2)) {
                _this.viewController.changeTheme(new DefaultTheme());
            }
            if (Math.pow(event.offsetX - _this.button2.centerX, 2) + Math.pow(event.offsetY - _this.button2.centerY, 2) < Math.pow(_this.button2.radius, 2)) {
                _this.viewController.changeTheme(new VividTheme());
            }
            if (Math.pow(event.offsetX - _this.button3.centerX, 2) + Math.pow(event.offsetY - _this.button3.centerY, 2) < Math.pow(_this.button3.radius, 2)) {
                if (_this.viewController.showChessStep) {
                    _this.viewController.showChessStep = false;
                }
                else {
                    _this.viewController.showChessStep = true;
                }
            }
            if (Math.pow(event.offsetX - _this.button4.centerX, 2) + Math.pow(event.offsetY - _this.button4.centerY, 2) < Math.pow(_this.button4.radius, 2)) {
                _this.viewController.toggleDialog();
            }
        });
        /**
         * 将鼠标移动到菜单栏按钮时改变透明度：由视图自行处理
         * Todo: 每次鼠标移动都重绘是不合理的，应该设置一个额外变量 isInButton，使其仅在进按钮和出按钮时重绘
         */
        this.addEventListener("mousemove", function (event) {
            if (Math.pow(event.offsetX - _this.button1.centerX, 2) + Math.pow(event.offsetY - _this.button1.centerY, 2) < Math.pow(_this.button1.radius, 2)) {
                _this.button1Alpha = MenuView.touchedButtonAlpha;
                _this.redrawButton1();
            }
            else {
                _this.button1Alpha = MenuView.untouchedButtonAlpha;
                _this.redrawButton1();
            }
            if (Math.pow(event.offsetX - _this.button2.centerX, 2) + Math.pow(event.offsetY - _this.button2.centerY, 2) < Math.pow(_this.button2.radius, 2)) {
                _this.button2Alpha = MenuView.touchedButtonAlpha;
                _this.redrawButton2();
            }
            else {
                _this.button2Alpha = MenuView.untouchedButtonAlpha;
                _this.redrawButton2();
            }
            if (Math.pow(event.offsetX - _this.button3.centerX, 2) + Math.pow(event.offsetY - _this.button3.centerY, 2) < Math.pow(_this.button3.radius, 2)) {
                _this.button3Alpha = MenuView.touchedButtonAlpha;
                _this.redrawButton3();
            }
            else {
                _this.button3Alpha = MenuView.untouchedButtonAlpha;
                _this.redrawButton3();
            }
            if (Math.pow(event.offsetX - _this.button4.centerX, 2) + Math.pow(event.offsetY - _this.button4.centerY, 2) < Math.pow(_this.button4.radius, 2)) {
                _this.button4Alpha = MenuView.touchedButtonAlpha;
                _this.redrawButton4();
            }
            else {
                _this.button4Alpha = MenuView.untouchedButtonAlpha;
                _this.redrawButton4();
            }
        });
    };
    return MenuView;
}(AbstractCanvasView));
MenuView.MenuCanvasID = "menu";
MenuView.untouchedButtonAlpha = 0.5;
MenuView.touchedButtonAlpha = 1;
//# sourceMappingURL=MenuView.js.map