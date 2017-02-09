/**
 * 字体形状
 */
class TextShape extends Shape {
    content: string
    maxWidth: number
    fill: boolean
    constructor(content: string, orginX: number, originY: number, maxWidth: number, fill = false) {
        super(orginX, originY)
        this.content = content
        this.maxWidth = maxWidth
        this.fill = fill
        this.strokeColor = "grey"
        this.fillColor = "grey"
    }

    drawOn(ctx: CanvasRenderingContext2D) {
        ctx.save()
        ctx.textAlign = "center"
        ctx.font = "25px sans-serif"
        if (this.fill) {
            ctx.fillStyle = this.fillColor
            ctx.fillText(this.content, this.originX, this.originY, this.maxWidth)
        }
        ctx.strokeStyle = this.strokeColor
        ctx.strokeText(this.content, this.originX, this.originY, this.maxWidth)
        ctx.restore()
    }
}