---
title： React技术揭秘学习
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

    react16的Reconciler采用Fiber架构

### Fiber

1. 代数效应