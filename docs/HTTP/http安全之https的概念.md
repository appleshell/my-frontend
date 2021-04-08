---
title: https的概念
---

1. HTTPS 可以理解成"HTTP over SSL/TLS"，与 HTTP 的对比图如下

![http vs https](https://static001.geekbang.org/resource/image/50/a3/50d57e18813e18270747806d5d73f0a3.png)

HTTPS 的安全功能依靠 SSL/TLS 提供

2. SSL/TLS

SSL：安全套基层（Secure Sockets Layer），由网景公司发明。

TLS：传输层安全（Transport Layer Security）。SSL 发展到 v3 时，被正式标准化，更名为 TLS。TLS1.0 实际是 SSLv3.1。

目前使用最广泛的是TLS1.2。

TLS由记录协议、握手协议、警告协议、变更密码规范协议、扩展协议等几个子协议组成，综合使用了对称加密、非对称加密、身份认证等许多密码学前沿技术。

浏览器和服务器在使用TLS建立连接时，需要选择一组恰当的密码算法来实现安全通信，这些算法组合被称为密码套件。

3. OpenSSL 是著名的开源密码学工具包，是 SSL/TLS 的具体实现。