---
title: 创建一个cli工具
---

基于 node 开发一个 cli 工具

## 脚手架工具概念

1. 脚手架解决的问题是减少人工在创建项目上的重复性工作，从而快速创建相同类型的项目。
2. 基础的脚手架工具需要包含两部分：cli功能 和 项目模板

## 简单步骤

1. 初始化项目，`npm init -y`

2. 在 package.json 文件中添加 bin 属性，属性名是自定义的命令的名字，指向代码运行的入口文件

    ```json
    "bin": {
      "my-cli": "./bin/index.js"
    }
    ```

3. 创建入口文件，在文件中写要运行的代码。注意要在文件头部写上`#!/usr/bin/env node`，用来告诉操作系
   统用 node 来运行这个文件。

4. 执行 npm install -g ，将 mei-cli 安装到全局。然后就可以在命令行工具中运行 cli 命令了。

5. 后续可以 publish 到 npm 上。

## 开发 cli 功能

1. 常用的组件：

- commander

  [使用 commander.js 做一个 Nodejs 命令行程序](https://www.w3cschool.cn/xhwqi/xhwqi-4hyt24se.html)

  上述文章中介绍了commander的一些常用API和用法

- chalk，修改终端文字颜色

- inquire

  通过配置好的问题与用户交互，获取用户输入的项目配置
