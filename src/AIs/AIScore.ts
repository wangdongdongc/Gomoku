/**
 * 棋型收益估分(不可变)
 */
class AIScore {
    /**立即获胜 */
    static readonly WillWin = 1000
    /**无法获胜(一定无法达成5连) */
    static readonly WillFail = 0
    static readonly Min = 0
    static readonly Dangerous = 60
    static readonly ooooo = 1000
    static readonly oooo = 100
    static readonly ooo = 40
    static readonly Ioooo = 40
    static readonly Iooo = 5
    static readonly oo = 5
    static readonly Ioo = 1
    static readonly o = 0
    static readonly Io = 0

    static readonly ooo_oo = AIScore.ooo - 1
    static readonly Iooo_oo = AIScore.Ioooo - 1
    static readonly oo_oo = AIScore.ooo_oo
    static readonly Ioo_oo = AIScore.Iooo_oo
    static readonly o_oo = AIScore.ooo_oo
    static readonly Io_oo = AIScore.Io + AIScore.oo
    static readonly o_o = AIScore.o + AIScore.o
    static readonly Io_o = AIScore.Io + AIScore.o
}


/**
 * 棋型威胁估分(不可变)
 */
class AIRivalScore {
    static readonly ooooo = 50
    static readonly oooo = 50
    static readonly ooo = 10
    static readonly Ioooo = 10
    static readonly Iooo = 3
    static readonly oo = 3
    static readonly Ioo = 1
    static readonly o = 0
}