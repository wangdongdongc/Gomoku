/**
 * 五子棋游戏的 View 部分
 */
class GameView extends UIView {
    chessboardStyle: ChessboardStyle = {
        originX: 0,
        originY: 0,
        width: 480,
        height: 480,
        lineWidth: 1.5,
        lineColor: "black",
        borderWidth: 1,
        borderColor: "black",
        backgroudColor: "rgb(212,212,212)" 
    }

    chessmanStyle: ChessmanStyle = { //Todo: 指定黑子和白子
        centerX: 0,
        centerY: 0,
        radius: 10,
        borderWidth: 3,
        borderColor: "black",
        fillColor: "black"
    }

    constructor(width: number, height: number) {
        super(width, height)
        this.drawChessboard()
        this.putChessman(3, 6)
    }

    /**
     * 获取第i行第j列的棋子的坐标 (无越界检查)
     * @param {number} row 第i行(1 ~ 15)
     * @param {number} col 第j列(1 ~ 15)
     */
    private getChessmanPosition(row: number, col: number){
        return {
            x: this.chessboardStyle.originY + col * (this.chessboardStyle.height / 16),
            y: this.chessboardStyle.originX + row * (this.chessboardStyle.width / 16)
        }
    }

    /**
     * Todo: 黑子或白子应有不同的格式
     * 在第i行第j列放置一个棋子 (无越界检查)
     * @param {number} row 第i行(1 ~ 15)
     * @param {number} col 第j列(1 ~ 15)
     */
    private putChessman(row: number, col: number) {
        let coord = this.getChessmanPosition(row, col)
        new Chessman({
            centerX: coord.x,
            centerY: coord.y,
            radius: this.chessmanStyle.radius,
            borderColor: this.chessmanStyle.borderColor,
            borderWidth: this.chessmanStyle.borderWidth,
            fillColor: this.chessmanStyle.fillColor
        }).drawOn(this.context)
    }

    private drawChessboard() {
        new Chessboard(this.chessboardStyle).drawOn(this.context)
    }
}


let game = new GameView(480, 480)