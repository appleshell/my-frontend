---
title: 浏览器中的http
---

主要介绍http1到http2，再到http3的发展。

## http/0.9

http/0.9需求很简单，主要用来传输HTML文件内容

http/0.9的请求流程：

![http/0.9](https://static001.geekbang.org/resource/image/db/34/db1166c68c22a45c9858e88a234f1a34.png)

特点：

  - 只有请求行，没有http请求头和请求体

  - 没有返回头信息，只返回数据

  - 因为是HTML格式文件，所以是以ASCⅡ字节码传输的



## http/1.0

http/1.0的核心诉求是支持多种类型的文件下载，包括html、js、css、图片、音频、视频等。

http/1.0的请求流程：

![http/1.0](https://static001.geekbang.org/resource/image/b5/7d/b52b0d1a26ff2b8607c08e5c50ae687d.png)

http/1.0通过请求头和响应头进行协商，以支持不同类型的文件传输。此外还新增了状态码、Cache机制、用户代理的特性。

## http/1.1

在http/1.0的基础上，新增了一下功能：

- 改进持久连接

    减少TCP建立链接（三次握手）和断开连接（四次挥手）次数，提高网络传输的效率。

- http管线化

    解决[队头阻塞](https://cloud.tencent.com/developer/article/1509279)，但是存在各种问题，各大浏览器都放弃了管线技术。

- 提供虚拟主机的支持

    请求头中的host字段

- 支持动态生成的内容

- 客户端cookie和安全机制

## http/2

http/1.1为网络优化做出的三个主要工作：

- 增加持久链接
- 浏览器为每个域名最多同时维护6个TCP持久连接
- 使用CDN的实现域名分片机制

http/1.1存在的问题：对带宽利用率不理想，造成这个问题的原因是：

1. TCP慢启动
2. 同时开启多条TCP链接
3. 队头阻塞

http/2解决上述问题的方案是**多路复用**：一个域名只使用一个 TCP 长连接来传输数据。

1. 整个页面资源下载只需要一次慢启动
2. 避免多个TCP链接竞争带宽
3. 实现资源并行请求，解决了应用层面的队头阻塞问题

多路复用的实现机制是添加了一个二进制分帧层。

其他特性：

- 可以设置请求的优先级、服务器推送、头部压缩

## http/3

http/2的问题：

- TCP 的队头阻塞

    在 TCP 传输过程中，由于单个数据包的丢失而造成的阻塞称为 TCP 上的队头阻塞。

- TCP 建立连接的延时： RTT

-TCP 协议僵化

http/3基于UDP协议，实现了QUIC协议。http/2和http/3的对比：

![](https://static001.geekbang.org/resource/image/0b/c6/0bae470bb49747b9a59f9f4bb496a9c6.png)

HTTP/3 中的 QUIC 协议集合了以下几点功能:

- 实现了类似 TCP 的流量控制、传输可靠性的功能
- 集成了 TLS 加密功能
- 实现了 HTTP/2 中的多路复用功能
- 实现了快速握手功能

[一文搞懂TCP与UDP的区别](https://blog.fundebug.com/2019/03/22/differences-of-tcp-and-udp/)
