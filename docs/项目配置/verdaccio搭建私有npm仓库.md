---
title: verdaccio搭建私有npm仓库
---

## verdaccio 使用步骤简介

[官方文档](https://verdaccio.org/docs/zh-CN/installation)

### 安装

`npm install -g verdaccio`

### 启动

`verdaccio`启动服务

### 配置文件

配置文件可以进行用户管理、源地址管理、包的权限管理等
### 权限

- 添加用户

```
npm adduser --registry http://locolhost:4873
```

- 配置包的发布和使用权限

[使用 verdaccio 搭建私有npm库](https://segmentfault.com/a/1190000021612560)

### 包项目

向私有仓库 publish package 时，设置 package.json 中的`"publishConfig":{"registry": "http://localhost:4873/"}`，地址是私有仓库的地址

### 业务项目

安装包之前使用

```
npm config set retistry=http://localhost:4873
```

设置源地址为私有仓库地址之后，npm安装所有的包都会通过私有仓库，如果私有仓库不存在这个包，就会通过配置文件的代理源地址下载。

lock文件中的所有包的源地址都是私有仓库的地址


参考：

[verdaccio 官方文档](https://verdaccio.org/zh-CN/)

[使用 verdaccio 搭建私有 npm 库](https://segmentfault.com/a/1190000021612560)，这篇文章中介绍了如何设置 veraccio 的权限

[Verdaccio docker 部署](https://juejin.cn/post/6906443738156826631)