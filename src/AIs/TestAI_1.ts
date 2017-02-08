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
     * AI 先在中间落子
     */
    putFirstChessInMiddle() {
        this.chessboard[7][7] = 1
    }

    /**
     * 根据棋型给出分数
     * 
     * 一个棋型由其中连子的个数和前后是否堵截来确定
     */
    private scoreOfStyle(line: number, block1: boolean, block2: boolean) {
        if (line == 5) return Score.ooooo
        if (block1 && block2) return 0
        switch (line) {
            case 4: return (block1 || block2) ? Score.Ioooo : Score.oooo
            case 3: return (block1 || block2) ? Score.Iooo : Score.ooo
            case 2: return (block1 || block2) ? Score.Ioo : Score.oo
            case 1: return 0
        }
    }

    /**
     * 假设在(i, j)处落子, 计算落子后获得的分数 scores[i][j]
     */
    private computeScore(i: number, j: number) {
        let score = 0
        //上、下 (r先减后加, c不变)
        let r1 = i, c = j
        while (r1 > 0 && this.chessboard[r1 - 1][c] == 1) r1--
        let upIsBlocked = (r1 == 0) || this.chessboard[r1 - 1][c] == -1
        let r2 = i
        while (r2 < 14 && this.chessboard[r2 + 1][c] == 1) r2++
        let downIsBlocked = (r2 == 14) || this.chessboard[r2 + 1][c] == -1
        let line = (r1 == r2) ? 1 : (r2 - r1 + 1)
        // 判断棋型
        score += this.scoreOfStyle(line, upIsBlocked, downIsBlocked)
        
        //左、右 (r不变, c先减后加)
        let r = i, c1 = j
        while (c1 > 0 && this.chessboard[r][c1 - 1] == 1) c1--
        let leftIsBlocked = (c1 == 0) || this.chessboard[r][c1 - 1] == -1
        let c2 = j
        while (c2 < 14 && this.chessboard[r][c2 + 1] == 1) c2++
        let rightIsBlocked = (c2 == 14) || this.chessboard[r][c2 + 1] == -1
        line = (c1 == c2) ? 1 : (c2 - c1 + 1)
        // 判断棋型
        score += this.scoreOfStyle(line, leftIsBlocked, rightIsBlocked)
        
        //主对角线方向 (rc先减后加)
        r1 = i, c1 = j
        while (r1 > 0 && c1 > 0 && this.chessboard[r1 - 1][c1 - 1] == 1) {r1--; c1--}
        let leftUpIsBlocked = (r1 == 0 || c1 == 0) || this.chessboard[r1 - 1][c1 - 1] == -1
        r2 = i
        c2 = j
        while (r2 < 14 && c2 < 14 && this.chessboard[r2 + 1][c2 + 1] == 1) {r2++; c2++}
        let rightDownIsBlocked = (r2 == 14 || c2 == 14) || this.chessboard[r2 + 1][c2 + 1] == -1
        line = (r1 == r2) ? 1 : (r2 - r1 + 1)
        // 判断棋型
        score += this.scoreOfStyle(line, leftUpIsBlocked, rightDownIsBlocked)
        
        //副对角线方向 (r先加后减, c先减后加)
        r1 = i, c1 = j
        while (r1 < 14 && c1 > 0 && this.chessboard[r1 + 1][c1 - 1] == 1) {r1++; c1--}
        let leftDownIsBlocked = (r1 == 14 || c1 == 0) || this.chessboard[r1 + 1][c1 - 1] == -1
        r2 = i
        c2 = j
        while (r2 > 0 && c2 < 14 && this.chessboard[r2 - 1][c2 + 1] == 1) {r2--; c2++}
        let rightUpIsBlocked = (r2 == 0 || c2 == 14) || this.chessboard[r2 - 1][c2 + 1] == -1
        line = (c1 == c2) ? 1 : (c2 - c1 + 1)
        // 判断棋型
        score += this.scoreOfStyle(line, leftDownIsBlocked, rightUpIsBlocked)

        return score
    }

    analysAction(action: GomokuAction) {
        this.chessboard[action.row - 1][action.col - 1] = -1
        // 遍历每一个位置, 评估分数
        this.scores = makeMatrix(15, 15, -1)
        for (let i = 0; i < 15; i++)
            for (let j = 0; j < 15; j++)
                if (this.chessboard[i][j] == 0) {
                    // let s = this.computeScore(i, j)
                    // this.scores[i][j] = s > 0 ? s : 0
                    this.chessboard[i][j] = 1 //尝试落子
                    this.scores[i][j] = this.computeScore(i, j)
                    this.chessboard[i][j] = 0 //拿回棋子
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