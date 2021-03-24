---
title: setState
---

1. 普通使用时是异步，在 setTimeout，DOM 事件中使用是同步的
2. setState 中是对象，就会合并执行；如果是函数，就不会合并

核心要点：

1. setState 主流程

this.setState(newState) → newState存入pending队列 → 是否处于batchUpdate机制中

→ 是 → 把组件保存在dirtyComponents中

→ 否 → 遍历所有dirtyComponents → 调用updateComponent → 更新 state or props

state或props更新后，render执行，然后进入reconciliation阶段

2. batchUpdate 机制

  batchUpdate主要是解决多次渲染的问题，因为每次调用setState都会触发render


3. transaction（事务）机制

事务机制，就是将目标函数包裹一下，加上前置和后置hook。目标函数执行之前限制性initialize hook，结束之后再执行close hook。

事务机制搭配上isBatchingUpdate这个布尔标识位，就可以实现一个函数内多次调用setState全部放入pending中，实现batchUpdate

[深入 react 细节之 - batchUpdate](https://zhuanlan.zhihu.com/p/78516581)


所以说，setState异步还是同步，就看是否处于batchUpdate机制。

能命中batchUpdate机制的情况：

  生命周期函数

  react中注册的事件（和它调用的函数）

不能命中的batchUpdate机制的情况：

  setTimeout setInterval等

  自定义DOM事件（和它调用的函数）