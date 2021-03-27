---
title: http响应状态码
---

RFC 标准把状态码分为 5 类：

- 1xx：提示信息，表示目前是协议处理的中间状态。工作中很少使用
- 2xx：成功

  200 OK

  204 No Content，响应成功，但是没有响应头后面没有 body 数据

  206 Partial Content，响应成功，但 body 中不是资源的全部，只是一部分。通常 206 还会伴随 Content-Range 头字段，表示响应数据中的具体范围

- 3xx：重定向

  301 Move Permanently，永久重定向

  302 Found， 临时重定向

  301 和 302 都会使用响应头中的 Location 字段指明后续要跳转的 URI

  304 Not Modified，协商缓存的结果，表示资源未修改，可以使用缓存中的资源。

- 4xx：客户端错误，请求报文有误，服务器无法处理

  400 Bad Request，一个通用的错误码，没有反映出具体哪里出错了

  403 Forbidden，表示服务器资源禁止访问资源

  404 Not Found

  405 Method Not Allowed，不允许使用某些方法操作资源

- 5xx：服务器错误，服务器在处理请求时内部发生了错误
  
  500 Internal Server Error，通用的错误码

  501 Not Implemented，表示客户端请求的功能服务器还不支持

  502 Bad Gateway，网关或代理的错误

  503 Service Unavailable，表示服务器很忙，暂时无法响应

  504 Gateway time呕吐，表示服务器作为网关或者代理，没有及时从上游服务器收到请求