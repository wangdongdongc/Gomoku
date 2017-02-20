

class MenuView extends AbstractCanvasView {
    static readonly MenuCanvasID = "menu"

    /**
     * 视图持有对其控制器的引用
     */
    private viewController: GomokuViewController

    private buttonScale: number
    private buttonColor: string
    private buttonBoderWidth: number
    private buttonBorderColor: string
    private button1Alpha: number
    private button2Alpha: number
    private button3Alpha: number
    private button4Alpha: number
    static readonly untouchedButtonAlpha = 0.5
    static readonly touchedButtonAlpha = 1
    private buttonGap: number
    private button1: TwoHalfCircle
    private button2: TwoHalfCircle
    private button3: TextCircle
    private button4: Circle


    private _statusMessage: string
    get statusMessage(): string {
        return this._statusMessage
    }
    set statusMessage(s: string) {
        this._statusMessage = s
        this.drawStatusBar()
    }


    private _chessCount = 0
    get chessCount(): number {
        return this._chessCount
    }
    set chessCount(x: number) {
        this._chessCount = x
        this.button3.number = this.chessCount
        this.redrawButton3()
    }

    constructor(width: number, height: number, viewController: GomokuViewController) {
        super(width, height, MenuView.MenuCanvasID)
        this.viewController = viewController
        this.buttonBoderWidth = 0.5
        this.button1Alpha = MenuView.untouchedButtonAlpha
        this.button2Alpha = MenuView.untouchedButtonAlpha
        this.drawButtons()
        this._statusMessage = ""
        this.drawStatusBar()
        this.registerEvents()
    }

    /**
     * 根据当前设定, 重绘 Menu 视图
     */
    redrawAll() {
        this.drawButtons()
        this.drawStatusBar()
    }

    /**
     * (游戏开始时)初始化并绘制所有按钮
     */
    private drawButtons() {
        this.context.clearRect(0, 0, this.bound.width, this.bound.height / 2)
        if (!this.buttonScale) {
            this.buttonScale = 0.45
        }

        this.buttonGap = this.bound.width / 4

        let centerX1 = this.buttonGap / 2
        let centerY = this.bound.height / 4
        let radius = Math.min(this.buttonGap / 2, this.bound.height / 4) * this.buttonScale

        this.button1 = new TwoHalfCircle(
            centerX1, centerY, radius,
            "white", "black")
        this.button2 = new TwoHalfCircle(
            centerX1 + this.buttonGap, centerY, radius,
            "rgb(225,233,243)", "rgb(30,157,255)")

        this.button3 = new TextCircle(centerX1 + this.buttonGap * 2, centerY, radius, 3)
        this.button4 = new Circle(centerX1 + this.buttonGap * 3, centerY, radius)
        this.button4.fill = true
        this.button4.fillColor = "grey"

        this.button1.borderWidth = this.buttonBoderWidth
        this.button2.borderWidth = this.buttonBoderWidth
        this.button3.borderWidth = this.buttonBoderWidth
        this.button4.borderWidth = this.buttonBoderWidth

        this.context.save()
        this.context.globalAlpha = MenuView.untouchedButtonAlpha
        this.button1.drawOn(this.context)
        this.button2.drawOn(this.context)
        this.button3.drawOn(this.context)
        this.button4.drawOn(this.context)
        this.context.restore()
    }

    private redrawButton1() {
        this.context.clearRect(0, 0, this.buttonGap, this.bound.height / 2)
        this.context.save()
        this.context.globalAlpha = this.button1Alpha
        this.button1.drawOn(this.context)
        this.context.restore()
    }

    private redrawButton2() {
        this.context.clearRect(this.buttonGap, 0, this.buttonGap, this.bound.height / 2)
        this.context.save()
        this.context.globalAlpha = this.button2Alpha
        this.button2.drawOn(this.context)
        this.context.restore()
    }

    private redrawButton3() {
        this.context.clearRect(this.buttonGap * 2, 0, this.buttonGap, this.bound.height / 2)
        this.context.save()
        this.context.globalAlpha = this.button3Alpha
        this.button3.drawOn(this.context)
        this.context.restore()
    }

    private redrawButton4() {
        this.context.clearRect(this.buttonGap * 3, 0, this.buttonGap, this.bound.height / 2)
        this.context.save()
        this.context.globalAlpha = this.button4Alpha
        this.button4.drawOn(this.context)
        this.context.restore()
    }

    /**
     * 在状态栏绘制状态信息
     */
    private drawStatusBar() {
        this.context.clearRect(0, this.bound.height / 2, this.bound.width, this.bound.height / 2)
        new TextShape(
            this._statusMessage, 
            this.bound.width / 2, this.bound.height / 3 * 2, true)
            .drawOn(this.context)
    }

    private registerEvents() {
        /**
         * 点击菜单栏的按钮：交由控制器处理
         */
        this.addEventListener("click", (event: MouseEvent) => {
            if (Math.pow(event.offsetX - this.button1.centerX, 2) + Math.pow(event.offsetY - this.button1.centerY, 2) < Math.pow(this.button1.radius, 2)) {
                this.viewController.changeTheme(new DefaultTheme())
            }

            if (Math.pow(event.offsetX - this.button2.centerX, 2) + Math.pow(event.offsetY - this.button2.centerY, 2) < Math.pow(this.button2.radius, 2)) {
                this.viewController.changeTheme(new VividTheme())
            }

            if (Math.pow(event.offsetX - this.button3.centerX, 2) + Math.pow(event.offsetY - this.button3.centerY, 2) < Math.pow(this.button3.radius, 2)) {
                if (this.viewController.showChessStep) {
                    this.viewController.showChessStep = false
                } else {
                    this.viewController.showChessStep = true
                }
            }

            if (Math.pow(event.offsetX - this.button4.centerX, 2) + Math.pow(event.offsetY - this.button4.centerY, 2) < Math.pow(this.button4.radius, 2)) {
                this.viewController.toggleDialog()
            }
        })

        /**
         * 将鼠标移动到菜单栏按钮时改变透明度：由视图自行处理
         * Todo: 每次鼠标移动都重绘是不合理的，应该设置一个额外变量 isInButton，使其仅在进按钮和出按钮时重绘
         */
        this.addEventListener("mousemove", (event: MouseEvent) => {
            if (Math.pow(event.offsetX - this.button1.centerX, 2) + Math.pow(event.offsetY - this.button1.centerY, 2) < Math.pow(this.button1.radius, 2)) {
                this.button1Alpha = MenuView.touchedButtonAlpha
                this.redrawButton1()
            } else {
                this.button1Alpha = MenuView.untouchedButtonAlpha
                this.redrawButton1()
            }

            if (Math.pow(event.offsetX - this.button2.centerX, 2) + Math.pow(event.offsetY - this.button2.centerY, 2) < Math.pow(this.button2.radius, 2)) {
                this.button2Alpha = MenuView.touchedButtonAlpha
                this.redrawButton2()
            } else {
                this.button2Alpha = MenuView.untouchedButtonAlpha
                this.redrawButton2()
            }

            if (Math.pow(event.offsetX - this.button3.centerX, 2) + Math.pow(event.offsetY - this.button3.centerY, 2) < Math.pow(this.button3.radius, 2)) {
                this.button3Alpha = MenuView.touchedButtonAlpha
                this.redrawButton3()
            } else {
                this.button3Alpha = MenuView.untouchedButtonAlpha
                this.redrawButton3()
            }

            if (Math.pow(event.offsetX - this.button4.centerX, 2) + Math.pow(event.offsetY - this.button4.centerY, 2) < Math.pow(this.button4.radius, 2)) {
                this.button4Alpha = MenuView.touchedButtonAlpha
                this.redrawButton4()
            } else {
                this.button4Alpha = MenuView.untouchedButtonAlpha
                this.redrawButton4()
            }
        })
    }
}
