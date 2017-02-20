/**
 * 包装了一个 Bootstrap 模态对话框的视图
 * 该对话框专用于显示历史记录与实现用户点击复盘
 */
class DialogView {
    private readonly DialogID = "modal"
    private readonly HeaderID = "modal-header"
    private readonly BodyID = "modal-body"
    private readonly ListID = "history-list"
    private readonly FooterID = "modal-footer"
    private dialog: HTMLElement
    private header: HTMLElement
    private body: HTMLElement
    private list: HTMLElement
    private footer: HTMLElement

    /**
     * 显示对话框
     */
    public show() {
        $(`#${this.DialogID}`)["modal"]("show")
    }

    /**
     * 隐藏对话框
     */
    public hide() {
        $(`#${this.DialogID}`)["modal"]("hide")
    }

    public toggle() {
        $(`#${this.DialogID}`)["modal"]("toggle")
    }
 
    public addItem(content: string) {
        let newNode = document.createElement("li")
        newNode.classList.add("list-group-item")
        newNode.textContent = content
        this.list.appendChild(newNode)
    }

    constructor() {
        this.dialog = document.getElementById(this.DialogID)
        this.header = document.getElementById(this.HeaderID)
        this.body = document.getElementById(this.BodyID)
        this.list = document.getElementById(this.ListID)
        this.footer = document.getElementById(this.FooterID)
    }
}