/**
 * 五子棋人工智能棋手
 */
abstract class GomokuAI {
    /**
     * 规定为 AI 执白子, 后手
     */
    protected readonly player = GomokuPlayer.White

    /**
     * 分析对手的动作
     */
    abstract analysAction(action: GomokuAction)

    /**
     * 给出下一次动作
     */
    abstract nextAction(): GomokuAction
}