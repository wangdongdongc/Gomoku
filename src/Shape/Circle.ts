/**
 * 圆：
 *  一个圆由中心点(centerX, centerY)和半径(radius)所确定
 * 
 * 样式：
 *  borderWidth、borderColor
 */
class Circle extends Shape {
    radius: number
    get centerX(): number {
        return this.originX
    }
    get centerY(): number {
        return this.originY
    }
    get borderColor(): string {
        return this.strokeColor
    }
    set borderColor(color: string) {
        this.strokeColor = color
    }
    get borderWidth(): number {
        return this.lineWidth
    }
    set borderWidth(width: number) {
        this.lineWidth = width
    }
    constructor(centerX: number, centerY: number, radius: number) {
        super(centerX, centerY)
        this.radius = radius
    }

    drawOn(ctx: CanvasRenderingContext2D) {
        ctx.save()
        ctx.beginPath()
        ctx.strokeStyle = this.strokeColor
        ctx.lineWidth = this.lineWidth
        ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI)
        ctx.stroke()
        ctx.restore()
    }
}