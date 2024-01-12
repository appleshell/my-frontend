---
title: 浏览器中的Event Loop
---

[whatwg 中 Event Loop](https://html.spec.whatwg.org/multipage/webappapis.html#event-loops)，这是 HTML 规范中对于 event loop 的定义，包括了术语的定义和执行流程的定义。

[我知道你懂 Event Loop，但你了解到多深？](https://yeefun.github.io/event-loop-in-depth/)和 [从 event loop 规范探究 javaScript 异步及浏览器更新渲染时机](https://github.com/aooy/blog/issues/5)，这两篇问文章是对于规范的一些解读，增加了一些例子演示。

[Talk on the Event Loop](https://2014.jsconf.eu/speakers/philip-roberts-what-the-heck-is-the-event-loop-anyway.html)
Event Loop 和 call stack 是密不可分的。

## 消息队列和事件循环

消息队列和事件循环，其他线程的任务会被先放入消息队列中，等到主线程任务执行完毕，事件循环就把消息队列中的任务放入主线程进行执行

消息队列中的任务类型：输入事件（鼠标事件）、微任务、文件读写、webSocket、定时器，还包括与页面渲染相关的事件，如 js 执行、DOM 解析、样式计算、布局、css 动画等

消息队列可以有多个，根据任务类型，每个任务会添加到相应的消息队列中

宏任务和微任务

如何处理高优先级任务：任务都在消息队列中，如果 DOM 变化的任务放入消息队列时，前面已经有很多任务了，就会影响 DOM 变化实时性。

微任务可以用来处理高优先级任务，微任务的执行时机是当前宏任务执行完毕之后，渲染发生之前。

一个 task 的执行流程，先从宏任务队列中取出一个任务执行，执行完检查微任务队列，执行微任务，然后看是否需要渲染，这样一个 task 就执行结束。之后就是这样不断循环

js 异步是靠消息队列和事件循环实现的，但消息队列和事件循环不仅仅用来执行异步任务，浏览器中的一些任务也会依赖它执行。例如，解析 DOM，布局计算，垃圾回收等

## Promise

promise 的 then 方法用来注册回调函数，当 resolve 函数执行时，就会调用这个回调函数。

但通常 then 方法我们是在 new Promise 之后调用的，此时调用 resolve 函数，回调函数还没注册，就会报错。

因此这个回调函数的调用就放在微任务中，调用 resolve 后，回调函数变量放到微任务中。然后调用 then 方法注册回调，主线程任务执行完毕之后，调用微任务中方法，此时回调函数注册完毕，就可以正常调用。

```js
function MyPromise(executor) {
  let _onResolve = null;
  let _onReject = null;

  this.then = function (onResolve, onReject) {
    _onResolve = onResolve;
    _onReject = onReject;
  };

  function resolve(value) {
    _onResolve(value); // 这个地方就是回调函数的调用，如果直接调用，此时回调函数还未绑定，需要延迟调用，用微任务实现延迟调用，又比setTimeout可以保证执行的效率
  }

  executor(resolve, null);
}
```

熟记Promise的几个API

## Generator 函数

该函数返回一个遍历器对象，用于遍历函数中的每一个状态。yield 表达式用来定义状态

generator 函数和 promise 也可以实现异步

```js
function* get() {
  const res1 = yield axios("url1");
  console.log("ires1", res1);
  const res2 = yield axios("url2");
  console.log("ires2", res2);
}

const gen = get();
// 这个是执行器函数
function getGenPromise(gen, val) {
  return gen.next(val).value;
}

getGenPromise(gen)
  .then((res) => {
    console.log("res1", res);
    return getGenPromise(gen, res);
  })
  .then((res) => {
    console.log("res2", res);
    return getGenPromise(gen, res);
  });
```

自动执行包含promise的generator函数

```js
function run(gen) {
  const g = gen()

  function next(data) { // 这个data就是赋给yield关键字前面的那个变量
    let result = g.next(data) // 返回包含value和done属性的对象，value是个promise对象
    if(result.done) return result.value
    result.value.then(data => { // value是个promise，继续调用
      next(data) // 把promise的resolve的值传递个yield前面的变量
    })
  }

  next()
}
```

## async/await

async/await就是generator和promise的语法糖