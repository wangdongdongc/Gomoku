class DefaultTheme extends Theme{

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
        borderWidth: 1,
        borderColor: "rgb(210,210,210)",
        fillColor: "black"
    }

    readonly whiteChessStyle: ChessmanStyle = {
        radius: 13,
        borderWidth: 1,
        borderColor: "black",
        fillColor: "white"
    }
}