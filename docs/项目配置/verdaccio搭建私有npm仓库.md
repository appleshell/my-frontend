---
title: verdaccio搭建私有npm仓库
---

[verdaccio 官方文档](https://verdaccio.org/zh-CN/)

[使用 verdaccio 搭建私有 npm 库](https://segmentfault.com/a/1190000021612560)，这篇文章中介绍了如何设置 veraccio 的权限

[Verdaccio docker 部署](https://juejin.cn/post/6906443738156826631)

向私有仓库 publish package 时，设置 package.json 中的`"publishConfig":{"registry": "http://localhost:4873/"}`，地址是私有仓库的地址
