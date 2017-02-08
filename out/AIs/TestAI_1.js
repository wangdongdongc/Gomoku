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
    TestAI_1.prototype.analysAction = function (action) {
        this.chessboard[action.row - 1][action.col - 1] = -1;
        //先防
        //计算敌方下一步最高收益的落子
        var rivalScores = makeMatrix(15, 15, -1);
        for (var i = 0; i < 15; i++)
            for (var j = 0; j < 15; j++)
                if (this.chessboard[i][j] == 0) {
                    this.chessboard[i][j] = -1; //尝试落子
                    rivalScores[i][j] = this.computeScore(i, j, -1); //计算敌方收益
                    this.chessboard[i][j] = 0; //收回尝试
                }
        var rI = 0, rJ = 0;
        for (var i = 0; i < 15; i++)
            for (var j = 0; j < 15; j++)
                if (rivalScores[i][j] > rivalScores[rI][rJ]) {
                    rI = i;
                    rJ = j;
                }
        // console.log("rival scores:");
        // for (let i = 0; i < 15; i++) {
        //     console.log(rivalScores[i])
        // }
        // 若出现危险棋局, 直接选择防守
        if (rivalScores[rI][rJ] >= 20) {
            this.chessboard[rI][rJ] = 1;
            this.next = {
                row: rI + 1,
                col: rJ + 1,
                player: this.player
            };
            console.log("Defend: (" + this.next.row + ", " + this.next.col + ") s:" + rivalScores[rI][rJ]);
            return;
        }
        // 后攻
        // 遍历每一个位置, 评估分数
        this.scores = makeMatrix(15, 15, -1);
        for (var i = 0; i < 15; i++)
            for (var j = 0; j < 15; j++)
                if (this.chessboard[i][j] == 0) {
                    this.chessboard[i][j] = 1; //尝试落子
                    this.scores[i][j] = this.computeScore(i, j, 1); //计算己方收益
                    this.chessboard[i][j] = 0; //收回尝试
                }
        // console.log("scores:");
        // for (let i = 0; i < 15; i++) {
        //     console.log(this.scores[i])
        // }
        // 将分数最高的位置作为下一个动作
        var I = 0, J = 0;
        for (var i = 0; i < 15; i++)
            for (var j = 0; j < 15; j++)
                if (this.scores[i][j] > this.scores[I][J]) {
                    I = i;
                    J = j;
                }
        this.chessboard[I][J] = 1;
        // 确定 next 为己方进攻收益最高的动作
        this.next = {
            row: I + 1,
            col: J + 1,
            player: this.player
        };
        console.log("Attack: (" + this.next.row + ", " + this.next.col + ") s:" + this.scores[I][J]);
    };
    TestAI_1.prototype.nextAction = function () {
        return this.next;
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
     * 根据棋敌方型给出威胁分数
     *
     * 一个棋型由其中连子的个数和前后是否堵截来确定
     */
    TestAI_1.prototype.scoreOfRivalStyle = function (line, block1, block2) {
        if (line == 5)
            return rivalScore.ooooo;
        if (block1 && block2)
            return 0;
        switch (line) {
            case 4: return (block1 || block2) ? rivalScore.Ioooo : rivalScore.oooo;
            case 3: return (block1 || block2) ? rivalScore.Iooo : rivalScore.ooo;
            case 2: return (block1 || block2) ? rivalScore.Ioo : rivalScore.oo;
            case 1: return 0;
        }
    };
    /**
     * 假设在(i, j)处落子, 计算落子后获得的分数 scores[i][j]
     * @param {number} player 1 计算己方的收益, -1 计算敌方收益
     */
    TestAI_1.prototype.computeScore = function (i, j, player) {
        var score = 0;
        //上、下 (r先减后加, c不变)
        var r1 = i, c = j;
        while (r1 > 0 && this.chessboard[r1 - 1][c] == player)
            r1--;
        var upIsBlocked = (r1 == 0) || this.chessboard[r1 - 1][c] == -player;
        var r2 = i;
        while (r2 < 14 && this.chessboard[r2 + 1][c] == player)
            r2++;
        var downIsBlocked = (r2 == 14) || this.chessboard[r2 + 1][c] == -player;
        var line = (r1 == r2) ? 1 : (r2 - r1 + 1);
        // 判断棋型
        score += (player == 1) ?
            this.scoreOfStyle(line, upIsBlocked, downIsBlocked) :
            this.scoreOfRivalStyle(line, upIsBlocked, downIsBlocked);
        //左、右 (r不变, c先减后加)
        var r = i, c1 = j;
        while (c1 > 0 && this.chessboard[r][c1 - 1] == player)
            c1--;
        var leftIsBlocked = (c1 == 0) || this.chessboard[r][c1 - 1] == -player;
        var c2 = j;
        while (c2 < 14 && this.chessboard[r][c2 + 1] == player)
            c2++;
        var rightIsBlocked = (c2 == 14) || this.chessboard[r][c2 + 1] == -player;
        line = (c1 == c2) ? 1 : (c2 - c1 + 1);
        // 判断棋型
        score += (player == 1) ?
            this.scoreOfStyle(line, leftIsBlocked, rightIsBlocked) :
            this.scoreOfRivalStyle(line, leftIsBlocked, rightIsBlocked);
        //主对角线方向 (rc先减后加)
        r1 = i, c1 = j;
        while (r1 > 0 && c1 > 0 && this.chessboard[r1 - 1][c1 - 1] == player) {
            r1--;
            c1--;
        }
        var leftUpIsBlocked = (r1 == 0 || c1 == 0) || this.chessboard[r1 - 1][c1 - 1] == -player;
        r2 = i;
        c2 = j;
        while (r2 < 14 && c2 < 14 && this.chessboard[r2 + 1][c2 + 1] == player) {
            r2++;
            c2++;
        }
        var rightDownIsBlocked = (r2 == 14 || c2 == 14) || this.chessboard[r2 + 1][c2 + 1] == -player;
        line = (r1 == r2) ? 1 : (r2 - r1 + 1);
        // 判断棋型
        score += (player == 1) ?
            this.scoreOfStyle(line, leftUpIsBlocked, rightDownIsBlocked) :
            this.scoreOfRivalStyle(line, leftUpIsBlocked, rightDownIsBlocked);
        //副对角线方向 (r先加后减, c先减后加)
        r1 = i, c1 = j;
        while (r1 < 14 && c1 > 0 && this.chessboard[r1 + 1][c1 - 1] == player) {
            r1++;
            c1--;
        }
        var leftDownIsBlocked = (r1 == 14 || c1 == 0) || this.chessboard[r1 + 1][c1 - 1] == -player;
        r2 = i;
        c2 = j;
        while (r2 > 0 && c2 < 14 && this.chessboard[r2 - 1][c2 + 1] == player) {
            r2--;
            c2++;
        }
        var rightUpIsBlocked = (r2 == 0 || c2 == 14) || this.chessboard[r2 - 1][c2 + 1] == -player;
        line = (c1 == c2) ? 1 : (c2 - c1 + 1);
        // 判断棋型
        score += (player == 1) ?
            this.scoreOfStyle(line, leftDownIsBlocked, rightUpIsBlocked) :
            this.scoreOfRivalStyle(line, leftDownIsBlocked, rightUpIsBlocked);
        return score;
    };
    return TestAI_1;
}(GomokuAI));
//# sourceMappingURL=TestAI_1.js.map