---
title: npm、yarn安装命令以及和环境变量的关系
---

作为前端，我们经常会在项目目录下执行各种命令，安装各种依赖包。这些命令是如何执行的呢？

## npm、yarn 全局安装的包

参考这篇文章[yarn 如何全局安装命令以及和环境变量的关系](https://www.cnblogs.com/saysmy/p/9485648.html)

全局安装的包，执行其命令时，会通过环境变量查找该命令，如果找到就执行；如果在所有环境变量下都没找到，就会报出“系统找不到某某命令”的提示。

npm 和 yarn 在安装时，会在自动设置它们的环境变量；它们安装的全局包，就会放在它们环境变量对应的目录下面。

通过`yarn global dir`可以获取yarn全局安装的包数据的目录路径，`yarn global bin`可以获取yarn全局安装的工具包的可执行文件的目录路径

通过`npm config get prefix`可以获取npm全局安装的工具包的可执行文件的目录路径，这个路径下`node_modules`中就是全局安装的包的数据。

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

## npm link

npm link是把包创建了一个映射（也可以理解成是快捷方式），放到了全局或者项目的node_modules中。所以当修改源文件时，再执行包的命令，马上就会生效。

其实，我们`npm install`的时候，包被安装在`node_modules`下，在linux下，同时在`.bin`中会生成一个映射脚本；在windows下，则会在`.bin`下生成`.cmd`文件。这些行为都与npm link类似。

参考：

[The magic behind npm link](https://medium.com/@alexishevia/the-magic-behind-npm-link-d94dcb3a81af)

[npm link详解](https://champyin.com/2019/08/27/npm-link%E8%AF%A6%E8%A7%A3/)