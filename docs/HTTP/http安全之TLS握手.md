---
title: TSL握手
---

## HTTPS 建立连接

https 开头的网址输入后，浏览器从 URI 中拿到协议名和域名，端口号是 443，再用 DNS 解析拿到 IP。

然后通过 TCP 三次握手建立 TCP 连接。

进行 TLS 握手，在 TCP 上建立安全连接，之后就可以进行安全通信了。

概括讲，https连接大致可分为两个部分：第一是建立连接时的非对称加密握手，第二是握手后的对称加密报文传输。

## TLS 握手

我的理解是，TLS 握手本质是通信双方通过协商最终获得对称加密的密钥的过程。

1. TLS 包含几个子协议，可以理解成是职责不同的模块，常用的有记录协议（Record Protocol），警报协议（Alert Protocol），握手协议（Handshake Protocol），变更密码规范协议

### ECDHE 握手过程

![ECDHE握手过程](https://static001.geekbang.org/resource/image/9c/1e/9caba6d4b527052bbe7168ed4013011e.png)

1. 建立 TCP 连接后，浏览器发送`Client Hello`消息，包含客户端版本号，`Client Random`，支持的密码套件

2. 服务器收到后，返回`Server Hello`消息，包含`Server Random`，选中的密码套件（Cipher Suite）

3. 服务器返回证书给客户端，供客户端验证身份

4. 服务器返回`Server key Exchange`消息，包含`Server Params`。这个消息用服务器的私钥签名后传输

5. 服务器返回`Server Hello Done`消息

6. 客户端拿到证书后，先验证证书的有效性。

7. 然后根据选中的密码套件，生成`Client Params`。用`Client key Exchange`消息发送给服务器

8. 现在客户端和服务器都拿到密钥交换算法的两个参数：`Client Params`和`Server Params`，然后用 ECDHE 算法生成“Pre-Master”，是个随机数。

客户端和服务器手里都有三个随机数：`Client Random`，`Server Random`，`Pre-Master`。用这个三个参数生成用于加密会话的主密钥：`Master Secret`.

主密钥不是最终用于通信的会话密钥，它会扩展出更多密钥，避免只用一个密钥带来的安全隐患。

9. 客户端发送`Change Cipher Spec`消息，告知之后的消息用加密方式发送。然后发送`Finished`消息，把之前的数据做个摘要，加密发送，让服务器做验证。

10. 服务器同样发送`Change Cipher Spec`和`Finished`消息，验证加密解密OK，握手结束。之后的收发数据就都是加密传输了。

### RSA 握手

其与ECDHE握手的以主要区别是，`Pre-Master`不用算法生成，而是客户端申城随机数，通过`Client Key Exchange`消息发给服务器。这样就不会有`Server Key Exchange`消息。