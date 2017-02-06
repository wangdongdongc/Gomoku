/**
 * 五子棋游戏 (MVC) 的 View 层
 */
class GobangView extends CanvasView {
    private chessboardStyle: ChessboardStyle = {
        originX: 0,
        originY: 0,
        width: this.bound.width,
        height: this.bound.height,
        lineWidth: 1.5,
        lineColor: "black",
        borderWidth: 1,
        borderColor: "black",
        backgroudColor: "rgb(212,212,212)" 
    }
    
    private  styleForBlackChess = {
        radius: 13,
        borderWidth: 1,
        borderColor: "grey",
        fillColor: "rgb(57,57,57)"
    }
    private  styleForWhiteChess = {
        radius: 13,
        borderWidth: 1,
        borderColor: "grey",
        fillColor: "white"
    }

    get horizontalLineGap(): number {
        return this.bound.height / 16
    }
    get verticalLineGap(): number {
        return this.bound.width / 16
    }

    /**
     * 视图的控制器
     */
    viewController: GobangViewController

    constructor(width: number, height: number, viewController: GobangViewController) {
        super(width, height)
        this.viewController = viewController
        this.drawChessboard()
        this.registerEvents()
    }

    /**
     * 注册事件, 将事件交由Controller处理
     *  警告: 如果将控制器的方法作为闭包直接回调, this指针将无法指向正确的对象
     */
    registerEvents() {
        this.addEventListener("click", (event: MouseEvent) => {
            this.viewController.handleClickEvent(event.offsetX, event.offsetY)
        })
    }

    /**
     * 获取第i行第j列的棋子的坐标 (无越界检查)
     * @param {number} row 第i行(1 ~ 15)
     * @param {number} col 第j列(1 ~ 15)
     */
    private getChessPosition(row: number, col: number){
        return {
            x: this.chessboardStyle.originY + col * (this.chessboardStyle.height / 16),
            y: this.chessboardStyle.originX + row * (this.chessboardStyle.width / 16)
        }
    }

    /**
     * 在第i行第j列放置一个棋子 (无越界检查)
     * @param {number} row 第i行(1 ~ 15)
     * @param {number} col 第j列(1 ~ 15)
     */
    putChessOn(row: number, col: number, chess: Chessman) {
        if (chess == Chessman.None) return
        let coord = this.getChessPosition(row, col)
        let style = (chess == Chessman.Black) ? this.styleForBlackChess : this.styleForWhiteChess
        new ChessmanShape({
            centerX: coord.x,
            centerY: coord.y,
            radius: style.radius,
            borderColor: style.borderColor,
            borderWidth: style.borderWidth,
            fillColor: style.fillColor
        }).drawOn(this.context)
    }

    private drawChessboard() {
        new ChessboardShape(this.chessboardStyle).drawOn(this.context)
    }
}