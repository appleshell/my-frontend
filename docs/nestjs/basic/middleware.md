---
title: Midlleware
---

1. Midlleware 在请求处理函数之前调用。其可执行的任务：
  - 执行任何代码
  - 修改请求和响应的数据
  - 结束一个请求-响应循环
  - 调用下一个中间件函数
  - 如果当前中间件没有结束当前的请求-响应，它需要调用next()方法来把控制权交给下一个中间件
2. Nest中自定义的middleware需要实现`NestMiddleware`。用`@Injectable`装饰，表示其是一个provider，可以被注入到其他地方。当然也可以注入其他的provider。
3. middleware is unaware of the execution context