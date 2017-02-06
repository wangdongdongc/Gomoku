/**
 * 五子棋游戏的视图
 */
class GobangView extends UIView {
    chessboardStyle: ChessboardStyle = {
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
    
    static styleForBlackChess = {
        radius: 13,
        borderWidth: 1,
        borderColor: "grey",
        fillColor: "rgb(57,57,57)"
    }
    static styleForWhiteChess = {
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
     * 注册事件, 并将事件交由Controller处理
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
    putChessOn(row: number, col: number, chess: Chess) {
        if (chess == Chess.None) return
        let coord = this.getChessPosition(row, col)
        let style = (chess == Chess.Black) ? GobangView.styleForBlackChess : GobangView.styleForWhiteChess
        new Chessman({
            centerX: coord.x,
            centerY: coord.y,
            radius: style.radius,
            borderColor: style.borderColor,
            borderWidth: style.borderWidth,
            fillColor: style.fillColor
        }).drawOn(this.context)
    }

    private drawChessboard() {
        new Chessboard(this.chessboardStyle).drawOn(this.context)
    }
}