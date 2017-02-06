var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CGPoint = (function () {
    function CGPoint(x, y) {
        this.x = x;
        this.y = y;
    }
    return CGPoint;
}());
var CGSize = (function () {
    function CGSize(width, height) {
        this.width = width;
        this.height = height;
    }
    return CGSize;
}());
var UIView = (function (_super) {
    __extends(UIView, _super);
    function UIView() {
        return _super.call(this, 500, 500) || this;
    }
    UIView.prototype.drawRect = function (leftUpperPoint, rectSize) {
        this.context.rect(leftUpperPoint.x, leftUpperPoint.y, rectSize.width, rectSize.height);
    };
    UIView.prototype.drawFillRect = function (leftUpperPoint, rectSize) {
        this.context.fillRect(leftUpperPoint.x, leftUpperPoint.y, rectSize.width, rectSize.height);
    };
    return UIView;
}(CGCanvasContext2D));
//# sourceMappingURL=View.js.map