var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AI;
(function (AI) {
    var TestAI_2 = (function (_super) {
        __extends(TestAI_2, _super);
        function TestAI_2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * 分析对手的动作
         */
        TestAI_2.prototype.analysAction = function (action) {
        };
        /**
         * 给出下一次动作
         */
        TestAI_2.prototype.nextAction = function () {
            return this.next;
        };
        return TestAI_2;
    }(GomokuAI));
})(AI || (AI = {}));
//# sourceMappingURL=TestAI_2.js.map