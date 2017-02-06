interface ChessmanStyle {
    centerX: number
    centerY: number
    radius: number
    borderWidth: number
    borderColor: string
    fillColor: string
}


/**
 * 棋子图形：
 *  一个圆
 */
class ChessmanShape extends Circle {
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