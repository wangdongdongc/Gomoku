var Shape = (function () {
    function Shape(originX, originY) {
        this.originX = originX;
        this.originY = originY;
        this.lineWidth = Shape.DefaultLineWidth;
        this.strokeColor = Shape.DefaultLineColor;
        this.fillColor = Shape.DefualtFillColor;
    }
    return Shape;
}());
Shape.DefaultLineWidth = 1;
Shape.DefaultLineColor = "black";
Shape.DefualtFillColor = "white";
//# sourceMappingURL=Shape.js.map