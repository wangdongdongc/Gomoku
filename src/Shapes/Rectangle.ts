/**
 * 长方形：
 *  一个长方形由起始坐标(originX, originY)和宽(width)高(height)所确定
 * 
 * 样式：
 *  borderWidth、borderColor
 */
class Rectangle extends Shape {
    width: number
    height: number
    fill: boolean = false 
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
    constructor(originX: number, originY: number, width: number, height: number) {
        super(originX, originY)
        this.width = width
        this.height = height
    }

    drawOn(ctx: CanvasRenderingContext2D) {
        ctx.save()
        ctx.strokeStyle = this.strokeColor
        ctx.lineWidth = this.lineWidth
        if (this.fill) {
            ctx.fillStyle = this.fillColor
            ctx.fillRect(this.originX, this.originY, this.width, this.height)
        }
        ctx.strokeRect(this.originX, this.originY, this.width, this.height)
        ctx.restore()
    }

    get minX(): number {
        return Math.min(this.originX, this.originX + this.width)
    }
    get minY(): number {
        return Math.min(this.originY, this.originY + this.height)
    }
    get maxX(): number {
        return Math.max(this.originX, this.originX + this.width)
    }
    get maxY(): number {
        return Math.max(this.originY, this.originY + this.height)
    }
    get midX(): number {
        return ((this.originX + this.width) / 2)
    }
    get midY(): number {
        return ((this.originY + this.height) / 2)
    }
    get endX(): number {
        return this.originX + this.width
    }
    get endY(): number {
        return this.originY + this.height
    }
}