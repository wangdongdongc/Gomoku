interface Viewbound {
    /**
     * 画布的宽度
     */
    width: number
    /**
     * 画布的高度
     */
    height: number
}

/**
 * 包含 Canvas 元素的视图
 */
abstract class UIView {
    private canvas = <HTMLCanvasElement>document.getElementById("game")
    protected context = <CanvasRenderingContext2D>this.canvas.getContext("2d")

    addEventListener(event: string, callback: (MouseEvent)=>void) {
        this.canvas.addEventListener(event, callback)
    }

    constructor(width: number, height: number) {
        this.canvas.width = width
        this.canvas.height = height
    }

    protected get midX(): number {
        return this.canvas.width / 2
    }
    protected get midY(): number {
        return this.canvas.height / 2
    }

    /**
     * 画布的边界对象
     */
    get bound(): Viewbound {
        return {
            width: this.canvas.width,
            height: this.canvas.height
        }
    }

}