# Gomoku 五子棋游戏
使用 Typescript 编写的带有简单 AI 的五子棋小游戏 (无禁手)。

> [Typescript](http://www.typescriptlang.org/) 是微软的一个[开源项目](https://github.com/Microsoft/TypeScript)，在 Javascript 现有语法的基础上提供了与 C++、Java 类似的正宗的面向对象与静态类型支持。使用 Visual Studio 或 Visual Studio Code 能够在编译期对代码进行检查，执行安全的重构操作(重命名)。

## 运行
* [在线玩](https://wangdongdongc.github.io/Gomoku/index.html)
* 下载源代码，在浏览器中打开 `index.html`

## 编译
> Typescript(.ts) 源文件需要编译成 Javascript(.js) 才能在浏览器中运行

1. 安装 [npm](https://www.npmjs.com/) 包管理器
2. 进入项目根目录执行 `npm install` 以安装 Typescript
3. 安装完成后运行 `npm run build` 以启动编译 (或 `./node_modules/.bin/tsc --sourcemap`, 编译选项见 `tsconfig.json`)

![image](http://raw.github.com/wangdongdongc/Gomoku/master/images/github/demo.png)

## MVC 设计模式
游戏使用 [MVC](https://zh.wikipedia.org/wiki/MVC) (model-view-controller) 的模式组织程序

对应的源码如下

### *Model*
实现五子棋的规则, 判断胜负
```
src/GomokuGame.ts
```
### *View*
实现 UI
```
src/Views/ComokuView.ts 游戏视图
src/Views/MenuView.ts 菜单视图
```
UI 基于 HTML5 [Canvas](https://zh.wikipedia.org/wiki/Canvas_(HTML%E5%85%83%E7%B4%A0)) 实现。Canvas 是 HTML5 的一个元素，它在页面上嵌入一个画布，并使用 Javascript 在上面绘制线条，形状，图像。

![image](http://raw.github.com/wangdongdongc/Gomoku/master/images/github/view-demo.png)

### *Controller*
```
src/GomokuViewController.ts
```
> 这个控制器同时管理了游戏视图和菜单栏视图，两个视图上发生的事件都交给这一个控制器处理

View 接受用户的在 UI 上进行的操作（鼠标点击，鼠标滑动），将动作发送给 Controller，Controller 处理动作。

例如：View 发现用户点击了 Canvas 元素的xx位置，告诉 Controller ，Controller 告诉 Model 玩家在棋盘中xx处落子，Model 处理落子，发现玩家获胜，告诉 Controller 玩家已获胜，Controller 最后控制 View 显示 “已获胜” 的字样。

## AI
游戏自带 AI，能够与玩家进行对战
```
src/AIs/AIScore.ts 棋型估分
src/AIs/TestAI_2.ts  AI
```
### AI 如何决策
AI 能够看到当前棋盘的棋子分布，就像玩家一样

AI 的决策包含防守和进攻

1. 防守：当玩家摆出能够危险的棋局时，在危险位置上落子防御。危险的棋局非常复杂，这里仅考虑一些基本的类型。例如：四连、两个三连同时出现。

2. 进攻：若无危险棋局，一般选择进攻。正如 AI 能够判断玩家可能摆出危险的棋局，AI 也能判断是否可以下出这些攻击力强的棋局。

### AI 如何判断棋局
AI 对不同的棋局进行估分，在不同的位置落子能够产生不同的棋局，选取分数最高的棋局落子。

AI 将尝试在棋盘的每一个空位置落子，然后检查上下左右与主对角线副对角线方向有多少个连子，连子的两边是否被堵住，连子中是否有间隔，这这些信息交给一个分值判断函数。
e.g.
```javascript
//这是一个进行分值判断的函数，它根据连子的个数(line)，两侧是否被堵住(block1, block2)，给出分数
//note: 这里分数被表示成了一些很形象的变量(oooo)
scoreOfStyle(line: number, block1: boolean, block2: boolean) {
    if (line == 5) return AIScore.ooooo
    if (block1 && block2) return 0
    switch (line) {
        case 4: return (block1 || block2) ? AIScore.Ioooo : AIScore.oooo
        case 3: return (block1 || block2) ? AIScore.Iooo : AIScore.ooo
        case 2: return (block1 || block2) ? AIScore.Ioo : AIScore.oo
        case 1: return 0
    }
}
```

这种判断棋型的方法能够判断多个 ooo 交叉的情况。因为不同的方向的棋局所产生的分数是可以叠加的。例如：检查水平方向时，发现了一个 ooo，检查斜方向时，又发现了 |oooo，这样的棋局显然可以获胜，若没有更直接的获胜棋局，AI 应该立刻在这种位置落子。


## 一些抽象
`src/Shapes/` 下存放用于在 Canvas 绘制特定形状的类（如：Circle、Rectangle），这些类包装了 Canvas 的 API，防止 View 中出现大量的 Canvas API。

`src/Models/` 下存放供 Model 使用的一些数据结构，用于简化 Model 的代码。

`src/Themes/` 下包含了几种棋盘棋子的样式类，用于主题切换