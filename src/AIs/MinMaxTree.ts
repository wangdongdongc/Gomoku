namespace AI {

/**状态类 */
export abstract class State {}

/**动作类(动作使一个状态转变为另一个状态) */
export abstract class Action {}

/**玩家类 */
export abstract class Player {}

/**游戏类(继承该类以描述一个游戏,使其能够利用minmax决策树) */
export abstract class Game {
    abstract actions(state: State): Action[]
    abstract result(state: State, action: Action): State
    abstract utility(state: State, player: Player): number
    abstract isTerminal(state: State): boolean
    abstract toMove(state: State): Player
}

/**
 * 对游戏和当前状态进行 minmax 决策
 */
export function minmaxDecision(state: State, game: Game) {
    let player = game.toMove(state)
    return maxValue(state)

    function maxValue(state: State): number {
        if (game.isTerminal(state)) {
            return game.utility(state, player)
        }

        let value = -Infinity
        let possibleActions = game.actions(state)

        for (let action of possibleActions) {
            value = Math.max(value, minValue(game.result(state, action)))
        }

        return value
    }

    function minValue(state: State): number {
        if (game.isTerminal(state)) {
            return game.utility(state, player)
        }

        let value = Infinity
        let possibleActions = game.actions(state)

        for (let action of possibleActions) {
            value = Math.min(value, maxValue(game.result(state, action)))
        }

        return value
    }
}

/**
 * 用于 AI 决策的 Min-Max 树
 * 
 * 对于双人零和博弈来说，Min-Max 树考虑：
 * 1、玩家 Max 将走出使自己收益最大化的一步
 * 2、玩家 Min 将走出使玩家 Max 收益最小化的一步
 * 
 * 假设玩家 Max 正在决策如何走第 n 步，那么 Max 走出这一步后，
 * 轮到玩家 Min 走第 n+1 步时，Min 将在 Max 的第 n 步的基础上走出使 Max 收益最小的一步
 * 
 * 因此玩家 Max 所走出的第 n 步，
 * 就是在考虑了 Min 将在 n+1 步中走出对自己最不利的一步的情况下，
 * 在第 n 步实现这两步之内的最大利益
 */
class MinMaxTree {
    constructor() {

    }

}//class MinMaxTree

}//namespace AI