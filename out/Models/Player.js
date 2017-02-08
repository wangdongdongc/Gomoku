/**
 * 玩家：黑、白
 */
var GomokuPlayer;
(function (GomokuPlayer) {
    GomokuPlayer[GomokuPlayer["Black"] = 1] = "Black";
    GomokuPlayer[GomokuPlayer["White"] = 2] = "White";
})(GomokuPlayer || (GomokuPlayer = {}));
/**
 * 改变当前玩家, 返回新玩家
 * @param {Player} player 当前玩家
 * @return {Player} 新玩家
 */
function changePlayer(player) {
    if (player == GomokuPlayer.Black) {
        return GomokuPlayer.White;
    }
    else {
        return GomokuPlayer.Black;
    }
}
//# sourceMappingURL=Player.js.map