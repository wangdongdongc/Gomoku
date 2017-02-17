var AI;
(function (AI) {
    /**状态类 */
    var State = (function () {
        function State() {
        }
        return State;
    }());
    AI.State = State;
    /**动作类(动作使一个状态转变为另一个状态) */
    var Action = (function () {
        function Action() {
        }
        return Action;
    }());
    AI.Action = Action;
    /**玩家类 */
    var Player = (function () {
        function Player() {
        }
        return Player;
    }());
    AI.Player = Player;
    /**游戏类(继承该类以描述一个游戏,使其能够利用minmax决策树) */
    var Game = (function () {
        function Game() {
        }
        return Game;
    }());
    AI.Game = Game;
    /**
     * 对游戏和当前状态进行 minmax 决策
     */
    function minmaxDecision(state, game) {
        var player = game.toMove(state);
        return maxValue(state);
        function maxValue(state) {
            if (game.isTerminal(state)) {
                return game.utility(state, player);
            }
            var value = -Infinity;
            var possibleActions = game.actions(state);
            for (var _i = 0, possibleActions_1 = possibleActions; _i < possibleActions_1.length; _i++) {
                var action = possibleActions_1[_i];
                value = Math.max(value, minValue(game.result(state, action)));
            }
            return value;
        }
        function minValue(state) {
            if (game.isTerminal(state)) {
                return game.utility(state, player);
            }
            var value = Infinity;
            var possibleActions = game.actions(state);
            for (var _i = 0, possibleActions_2 = possibleActions; _i < possibleActions_2.length; _i++) {
                var action = possibleActions_2[_i];
                value = Math.min(value, maxValue(game.result(state, action)));
            }
            return value;
        }
    }
    AI.minmaxDecision = minmaxDecision;
})(AI || (AI = {})); //namespace AI
//# sourceMappingURL=MinMaxTree.js.map