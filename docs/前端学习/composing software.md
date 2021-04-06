---
title: composing software
---

记录一下读[《Composing Software: An Introduction》](https://medium.com/javascript-scene/composing-software-an-introduction-27b72500d6ea)的一些点：

1. software development is “the act of breaking a complex problem down into smaller problems, and composing simple solutions to form a complete solution to the complex problem.”

   软件开发就是把复杂问题分成小问题，再把这些小问题的简单的解决方法组合成最终的复杂问题的解决方法

2. Function composition is the process of applying a function to the output of another function.

    函数组合就是把一个函数的输出结果作为另一个函数输入的过程。

    promise的链式调用是函数组合，函数柯里化也是函数组合

3. composing object

    Any time you build any non-primitive data structure, you’re performing some kind of object composition.

    构建非原始类型的数据结构，就是在操作某种对象组合。