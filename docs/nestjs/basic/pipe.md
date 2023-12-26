---
title: pipes
---

1. pipes 主要有两个使用场景：
   - transformation: 把输入的数据转换成想要的数据
   - validation: 校验传入的数据是否符合要求
2. 定义一个pipe，使用`@Injectable`装饰器，说明是一个provider；要实现`PipeTransform`
3. Nest把pipe放在一个controller的处理函数调用之前，pipe接收传给处理函数的参数，把参数经过转换和校验后，传给处理函数。
    pipes运行在exception范围内，所以，当pipe抛出异常时，会被exception捕获，对应的处理函数并不会执行。
4. transformation类型的Pipes运行结果是：要么返回一个转换后的值，要么抛出异常；validation类型的pipes运行结果是：要么返回一个没有变化的值，要么抛出异常。
4. Nest内置了许多Pipes。
    使用transformation类型的pipe时，我们可以直接传class，不需要实例化，nest会处理。如果想要定义pipe的一些行为，可以用实例化的方式传入一些配置参数。
    validation类型的pipe的使用略有不同。
5. 自定义pipes，必须实现`PipeTransform`中的`transform`方法。
6. Pipes可以用在参数层，函数层，controller层，或者全局。
7. 调用useGlobalPipes使用pipe时，全局的pipe是在module之外注册的，因此不能够注入其他依赖，因为获取不到任何module的context。要解决这个问题，可以使用useClass的方式。
8. 自定义pipes的一些使用场景：
    - transformtion类型的pipe，通过请求中的id，从数据库中返回一个userEntity对象
    - transformtion类型的pipe，处理默认值。当请求参数中缺少某些字段数据时，可以设置默认值，传给处理函数。这样就不用抱错。