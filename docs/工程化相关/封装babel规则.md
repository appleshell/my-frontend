---
title: 封装babel规则
---

@babel/preset-env 是官方提供的一个插件集合，我们在自己的项目中通常会再添加一些插件，所以我们可以以官方提供的 preset 为基础，封装自己的插件集合。

1. `npm init`初始化项目，注意项目命名的规则是`babel-preset-*`。

2. 安装 @babel/core、 @babel/preset-env、@babel/preset-react 以及其他想要添加的 babel 插件

3. 引入 @babel/preset-env 时要配置 polyfill，这里记住要安装 core-js

4. 安装其他需要添加的babel-plugin，并配置到plugins字段下

5. 发布到npm

