---
title: http的缓存
---

cache-control 是一个通用头字段，决定了使用什么样的缓存机制。

响应头中的 cache-control 字段决定响应的资源以何种方式缓存

请求头中的 cache-control 字段决定浏览器以哪种方式使用缓存

1. 从缓存策略理解：http 缓存分为强缓存和协商缓存

- 强缓存：即 Cache-Control 的 max-age 没有过期或者 Expires 的缓存时间没有过期

- 协商缓存：第一次请求时服务器返回的响应头中没有 Cache-Control 和 Expires，或 Cache-Control 的 max-age 和 Expires 过期，或 Cache-Control 的属性设置为 no-cache，第二次请求会与服务器进行协商

如果协商的结果是资源未修改，返回 304，告诉浏览器可以使用缓存。否则返回 200，新的资源一起返回。

跟协商缓存相关的 header 头属性有（ETag/If-Not-Match 、Last-Modified/If-Modified-Since）

这篇文章很详细的介绍了http缓存：[一文读懂http缓存（超详细）](https://mp.weixin.qq.com/s?__biz=MjM5MDE2NjYxNw==&mid=2447866020&idx=1&sn=74d965f9f29c8408d93da49031b42507&chksm=b25b2392852caa8430981da2bcc56deddb68547e10288566a8e946c34e77c6b93406ff87da88&scene=21#wechat_redirect)

2. 从缓存控制理解：http 分为服务器的缓存控制和浏览器的缓存控制

通常我们说 cache-control 都是理解响应头中的字段，包括理解强缓存和协商缓存。

请求头中的 cache-control我们通过浏览器的操作来理解：

请求头中会添加`Cache-Control: max-age=0`或`Cache-Control: no-cache`，不走缓存，服务器返回新资源

[HTTP请求头和响应头中cache-control的区别](https://segmentfault.com/a/1190000038996958)