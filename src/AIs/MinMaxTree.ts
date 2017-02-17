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

}//namespace AI