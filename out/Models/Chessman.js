/**
 * 棋盘上的棋子：黑子、白子、空
 */
var Chessman;
(function (Chessman) {
    Chessman[Chessman["None"] = 0] = "None";
    Chessman[Chessman["Black"] = 1] = "Black";
    Chessman[Chessman["White"] = 2] = "White"; //= Player.White
})(Chessman || (Chessman = {}));
/**
 * 返回玩家所持有的棋子
 * @param {Player} player 玩家
 * @return {Chess} 玩家的棋子
 */
function chessOfPlayer(player) {
    return Chessman[Player[player]];
}
//# sourceMappingURL=Chessman.js.map