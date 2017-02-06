interface ChessmanStyle {
    centerX: number
    centerY: number
    radius: number
    borderWidth: number
    borderColor: string
    fillColor: string
}

/**
 * 棋子：
 *  一个圆
 */
class Chessman extends Circle {
    constructor(style: ChessmanStyle) {
        super(style.centerX, style.centerY, style.radius)
        this.borderWidth = style.borderWidth
        this.borderColor = style.borderColor
        this.fill = true
        this.fillColor = style.fillColor
    }

    drawOn(ctx: CanvasRenderingContext2D) {
        super.drawOn(ctx)
    }
}