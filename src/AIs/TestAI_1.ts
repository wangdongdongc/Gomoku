/**
 * 测试AI_1：采用简单估分的方式进行决策
 */
class TestAI_1 extends GomokuAI {
    next: GomokuAction

    /**
     * AI 自行维护一个棋盘
     *   1: 己方棋子
     *   0: 无棋子
     *  -1: 敌方棋子
     */
    private chessboard: number[][]

    private scores: number[][]

    constructor() {
        super()
        this.chessboard = makeMatrix(15, 15, 0)
    }

    /**
     * 假设在(i, j)处落子, 计算落子后棋局的分数 scores[i][j]
     */
    private computeScore(i: number, j: number) {
        let score = 0
        //上、下 (r不变, c加减)
        let r = i
        let c = j - 1
        while (1) {
            if (c == -1) {score--; break}
            if (this.chessboard[r][c] == 1) {score++}
            else if (this.chessboard[r][c] == 0) {break}
            else {score--; break}
            c--
        }
        c = j + 1
        while (1) {
            if (c == 15) {score--; break}
            if (this.chessboard[r][c] == 1) {score++}
            else if (this.chessboard[r][c] == 0) {break}
            else {score--; break}
            c++
        }
        //左、右 (r加减, c不变)
        r = i - 1
        c = j
        while (1) {
            if (r == -1) {score--; break}
            if (this.chessboard[r][c] == 1) {score++}
            else if (this.chessboard[r][c] == 0) {break}
            else {score--; break}
            r--
        }
        r = i + 1
        while (1) {
            if (r == 15) {score--; break}
            if (this.chessboard[r][c] == 1) {score++}
            else if (this.chessboard[r][c] == 0) {break}
            else {score--; break}
            r++
        }
        //主对角线方向 (rc同加减)
        r = i - 1
        c = j - 1
        while (1) {
            if (r == -1 || c == -1) {score--; break}
            if (this.chessboard[r][c] == 1) {score++}
            else if (this.chessboard[r][c] == 0) {break}
            else {score--; break}
            r--
            c--
        }
        r = i + 1
        c = j + 1
        while (1) {
            if (r == 15 || c == 15) {score--; break}
            if (this.chessboard[r][c] == 1) {score++}
            else if (this.chessboard[r][c] == 0) {break}
            else {score--; break}
            r++
            c++
        }
        //副对角线方向 (r加c减或r减c加)
        r = i - 1
        c = j + 1
        while (1) {
            if (r == -1 || c == 15) {score--; break}
            if (this.chessboard[r][c] == 1) {score++}
            else if (this.chessboard[r][c] == 0) {break}
            else {score--; break}
            r--
            c++
        }
        r = i + 1
        c = j - 1
        while (1) {
            if (r == 15 || c == -1) {score--; break}
            if (this.chessboard[r][c] == 1) {score++}
            else if (this.chessboard[r][c] == 0) {break}
            else {score--; break}
            r++
            c--
        }
        return score
    }

    analysAction(action: GomokuAction) {
        this.chessboard[action.row - 1][action.col - 1] = -1
        // 遍历每一个位置, 评估分数
        this.scores = makeMatrix(15, 15, -1)
        for (let i = 0; i < 15; i++)
            for (let j = 0; j < 15; j++)
                if (this.chessboard[i][j] == 0) {
                    let s = this.computeScore(i, j)
                    this.scores[i][j] = s > 0 ? s : 0
                }
        console.log("scores:");
        for (let i = 0; i < 15; i++) {
            console.log(this.scores[i])
        }
        // 将分数最高的位置作为下一个动作
        let I = 0, J = 0
         for (let i = 0; i < 15; i++)
            for (let j = 0; j < 15; j++)
                if (this.scores[i][j] > this.scores[I][J]) {
                    I = i
                    J = j
                }
        //
        this.chessboard[I][J] = 1
        //
        this.next = {
            row: I + 1,
            col: J + 1,
            player: this.player
        }
    }
    
    nextAction() {
        return this.next
    }
}