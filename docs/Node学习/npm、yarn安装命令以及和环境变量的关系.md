---
title: npm、yarn安装命令以及和环境变量的关系
---

作为前端，我们经常会在项目目录下执行各种命令，安装各种依赖包。这些命令是如何执行的呢？

## npm、yarn 全局安装的包

参考这篇文章[yarn 如何全局安装命令以及和环境变量的关系](https://www.cnblogs.com/saysmy/p/9485648.html)

全局安装的包，执行其命令时，会通过环境变量查找该命令，如果找到就执行；如果在所有环境变量下都没找到，就会报出“系统找不到某某命令”的提示。

npm 和 yarn 在安装时，会在自动设置它们的环境变量；它们安装的全局包，就会放在它们环境变量对应的目录下面。

## 安装的本地包，即仅仅是项目依赖包

在项目中，命令都定义在`package.json`文件中的`scripts`属性中，执行`scripts`中的命令时，npm 默认会把`node_modules/.bin`添加到环境变量中，这样我们执行的实际是当前项目的`node_modules/.bin`目录下的命令。

参考：

[npm 文档：npm-run-script](https://docs.npmjs.com/cli/v7/commands/npm-run-script)

[node_modules .bin 目录哪里来的？](https://www.zhihu.com/question/333901187)

## node_modules .bin 目录哪里来

`node_modules/.bin`中的命令从哪儿来，第三方包中的`package.json`文件中如果存在`bin`字段，指向包的可执行文件，那么在安装这个包的时候，如果全局安装，npm 会把这个可执行文件 link 到`prefix/bin`（应该是系统层面的 bin 目录，或者理解为环境变量下存放命令的目录）；如果是本地安装，就会 link 到`./node_modules/.bin/`。

参考：

[npm 文档：package.json--bin](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#bin)

[node_modules .bin 目录哪里来的？](https://www.zhihu.com/question/333901187)

## npx

参考:

[npx 使用教程](https://www.ruanyifeng.com/blog/2019/02/npx.html)

[npm 文档：npx](https://docs.npmjs.com/cli/v7/commands/npx)
