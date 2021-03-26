---
title: 配置github action
---

[github action 官方文档](https://docs.github.com/cn/actions)

## 使用 github action 发布 npm 包。

[发布 Node.js 包](https://docs.github.com/cn/actions/guides/publishing-nodejs-packages)

[Github Action 精华指南](https://zhuanlan.zhihu.com/p/164744104)

[自动化发布 npm 包及生成 Github Changelog](https://banyudu.com/posts/auto_publish_npm_and_generate_github_changelog.882513)

以下是步骤的简单概述：

1. 在项目根目录创建`.github > workflow > xxx.yml`文件

2. 在 yml 文件中根据 action 的规则配置工作流。下面是我项目中的配置

   ```yml
   name: CI
   on:
     push:
       branches:
         - master
     pull_request:
       branches:
         - master

   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v2

         - name: Publish
           uses: actions/setup-node@v1
           with:
             node-version: 12
             registry-url: https://registry.npmjs.org
         - run: yarn
         - run: yarn build:all
         - run: npm publish
           env:
             NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
   ```

3. 发布 npm 包需要校验身份，明写肯定不行，这里用到[加密的密码](https://docs.github.com/cn/actions/reference/encrypted-secrets)。

4. 需要配置的密码不是你的 npm 登录密码，而是 npm token，类似与 git 的公钥。[如何创建 access token](https://docs.npmjs.com/creating-and-viewing-access-tokens)

5. 代码提交到仓库后，github 根据 yml 文件的配置就会执行工作流
