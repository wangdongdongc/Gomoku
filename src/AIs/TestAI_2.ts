
/**
 * Todo: MinMax 搜索算法进行决策
 */
class TestAI_2 extends GomokuAI {
    next: GomokuAction

    /**
     * 分析对手的动作
     */
    analysAction(action: GomokuAction) {

    }

    /**
     * 给出下一次动作
     */
    nextAction(): GomokuAction {
        return this.next
    }
}