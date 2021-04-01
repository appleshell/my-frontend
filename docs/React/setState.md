---
title: setState
---

1. 普通使用时是异步，在 setTimeout，DOM 事件中使用是同步的
2. setState 中是对象，就会合并执行；如果是函数，就不会合并

核心要点：

1. setState 主流程

this.setState(newState) → newState 存入 pending 队列 → 是否处于 batchUpdate 机制中

→ 是 → 把组件保存在 dirtyComponents 中

→ 否 → 遍历所有 dirtyComponents → 调用 updateComponent → 更新 state or props

state 或 props 更新后，render 执行，然后进入 reconciliation 阶段

2. batchUpdate 机制

batchUpdate 主要是解决多次渲染的问题，因为每次调用 setState 都会触发 render

3. transaction（事务）机制

事务机制，就是将目标函数包裹一下，加上前置和后置 hook。目标函数执行之前限制性 initialize hook，结束之后再执行 close hook。

事务机制搭配上 isBatchingUpdate 这个布尔标识位，就可以实现一个函数内多次调用 setState 全部放入 pending 中，实现 batchUpdate

[深入 react 细节之 - batchUpdate](https://zhuanlan.zhihu.com/p/78516581)

所以说，setState 异步还是同步，就看是否处于 batchUpdate 机制。

能命中 batchUpdate 机制的情况：

生命周期函数

react 中注册的事件（和它调用的函数）

不能命中的 batchUpdate 机制的情况：

setTimeout setInterval 等

自定义 DOM 事件（和它调用的函数）


**注意**：每次 setState 之后，state 的值都会变化，而是否能最终渲染到 DOM 上，则要看 shouldCompoentUpdate 是否阻止渲染。react-devtool 中显示某个组件的 state 实际上是渲染出来的值，而不是组件实际的 state。例如下面的例子：

```jsx
  constructor(props) {
    super(props)
    this.state = {
      pCount: 0,
    }
  }

  static getDerivedStateFromProps(props, state){
    console.log('ccc', state)
  }

  shouldComponentUpdate() {
    if(this.state.pCount == 4) {
      return false
  }
  return true
  }
```

当页面上显示为4时，再调用setState，页面上显示的值和dev-tool中state的值都是4，但getDerivedStateFromProps函数中的state是5;

再一次调用setState，页面，dev-tool中，getDerivedStateFromProps函数中的state都是6。

所以shouldComponent控制的是渲染，而不是state的值变化。