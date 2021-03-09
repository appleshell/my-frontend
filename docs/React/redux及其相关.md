---
title: redux及其相关
---

本文主要记录`Redux`,`React-Redux`,`Redux-thunk`,`Redux-saga`,`Redux-middleware`等库的内容

## Redux

[手写一个Redux，深入理解其原理](https://segmentfault.com/a/1190000023084074)
[createStore的源码传送门](https://github.com/reduxjs/redux/blob/master/src/createStore.ts)
[深入理解Redux Middleware](https://mp.weixin.qq.com/s/3yoHo6UXI2VOPO9zWI2aCQ)

Redux核心概念： store，reducer，action；常用方法：dispatch，subscribe，getState

combineReducer: 整合不同模块的reducer

applymiddleware：redux的中间件机制

## React-Redux

[手写一个React-Redux，玩转React的Context API](https://segmentfault.com/a/1190000023142285)

React-Redux 的核心API：Provider和connect，Provider负责在全局注入store，connect负责让组件获取store，最后是当数据变化时，能够触发组件更新。

## React-Thunk

[Redux异步解决方案之Redux-Thunk原理及源码解析](https://segmentfault.com/a/1190000037437347)


## React-Saga

[手写Redux-Saga源码](https://segmentfault.com/a/1190000037525337)

