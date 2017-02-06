/**
 * 玩家：黑、白
 */
enum Player {
    Black = 1,
    White = 2
}

/**
 * 改变当前玩家, 返回新玩家
 * @param {Player} player 当前玩家
 * @return {Player} 新玩家
 */
function changePlayer(player: Player): Player {
    if (player == Player.Black) {
        return Player.White
    } else {
        return Player.Black
    }
}