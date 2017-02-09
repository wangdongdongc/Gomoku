class VividTheme extends Theme {
    readonly chessboardStyle: ChessboardStyle = {
        originX: 0,
        originY: 0,
        lineWidth: 1,
        lineColor: "black",
        borderWidth: 0.5,
        borderColor: "black",
        backgroudColor: "white"
    }

    readonly blackChessStyle: ChessmanStyle = {
        radius: 13,
        borderWidth: 0.5,
        borderColor: "grey",
        fillColor: "rgb(30,157,255)"
    }

    readonly whiteChessStyle: ChessmanStyle = {
        radius: 13,
        borderWidth: 0.5,
        borderColor: "grey",
        fillColor: "rgb(225,233,243)"
    }
}