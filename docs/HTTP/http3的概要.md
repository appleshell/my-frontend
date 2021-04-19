---
title: HTTP/3的概要
---

### HTTP/2存在的问题

HTTP/2在应用层解决了“队头阻塞”的问题，但是HTTP/2依然是基于TCP协议，TCP中依然会发生“队头阻塞”。

简单理解TCP队头阻塞：TCP会把数据分成一个个数据包进行传输，如果传输过程中某个包丢了，由于TCP的丢包重传机制，其他已收到的包就只能放在缓冲区，上层的应用拿不到，只能干等。

TCP协议的队头阻塞问题是固有的，即使HTTP协议再变化也解决不了这个问题。

### HTTP/3

HTTP/3是由谷歌发明提出，基于QUIC协议的新一代HTTP协议，即“HTTP over QUIC”.

![http协议对比](https://static001.geekbang.org/resource/image/d2/03/d263202e431c84db0fd6c7e6b1980f03.png)

QUIC协议的下层把TCP换成了UDP。

QUIC基于UDP，而UDP是无连接的，不需要握手和挥手。基于UDP实现了可靠传输，内涵TLS1.3，只能加密通信。

总之，HTTP/3保留了HTTP/2的优点，又解决了HTTP/2遗留的问题，基于UDP协议是传输效率更高。