---
title: Generator函数的简单理解
---

1. Generator 函数是个状态机，内部封装了多个状态。其返回值是个遍历器对象，可以用来遍历内部的状态

2. 协程和 Generator 函数。可以这样理解：

- Generator 函数定义和调用的位置处于父协程，Generator 函数内部是子协程
- 执行 next 函数时，父协程将执行权交给子协程。next 函数传入的参数，会赋给 yield 前面的变量。
- 子协程遇到 yield 关键字时，将执行权交给父协程。yield 后面的值就是返回对象中的 value。

3. Generator 函数是一个异步操作的容器。它的自动执行需要一种机制，异步操作有了结果后，父协程能够自动将执行权交给子协程。

实现方式有两种：

- 回调函数，异步操作包装成 Thunk 函数，将 next 传入其中调用，交回控制权。
- Promise，将异步操作包装成 Promise，在其 then 方法中通过调用 next 方法，交回控制权。这种思路可以用来理解 async/await 的实现。

  yield 后面的 promise 作为 value 返回给父协程，等到 promise 状态变为 fulfilled 后，执行 then 方法，其中调用 next 方法，就可以将控制权交给子协程。next 方法中传入 promise 成功后的数据，就会赋值给 yield 关键字前面定义的变量。

  ```js
  function fnAsync(val) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(val);
      }, 1000);
    });
  }

  function* fn1() {
    const v1 = yield fnAsync("vv1");
    const v2 = yield fnAsync("vv2");

    console.log(v1); // 打印出vv1
    console.log(v2); // 打印出vv2
  }

  function myCo(gen) {
    const g = gen();
    function next(data) {
      var res = g.next(data);
      if (res.done) return res.value;
      res.value.then((data) => next(data));
    }
    next();
  }

  myCo(fn1);
  ```
