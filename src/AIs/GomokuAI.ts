/**
 * 五子棋人工智能棋手抽象类
 *  (在控制器中使用继承该类的子类)
 */
abstract class GomokuAI {
    /**
     * 规定 AI 执白子
     */
    protected readonly player = GomokuPlayer.White

    /**
     * 分析对手的动作
     */
    abstract analysAction(action: GomokuAction)

    /**
     * 给出下一次动作
     */
    abstract getNextAction(): GomokuAction
}