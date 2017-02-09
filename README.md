# Gomoku 五子棋游戏
使用 Typescript 编写的带有简单 AI 的五子棋小游戏。

[Typescript](http://www.typescriptlang.org/) 是微软的一个[开源项目](https://github.com/Microsoft/TypeScript)，在 Javascript 现有语法的基础上提供了与 C++、Java 类似的正宗的面向对象支持。使用 Visual Studio 或 Visual Studio Code 能够在编译期进行检查，执行安全的重构操作(重命名)。

## 运行
直接在浏览器中打开 `index.html`

## 编译
> Typescript(.ts) 源文件需要编译成 Javascript(.js) 才能在浏览器中运行

1. 安装 [npm](https://www.npmjs.com/) 包管理器
2. 进入项目根目录执行 `npm install` 以安装 Typescript
3. 安装完成后运行 `npm run build` 以启动编译 (相当于 `./node_modules/.bin/tsc --sourcemap`, 编译选项见 `tsconfig.json`)

![image](http://raw.github.com/wangdongdongc/Gomoku/master/images/github/demo.png)

## MVC 设计模式
游戏使用 [MVC](https://zh.wikipedia.org/wiki/MVC) (model-view-controller) 的模式组织程序

MVC 设计模式用 Model、View、Controller 将程序分为三个部分。

Model 处理游戏内部逻辑，不关心外观。

View 处理游戏的界面(UI)，不关心内部逻辑。

Controller 沟通 Model 和 View，使之成为一体

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
src/AIs/
```

## 一些抽象
`src/Shapes/` 下存放用于在 Canvas 绘制特定形状的类（如：Circle、Rectangle），这些类包装了 Canvas 的 API，防止 View 中出现大量的 Canvas API。

`src/Models/` 下存放供 Model 使用的一些数据结构，用于简化 Model 的代码。

`src/Themes/` 下包含了几种棋盘棋子的样式类，用于主题切换