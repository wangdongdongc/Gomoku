interface Arc {
    radian1: number
    radian2: number
}

/**
 * 圆：
 *  一个圆由中心点(centerX, centerY)和半径(radius)所确定
 * 
 * 样式：
 *  borderWidth、borderColor
 */
class Circle extends Shape {
    radius: number
    fill: boolean = false
    arc: Arc
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
    constructor(centerX: number, centerY: number, radius: number, arc?: Arc) {
        super(centerX, centerY)
        this.radius = radius
        if (arc) {
            this.arc = arc
        }
    }

    drawOn(ctx: CanvasRenderingContext2D) {
        ctx.save()
        ctx.beginPath()
        ctx.strokeStyle = this.strokeColor
        ctx.lineWidth = this.lineWidth
        if (this.arc) {
            ctx.arc(this.centerX, this.centerY, this.radius, this.arc.radian1, this.arc.radian2)
        } else {
            ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI)
        }
        if (this.fill) {
            ctx.fillStyle = this.fillColor
            ctx.fill()
        }
        ctx.stroke()
        ctx.restore()
    }
}