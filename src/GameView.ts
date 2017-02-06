class GameView extends UIView {   
    constructor(width: number, height: number) {
        super(width, height)
        this.drawChessboard()
    }

    drawChessboard() {
        new Chessboard({
            originX: 0,
            originY: 0,
            width: 480,
            height: 480,
            lineWidth: 1.5,
            lineColor: "black",
            borderWidth: 1,
            borderColor: "black",
            backgroudColor: "rgb(212,212,212)" 
        }).drawOn(this.context)
    }
}


let game = new GameView(480, 480)