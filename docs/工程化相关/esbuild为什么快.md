---
title: esbuild为什么快
---

参考：[Why is esbuild fast?](https://esbuild.github.io/faq/#why-is-esbuild-fast)

1. esbuild使用Go语言开发，并且被编译为native code（可以理解成计算机能够直接运行的machine code）

2. 充分使用多线程并行的特点，而现代CPU都是多核的。

3. esbuild不依赖第三方包，避免了可能的数据转换

4. 高效率的利用内存