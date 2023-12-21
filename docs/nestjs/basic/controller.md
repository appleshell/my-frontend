---
title: Controller
---

1. 控制器负责接收请求，返回响应给客户端

   Controllers are responsible for handling requests and returning responses to the client.

2. 路由决定哪个控制器接收哪个请求。每个控制器中可以包含多个子路由。
3. `@Controller()`中可传入参数，作为路由的前缀，`@Get()`方法装饰器中传入参数，作为子路由
4. 处理函数