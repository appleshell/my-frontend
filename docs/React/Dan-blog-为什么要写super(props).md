---
title: 为什么要写super(props)
---

## 四个问题

- Why do we call `super`?

试想，如果在 super 之前调用了一个函数，函数中使用了`this.name`，但此时`this.name`还没有定义

- Can we not call it?

- If we have to call it, what happens if we don't pass `props`?

- Are there any other arguments?
