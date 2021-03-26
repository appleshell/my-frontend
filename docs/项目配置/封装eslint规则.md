---
title: 封装eslint规则
---

为了规范代码质量和风格，通常我们会在项目中引入 eslint。在团队中，为了统一多人协作过程中的代码规范，我们通常会制定一份 eslint 规则配置在项目中，下面简单介绍一下如何封装一份 eslint 规则。

[代码仓库](https://github.com/appleshell/eslint-config-myll)

1. `npm init`初始化项目，注意项目命名的规则是`eslint-config-*`。

2. 安装依赖。因为我们不是从 0 是配置，而是基于业界一些优秀的时间规则。我选的是[eslint-config-alloy](https://github.com/AlloyTeam/eslint-config-alloy)

3. 规则按功能分块：base 规则，react 规则，typescript 规则，如果是 vue 项目，可以添加 vue 规则

base 规则主要包括`eslint-plugin-prettier`和自定义的一些规则

react 规则主要扩展自`eslint-config-react`、`eslint-config-react-hooks`、`eslint-config-alloy/react`和`eslint-config-prettier/react`

4. 开发完毕之后就可以发布到 npm。

先注册一个 npm 账号

```shell
npm login // 登录命令
Username: // 输入注册时候的用户名
Password: // 密码
Email: (this IS public) // 注册时的邮箱
npm publish // publish 时会以 package.js 里 name 属性为包名
```

5. 在项目中用`npm i xxx`来安装，在`.eslintrc`文件中配置就完成了。

关于 eslint 如何工作的，看这篇文章[ESLint 工作原理探讨](https://blog.fundebug.com/2019/05/22/understand-eslint/)
