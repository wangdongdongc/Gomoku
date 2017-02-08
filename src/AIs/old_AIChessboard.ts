/**
 * AI 使用的棋子 (AI执白子)
 */
class old_AIChess {
    chess: Chessman

    get isBlack(): boolean {
        return this.chess == Chessman.Black
    }
    get isWhite(): boolean {
        return this.chess == Chessman.White
    }
    get isNone(): boolean {
        return this.chess == Chessman.None
    }
    get belongToAI(): boolean {
        return this.isWhite
    }
    get belongToPlayer(): boolean {
        return this.isBlack
    }

    up = {
        adjChessNum: 0,
        isBlocked: false
    }

    down = {
        adjChessNum: 0,
        isBlocked: false
    }

    left  = {
        adjChessNum: 0,
        isBlocked: false
    }

    right = {
        adjChessNum: 0,
        isBlocked: false
    }

    upLeft = {
        adjChessNum: 0,
        isBlocked: false
    }

    upRight = {
        adjChessNum: 0,
        isBlocked: false
    }

    downLeft = {
        adjChessNum: 0,
        isBlocked: false
    }

    downRight = {
        adjChessNum: 0,
        isBlocked: false
    }
    constructor(chess: Chessman) {
        this.chess = chess
    }
}

/**
 * AI 使用的棋盘
 * 
 * 注1: row: 0-14、 col: 0-14
 * 
 * 注2: 不进行越界检查
 */
class old_AIChessboard {
    chessboard: old_AIChess[][]
    constructor() {
        this.chessboard = new Array(15)
        for (let i = 0; i < 15; i++)
            for (let j = 0; j < 15; j++)
                this.chessboard[i].push(new old_AIChess(Chessman.None))
        for (let r = 0; r < 15; r++) {
            this.chessboard[r][0].left.isBlocked = true
            this.chessboard[r][14].right.isBlocked = true
        }
        for (let c = 0; c < 15; c++) {
            this.chessboard[0][c].up.isBlocked = true
            this.chessboard[14][c].down.isBlocked = true
        }
        this.chessboard[0][0].upLeft.isBlocked = true
        this.chessboard[0][14].upRight.isBlocked = true
        this.chessboard[14][0].downLeft.isBlocked = true
        this.chessboard[14][14].downRight.isBlocked = true
    }

    hasChessOn(zRow: number, zCol: number) {
        return !this.chessboard[zRow][zCol].isNone
    }

    putChessOn(zRow: number, zCol: number, chess: old_AIChess) {
        if (!this.hasChessOn(zRow, zCol)) {
            this.chessboard[zRow][zCol] = chess
            let current = this.chessboard[zRow][zCol]

            let up = this.up(zRow, zCol)
            if (up) {
                switch (up.chess) {
                    case Chessman.Black: 
                        // 相互 Block
                        current.up.isBlocked = true
                        up.down.isBlocked = true
                        break
                    case Chessman.White: 
                        // 相互 +1
                        current.up.adjChessNum++
                        up.down.adjChessNum++
                        // 继承 Block 属性
                        current.up.isBlocked = up.up.isBlocked
                        // 传递 Block 属性
                        // Todo
                        break
                    case Chessman.None:
                }
            }

            let upLeft = this.upLeft(zRow, zCol)
            if (upLeft) {
                switch (upLeft.chess) {
                    case Chessman.Black:
                        current.upLeft.isBlocked = true
                        upLeft.downRight.isBlocked = true
                        break
                    case Chessman.White:
                        current.upLeft.adjChessNum++
                        upLeft.downRight.adjChessNum++
                        current.upLeft.isBlocked = upLeft.upLeft.isBlocked
                        break
                    case Chessman.None:
                }
            }

            let left = this.left(zRow, zCol)
            if (left) {
                switch (left.chess) {
                    case Chessman.Black:
                        current.left.isBlocked = true
                        left.right.isBlocked = true
                        break
                    case Chessman.White:
                        current.left.adjChessNum++
                        left.right.adjChessNum++
                        current.left.isBlocked = left.left.isBlocked
                        break
                    case Chessman.None:
                }
            }

            let downLeft = this.downLeft(zRow, zCol)
            if (downLeft) {
                switch ( downLeft.chess) {
                    case Chessman.Black: 
                        break
                    case Chessman.White: 
                        break
                    case Chessman.None:
                }
            }

            let down = this.down(zRow, zCol)
            if (down) {
                switch (down.chess) {
                    case Chessman.Black: 
                        break
                    case Chessman.White: 
                        break
                    case Chessman.None:
                }
            }

            let downRight = this.downRight(zRow, zCol)
            if (downRight) {
                switch (downRight.chess) {
                    case Chessman.Black: 
                        break
                    case Chessman.White: 
                        break
                    case Chessman.None:
                }
            }

            let right = this.right(zRow, zCol)
            if (right) {
                switch (right.chess) {
                    case Chessman.Black: 
                        break
                    case Chessman.White: 
                        break
                    case Chessman.None:
                }
            }

            let upRight = this.upRight(zRow, zCol)
            if (upRight) {
                switch (upRight.chess) {
                    case Chessman.Black: 
                        break
                    case Chessman.White: 
                        break
                    case Chessman.None:
                }
            }
        }
    }



    left(zRow: number, zCol: number) {
        return zCol > 0 ? this.chessboard[zRow][zCol - 1] : undefined
    }
    right(zRow: number, zCol: number) {
        return zCol < 14 ? this.chessboard[zRow][zCol + 1] : undefined
    }
    up(zRow: number, zCol: number) {
        return zRow > 0 ? this.chessboard[zRow - 1][zCol] : undefined
    }
    down(zRow: number, zCol: number) {
        return zRow < 14 ? this.chessboard[zRow + 1][zCol] : undefined
    }
    upLeft(zRow: number, zCol: number) {
        return zCol > 0 && zRow > 0 ? this.chessboard[zCol - 1][zRow - 1] : undefined
    }
    upRight(zRow: number, zCol: number) {
        return zCol < 14 && zRow > 0 ? this.chessboard[zCol + 1][zRow - 1] : undefined
    }
    downLeft(zRow: number, zCol: number) {
        return zCol > 0 && zRow < 14 ? this.chessboard[zCol - 1][zRow + 1] : undefined
    }
    downRight(zRow: number, zCol: number) {
        return zCol < 14 && zRow < 14 ? this.chessboard[zCol + 1][zRow + 1] : undefined
    }
}