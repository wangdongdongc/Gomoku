/**
 * 字体形状
 */
class TextShape extends Shape {
    content: string
    fill: boolean
    font: string = "25px sans-serif"
    maxWidth: number = 300
    constructor(content: string, orginX: number, originY: number, fill = false) {
        super(orginX, originY)
        this.content = content
        this.fill = fill
        this.strokeColor = "grey"
        this.fillColor = "grey"
    }

    drawOn(ctx: CanvasRenderingContext2D) {
        ctx.save()
        ctx.textAlign = "center"
        ctx.font = this.font
        if (this.fill) {
            ctx.fillStyle = this.fillColor
            ctx.fillText(this.content, this.originX, this.originY, this.maxWidth)
        }
        ctx.strokeStyle = this.strokeColor
        ctx.strokeText(this.content, this.originX, this.originY, this.maxWidth)
        ctx.restore()
    }
}