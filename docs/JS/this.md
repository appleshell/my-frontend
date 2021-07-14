---
title: This in Javascript
---

学习文章[JavaScript: What is the meaning of this?](https://web.dev/javascript-this/#arrow-functions).

本文的文章结构摘自参考文章。采用`if ... else if ... else`的结构来组织文章，即下面的各种情况从上向下是互斥的。

## If the function is defined as an arrow function -- 箭头函数

## Otherwise, if the function is called with `new` -- 函数作为构造函数，用 new 关键字调用

## Otherwise, if the function has a 'bound' `this` value -- 使用 `bind` 生成的函数

## Otherwise, if `this` is set at call-time -- 使用 `call` 或者 `apply` 调用函数

## Otherwise, if the function is called via a parent object (`parent.func()`) -- 作为对象属性进行调用

## Otherwise, if the function or parent scope is in strict mode -- 严格模式下，this 是`undefined`

## Otherwise -- 最后的情况，this 指向 globalThis
