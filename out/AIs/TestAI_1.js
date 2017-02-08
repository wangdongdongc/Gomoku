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
     * 假设在(i, j)处落子, 计算落子后棋局的分数 scores[i][j]
     */
    TestAI_1.prototype.computeScore = function (i, j) {
        var score = 0;
        //上、下 (r不变, c加减)
        var r = i;
        var c = j - 1;
        while (1) {
            if (c == -1) {
                score--;
                break;
            }
            if (this.chessboard[r][c] == 1) {
                score++;
            }
            else if (this.chessboard[r][c] == 0) {
                break;
            }
            else {
                score--;
                break;
            }
            c--;
        }
        c = j + 1;
        while (1) {
            if (c == 15) {
                score--;
                break;
            }
            if (this.chessboard[r][c] == 1) {
                score++;
            }
            else if (this.chessboard[r][c] == 0) {
                break;
            }
            else {
                score--;
                break;
            }
            c++;
        }
        //左、右 (r加减, c不变)
        r = i - 1;
        c = j;
        while (1) {
            if (r == -1) {
                score--;
                break;
            }
            if (this.chessboard[r][c] == 1) {
                score++;
            }
            else if (this.chessboard[r][c] == 0) {
                break;
            }
            else {
                score--;
                break;
            }
            r--;
        }
        r = i + 1;
        while (1) {
            if (r == 15) {
                score--;
                break;
            }
            if (this.chessboard[r][c] == 1) {
                score++;
            }
            else if (this.chessboard[r][c] == 0) {
                break;
            }
            else {
                score--;
                break;
            }
            r++;
        }
        //主对角线方向 (rc同加减)
        r = i - 1;
        c = j - 1;
        while (1) {
            if (r == -1 || c == -1) {
                score--;
                break;
            }
            if (this.chessboard[r][c] == 1) {
                score++;
            }
            else if (this.chessboard[r][c] == 0) {
                break;
            }
            else {
                score--;
                break;
            }
            r--;
            c--;
        }
        r = i + 1;
        c = j + 1;
        while (1) {
            if (r == 15 || c == 15) {
                score--;
                break;
            }
            if (this.chessboard[r][c] == 1) {
                score++;
            }
            else if (this.chessboard[r][c] == 0) {
                break;
            }
            else {
                score--;
                break;
            }
            r++;
            c++;
        }
        //副对角线方向 (r加c减或r减c加)
        r = i - 1;
        c = j + 1;
        while (1) {
            if (r == -1 || c == 15) {
                score--;
                break;
            }
            if (this.chessboard[r][c] == 1) {
                score++;
            }
            else if (this.chessboard[r][c] == 0) {
                break;
            }
            else {
                score--;
                break;
            }
            r--;
            c++;
        }
        r = i + 1;
        c = j - 1;
        while (1) {
            if (r == 15 || c == -1) {
                score--;
                break;
            }
            if (this.chessboard[r][c] == 1) {
                score++;
            }
            else if (this.chessboard[r][c] == 0) {
                break;
            }
            else {
                score--;
                break;
            }
            r++;
            c--;
        }
        return score;
    };
    TestAI_1.prototype.analysAction = function (action) {
        this.chessboard[action.row - 1][action.col - 1] = -1;
        // 遍历每一个位置, 评估分数
        this.scores = makeMatrix(15, 15, -1);
        for (var i = 0; i < 15; i++)
            for (var j = 0; j < 15; j++)
                if (this.chessboard[i][j] == 0) {
                    var s = this.computeScore(i, j);
                    this.scores[i][j] = s > 0 ? s : 0;
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