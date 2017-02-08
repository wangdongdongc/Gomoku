var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 测试AI_1：采用简单估分的方式进行决策
 */
var TestAI_1 = (function (_super) {
    __extends(TestAI_1, _super);
    function TestAI_1() {
        var _this = _super.call(this) || this;
        _this.chessboard = makeMatrix(15, 15, 0);
        return _this;
    }
    /**
     * AI 先在中间落子
     */
    TestAI_1.prototype.putFirstChessInMiddle = function () {
        this.chessboard[7][7] = 1;
    };
    /**
     * 根据棋型给出分数
     *
     * 一个棋型由其中连子的个数和前后是否堵截来确定
     */
    TestAI_1.prototype.scoreOfStyle = function (line, block1, block2) {
        if (line == 5)
            return Score.ooooo;
        if (block1 && block2)
            return 0;
        switch (line) {
            case 4: return (block1 || block2) ? Score.Ioooo : Score.oooo;
            case 3: return (block1 || block2) ? Score.Iooo : Score.ooo;
            case 2: return (block1 || block2) ? Score.Ioo : Score.oo;
            case 1: return 0;
        }
    };
    /**
     * 假设在(i, j)处落子, 计算落子后获得的分数 scores[i][j]
     */
    TestAI_1.prototype.computeScore = function (i, j) {
        var score = 0;
        //上、下 (r先减后加, c不变)
        var r1 = i, c = j;
        while (r1 > 0 && this.chessboard[r1 - 1][c] == 1)
            r1--;
        var upIsBlocked = (r1 == 0) || this.chessboard[r1 - 1][c] == -1;
        var r2 = i;
        while (r2 < 14 && this.chessboard[r2 + 1][c] == 1)
            r2++;
        var downIsBlocked = (r2 == 14) || this.chessboard[r2 + 1][c] == -1;
        var line = (r1 == r2) ? 1 : (r2 - r1 + 1);
        // 判断棋型
        score += this.scoreOfStyle(line, upIsBlocked, downIsBlocked);
        //左、右 (r不变, c先减后加)
        var r = i, c1 = j;
        while (c1 > 0 && this.chessboard[r][c1 - 1] == 1)
            c1--;
        var leftIsBlocked = (c1 == 0) || this.chessboard[r][c1 - 1] == -1;
        var c2 = j;
        while (c2 < 14 && this.chessboard[r][c2 + 1] == 1)
            c2++;
        var rightIsBlocked = (c2 == 14) || this.chessboard[r][c2 + 1] == -1;
        line = (c1 == c2) ? 1 : (c2 - c1 + 1);
        // 判断棋型
        score += this.scoreOfStyle(line, leftIsBlocked, rightIsBlocked);
        //主对角线方向 (rc先减后加)
        r1 = i, c1 = j;
        while (r1 > 0 && c1 > 0 && this.chessboard[r1 - 1][c1 - 1] == 1) {
            r1--;
            c1--;
        }
        var leftUpIsBlocked = (r1 == 0 || c1 == 0) || this.chessboard[r1 - 1][c1 - 1] == -1;
        r2 = i;
        c2 = j;
        while (r2 < 14 && c2 < 14 && this.chessboard[r2 + 1][c2 + 1] == 1) {
            r2++;
            c2++;
        }
        var rightDownIsBlocked = (r2 == 14 || c2 == 14) || this.chessboard[r2 + 1][c2 + 1] == -1;
        line = (r1 == r2) ? 1 : (r2 - r1 + 1);
        // 判断棋型
        score += this.scoreOfStyle(line, leftUpIsBlocked, rightDownIsBlocked);
        //副对角线方向 (r先加后减, c先减后加)
        r1 = i, c1 = j;
        while (r1 < 14 && c1 > 0 && this.chessboard[r1 + 1][c1 - 1] == 1) {
            r1++;
            c1--;
        }
        var leftDownIsBlocked = (r1 == 14 || c1 == 0) || this.chessboard[r1 + 1][c1 - 1] == -1;
        r2 = i;
        c2 = j;
        while (r2 > 0 && c2 < 14 && this.chessboard[r2 - 1][c2 + 1] == 1) {
            r2--;
            c2++;
        }
        var rightUpIsBlocked = (r2 == 0 || c2 == 14) || this.chessboard[r2 - 1][c2 + 1] == -1;
        line = (c1 == c2) ? 1 : (c2 - c1 + 1);
        // 判断棋型
        score += this.scoreOfStyle(line, leftDownIsBlocked, rightUpIsBlocked);
        return score;
    };
    TestAI_1.prototype.analysAction = function (action) {
        this.chessboard[action.row - 1][action.col - 1] = -1;
        // 遍历每一个位置, 评估分数
        this.scores = makeMatrix(15, 15, -1);
        for (var i = 0; i < 15; i++)
            for (var j = 0; j < 15; j++)
                if (this.chessboard[i][j] == 0) {
                    // let s = this.computeScore(i, j)
                    // this.scores[i][j] = s > 0 ? s : 0
                    this.chessboard[i][j] = 1; //尝试落子
                    this.scores[i][j] = this.computeScore(i, j);
                    this.chessboard[i][j] = 0; //拿回棋子
                }
        console.log("scores:");
        for (var i = 0; i < 15; i++) {
            console.log(this.scores[i]);
        }
        // 将分数最高的位置作为下一个动作
        var I = 0, J = 0;
        for (var i = 0; i < 15; i++)
            for (var j = 0; j < 15; j++)
                if (this.scores[i][j] > this.scores[I][J]) {
                    I = i;
                    J = j;
                }
        //
        this.chessboard[I][J] = 1;
        //
        this.next = {
            row: I + 1,
            col: J + 1,
            player: this.player
        };
    };
    TestAI_1.prototype.nextAction = function () {
        return this.next;
    };
    return TestAI_1;
}(GomokuAI));
//# sourceMappingURL=TestAI_1.js.map