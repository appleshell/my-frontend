---
title: 实现js中的一些api
---

手写编程的主要原则是，一定是首先理解需求内容，然后梳理思路。

具体到js中的api，首先要理解这些api的功能是什么，然后要清楚这些api的入参和返回值。

## Array中的一些API

### 实现map方法

```js
Array.prototype.myMap = function(callback, thisArg) {
  const arr = this
  let res = []

  for(let i = 0; i < arr.length; i++) {
    let res = callback(arr[i], i, arr)
    res.push(res)
  }

  return res
}

Array.prototype.myMap = function(callback, thisArg) {
  const arr = this

  const result = arr.reduce((accu, cur, i, arr) => {
    let res = callback.call(thisArg, cur, i, arr)
    accu.push(res)
    return accu
  }, [])

  return result
}
```

### 实现reduce方法

```js
[1,2,3,4].reduce((acc, cur) => {
  return acc + cur
}, 10)

Array.prototype.myReduce = function(callback, initialValue) {
  const arr = this
  initialValue = initialValue || arr[0]
  let accu = initialValue

  for(let i = 0; i < arr.length; i++) {
    accu = callback(accu, arr[i], i, arr)
  }

  return accu
}
```

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

### 用Generator函数和promise实现async/await，其实是写一个generator函数的自动执行器
