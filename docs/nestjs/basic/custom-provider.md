---
title: Custom providers
---

1. 依赖注入（Dependency Injection）是Nest的核心概念之一。依赖注入是一种控制反转（inversion of control -- IOC）技术。你把依赖的实例化交给IOC容器，而不是通过自己写代码组织。回顾一下Provider的使用：

    - 使用`Injectable()`装饰器定义一个class最为provider；
    - 然后我们把这个class注入到controller中；
    - 最后我们用Nest IOC容器注册定义的provider。

  当IoC容器实例化controller时，首先寻找有没有依赖。如果找到了依赖，就根据注入的token去找到对应的class，并把这个class注册。Nest会对依赖进行分析，最后管理一个依赖图。

2. 在`app.module.ts`中，我们注册了providers：

    ```js
      @Module({
        controllers: [CatController],
        providers: [CatService]
      })
    ```
  实际上，上面注册providers的写法是简写，也是标准的注册provider的写法，完整的写法是：
    ```js
      providers: [
        {
          provider: CateService,
          useClass: CateService
        }
      ]
    ```
  这种完整的写法展示了如何注册provider，把token CateService 和class CatService关联在一起。在controller中注入的就是通过这个token。上面的写法中，这个token就是class的name。

  标准的注入provider的写法称为[constructor based injection](https://docs.nestjs.com/providers#dependency-injection)

3. 自定义provider有几种方式：
    - useValue：使用常量来作为provider，或者把外部的库放进Nest容器中。例如，可以使用javascript对象，也可以使用new关键字实例化的对象。

        token除了使用class的name，也可以使用字符串
        ```js
          import {connection} from './connection'

          @Module({
            providers: [
              {
                provider: 'CONNECTION',
                useValue: connection
              }
            ]
          })
          export class AppModule {}
        ```

        这种用string作为token的provider，在注入时，需要使用`@Inject()`装饰器
        ```js
          @Injectable()
          export class CatRepository {
            constructor(@Inject('CONNECTION') connection: Connection){}
          }
        ```

    - useClass: 除了标准的provider注册写法，也可以在这里添加判断条件，动态的注册符合条件的provider。例如，根据环境变量来使用配置服务。
    - useFactory: 可以基于函数的参数来动态注册provider。这个函数可以很简单，没有任何依赖。也可以很复杂，注入了其他的providers。这个factory函数的返回值就是我们要注册的provider。

        ```js
          const connectionProvider = {
            provider: 'CONNECTION',
            useFactory: (optionsProvider: OptionsProvider, optionalProvider?: string) => {
              const options = optionsProvider.get();
              return new DatabaseConnection(options);
            },
            inject: [OptionsProvider, {token: 'SomeOptionalProvider', optional: true}]
            //       \_____________/           \__________________/
            //       这个provider是必传          有这个token的provider可选
          }

          @Module({
            providers: [
              connectionProvider,
              OptionsProvider,
              // {provider: 'SomeOptionalProvider', useValue: 'anything'}
            ]
          })
          export class AppModule {}
        ```
        factory函数接收参数，inject属性是一个数组，每一项作为参数按照相同的顺序传递给factory函数。在appModule注册时，需要把依赖的provider注册进去。

    - useExisting: 通过别名，来使用已经注册的provider。
4. provider的作用域是它注册所在的module，想要被其他module使用，就需要导出。导出一个自定义的provider，既可以直接导出这个provder对象，也可以使用token导出。

5. 异步的provider，可以在使用useFactory时，给函数加上async/await语法实现。