---
title: FiberRoot和RootFiber
---

先说我自己的理解：

### FiberRoot

FiberRoot 是 fiber 树挂载的对象，其中的 current 属性指向 current fiber tree，即当前渲染的 DOM 对应的 fiber tree。

FiberRoot 可以通过 container._reactRootContainer._internalRoot 访问到，container 就是 ReactDOM.render 方法传进去的容器对象。

### RootFiber

RootFiber 是 fiber 树的根 fiberNode，是一个 fiber 对象，其中的 stateNode 属性指向 FiberRoot。

RooteFiber是由createHostRootFiber方法返回，其tag属性是HostRoot。

commit阶段的fiber树的遍历起点就是RootFiber。

参考文章：

[react 源码中，reactRoot,fiberRoot,rootFiber 的关系,为什么要这么设计](https://www.zhihu.com/question/361787198)

[React 是如何创建 vdom 和 fiber tree](https://mp.weixin.qq.com/s/dnoU0aca7zmxC0tnAitBjA)
