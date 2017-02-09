

class MenuView extends CanvasView {
    /**
     * 视图持有对其控制器的引用
     */
    viewController: GomokuViewController

    buttonScale: number
    buttonColor: string
    buttonBoderWidth: number
    buttonBorderColor: string
    button1Alpha: number
    button2Alpha: number
    buttonGap: number
    button1: TwoHalfButton
    button2: TwoHalfButton
    button3: Circle
    button4: Circle

    private _statusMessage: string

    get statusMessage(): string {
        return this._statusMessage
    }
    set statusMessage(s: string) {
        this._statusMessage = s
        this.drawStatusBar()
    }

    constructor(width: number, height: number, viewController: GomokuViewController) {
        super(width, height, "menu")
        this.viewController = viewController
        this.buttonBoderWidth = 0.5
        this.button1Alpha = 0.5
        this.button2Alpha = 0.5
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


    private drawButtons() {
        this.context.clearRect(0, 0, this.bound.width, this.bound.height / 2)
        if (!this.buttonScale) {
            this.buttonScale = 0.45
        }
        this.buttonGap = this.bound.width / 4
        let centerX1 = this.buttonGap / 2
        let centerY = this.bound.height / 4
        let radius = Math.min(this.buttonGap / 2, this.bound.height / 4) * this.buttonScale
        this.button1 = new TwoHalfButton(centerX1, centerY, radius, "white", "black")
        this.button2 = new TwoHalfButton(centerX1 + this.buttonGap, centerY, radius, "rgb(225,233,243)", "rgb(30,157,255)")
        this.button3 = new Circle(centerX1 + this.buttonGap * 2, centerY, radius)
        this.button4 = new Circle(centerX1 + this.buttonGap * 3, centerY, radius)
        this.button1.borderWidth = this.buttonBoderWidth
        this.button2.borderWidth = this.buttonBoderWidth
        this.button3.borderWidth = this.buttonBoderWidth
        this.button4.borderWidth = this.buttonBoderWidth
        this.context.save()
        this.context.globalAlpha = 0.5
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

    /**
     * 在状态栏绘制状态信息
     */
    private drawStatusBar() {
        this.context.clearRect(0, this.bound.height / 2, this.bound.width, this.bound.height / 2)
        new TextShape(
            this._statusMessage, 
            this.bound.width / 2, this.bound.height / 3 * 2, 
            300, true)
            .drawOn(this.context)
    }

    private registerEvents() {
        this.addEventListener("click", (event: MouseEvent) => {
            if (Math.pow(event.offsetX - this.button1.centerX, 2) + Math.pow(event.offsetY - this.button1.centerY, 2) < Math.pow(this.button1.radius, 2)) {
                this.viewController.changeTheme(new DefaultTheme())
            }
            if (Math.pow(event.offsetX - this.button2.centerX, 2) + Math.pow(event.offsetY - this.button2.centerY, 2) < Math.pow(this.button2.radius, 2)) {
                this.viewController.changeTheme(new VividTheme())
            }
        })

        this.addEventListener("mousemove", (event: MouseEvent) => {
            if (Math.pow(event.offsetX - this.button1.centerX, 2) + Math.pow(event.offsetY - this.button1.centerY, 2) < Math.pow(this.button1.radius, 2)) {
                this.button1Alpha = 1
                this.redrawButton1()
            } else {
                this.button1Alpha = 0.5
                this.redrawButton1()
            }
            if (Math.pow(event.offsetX - this.button2.centerX, 2) + Math.pow(event.offsetY - this.button2.centerY, 2) < Math.pow(this.button2.radius, 2)) {
                this.button2Alpha = 1
                this.redrawButton2()
            } else {
                this.button2Alpha = 0.5
                this.redrawButton2()
            }
        })
    }
}