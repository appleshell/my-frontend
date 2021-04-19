---
title: js异步
---

js中异步的概念，还有回调的概念

event loop

promise

async/await

理解async/await之前，一定要理解Generator函数

微任务和宏任务

  宏任务和微任务的一个重要区别：微任务（Promise，async/await）是ES6规定的内容，而宏任务（定时器，XMLHttpRequest，DOM事件）是W3C规定的内容。

  那么就可以这样理解，js执行时，先执行完同步的js代码，再把异步的js代码执行完，再去执行浏览器的api。
