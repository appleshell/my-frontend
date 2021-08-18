---
title: react-router
---

react-router 相关知识

hash

hash 变化会出发网页跳转，即浏览器的前进、后退

hash 变化不会刷新页面

hash 不会被提交到 server 端

h5 history

用的是 url 规范的路由，但跳转时不刷新页面

history.pushState

window.onPopState

参考文章：

[React-router-dom | 原理解析](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/a-little-bit-of-react-router-dom-e5b809fcb127)



======================================================================================================

react-router中使用的history库主要是基于浏览器的history API

在history模式下，history.push方法最终调用的时window.history.push，会修改url，但并不触发页面的更新

此时history库观察者模式，