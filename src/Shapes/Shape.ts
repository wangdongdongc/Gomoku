/**
 * 所有用于在 Canvas 绘制的图形继承自该类
 */
abstract class Shape {
    static DefaultLineWidth = 1
    static DefaultLineColor = "black"
    static DefualtFillColor = "white"

    originX: number
    originY: number

    lineWidth: number
    strokeColor: string 
    fillColor: string

    constructor(originX: number, originY: number) {
        this.originX = originX
        this.originY = originY
        this.lineWidth = Shape.DefaultLineWidth
        this.strokeColor = Shape.DefaultLineColor
        this.fillColor = Shape.DefualtFillColor
    }

    /**
     * 绘制：所有 Shape 对象都能够在一个指定的 Context 中进行绘制
     */
    abstract drawOn(ctx: CanvasRenderingContext2D): void
}