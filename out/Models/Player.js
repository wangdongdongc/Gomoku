/**
 * 玩家：黑、白
 */
var Player;
(function (Player) {
    Player[Player["Black"] = 1] = "Black";
    Player[Player["White"] = 2] = "White";
})(Player || (Player = {}));
/**
 * 改变当前玩家, 返回新玩家
 * @param {Player} player 当前玩家
 * @return {Player} 新玩家
 */
function changePlayer(player) {
    if (player == Player.Black) {
        return Player.White;
    }
    else {
        return Player.Black;
    }
}
//# sourceMappingURL=Player.js.map