/**
 * 集成 Canvas 元素的视图类
 */
var CanvasView = (function () {
    function CanvasView(width, height) {
        /**
         * canvas元素
         */
        this.canvas = document.getElementById("game");
        /**
         * canvas元素的绘制环境(2D)
         */
        this.context = this.canvas.getContext("2d");
        this.canvas.width = width;
        this.canvas.height = height;
    }
    CanvasView.prototype.addEventListener = function (event, callback) {
        this.canvas.addEventListener(event, callback);
    };
    Object.defineProperty(CanvasView.prototype, "midX", {
        get: function () {
            return this.canvas.width / 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasView.prototype, "midY", {
        get: function () {
            return this.canvas.height / 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasView.prototype, "bound", {
        /**
         * 画布的边界对象
         */
        get: function () {
            return {
                width: this.canvas.width,
                height: this.canvas.height
            };
        },
        enumerable: true,
        configurable: true
    });
    return CanvasView;
}());
//# sourceMappingURL=CanvasView.js.map