/**
 * 包含 Canvas 元素的视图
 */
var UIView = (function () {
    function UIView(width, height) {
        this.canvas = document.getElementById("game");
        this.context = this.canvas.getContext("2d");
        this.canvas.width = width;
        this.canvas.height = height;
        this.setUpContext;
    }
    UIView.prototype.setUpContext = function () {
        //set up
    };
    Object.defineProperty(UIView.prototype, "midX", {
        get: function () {
            return this.canvas.width / 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIView.prototype, "midY", {
        get: function () {
            return this.canvas.height / 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIView.prototype, "bound", {
        get: function () {
            return {};
        },
        enumerable: true,
        configurable: true
    });
    return UIView;
}());
//# sourceMappingURL=UIView.js.map