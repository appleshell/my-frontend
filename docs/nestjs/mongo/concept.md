---
title: 前置概念
---

在nestjs中，我们使用mongoose来操作mongoDB. Mongoose is the most popular MongoDB object modeling tool.

1. 使用Mongoose时，记住所有东西都派生自**Schema**。每个Schema映射一个MongoDB的collection，定义了了这个collection中document的结构。
2. Schema is used to define Models. **Models**负责在MongDB中create和read数据。
3. 可以使用mongoose本身的功能来创建schema，也可以使用内置的`@nestjs/mongoose`，通过装饰器来创建schema
4. `@Schema()`装饰器用来标记一个class是一个shcema definition，可传入option参数，这个option参数就是`new mongoose.Schema({}, option)`中的option。参考[文档](https://mongoosejs.com/docs/guide.html#options)
5. `@Prop()`装饰器用于定义document中一个property。@Prop() 可以接受一个[schema types](https://mongoosejs.com/docs/schematypes.html)参数用于标记当前property的类型。但是得益于Typescript的类型推导功能，通常可不指定。但是对于复杂的类型，例如数组或者多层对象，则需要显式的指定schema types。
   
   @Prop()还可以传入option对象，这个option对象可以指定一个property是否requried，指定默认值等。参考[option](https://mongoosejs.com/docs/schematypes.html#schematype-options)

   如果schema property关联另一个collection中的属性，则在在option中添加参数：
   ```js
      import * as mongoose from 'mongoose'
      import { Owner } from '../owners/schemas/owner.schema';

      @Porp({type: mongoose.Schema.Types.ObjectId, ref: 'Owner'})
      owner: Owner

      // 关联多个，可传入数组
      @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Owner'}]})
      owner: Owner[]
   ```

6. 使用定义好的schema。MongooseModule提供了`forFeature()`方法来配置当前module。在当前dodule中importforFeature的调用，传入schema：
   ```js
      @Module({
        import: [MongooseModule.forFeature([{name: Cat.name, schema: CatSchema}])]
      })
   ```