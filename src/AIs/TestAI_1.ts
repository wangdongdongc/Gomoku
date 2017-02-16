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

    analysAction(action: GomokuAction) {
        this.chessboard[action.row - 1][action.col - 1] = -1

        //先防
        //计算敌方下一步最高收益的落子
        let rivalScores = makeMatrix(15, 15, -1)
        for (let i = 0; i < 15; i++)
            for (let j = 0; j < 15; j++)
                if (this.chessboard[i][j] == 0) {
                    this.chessboard[i][j] = -1 //尝试落子
                    rivalScores[i][j] = this.computeScore(i, j, -1) //计算敌方收益
                    this.chessboard[i][j] = 0 //收回尝试
                }
        let rI = 0, rJ = 0
        for (let i = 0; i < 15; i++)
            for (let j = 0; j < 15; j++)
                if (rivalScores[i][j] > rivalScores[rI][rJ]) {
                    rI = i
                    rJ = j
                }

        // 后攻
        // 遍历每一个位置, 评估分数
        this.scores = makeMatrix(15, 15, -1)
        for (let i = 0; i < 15; i++)
            for (let j = 0; j < 15; j++)
                if (this.chessboard[i][j] == 0) {
                    this.chessboard[i][j] = 1 //尝试落子
                    this.scores[i][j] = this.computeScore(i, j, 1) //计算己方收益
                    this.chessboard[i][j] = 0 //收回尝试
                }
        // 选出进攻分数最高的位置
        let I = 0, J = 0
        for (let i = 0; i < 15; i++)
            for (let j = 0; j < 15; j++)
                if (this.scores[i][j] > this.scores[I][J]) {
                    I = i
                    J = j
                }

        if (this.scores[I][J] == 100) {
            this.chessboard[I][J] = 1
            //直接获胜
            this.next = {
                row: I + 1,
                col: J + 1,
                player: this.player
            }
            console.log(`Attack: (${this.next.row}, ${this.next.col}) s:${this.scores[I][J]}`);   
        } else if (rivalScores[rI][rJ] >= 20) {
            //若出现危险棋局, 选择防守策略
            this.chessboard[rI][rJ] = 1
            this.next = {
                row: rI + 1,
                col: rJ + 1,
                player: this.player
            }
            console.log(`Defend: (${this.next.row}, ${this.next.col}) s:${rivalScores[rI][rJ]}`);
        } else {
            //进攻
            this.chessboard[I][J] = 1
            this.next = {
                row: I + 1,
                col: J + 1,
                player: this.player
            }
            console.log(`Attack: (${this.next.row}, ${this.next.col}) s:${this.scores[I][J]}`);   
        }
    }
    
    getNextAction() {
        return this.next
    }

    /**
     * 根据棋型给出分数
     * 
     * 一个棋型由其中连子的个数和前后是否堵截来确定
     */
    private scoreOfStyle(line: number, block1: boolean, block2: boolean) {
        if (line == 5) return AIScore.ooooo
        if (block1 && block2) return 0
        switch (line) {
            case 4: return (block1 || block2) ? AIScore.Ioooo : AIScore.oooo
            case 3: return (block1 || block2) ? AIScore.Iooo : AIScore.ooo
            case 2: return (block1 || block2) ? AIScore.Ioo : AIScore.oo
            case 1: return 0
        }
    }

    /**
     * 根据棋敌方型给出威胁分数
     * 
     * 一个棋型由其中连子的个数和前后是否堵截来确定
     */
    private scoreOfRivalStyle(line: number, block1: boolean, block2: boolean) {
        if (line == 5) return AIRivalScore.ooooo
        if (block1 && block2) return 0
        switch (line) {
            case 4: return (block1 || block2) ? AIRivalScore.Ioooo : AIRivalScore.oooo
            case 3: return (block1 || block2) ? AIRivalScore.Iooo : AIRivalScore.ooo
            case 2: return (block1 || block2) ? AIRivalScore.Ioo : AIRivalScore.oo
            case 1: return 0
        }
    }

    /**
     * 假设在(i, j)处落子, 计算落子后获得的分数 scores[i][j]
     * @param {number} player 1 计算己方的收益, -1 计算敌方收益
     */
    private computeScore(i: number, j: number, player: number) {
        let score = 0
        //上、下 (r先减后加, c不变)
        let r1 = i, c = j
        while (r1 > 0 && this.chessboard[r1 - 1][c] == player) r1--
        let upIsBlocked = (r1 == 0) || this.chessboard[r1 - 1][c] == -player
        let r2 = i
        while (r2 < 14 && this.chessboard[r2 + 1][c] == player) r2++
        let downIsBlocked = (r2 == 14) || this.chessboard[r2 + 1][c] == -player
        let line = (r1 == r2) ? 1 : (r2 - r1 + 1)
        // 判断棋型
        score += (player == 1) ? 
            this.scoreOfStyle(line, upIsBlocked, downIsBlocked) :
            this.scoreOfRivalStyle(line, upIsBlocked, downIsBlocked)
        
        //左、右 (r不变, c先减后加)
        let r = i, c1 = j
        while (c1 > 0 && this.chessboard[r][c1 - 1] == player) c1--
        let leftIsBlocked = (c1 == 0) || this.chessboard[r][c1 - 1] == -player
        let c2 = j
        while (c2 < 14 && this.chessboard[r][c2 + 1] == player) c2++
        let rightIsBlocked = (c2 == 14) || this.chessboard[r][c2 + 1] == -player
        line = (c1 == c2) ? 1 : (c2 - c1 + 1)
        // 判断棋型
        score += (player == 1) ? 
            this.scoreOfStyle(line, leftIsBlocked, rightIsBlocked) :
            this.scoreOfRivalStyle(line, leftIsBlocked, rightIsBlocked)
        
        //主对角线方向 (rc先减后加)
        r1 = i, c1 = j
        while (r1 > 0 && c1 > 0 && this.chessboard[r1 - 1][c1 - 1] == player) {r1--; c1--}
        let leftUpIsBlocked = (r1 == 0 || c1 == 0) || this.chessboard[r1 - 1][c1 - 1] == -player
        r2 = i
        c2 = j
        while (r2 < 14 && c2 < 14 && this.chessboard[r2 + 1][c2 + 1] == player) {r2++; c2++}
        let rightDownIsBlocked = (r2 == 14 || c2 == 14) || this.chessboard[r2 + 1][c2 + 1] == -player
        line = (r1 == r2) ? 1 : (r2 - r1 + 1)
        // 判断棋型
        score += (player == 1) ? 
            this.scoreOfStyle(line, leftUpIsBlocked, rightDownIsBlocked) :
            this.scoreOfRivalStyle(line, leftUpIsBlocked, rightDownIsBlocked)
        
        //副对角线方向 (r先加后减, c先减后加)
        r1 = i, c1 = j
        while (r1 < 14 && c1 > 0 && this.chessboard[r1 + 1][c1 - 1] == player) {r1++; c1--}
        let leftDownIsBlocked = (r1 == 14 || c1 == 0) || this.chessboard[r1 + 1][c1 - 1] == -player
        r2 = i
        c2 = j
        while (r2 > 0 && c2 < 14 && this.chessboard[r2 - 1][c2 + 1] == player) {r2--; c2++}
        let rightUpIsBlocked = (r2 == 0 || c2 == 14) || this.chessboard[r2 - 1][c2 + 1] == -player
        line = (c1 == c2) ? 1 : (c2 - c1 + 1)
        // 判断棋型
        score += (player == 1) ? 
            this.scoreOfStyle(line, leftDownIsBlocked, rightUpIsBlocked) :
            this.scoreOfRivalStyle(line, leftDownIsBlocked, rightUpIsBlocked)

        return score
    }
}