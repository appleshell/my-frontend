---
title: Nestjs开发连接MongoDB
---

Nestjs 开发过程中，数据库使用 MongoDB，ORM 使用 mongoose。

1. 安装依赖

```js
pnpm add mongoose @nestjs/mongoose @nestjs/config
```

[@nestjs/mongoose](https://docs.nestjs.com/techniques/mongodb)是 nestjs 集成的可以使用装饰器。如果不想使用装饰器，可以直接使用[mongoose](https://mongoosejs.com/)

[@nestjs/config](https://docs.nestjs.com/techniques/configuration)是nestjs集成的可以方便获取`.env`中配置的变量。