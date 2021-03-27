---
title: http知识概览
---

## HTTP 协议版本

- HTTP/0.9 是个简单的文本协议，只能获取文本资源
- HTTP/1.0 确立了大部分现在使用的技术
- HTTP/1.1 是目前互联网上使用最广泛的协议
- HTTP/2 基于 Google 的 SPDY 协议，注重性能改善，尚未普及
- HTTP/3 基于 Google 的 QUIC 协议，是未来的发展方向

## HTTP 概念

HTTP，HyperText Transfer Protocol，超文本传输协议

- 协议

  HTTP 是一个用在计算机世界里的协议。它使用计算机能够理解的语言确立了一种计算机之间交流通信的规范，以及相关的各种控制和错误处理方式

- 传输

  HTTP 是一个在计算机世界里专门用来在两点之间输出市局的约定和规范

- 超文本

  互联网早期，文本指简单的字符文字，发展到现在，涵义已经极大扩展，包括图片，音频，视频，压缩包等都是文本。

  而超文本，就是超越了普通文本的文本，是普通文本，图片，音频，视频等的混合体，最关键的是含有超链接。最熟悉的超文本就是 HTML 文件。

## 与 HTTP 相关的应用

![与HTTP相关的应用](https://static001.geekbang.org/resource/image/51/64/5102fc33d04b59b36971a5e487779864.png)

- 浏览器

  HTTP 协议中的请求方，其角色被称为`User Agent`，即用户代理，作为访问者的代理发起 HTTP 请求。我们常称为客户端

- web server (web 服务器)

  HTTP 协议中的应答方。例如 Apache，Nginx 等。

- CDN，内容分发网络

- 爬虫

  另一类 User Agent

- HTML/WebService/WAF

## 与 HTTP 相关的协议

![与HTTP相关的协议](https://static001.geekbang.org/resource/image/1e/81/1e7533f765d2ede0abfab73cf6b57781.png)

- TCP/IP

- DNS

- URI/URL

- HTTPS

  全称是 HTTP over SSL/TLS。HTTPS 相当于`HTTP + SSL/TLS + TCP/IP`，SSL/TLS 位于 HTTP 和 TCP/IP 之间

- 代理

  代理种类：匿名代理、透明代理、正向代理、反向代理

  代理常见的功能：负载均衡、内容缓存、安全防护、数据处理

## TCP/IP 分层模型和 OSI 分层模型


## DNS

- 域名

  域名是一个层次结构，最右侧称为顶级域名，然后是二级域名，层级关系向左依次递减。

- 域名解析，即DNS

  DNS的核心系统是一个三层的树状、分布式服务，基本上对应着域名的结构：

    1. 根域名服务器（Root DNS Server）：管理顶级域名服务器，返回`com` 、`net`、`cn`等顶级域名服务器的IP地址；
    2. 顶级域名服务器（Top-level DNS Server）: 管理各自域名下的权威域名服务器。例如`com`顶级域名服务器可以返回`apple.com`域名服务器的IP地址；
    3. 权威域名服务器（Authoritative DNS Server）：管理自己域名下主机的IP地址。例如`apple.com`权威域名服务器可以返回`www.apple.com`的IP地址

  根域名服务器的地址是众所周知的。任何一个域名都可以在这个树形结构里自上而下的进行查询。

- DNS 缓存

  域名很多，上网的用户更多，如果直接去访问核心的DNS系统，会带来很大的性能问题。解决问题的办法就是利用缓存。

  很多大公司，网络运营商会建立自己的DNS服务器，被称为非权威域名服务器，可以缓存之前的查询结果。

  操作系统也会缓存DNS的解析结果。

  操作系统中还有一个特殊的主机映射文件（hosts）

  DNS查询顺序：

    浏览器缓存->操作系统dnscache ->hosts文件->非权威域名服务器->根域名服务器->顶级域名服务器->二级域名服务器->权威域名服务器。

  ![DNS系统](https://static001.geekbang.org/resource/image/e5/ac/e51df3245609880641043af65bba94ac.png)

- DNS 负载均衡

  一个域名可以对应多个IP地址，这样就可以把访问流量分摊到不同的主机上。