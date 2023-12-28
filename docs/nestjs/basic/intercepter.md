---
title: Interceptor
---

1. Interceptor是一个用`Injectable`装饰器注释的class，实现了`NestInterceptor`接口。因此interceptor也是一个provider，可以注入到其他地方。
2. Interceptor的功能受AOP思想启发，包含多个功能

    - 在处理函数执行前后，绑定额外的逻辑
    - 转化函数返回的值
    - 转换函数抛出的异常
    - 扩展基础函数的功能
    - 在一定条件下完全覆盖一个函数

    打印日志就是intercepotr的一个应用。

3. 每个interceptor实现了`intercept()`方法，这个方法接受两个参数: 

    第一个就是`ExecutionContext`，这个上下文继承自`ArgumentsHost`;
    第二个是`CallHandler`。这个是对`handler()`的实现。可以在interceptor中调用路由处理函数。如何在intercept中没有调用handler，最终的路由处理函数也不会执行。

    以上表明，intercept方法可以包含**request/response**流程。也就是说，你可以在最终路由处理函数前和后，添加自己的逻辑。在handler调用前,我们可以写一些代码，来添加前置逻辑。后置逻辑要怎么添加呢，这就要用到Rxjs的功能。调用handler，返回一个`Observable`,就可以通过pipe继续添加后置逻辑。注意，调用handler时，对应的路由处理函数就会立即执行。

4. 与Guard类型，interceptor的使用范围包括：controler，method和global。使用`UseInterceptor()`装饰器来设置interceptor。注意：我们传给这个装饰器的是我们定义的intercepter类，实例化就交给nest来处理。

全局使用可以使用`useGlobalInterceptors()`,但是这样就在模块之外注册。我们可以使用useClass来注册全局interceptor，就可以注入其他依赖。

5. interceptor的一个重要应用是创建可复用的工具，来处理可能是全局产生的问题。例如：我们需要把响应数据中的`null`全部转换成`''`。使用Rxjs的map方法实现。

    利用Rxjs的`catchError`来覆写抛出的异常。

    当满足某些条件，我们不想调用handler时，可以利用Rxjs的of方法返回默认值。例如，处理缓存时，命中缓存时，可以返回缓存的值。

