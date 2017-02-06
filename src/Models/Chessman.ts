/**
 * 棋盘上的棋子：黑子、白子、空
 */
enum Chessman {
    None = 0,
    Black = 1, //= Player.Black
    White = 2  //= Player.White
}

/**
 * 返回玩家所持有的棋子
 * @param {Player} player 玩家
 * @return {Chess} 玩家的棋子
 */
function chessOfPlayer(player: Player): Chessman {
    return Chessman[Player[player]]
}
