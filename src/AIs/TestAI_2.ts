namespace AI {


/** AI 将棋子分为 None, Player, AI 三种 */
enum AIChess {
    Empty = 0,
    Player = 1,
    AI = -1
}


/** 棋子在棋盘中的位置(row, col) (Zero Based) */
interface ChessPosition {
    row: number
    col: number
}


/** 连子的评估结果(连子的个数,是否间断,两端是否堵截) */
interface ContinualLineEvalutaion {
    /**连子的个数(不含空格) */
     count: number
     hasGap: boolean
     leftIsBlocked: boolean
     rightIsBlocked: boolean
}


/**2号AI */
export class TestAI_2 extends GomokuAI {
    private maxSearchDepth = 2
    /**
     * AI 自行维护一个棋盘 (0~14X0~14)
     * 注: 使用 ChessPosition 将二维数组的的操作包装起来,避免在逻辑中出现[][]的操作
     */
    private chessboard: AIChess[][]

    private positionIsValid(pos: ChessPosition) {
        if (0 <= pos.row && pos.row <= 14 && 0 <= pos.col && pos.col <= 14)
            return true
        else
            return false
    }

    private positionIsEmpty(pos: ChessPosition) {
        return this.getChess(pos) == AIChess.Empty
    }

    private getChess(pos: ChessPosition) {
        return this.chessboard[pos.row][pos.col]
    }

    private putChessOn(pos: ChessPosition, chess: AIChess) {
        this.chessboard[pos.row][pos.col] = chess
    }

    private takeChessFrom(pos: ChessPosition) {
        this.chessboard[pos.row][pos.col] = AIChess.Empty
    }

    private allPossiblePositions(): ChessPosition[] {
        let postions: ChessPosition[] = []
        for (let r = 0; r < this.chessboard.length; r++) {
            for (let c = 0; c < this.chessboard[r].length; c++) {
                if (this.chessboard[r][c] == AIChess.Empty) {
                    postions.push({
                        row: r,
                        col: c
                    })
                }
            }
        }
        return postions
    }

    private profits: number[][]
    private threats: number[][]
    constructor() {
        super()
        this.chessboard = makeMatrix(15, 15, AIChess.Empty)
        this.profits = makeMatrix(15, 15, -1)
        this.threats = makeMatrix(15, 15, -1)
    }
    public putFirstChessInMiddle() {
        this.putChessOn({row: 7, col: 7}, AIChess.AI)
    }

    private scoreOfEvaluation(result: ContinualLineEvalutaion):number {
        if (result.count >= 5 && !result.hasGap) return AIScore.ooooo
        else if (result.count >= 5 && result.hasGap) return AIScore.Iooo_oo
        else if (result.leftIsBlocked && result.rightIsBlocked) return AIScore.WillFail
        if (!result.hasGap) {
            switch (result.count) {
                case 4: return (result.leftIsBlocked || result.rightIsBlocked) ? AIScore.Ioooo : AIScore.oooo
                case 3: return (result.leftIsBlocked || result.rightIsBlocked) ? AIScore.Iooo : AIScore.ooo
                case 2: return (result.leftIsBlocked || result.rightIsBlocked) ? AIScore.Ioo : AIScore.oo
                case 1: return (result.leftIsBlocked || result.rightIsBlocked) ? AIScore.Io : AIScore.o
            }
        } else {
            switch (result.count) {
                case 4: return (result.leftIsBlocked || result.rightIsBlocked) ? AIScore.Ioo_oo : AIScore.oo_oo
                case 3: return (result.leftIsBlocked || result.rightIsBlocked) ? AIScore.Io_oo : AIScore.o_oo
                case 2: return (result.leftIsBlocked || result.rightIsBlocked) ? AIScore.Io_o : AIScore.o_o
            }
        }
        return AIScore.Min
    }

    /**
     * 评估指定位置和方向的AI或玩家的连子, 连子方向由两个函数决定, 允许中间出现一次间隔
     * (应确保指定位置处有棋子且为target)
     * @param {ChessPosition} pos 棋子的位置
     * @param {AIChess} target AI或玩家 (注: -target == target的对手)
     * @param {function(ChessPosition):ChessPosition} dec 位置递减函数
     * @param {function(ChessPosition):ChessPosition} inc 位置递增函数
     * @return {ContinualLineEvalutaion} 评估结果
     */
    private evaluateContinualLine (
        pos: ChessPosition, target: AIChess.AI | AIChess.Player, 
        dec: (pos: ChessPosition) => ChessPosition, 
        inc: (pos: ChessPosition) => ChessPosition): number {
        //使用dec走到连子的一个边界, 再使用inc走到连子的另一个边界
        let hasGap = false
        let leftIsBlocked = false
        //先走到一个边界
        while (this.positionIsValid(dec(pos))) {
            if (this.positionIsEmpty(dec(pos))) {
                if (hasGap) break
                else hasGap = true
            } else if (this.getChess(dec(pos)) == -target) {
                leftIsBlocked = true
                break
            }
            pos = dec(pos)
        }
        if (!this.positionIsValid(dec(pos))) leftIsBlocked = true
        if (this.positionIsEmpty(pos)) {
            pos = inc(pos)
            leftIsBlocked = false
        }
        //再走到另一个边界
        hasGap = false
        let count = 1
        let rightIsBlocked = false
        while (this.positionIsValid(inc(pos))) {
            if (this.positionIsEmpty(inc(pos))) {
                if (hasGap) break
                else hasGap = true
            } else if (this.getChess(inc(pos)) == -target) {
                rightIsBlocked = true
                break
            }
            pos = inc(pos)
            count++
        }
        if (!this.positionIsValid(inc(pos))) rightIsBlocked = true
        if (this.positionIsEmpty(pos)) {
            pos = dec(pos)
            rightIsBlocked = false
            hasGap = false
            count--
        }

        if (hasGap) count--
        return this.scoreOfEvaluation({
            count: count,
            hasGap: hasGap,
            leftIsBlocked: leftIsBlocked,
            rightIsBlocked: rightIsBlocked
        })
    }

    /**
     * 计算在 (row, col) target 落子的得分(AI落子即收益分, 玩家落子即威胁分)
     * @param {number} row 0~14
     * @param {number} col 0~14
     * @param {AIChess} target AI 或 Player
     */
    private computeScore(pos: ChessPosition, target: AIChess.AI | AIChess.Player) {
        this.putChessOn(pos, target)
        let score = 0
        //从上到下
        score += this.evaluateContinualLine(pos, target,
            (pos: ChessPosition) => { return {row: pos.row - 1, col: pos.col} }, 
            (pos: ChessPosition) => { return {row: pos.row + 1, col: pos.col} })
        //从左到右
        score += this.evaluateContinualLine(pos, target,
            (pos: ChessPosition) => { return { row: pos.row, col: pos.col - 1 } },
            (pos: ChessPosition) => { return { row: pos.row, col: pos.col + 1 } })
        //从右上到左下
        score += this.evaluateContinualLine(pos, target,
            (pos: ChessPosition) => { return { row: pos.row - 1, col: pos.col - 1 } },
            (pos: ChessPosition) => { return { row: pos.row + 1, col: pos.col + 1 } })
        //从左下到右上
        score += this.evaluateContinualLine(pos, target,
            (pos: ChessPosition) => { return { row: pos.row + 1, col: pos.col - 1 } },
            (pos: ChessPosition) => { return { row: pos.row - 1, col: pos.col + 1 } })
        this.takeChessFrom(pos)
        return score
    }

    /**计算 AI 所有可能落子的收益 */
    private computeProfits() {
        for (let r = 0; r < 15; r++) {
            for (let c = 0; c < 15; c++) {
                if (this.positionIsEmpty({row: r, col: c})) {
                    this.profits[r][c] = this.computeScore({ row: r, col: c }, AIChess.AI)
                } else {
                    this.profits[r][c] = -1
                }
            }
        }
    }

    /**获取最大收益点 */
    private getMaxProfitPosition(): ChessPosition {
        let p = {
            row: 0,
            col: 0
        }
        for (let r = 0; r < 15; r++) {
            for (let c = 0; c < 15; c++) {
                if (this.profits[r][c] > this.profits[p.row][p.col]) {
                    p.row = r
                    p.col = c
                }
            }
        }
        return p
    }

    /**计算玩家所有可能落子的威胁 */
    private computeThreats() {
        for (let r = 0; r < 15; r++) {
            for (let c = 0; c < 15; c++) {
                if (this.positionIsEmpty({ row: r, col: c })) {
                    this.threats[r][c] = this.computeScore({ row: r, col: c }, AIChess.Player)
                } else {
                    this.threats[r][c] = -1
                }
            }
        }
    }

    /**获取最大威胁点 */
    private getMaxThreatPosition(): ChessPosition {
        let p = {
            row: 0,
            col: 0
        }
        for (let r = 0; r < 15; r++) {
            for (let c = 0; c < 15; c++) {
                if (this.threats[r][c] > this.threats[p.row][p.col]) {
                    p.row = r
                    p.col = c
                }
            }
        }
        return p
    }


    /**
     * Min-Max 决策找出对大收益点
     * 搜索深度取决于 maxSearchDepth
     * 
     * @Todo: minmax 算法无法应用于当前的AI，minmax 算法使用给予状态的整体utility函数，
     * 而不是仅当落子时计算四周的连子
     * 
     * @param {AIChess} target 决策对象(AI|Player)
     */
    private minmaxDecision(target: AIChess.AI | AIChess.Player) {
        let currentDepth = 0

        let maxValue = (pos: ChessPosition): number => {
            currentDepth++
            if (currentDepth == this.maxSearchDepth) {
                currentDepth--
                return this.computeScore(pos, -target)
            }

            this.putChessOn(pos, -target)
            let v = -Infinity
            let possiblePositions = this.allPossiblePositions()
            for (let pos of possiblePositions) {
                v = Math.max(v, minValue(pos))
            }
            this.takeChessFrom(pos)
            currentDepth--
            return v
        }
    
        let minValue = (pos: ChessPosition): number => {
            currentDepth++
            if (currentDepth == this.maxSearchDepth) {
                currentDepth--
                return this.computeScore(pos, target)
            }

            this.putChessOn(pos, target)
            let v = Infinity
            let possiblePositions = this.allPossiblePositions()
            for (let pos of possiblePositions) {
                v = Math.min(v, maxValue(pos))
            }
            this.takeChessFrom(pos)
            currentDepth--
            return v
        }

        let possiblePositions = this.allPossiblePositions()
        let pos = possiblePositions[0]
        let value = minValue(pos)
        for (let i = 1; i < possiblePositions.length; i++) {
            if (minValue(possiblePositions[i]) > value) {
                pos = possiblePositions[i]
            }
        }
        return pos
    }

    /**
     * 分析对手的动作
     */
    public analysAction(action: GomokuAction) {
        this.putChessOn({row: action.row - 1, col: action.col - 1}, AIChess.Player)
        //判断局棋威胁
        this.computeThreats()
        //判断下一步收益
        this.computeProfits()
    }

    /**
     * 给出下一次动作
     */
    public getNextAction(): GomokuAction {
        let ppos = this.getMaxProfitPosition()
        let tpos = this.getMaxThreatPosition()
        let pos = (this.threats[tpos.row][tpos.col] > AIScore.Dangerous && this.threats[tpos.row][tpos.col] > this.profits[ppos.row][ppos.col]) ?
                    tpos : ppos
        if (this.profits[ppos.row][ppos.col] == AIScore.ooooo) pos = ppos
        this.putChessOn(pos, AIChess.AI)
        return {
            row: pos.row + 1,
            col: pos.col + 1,
            player: GomokuPlayer.White, //AI use white chess @Todo: improve this
        }
    }
}//class TestAI_2

}//namespace AI

