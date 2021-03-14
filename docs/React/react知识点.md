---
title: react知识点
---

react 事件

react 表单，受控和非受控组件

  受控： react负责管理组件的状态

  非受控：react不负责管理组件状态，例如input元素不通过onChange事件把value给state，而是自己管理（通过ref获取DOM节点，通过DOM节点可获取value）

  input type=file时，是使用非受控组件的场景之一，通过ref去获取file的信息


父子组件通信，单向数据流

setState

 - 不可变值
 - 可能异步更新

    直接使用是异步的，在setTimeout中和自定义（addEventListener）中使用是同步的

 - 可能会被合并

    setState中传入对象时，调用多次，会被合并；传入函数时，则不会被合并。

react生命周期

  - 单组件生命周期
  - 父子组件生命周期，


portals，传送门，可以指定组件在DOM树中的渲染位置

context

  class组件使用

  函数组件使用

异步组件

  import() 、React.lazy、React.Suspense

性能优化

  shouldComponentUpdate

    默认返回true

    SCU一定要配合不可变值

    可先不用SCU，有性能问题的时候再用

  PureComponent和React.memo

    PureComponent，SCU中实现了浅比较

    memo，函数组件中的PureComponent

    浅比较已适用大部分场景

  immutable.js

    彻底拥抱“不可变值“

    基于共享数据（不是深拷贝），速度好

    有一定学习和迁移成本，按需使用

组件公共逻辑的抽离

  HOC

  Render Props
  

## 原理

不可变值

vdom和diff

  diff的原则：

    1. 只比较同一层级，不跨级比较
    2. tag不同，则直接删掉重建，不再深度比较
    3. tag和key，两者都相同，则认为是相同节点，不再深度比较

JSX 本质

合成事件

setState和patchUpdate

  setState同步还是异步，要看函数执行能否命中batchUpdate机制，如果命中，就会异步，没有命中，就是同步

  命中batchUpdate机制的场景：

    生命周期函数和它调用的函数

    React中注册的事件

    React可以管理的入口

react事务机制

  initialize --- method() --- close 

渲染和更新流程

fiber如何优化性能

  更新过程两个阶段

    render阶段（reconciliation）：执行diff算法，将任务拆分，按优先级分段执行，requestIdleCallback
    
    commit阶段：将diff结果渲染成DOM