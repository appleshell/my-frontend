---
title: webpack学习之plugin
---

## Tabable

学习 webpack 的插件机制，就必须先学习[Tabable](https://github.com/webpack/tapable)

Tabable 的核心思路是基于**发布/订阅**模式。关于其原理的介绍可以查看这篇文章：[Webpack 插件机制之 Tapable-源码解析](https://juejin.cn/post/6844904004435050503)

Tabable 的核心就是 tab 和 call 方法，简单理解，tab 就是订阅事件，call 就是发布事件。

## plugin

从形态上看，插件通常是一个带有`apply`函数的类：

```js
class MyPlugin {
  apply(compiler) {
    // ...
  }
}
```

在`apply`函数中就可以注册 webpack 的各种钩子回调。

在 webpack 的初始化阶段，加载插件时，会遍历调用用户定义的插件的`apply`方法，即在初始阶段，插件就订阅了 webpack 的各种钩子。等到编译过程中触发钩子时，对应的插件注册的回调函数就会执行。

参考文章：

[Webpack 插件机制之 Tapable-源码解析](https://juejin.cn/post/6844904004435050503)

[[万字总结] 一文吃透 Webpack 核心原理](https://mp.weixin.qq.com/s/SbJNbSVzSPSKBe2YStn2Zw)

[[源码解读] Webpack 插件架构深度讲解](https://mp.weixin.qq.com/s/tXkGx6Ckt9ucT2o8tNM-8w)
