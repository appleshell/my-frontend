---
title: Module
---

1. A Module is a componet. Every application has a root module. It is the starting point Nest uses to build the application graph.
2. 一个功能模块可以通过export对外暴露封装在其内的providers，当别的模块import这个模块后，别的模块就可以把这些暴露的providers注入到需要的位置。
3. nest中，模块都是单例的，被import多次的模块，指向的都是同一个模块
4. 如果要在多个模块中使用同一个模块，可以考虑把这个模块设置为全局模块。在其他模块中就不需要再import这个全局模块了。
5. 动态模块，简单理解就是根据条件不同，模块提供的providers也不同
6. Modules defined groups of components like providers and controllers that fit together as a modular part of an overall application. They provide an execution context, or scope, for these components.
   providers定义在一个module中，这个模块中的其他成员可以直接使用，而不需要在这个module中export这个provider。如果想要在其他module中使用，就需要在当前module中export这个provider，然后在需要使用的module中import定义了那个provider的module。
7. **动态**模块的使用场景：
   对于静态模块绑定，消费模块通常不能对宿主模块中定义的provider进行配置。但是有时我们需要根据不同的使用场景来获得不同的结果。这个很像**插件**的概念，一个通用的工具，通常需要消费者进行一定配置才能使用。例如：配置模块的使用，根据不同的运行环境，通过对配置模块进行配置，实现多环境的使用，比如数据库的连接。

   以`ConfigModule`为例，来看看如何定义一个动态模块。

      通常，我们会从根目录下的`.env`文件中获取配置，但是有时我们会把这个文件放在根目录下的`config`文件中，所以要实现的功能是能够自定义env文件的访问目录。

      - configModule是一个class，包含一个静态方法，通常我们命名为`register`或`forRoot`
      - `register`方法接受参数，这个例子中是env文件的路径。
      - 动态模块通常是被import的，所以`regiser`方法必须返回一个module。
      - 一个静态模块通常包含：imports，controllers，providers和exports这几个属性，动态模块返回的模块中这几个属性是可选的，但是必须包含一个`module`属性,这个属性必须和定义的动态模块的name相同。
  
  `@Module()`装饰器传入参数的import属性，不仅可以是一个module的name，还可以是一个返回动态模块的函数调用。
  动态模块自己也可以引入其他模块。在`register`返回值中的import属性中可引入其他的module。

  ```js
    import {DynamicModule, Module} from '@nestjs/common'
    import ConfigService from './config.service.ts'

    @Module({})
    export class ConfigModule {
      static register():DynamicModule {
        return {
          module: ConfigModule,
          // imports: [], // 如果依赖其他模块，可以在这里引入。
          providers: [ConfigService],
          exports: [ConfigService]
        }
      }
    }
  ```

8. 动态模块真正提供通用逻辑的是其中的可注入的service，就像我们通常定义的模块一样，定义一个service，作为provider导出去。

    那么，为了实现根据参数定制化逻辑，register方法接受option参数，那么如何把option传给service呢？

    使用**依赖注入**，我们把option参数作为一个provider，绑定到Nest IoC容器，Nest把它注入到ConfigService中。回顾一下自定义provider中，可以使用多种方法，来定义不同数据类型的provider。

      ```js
        import {DynamicModule, Module} from '@nestjs/common'
        import ConfigService from './config.service.ts'

        @Module({})
        export class ConfigModule {
          static register(options: Record<string, any>):DynamicModule {
            return {
              module: ConfigModule,
              // imports: [], // 如果依赖其他模块，可以在这里引入。
              providers: [
                {
                  provide: 'CONFIG_OPTIONS',
                  useValue: options
                },
                ConfigService
              ],
              exports: [ConfigService]
            }
          }
        }
      ```
    这样，我们就可以通过`CONFIG_OPITONS`这个token，使用`@Inject()`装饰器把option注入到Config Service中。

      ```js
        @Injectable()
        export class ConfigService {
          constructor(@Inject('CONFIG_OPTIONS') private options: Record<string, any>){}
        }
      
      ```

9. 我们在使用nest时，会经常碰到`register`、`forRoot`、`forFeature`这些方法，nest给这些方法设定了一些使用场景，但并不是强制的。
  - **register**,你想传递不同的配置参数来设置动态模块，每次使用，都是调用这个方法。例如`@nestjs/axios`: `HttpModule.register({baseUrl: 'someUrl})`,在另一个模块中这样使用`HttpModule.register({baseUrl: 'somewhere else'})`。你可以在任何你想用的模块中调用这个方法。
  - **forRoot**，你只想设置一次动态模块，然后在不同的位置使用这个模块。例如：`GraphQLModule.forRoot()`,`TypeOrmModule.forRoot()`等，在应用中，只会有一个。
  - **forFeature**, 你想使用动态模块forRoot的配置，但是需要修改一些参数来指定模块的需求。例如：这个模块使用哪个repository；日志模块应该使用哪个上下文。