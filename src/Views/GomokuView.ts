/**
 * 五子棋游戏 (MVC) 的 View 层
 */
class GomokuView extends CanvasView {
    theme: Theme = new DefaultTheme()

    get horizontalLineGap(): number {
        return this.bound.height / 16
    }
    get verticalLineGap(): number {
        return this.bound.width / 16
    }

    /**
     * 视图持有对其控制器的引用
     */
    viewController: GomokuViewController

    constructor(width: number, height: number, viewController: GomokuViewController) {
        super(width, height, "game")
        this.viewController = viewController
        this.drawChessboard()
        this.registerEvents()
    }

    /**
     * 在第i行第j列放置一个棋子 (无越界检查)
     * @param {number} row 第i行(1 ~ 15)
     * @param {number} col 第j列(1 ~ 15)
     */
    public putChessOn(row: number, col: number, chess: Chessman) {
        if (chess == Chessman.None) return
        let coord = this.getChessPosition(row, col)
        let style = chess == Chessman.Black ? 
                    this.theme.blackChessStyle : 
                    this.theme.whiteChessStyle
        new ChessmanShape({
            radius: style.radius,
            borderColor: style.borderColor,
            borderWidth: style.borderWidth,
            fillColor: style.fillColor
        }, coord.x, coord.y).drawOn(this.context)
    }

    /**
     * 重绘棋盘, 并保持棋局不变
     */
    public redrawChessboard(actions: GomokuAction[]) {
        this.drawChessboard()
        for (let i = 0; i < actions.length; i++) {
            this.putChessOn(actions[i].row, actions[i].col, chessOfPlayer(actions[i].player))
        }
    }

    /**
     * 获取第i行第j列的棋子的坐标 (无越界检查)
     * @param {number} row 第i行(1 ~ 15)
     * @param {number} col 第j列(1 ~ 15)
     */
    private getChessPosition(row: number, col: number){
        return {
            x: this.theme.chessboardStyle.originY + col * (this.bound.height / 16),
            y: this.theme.chessboardStyle.originX + row * (this.bound.width / 16)
        }
    }

    /**
     * 绘制棋盘
     */
    private drawChessboard() {
        this.context.clearRect(0, 0, this.bound.width, this.bound.height)
        new ChessboardShape(this.theme.chessboardStyle, this.bound.width, this.bound.height).drawOn(this.context)
    }

    /**
     * 注册Canvas事件, 设置事件处理函数 (将事件交由Controller处理)
     * 
     *  警告: 不能直接将控制器的方法作为闭包传入回调
     *        这将导致控制器方法中的this指针指向canvas对象而不是控制器对象
     */
    private registerEvents() {
        this.addEventListener("click", (event: MouseEvent) => {
            this.viewController.handleClickEvent(event.offsetX, event.offsetY)
        })
    }
}