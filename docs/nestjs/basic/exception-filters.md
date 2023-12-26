---
title: Exception Filters
---

1. exception 主要用于处理应用中的各种异常情况。如果我们写的代码没有显示的去处理异常，就会被 exception 层来处理，并返回一个合适的响应数据。
2. 抛出标准的错误

   ```js
   throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
   ```

  第一个参数作为message返回，如果想要自定义返回的数据，可以把上面第一个参数改为自定义的string或者对象；第二个参数传入状态码。第三个参数是可选的，是个对象，这个对象不会返回，起到一个类似备注的作用，在日志打印中使用。
3. Nest内置了很多不同类型的exception，基本覆盖常见场景。但是也可以自定义exception，通过继承`HttpException`来实现。
4. 内置的exception返回的结构是固定的：
    ```js
    {
      message: 'Something bad happened',
      statusCode: 500
    }
    ```
  内置的exception也可以穿入option，来增加错误信息，例如增加cause和description

5. 当你不想使用内置exception时，可以使用Exception filters来让自己完全控制这一层。

    ExceptionFilter需要实现`ExceptionFilter`,使用`@Catch`装饰器来制定meatedata，例如可以传入HttpException来表示操作的是Http类型的exception。

    使用Exception时，用`@UseFilter()`这个装饰器来装饰controller中的处理函数。exception filter也可以设置在controller层，global层。