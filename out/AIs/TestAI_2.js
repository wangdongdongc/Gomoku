var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AI;
(function (AI) {
    /** AI 将棋子分为 None, Player, AI 三种 */
    var AIChess;
    (function (AIChess) {
        AIChess[AIChess["Empty"] = 0] = "Empty";
        AIChess[AIChess["Player"] = 1] = "Player";
        AIChess[AIChess["AI"] = -1] = "AI";
    })(AIChess || (AIChess = {}));
    /**2号AI */
    var TestAI_2 = (function (_super) {
        __extends(TestAI_2, _super);
        function TestAI_2() {
            var _this = _super.call(this) || this;
            _this.maxSearchDepth = 2;
            _this.chessboard = makeMatrix(15, 15, AIChess.Empty);
            _this.profits = makeMatrix(15, 15, -1);
            _this.threats = makeMatrix(15, 15, -1);
            return _this;
        }
        TestAI_2.prototype.positionIsValid = function (pos) {
            if (0 <= pos.row && pos.row <= 14 && 0 <= pos.col && pos.col <= 14)
                return true;
            else
                return false;
        };
        TestAI_2.prototype.positionIsEmpty = function (pos) {
            return this.getChess(pos) == AIChess.Empty;
        };
        TestAI_2.prototype.getChess = function (pos) {
            return this.chessboard[pos.row][pos.col];
        };
        TestAI_2.prototype.putChessOn = function (pos, chess) {
            this.chessboard[pos.row][pos.col] = chess;
        };
        TestAI_2.prototype.takeChessFrom = function (pos) {
            this.chessboard[pos.row][pos.col] = AIChess.Empty;
        };
        TestAI_2.prototype.allPossiblePositions = function () {
            var postions = [];
            for (var r = 0; r < this.chessboard.length; r++) {
                for (var c = 0; c < this.chessboard[r].length; c++) {
                    if (this.chessboard[r][c] == AIChess.Empty) {
                        postions.push({
                            row: r,
                            col: c
                        });
                    }
                }
            }
            return postions;
        };
        TestAI_2.prototype.putFirstChessInMiddle = function () {
            this.putChessOn({ row: 7, col: 7 }, AIChess.AI);
        };
        TestAI_2.prototype.scoreOfEvaluation = function (result) {
            if (result.count >= 5 && !result.hasGap)
                return AIScore.ooooo;
            else if (result.count >= 5 && result.hasGap)
                return AIScore.Iooo_oo;
            else if (result.leftIsBlocked && result.rightIsBlocked)
                return AIScore.WillFail;
            if (!result.hasGap) {
                switch (result.count) {
                    case 4: return (result.leftIsBlocked || result.rightIsBlocked) ? AIScore.Ioooo : AIScore.oooo;
                    case 3: return (result.leftIsBlocked || result.rightIsBlocked) ? AIScore.Iooo : AIScore.ooo;
                    case 2: return (result.leftIsBlocked || result.rightIsBlocked) ? AIScore.Ioo : AIScore.oo;
                    case 1: return (result.leftIsBlocked || result.rightIsBlocked) ? AIScore.Io : AIScore.o;
                }
            }
            else {
                switch (result.count) {
                    case 4: return (result.leftIsBlocked || result.rightIsBlocked) ? AIScore.Ioo_oo : AIScore.oo_oo;
                    case 3: return (result.leftIsBlocked || result.rightIsBlocked) ? AIScore.Io_oo : AIScore.o_oo;
                    case 2: return (result.leftIsBlocked || result.rightIsBlocked) ? AIScore.Io_o : AIScore.o_o;
                }
            }
            return AIScore.Min;
        };
        /**
         * 评估指定位置和方向的AI或玩家的连子, 连子方向由两个函数决定, 允许中间出现一次间隔
         * (应确保指定位置处有棋子且为target)
         * @param {ChessPosition} pos 棋子的位置
         * @param {AIChess} target AI或玩家 (注: -target == target的对手)
         * @param {function(ChessPosition):ChessPosition} dec 位置递减函数
         * @param {function(ChessPosition):ChessPosition} inc 位置递增函数
         * @return {ContinualLineEvalutaion} 评估结果
         */
        TestAI_2.prototype.evaluateContinualLine = function (pos, target, dec, inc) {
            //使用dec走到连子的一个边界, 再使用inc走到连子的另一个边界
            var hasGap = false;
            var leftIsBlocked = false;
            //先走到一个边界
            while (this.positionIsValid(dec(pos))) {
                if (this.positionIsEmpty(dec(pos))) {
                    if (hasGap)
                        break;
                    else
                        hasGap = true;
                }
                else if (this.getChess(dec(pos)) == -target) {
                    leftIsBlocked = true;
                    break;
                }
                pos = dec(pos);
            }
            if (!this.positionIsValid(dec(pos)))
                leftIsBlocked = true;
            if (this.positionIsEmpty(pos)) {
                pos = inc(pos);
                leftIsBlocked = false;
            }
            //再走到另一个边界
            hasGap = false;
            var count = 1;
            var rightIsBlocked = false;
            while (this.positionIsValid(inc(pos))) {
                if (this.positionIsEmpty(inc(pos))) {
                    if (hasGap)
                        break;
                    else
                        hasGap = true;
                }
                else if (this.getChess(inc(pos)) == -target) {
                    rightIsBlocked = true;
                    break;
                }
                pos = inc(pos);
                count++;
            }
            if (!this.positionIsValid(inc(pos)))
                rightIsBlocked = true;
            if (this.positionIsEmpty(pos)) {
                pos = dec(pos);
                rightIsBlocked = false;
                hasGap = false;
                count--;
            }
            if (hasGap)
                count--;
            return this.scoreOfEvaluation({
                count: count,
                hasGap: hasGap,
                leftIsBlocked: leftIsBlocked,
                rightIsBlocked: rightIsBlocked
            });
        };
        /**
         * 计算在 (row, col) target 落子的得分(AI落子即收益分, 玩家落子即威胁分)
         * @param {number} row 0~14
         * @param {number} col 0~14
         * @param {AIChess} target AI 或 Player
         */
        TestAI_2.prototype.computeScore = function (pos, target) {
            this.putChessOn(pos, target);
            var score = 0;
            //从上到下
            score += this.evaluateContinualLine(pos, target, function (pos) { return { row: pos.row - 1, col: pos.col }; }, function (pos) { return { row: pos.row + 1, col: pos.col }; });
            //从左到右
            score += this.evaluateContinualLine(pos, target, function (pos) { return { row: pos.row, col: pos.col - 1 }; }, function (pos) { return { row: pos.row, col: pos.col + 1 }; });
            //从右上到左下
            score += this.evaluateContinualLine(pos, target, function (pos) { return { row: pos.row - 1, col: pos.col - 1 }; }, function (pos) { return { row: pos.row + 1, col: pos.col + 1 }; });
            //从左下到右上
            score += this.evaluateContinualLine(pos, target, function (pos) { return { row: pos.row + 1, col: pos.col - 1 }; }, function (pos) { return { row: pos.row - 1, col: pos.col + 1 }; });
            this.takeChessFrom(pos);
            return score;
        };
        /**计算 AI 所有可能落子的收益 */
        TestAI_2.prototype.computeProfits = function () {
            for (var r = 0; r < 15; r++) {
                for (var c = 0; c < 15; c++) {
                    if (this.positionIsEmpty({ row: r, col: c })) {
                        this.profits[r][c] = this.computeScore({ row: r, col: c }, AIChess.AI);
                    }
                    else {
                        this.profits[r][c] = -1;
                    }
                }
            }
        };
        /**获取最大收益点 */
        TestAI_2.prototype.getMaxProfitPosition = function () {
            var p = {
                row: 0,
                col: 0
            };
            for (var r = 0; r < 15; r++) {
                for (var c = 0; c < 15; c++) {
                    if (this.profits[r][c] > this.profits[p.row][p.col]) {
                        p.row = r;
                        p.col = c;
                    }
                }
            }
            return p;
        };
        /**计算玩家所有可能落子的威胁 */
        TestAI_2.prototype.computeThreats = function () {
            for (var r = 0; r < 15; r++) {
                for (var c = 0; c < 15; c++) {
                    if (this.positionIsEmpty({ row: r, col: c })) {
                        this.threats[r][c] = this.computeScore({ row: r, col: c }, AIChess.Player);
                    }
                    else {
                        this.threats[r][c] = -1;
                    }
                }
            }
        };
        /**获取最大威胁点 */
        TestAI_2.prototype.getMaxThreatPosition = function () {
            var p = {
                row: 0,
                col: 0
            };
            for (var r = 0; r < 15; r++) {
                for (var c = 0; c < 15; c++) {
                    if (this.threats[r][c] > this.threats[p.row][p.col]) {
                        p.row = r;
                        p.col = c;
                    }
                }
            }
            return p;
        };
        /**
         * Min-Max 决策找出对大收益点
         * 搜索深度取决于 maxSearchDepth
         *
         * @Todo: minmax 算法无法应用于当前的AI，minmax 算法使用给予状态的整体utility函数，
         * 而不是仅当落子时计算四周的连子
         *
         * @param {AIChess} target 决策对象(AI|Player)
         */
        TestAI_2.prototype.minmaxDecision = function (target) {
            var _this = this;
            var currentDepth = 0;
            var maxValue = function (pos) {
                currentDepth++;
                if (currentDepth == _this.maxSearchDepth) {
                    currentDepth--;
                    return _this.computeScore(pos, -target);
                }
                _this.putChessOn(pos, -target);
                var v = -Infinity;
                var possiblePositions = _this.allPossiblePositions();
                for (var _i = 0, possiblePositions_1 = possiblePositions; _i < possiblePositions_1.length; _i++) {
                    var pos_1 = possiblePositions_1[_i];
                    v = Math.max(v, minValue(pos_1));
                }
                _this.takeChessFrom(pos);
                currentDepth--;
                return v;
            };
            var minValue = function (pos) {
                currentDepth++;
                if (currentDepth == _this.maxSearchDepth) {
                    currentDepth--;
                    return _this.computeScore(pos, target);
                }
                _this.putChessOn(pos, target);
                var v = Infinity;
                var possiblePositions = _this.allPossiblePositions();
                for (var _i = 0, possiblePositions_2 = possiblePositions; _i < possiblePositions_2.length; _i++) {
                    var pos_2 = possiblePositions_2[_i];
                    v = Math.min(v, maxValue(pos_2));
                }
                _this.takeChessFrom(pos);
                currentDepth--;
                return v;
            };
            var possiblePositions = this.allPossiblePositions();
            var pos = possiblePositions[0];
            var value = minValue(pos);
            for (var i = 1; i < possiblePositions.length; i++) {
                if (minValue(possiblePositions[i]) > value) {
                    pos = possiblePositions[i];
                }
            }
            return pos;
        };
        /**
         * 分析对手的动作
         */
        TestAI_2.prototype.analysAction = function (action) {
            this.putChessOn({ row: action.row - 1, col: action.col - 1 }, AIChess.Player);
            //判断局棋威胁
            this.computeThreats();
            //判断下一步收益
            this.computeProfits();
        };
        /**
         * 给出下一次动作
         */
        TestAI_2.prototype.getNextAction = function () {
            var ppos = this.getMaxProfitPosition();
            var tpos = this.getMaxThreatPosition();
            var pos = (this.threats[tpos.row][tpos.col] > AIScore.Dangerous && this.threats[tpos.row][tpos.col] > this.profits[ppos.row][ppos.col]) ?
                tpos : ppos;
            if (this.profits[ppos.row][ppos.col] == AIScore.ooooo)
                pos = ppos;
            this.putChessOn(pos, AIChess.AI);
            return {
                row: pos.row + 1,
                col: pos.col + 1,
                player: GomokuPlayer.White,
            };
        };
        return TestAI_2;
    }(GomokuAI)); //class TestAI_2
    AI.TestAI_2 = TestAI_2;
})(AI || (AI = {})); //namespace AI
//# sourceMappingURL=TestAI_2.js.map