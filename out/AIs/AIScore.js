/**
 * 棋型收益估分(不可变)
 */
var AIScore = (function () {
    function AIScore() {
    }
    return AIScore;
}());
AIScore.WillSucceed = 100;
AIScore.ooooo = 100;
AIScore.oooo = 49;
AIScore.ooo = 6;
AIScore.Ioooo = 6;
AIScore.Iooo = 3;
AIScore.oo = 3;
AIScore.Ioo = 1;
AIScore.o = 0;
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