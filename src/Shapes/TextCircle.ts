/**
 * 中间有字的圆形
 * （仅容纳一个字符）
 */
class TextCircle extends Circle {
    yOffset: number

    text: TextShape

    set number(x: number) {
        this.text = new TextShape(`${x}`, this.centerX, this.centerY + this.yOffset, true)
        this.text.fillColor = "black"
        this.text.strokeColor = "black"
    }

    constructor(centerX: number, centerY: number, radius: number, x: number) {
        super(centerX, centerY, radius)
        this.yOffset = radius / 2.5
        this.number = x
    }

    drawOn(ctx: CanvasRenderingContext2D) {
        super.drawOn(ctx)
        this.text.drawOn(ctx)
    }
}