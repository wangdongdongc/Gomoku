/**
 * 线：
 *  一条线由起始坐标(fromX, fromY)和目标坐标(toX, toY)所确定
 * 
 * 样式：
 *  lineWidth、lineColor
 */
class Line extends Shape {
    toX: number
    toY: number
    get fromX(): number {
        return this.originX
    }
    get fromY(): number {
        return this.originY
    }
    get lineColor(): string {
        return this.strokeColor
    }
    set lineColor(color: string) {
        this.strokeColor = color
    }

    constructor(fromX: number, fromY: number, toX: number, toY: number) {
        super(fromX, fromY)
        this.toX = toX
        this.toY = toY
    }

    drawOn(ctx: CanvasRenderingContext2D) {
        ctx.save()
        ctx.beginPath()
        ctx.moveTo(this.fromX, this.fromY)
        ctx.lineTo(this.toX, this.toY)
        ctx.strokeStyle = this.lineColor
        ctx.lineWidth = this.lineWidth
        ctx.stroke()
        ctx.restore()
    }
}