---
title: 实现js中的一些api
---

手写编程的主要原则是，一定是首先理解需求内容，然后梳理思路。

具体到js中的api，首先要理解这些api的功能是什么，然后要清楚这些api的入参和返回值。

## Array中的一些API

### 实现map方法

### 实现reduce方法

### 实现filter方法

### 实现some和every方法

### 实现call

### 实现apply

### 实现bind

函数柯里化的运用

```js
Function.prototype.mybind = function(context, ...args) {
  return (...rest) => this.call(context, ...args, ...rest)
}
```

### 用Generator函数实现async/await
