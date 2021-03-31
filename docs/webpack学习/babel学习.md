---
title: babel学习
---

Babel 是一个 JavaScript 的编译器，主要用于将 ES6+版本的代码转换为向后兼容的 JavaScript 语法，主要功能：

- 语法转换
- polyfill，为目标环境添加缺失的特性
- 源码转换

## babel 工作流程

input code → babel 编译 → output code

babel 编译主要包括三个步骤：

1. parsing，babel 将 input code 解析成 AST
2. transforming，编辑 AST
3. printing，输出 output code

babel-core 提供了上述能力，具体说：

babel-parser 负责第一步，babel-generator 负责第三步，

第二步：在[babel-core](https://babeljs.io/docs/en/babel-core)内部，[babel-traverse](https://babeljs.io/docs/en/babel-traverse)通过深度遍历的方式遍历 AST，
[babel-types](https://babeljs.io/docs/en/babel-types)提供用于修改 AST 节点的节点类型数据。
babel-core中的transform方法根据传入的option（预设和插件）对遍历到的节点进行转换，生成新的AST。

![babel工作流程](https://mmbiz.qpic.cn/mmbiz_png/QibeeJCUD7SRoaa75YINhicgsaEYeSvGOsBibnwg19n2JPrMmwuuUf52X7E1QJtjn6AtyJ2sRKkAoRIEuI6ygZNeg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

## 基本配置

presets，plugin是我们在`.babelrc`文件中常用的配置。

presets是一组插件集合，plugin是单独配置的插件，它们起作用的阶段是第二步，具体是其中transform的option参数。

babel-plugin主要分为三类：

- @babel/plugin-syntax-*，语法相关插件
- @babel/plugin-proposal-*，用于ES提案的特性支持
- @babel/plugin-transform-*，用于转换代码

官方提供的presets有：

- preset-env
- preset-react
- preset-typescript
- preset-flow

自己也可以封装preset，供公司内部项目公用。

## babel-polyfill

为不兼容 js 新语法，新 API 的运行环境提供兼容方案

是 core-js 和 regenerator 的集合。

core-js 是各种 polyfill 的集合，regenerator 是 Generator 函数的 polyfill。

babel 7.4 之后，babel-polyfill 已经废弃了，推荐直接使用 core-js 和 regenerator。

babel 本身只转换新语法，对于新 API，例如 Promise，Array.prototype.includes，则不会转换。

babel-polyfill 按需引入，在.babelrc 中设置@babel/preset-env的useBuiltIns属性为usage，降低打包的体积

## babel-runtime

babel-polyfill 会污染全局环境，babel-runtime 可以解决这个问题，通过自定义方法名。比如在开发第三方库的时候，一定要使用 babel-runtime

babel-runtime一般需要@babel/plugin-transform-runtime配合使用，plugin-transform-runtime相当于babel-runtime的方法库，可以按需引用。具体使用看[@babel/runtime](https://www.babeljs.cn/docs/babel-runtime)

[你不知道的 Babel（7000字，详解原理并手写插件）](https://my.oschina.net/u/4088983/blog/4545928)

[解剖 Babel — 向前端架构师迈出一小步](https://mp.weixin.qq.com/s/rioaemy9iRBxPnqFu-zOGQ)

[babel corejs@3 是如何按需 polyfill 原型对象方法的](https://zhuanlan.zhihu.com/p/139359864)
