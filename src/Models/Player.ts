/**
 * 玩家：黑、白
 */
enum GomokuPlayer {
    Black = 1,
    White = 2
}

/**
 * 改变当前玩家, 返回新玩家
 * @param {Player} player 当前玩家
 * @return {Player} 新玩家
 */
function changePlayer(player: GomokuPlayer): GomokuPlayer {
    if (player == GomokuPlayer.Black) {
        return GomokuPlayer.White
    } else {
        return GomokuPlayer.Black
    }
}