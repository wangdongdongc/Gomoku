class MenuView extends CanvasView {
    /**
     * 视图持有对其控制器的引用
     */
    viewController: GomokuViewController

    buttonScale: number
    button1: Circle
    button2: Circle
    button3: Circle
    button4: Circle

    constructor(width: number, height: number, viewController: GomokuViewController) {
        super(width, height, "menu")
        this.viewController = viewController

        this.buttonScale = 0.5
        let buttonGap = this.bound.width / 4
        let centerX1 = buttonGap / 2
        let centerY = this.bound.height / 4
        let radius = Math.min(buttonGap / 2, this.bound.height / 4) * this.buttonScale
        this.button1 = new Circle(centerX1, centerY, radius)
        this.button2 = new Circle(centerX1 + buttonGap, centerY, radius)
        this.button3 = new Circle(centerX1 + buttonGap * 2, centerY, radius)
        this.button4 = new Circle(centerX1 + buttonGap * 3, centerY, radius)
        this.button1.drawOn(this.context)
        this.button2.drawOn(this.context)
        this.button3.drawOn(this.context)
        this.button4.drawOn(this.context)

        this.drawStatusBar()
    }

    private drawStatusBar() {

    }
}