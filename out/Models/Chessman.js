/**
 * 棋盘上的棋子：黑子、白子、空
 */
var Chessman;
(function (Chessman) {
    Chessman[Chessman["None"] = 0] = "None";
    Chessman[Chessman["Black"] = 1] = "Black";
    Chessman[Chessman["White"] = 2] = "White"; //should equal Player.White
    //Todo: keep consistency between Player and Chessman
})(Chessman || (Chessman = {}));
/**
 * 返回玩家所持有的棋子
 * @param {Player} player 玩家
 * @return {Chess} 玩家的棋子
 */
function chessOfPlayer(player) {
    return Chessman[GomokuPlayer[player]];
}
/**
 * 返回对手所持有的棋子
 * @param {Player} player 玩家
 * @return {Chess} 对手的棋子
 */
function chessOfRival(rival) {
    return Chessman[GomokuPlayer[rival]];
}
//# sourceMappingURL=Chessman.js.map