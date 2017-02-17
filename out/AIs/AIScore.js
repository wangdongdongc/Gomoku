/**
 * 棋型收益估分(不可变)
 */
var AIScore = (function () {
    function AIScore() {
    }
    return AIScore;
}());
/**立即获胜 */
AIScore.WillWin = 1000;
/**无法获胜(一定无法达成5连) */
AIScore.WillFail = 0;
AIScore.Min = 0;
AIScore.Dangerous = 60;
AIScore.ooooo = 1000;
AIScore.oooo = 100;
AIScore.ooo = 40;
AIScore.Ioooo = 40;
AIScore.Iooo = 5;
AIScore.oo = 5;
AIScore.Ioo = 1;
AIScore.o = 0;
AIScore.Io = 0;
AIScore.ooo_oo = AIScore.ooo - 1;
AIScore.Iooo_oo = AIScore.Ioooo - 1;
AIScore.oo_oo = AIScore.ooo_oo;
AIScore.Ioo_oo = AIScore.Iooo_oo;
AIScore.o_oo = AIScore.ooo_oo;
AIScore.Io_oo = AIScore.Io + AIScore.oo;
AIScore.o_o = AIScore.o + AIScore.o;
AIScore.Io_o = AIScore.Io + AIScore.o;
/**
 * 棋型威胁估分(不可变)
 */
var AIRivalScore = (function () {
    function AIRivalScore() {
    }
    return AIRivalScore;
}());
AIRivalScore.ooooo = 50;
AIRivalScore.oooo = 50;
AIRivalScore.ooo = 10;
AIRivalScore.Ioooo = 10;
AIRivalScore.Iooo = 3;
AIRivalScore.oo = 3;
AIRivalScore.Ioo = 1;
AIRivalScore.o = 0;
//# sourceMappingURL=AIScore.js.map