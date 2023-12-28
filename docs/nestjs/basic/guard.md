---
title: Guards
---

1. guard是一个用`@Injectable`装饰器注释的类，实现了`CanActive`接口。guard是一个provider，可以注入到其他类中。
2. guard的只有一个功能，决定进来的request是否应该被路由处理函数进行处理。通常用于权限校验和身份鉴定。
3. 在express中，这个校验的工作是在middleware中实现的，但在nest中，middleware拿不到上下文，不知道next调用后是谁执行。在Nest中，Guards可以拿到ExecutionContext的实例，因此就知道接下来该执行什么。
4. Guards是在middleware之后，但是在interceptor和pipe之前执行。
5. guard需要实现`canActive`方法，这个方法返回一个boolean值，表示当前的请求是否允许通过。true表示允许通过，false表示驳回请求
6. 和exception，pipe一样，guard的作用范围包括controller水平，method水平，global水平。在controller或method上使用`@UseGuards()`来设置guard。全局可使用`UseGlobalGuards()`，但更推荐使用`UseClass()`的方法使用，这样可以注入其他依赖。
7. Guards最大的功能就是可以获取执行上下文。例如可以获取请求中的用户的角色信息，进而判断是否符合权限的设置。

    使用`Reflector.createDecorator`创建一个`@Roles()`的装饰器，这个装饰接收一个字符串数组类型的参数，表示角色。
    把这个装饰器注释在需要角色判断的处理函数上，表示把角色的元数据绑定在该函数上。
    在我们定义的Guards中，我们可以通过执行上下文，获取当前执行的处理函数上绑定的角色元信息（注入reflector，通过reflector.get方法获取）
    没有绑定角色元信息的处理函数，guard返回true；绑定了的处理函数，我们通过执行上下文获取request中的角色信息，判断请求的角色信息是否符合我们设置的角色，来决定是否放行。