---
title: http的cookie机制
---

HTTP是无状态的协议，这既是优点也是缺点，优点是可以很容易组成集群，缺点是无法支持需要记录状态的操作。

Cookie机制给HTTP增加了“记忆能力”。

## Cookie的工作过程

  在http头中需要用到两个字段：响应头字段`Set-Cookie`和请求头字段`Cookie`。

  浏览器第一次访问服务器，服务器创建一个“key=value”格式的身份标识数据放进`Set-Cookie`字段中。`Set-Cookie`可以有多个

  第二次请求时，浏览器会自动把这个值放进`Cookie`字段中发给服务器。`Cookie`字段中的多个cookie使用';'隔开。

## Cookie的组成属性

  - 生存周期

    `Expires`字段和`Max-Age`字段，前者是绝对时间，后者是时长，后者优先级高。

  - Cookie的作用域

    `Domain`和`Path`执行Cookie所属的域名和路径

  - Cookie的安全性

    `HttpOnly`，表示此cookie只能通过http协议访问，禁止其他方式访问。例如`document.cookie`这种js访问方式。可以有效防止XSS攻击

    `SameSite`，可以防范CSRF攻击

    `Secure`，表示这个Cookie只能用HTTPS协议加密传输。

