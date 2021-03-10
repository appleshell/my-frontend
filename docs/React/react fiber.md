---
title: React Fiber Architecture
---

[React Fiber Architecture](https://github.com/acdlite/react-fiber-architecture)
[React 源码解析](https://xiaochen1024.com/article_item/600ac4384bf83f002edaf54a)

React Fiber的目标是增加在动画，布局和gestures(字面是手势，我理解为交互)领域的适用性。它的主要功能是incremental rendering(渐进式渲染)：能够将渲染工作分割成块，并将其分散到多个帧上。

其他的功能还包括：当新的更新进来时，能够暂停，中止或者复用工作；能够给不同类型的更新指定优先级；

## React 主要模块

- Scheduler（调度器）： 排序优先级，让优先级高的任务先进行reconcile

- Reconciler（协调器）： 找出哪些节点发生了改变，并打上不同的Tag

- Renderer（渲染器）： 将Reconciler中打好标签的节点渲染到视图上

Scheduler的作用是调度任务，react15没有Scheduler这部分，所以所有任务没有优先级，也不能中断，只能同步执行。

​Reconciler发生在render阶段，render阶段会分别为节点执行beginWork和completeWork，或者计算state，对比节点的差异，为节点赋值相应的effectTag（对应dom节点的增删改）

​Renderer发生在commit阶段，commit阶段遍历effectList执行对应的dom操作或部分生命周期

## React 执行流程概述

jsx代码初次执行：

1. jsx代码由React.createElement() 方法生成React元素对象
2. 根据React元素对象生成fiber节点，最后构成Fiber树
3. 由Fiber树生成真实DOM，执行一些生命周期函数

更新时：

1. current Fiber树根据更新生成的React元素对象 进行diff运算生成workInProgress Fiber树
2. workInProgress Fiber 变成current Fiber
3. 由Fiber树生成真实DOM，执行一些生命周期函数

## render phase

The result of the phase is a tree of fiber nodes marked with side-effects. 
这个阶段的结果就是生成一棵用side-effect标记的fiber树

这一阶段的工作是可以随时中断和继续的，优先保证每一帧的时间内执行优先级高的任务。

workloop: 

  遍历fiber树的顺序是：

  1. 从一个fiber节点开始（performUnitOfWork），开始工作（beginWork），执行当前节点的工作后，检查当前节点是否有子节点；

  2. 如果有，则重复步骤1。如果没有子节点，则当前节点工作完成（completeUnitOfWork）。

  3. 当前节点工作完成（completeUnitOfWork）后，检查当前节点是否有兄弟节点

  4. 如果有兄弟节点，则从步骤1开始执行

  5. 如果没有兄弟节点，则完成父节点工作

简而言之，执行一个节点工作，如果有子节点，就先完成子节点工作，然后完成当前节点，再执行兄弟节点工作，最后完成父节点工作。

## commit phase

这一阶段的工作不能被中断，因为涉及到DOM更新，这是用户可见的。

遍历fiber树最后返回effect-list，effect list决定了DOM节点的添加，更新和删除，以及组件的生命周期函数的调用。

## setState

setState调用后，会创建update，然后挂到新fiber节点的updateQueue上。然后执行调度，进入render phase阶段

## hook

hook是以链表的形式存在，所以不要再hook上使用条件判断
