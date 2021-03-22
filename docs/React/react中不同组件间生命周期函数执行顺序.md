---
title: react中生命周期函数执行顺序
---

首先要弄清楚`React.Component`和`React.PureComponent`的区别

react中组件之间的关系可以分为父子组件和兄弟组件两种，那么这两种组件之间的生命周期函数调用的顺序是什么样的呢？

先说父组件使用`React.PureComponent`

1. 子组件使用`React.Component`

  - mount阶段

    子组件先执行`componentDidMount()`，然后父组件再执行；

  - update阶段

    子组件自己的state更新，则只触发当前组件的`componentDidUpdate()`
    子组件引起了父组件的state变化，则先触发子组件的`componentDidUpdate()`，再触发父组件的`componentDidUpdate()`

2. 子组件使用`React.PureComponent`