/**
 * 包装了一个 Bootstrap 模态对话框的视图
 * 该对话框专用于显示历史记录与实现用户点击复盘
 */
var DialogView = (function () {
    function DialogView() {
        this.DialogID = "modal";
        this.HeaderID = "modal-header";
        this.BodyID = "modal-body";
        this.ListID = "history-list";
        this.FooterID = "modal-footer";
        this.dialog = document.getElementById(this.DialogID);
        this.header = document.getElementById(this.HeaderID);
        this.body = document.getElementById(this.BodyID);
        this.list = document.getElementById(this.ListID);
        this.footer = document.getElementById(this.FooterID);
    }
    /**
     * 显示对话框
     */
    DialogView.prototype.show = function () {
        $("#" + this.DialogID)["modal"]("show");
    };
    /**
     * 隐藏对话框
     */
    DialogView.prototype.hide = function () {
        $("#" + this.DialogID)["modal"]("hide");
    };
    DialogView.prototype.toggle = function () {
        $("#" + this.DialogID)["modal"]("toggle");
    };
    DialogView.prototype.addItem = function (content) {
        var newNode = document.createElement("li");
        newNode.classList.add("list-group-item");
        newNode.textContent = content;
        this.list.appendChild(newNode);
    };
    return DialogView;
}());
//# sourceMappingURL=DialogView.js.map