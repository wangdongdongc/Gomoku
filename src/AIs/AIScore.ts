/**
 * 棋型收益估分(不可变)
 */
class AIScore {
    static readonly WillSucceed = 100
    static readonly ooooo = 100
    static readonly oooo = 49
    static readonly ooo = 6
    static readonly Ioooo = 6
    static readonly Iooo = 3
    static readonly oo = 3
    static readonly Ioo = 1
    static readonly o = 0
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