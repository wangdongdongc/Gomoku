/**
 * 由两个半圆拼成的圆形
 */
class TwoHalfCircle extends Circle {
    leftHalfCircle: Circle
    rightHalfCircle: Circle

    constructor(centerX: number, centerY: number, radius: number, 
                leftColor: string, rightColor: string) {
        super(centerX, centerY, radius)
        this.leftHalfCircle = 
            new Circle(this.centerX, this.centerY, this.radius, {
                radian1: Math.PI / 4 * 3,
                radian2: Math.PI / 4 * 7
            })
        this.rightHalfCircle = 
            new Circle(this.centerX, this.centerY, this.radius, {
                radian1: Math.PI / 4 * 7,
                radian2: Math.PI / 4 * 3,
            })
        this.leftHalfCircle.lineWidth = 0.1
        this.leftHalfCircle.fill = true
        this.leftHalfCircle.fillColor = leftColor
        this.rightHalfCircle.lineWidth = 0.1
        this.rightHalfCircle.fill = true
        this.rightHalfCircle.fillColor = rightColor
    }

    drawOn(ctx: CanvasRenderingContext2D) {
        super.drawOn(ctx)
        this.leftHalfCircle.drawOn(ctx)
        this.rightHalfCircle.drawOn(ctx)
    }
}