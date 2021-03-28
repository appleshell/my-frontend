---
title: http的实体数据
---

## 数据类型

用来标记数据类型的规范是`MIME type`，HTTP 中常用的类型如下：

- text：文本格式，例如`text/html`,`text/plain`,`text/css`
- image：图像文件，例如`image/gif`,`image/png`,`image/jpeg`
- audio/vedio：音视频数据，例如`audio/mpeg`,`video/mp4`
- application：数据格式不固定，可能是文本也可能是二进制，必须由上层应用程序来解释。常见的有：`application/json`,`application/javascript`等。

数据类型使用的头字段：

- Accept：请求头字段，告诉服务器客户端希望接收什么类型的数据。可以使用","分隔多个类型

  ```
  Accept: text/html,application/xml,image/webp,image/png
  ```

- Content-Type：响应头字段，表示返回数据的真实类型

## 数据编码（压缩方式）

Encoding Type，即编码压缩类型常用的有：

- gzip：GNU zip 压缩方式，是互联网上最流行的压缩格式
- deflate：流行程度仅次于 gzip
- br

数据编码的头字段：

- Accept-Encoding：请求头字段，标记客户端支持的压缩类型
- Content-Encoding：响应头字段，表示数据实际使用的压缩类型

这两个字段可以省略，请求头里省略，表示客户端不支持压缩数据；响应头省略，表示数据没有被压缩

## 语言类型

- Accept-Language 请求头字段，标记了客户端可以理解的自然语言

```
Accept-Language: zh-CN, zh, en
```

- Content-Language 响应头字段，标记返回的数据实际使用的语言类型

## 字符集

现在互联网中标准是遵循 UTF-8 字符编码方式的 Unicode 字符集

- Accept-Charset：请求头字段，标记客户端支持的字符集

响应头中没有对应的字段，而是在 Content-Type 字段中数据类型后面使用`charset=xxx`的格式来表示

```
Accept-Charset: gbk, utf-8
Content-Type: text/html; charset=utf-8
```

## 内容协商的质量值

在 HTTP 协议里用 Accept、Accept-Encoding、Accept-Language 等请求头字段进行内容协商的时候，还可以用一种特殊的“q”参数表示权重来设定优先级，这里的“q”是“quality factor”的意思。

权重的最大值是 1，最小值是 0.01，默认值是 1，如果值是 0 就表示拒绝。

```
Accept: text/html,application/xml;q=0.9,*/*;q=0.8
```

它表示浏览器最希望使用的是 HTML 文件，权重是 1，其次是 XML 文件，权重是 0.9，最后是任意数据类型，权重是 0.8

## 传输大文件

1. 压缩 HTML 等文本文件
2. 分块传输

响应头中使用`Transfer-Encoding: chunked`来表示 body 中的数据是分了许多的块（chunk）逐个发送的

3. 范围请求

请求头中使用`Range: bytes=x-y`表示获取 x 到 y 的数据范围

响应头需要使用`Accept-Ranges: bytes`表示服务器支持范围请求，使用`Content-Range: bytes x-y/length`表示返回数据的实际范围和数据总长度
