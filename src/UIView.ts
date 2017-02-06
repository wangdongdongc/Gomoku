interface Viewbound {
    //Todo
}

/**
 * 包含 Canvas 元素的视图
 */
class UIView {
    private canvas = <HTMLCanvasElement>document.getElementById("game")
    protected context = <CanvasRenderingContext2D>this.canvas.getContext("2d")

    setUpContext() {
        //set up
    }
    constructor(width: number, height: number) {
        this.canvas.width = width
        this.canvas.height = height
        this.setUpContext
    }

    protected get midX(): number {
        return this.canvas.width / 2
    }
    protected get midY(): number {
        return this.canvas.height / 2
    }

    get bound(): Viewbound {
        return {
            //Todo
        }
    }

}