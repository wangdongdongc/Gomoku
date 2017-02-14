/**
 * 棋盘上的棋子：黑子、白子、空
 */
var Chess;
(function (Chess) {
    Chess[Chess["None"] = 0] = "None";
    Chess[Chess["Black"] = 1] = "Black";
    Chess[Chess["White"] = 2] = "White"; //should equal Player.White
    //Todo: keep consistency between Player and Chessman
})(Chess || (Chess = {}));
/**
 * 返回玩家所持有的棋子
 * @param {Player} player 玩家
 * @return {Chess} 玩家的棋子
 */
function chessOfPlayer(player) {
    return Chess[GomokuPlayer[player]];
}
/**
 * 返回对手所持有的棋子
 * @param {Player} player 玩家
 * @return {Chess} 对手的棋子
 */
function chessOfRival(rival) {
    return Chess[GomokuPlayer[rival]];
}
//# sourceMappingURL=Chess.js.map