---
title: React技术揭秘学习
---

不管学习 react 的源码还是 vue 的源码，我认为一定要先理解 MVC 和 MVVM 两种架构模式。

## 理念篇

### React 理念

1. CPU 瓶颈，计算量过大导致页面掉帧。

- 浏览器的 GUI 渲染线程和 JS 线程是互斥的，在一个渲染周期内，js 执行事件过长（例如大量组件需要生成），导致没有足够时间执行布局、绘制，从而出现掉帧
- 解决问题的办法是**时间切片**（time slice），将 js 的长任务切分到每一帧中。源码中，每一帧中 js 的可执行时间是 5ms。

2. IO 瓶颈，网络延迟导致需要等到数据返回后才能进行后续操作

- React 的解决方案是实现了`Suspense`以及配套的 hook，`useDeferredValue`。

3. 总结，解决 CPU 瓶颈和 IO 瓶颈的方法是：将同步的更新变为可中断的异步更新。

### react 的新老架构

1. react15 的架构分为两层：

   - Reconciler（协调器）-- 负责找出变化的组件
   - Renderer（渲染器）-- 负责将变化的组件渲染到页面上

   react15 采用的是递归更新的方式，而递归的过程不能中断。

   react15 中 Reconciler 和 Renderer 是交替工作

2. react16 的架构分为三层

   - Scheduler（调度器）-- 调度任务的优先级，高优先级先进入 Reconciler
   - Reconciler（协调器）-- 负责找出变化的组件
   - Renderer（渲染器）-- 负责将变化的组件渲染到页面上

   react16 的 Reconciler 采用 Fiber 架构

### Fiber

1.  代数效应

    在函数式编程中，是指将**副作用**从**函数**调用中分离。

    react 中代数效应的应用例子之一是 Hooks，我们不用关心 hooks 怎么实现的，类似于 useState、useReducer、useRef，我们不需要知道它们在函数组件中怎么运行，只需要知道它们返回的就是我们需要的状态。

    代数效应中的`try...hanlde`，是实现 react 异步可中断的思路，即中断后，重新执行时还可以接着上次中断的位置继续执行。

2.  Fiber 的三层含义

    - 架构层面来说，react 15 采用的是 stack Reconciler 架构，递归方式创建和更新虚拟 DOM。react 16 的 Reconciler 基于 Fiber 节点，实现异步可中断的更新

    - 静态数据结构层面来说，每个 fiber 节点对应一个 react Element 对象，包含了该组件的信息。

    - 动态数据结构层面来说，每个 fiber 节点包含了本次更新中，该组件改变的状态，要执行的工作

3.  fiber 节点通过`return`、`child`、`sibling`三个属性，构成 fiber 树。

4.  双缓存 fiber 树

    4.1 react 中最多会同时存在两颗 fiber 树。当前屏幕上显示内容内容对应的 fiber 树，成为 current fiber 树；在内存中构建的 fiber 树成为 workInProgress fiber 树

        两颗 fiber 树中的每个对应 fiber 节点，通过 alternate 属性关联，即相互指向对方

    4.2 一个 react 应用有一个根节点，称为 fiberRoot。组件树的根节点称为 rootFiber，例如常见的`<App/>`组件所在的组件树的根节点，就称为 rootFiber。

        一个应用只有一个 fiberRoot，但是可以有多个 rootFiber，例如我们可以多次调用 ReactDOM.render 方法来渲染不同的组件树

    4.3 在应用 mount 阶段，

    - 创建 fiberRoot 和 rootFiber，fiberRoot 的 current 指针指向 rootFiber。 `fiberRoot.current = rootFiber`

    - render 阶段，根据 jsx 在内存中依次创建的 fiber 节点，并连接在一起构成 fiber 树，称为 workInProgress Fiber 树。在构建 workInProgress Fiber 树的过程中，会尝试复用 current Fiber 树中已有的 fiber 节点内的属性。

    - commit 阶段，将构建完成的 workInProgress fiber 树渲染到页面，fiberRoot 的 current 指针指向 workInProgress fiber 树，即变成了 current fiber 树。

    4.4 在 update 阶段，改变数据触发更新后，就会重复 render 阶段的构建 workInProgress fiber 树的过程，同样会尝试复用 current fiber 树中的节点，然后进行 commit 阶段。current fiber 树和 workInProgress fiber 树交替更换。

5.  reconciler 工作阶段称为 render 阶段，因为这个阶段会调用组件中的 render 方法；renderer 工作阶段称为 commit 阶段，可以理解成把 render 阶段完成的工作提交并渲染到页面。

## 架构篇

### render阶段

### commit阶段
