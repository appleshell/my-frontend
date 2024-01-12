---
title: Execution Context
---

Nest提供了一个功能性的class，使得我们可以访问执行上下文的一些信息。我们在自定义guards，filters和interceptor时可以用到。

## ArgumentHost class

这个class中提供了一个方法，这个方法返回了传递给请求处理函数的参数

## ExecutionContext class

 ExecutionContext 扩展自ArgumentHost，提供了一些当前执行的额外细节。例如，我们可以获取一个请求对应的handler，以及这个handler所在的controller。

 获取到了当前的handler和controller，我们就可以获取通过装饰器定义在handler和controller上的metadata。

设置metadata的装饰器，我们可以用`Reflector#createDecorator`来定义，也直接可以使用`@SetMetadata`

 - Reflector#createDecorator
    创建 Roles 装饰器，用来给handler添加角色metadata。

    ```js
      import { Reflector } from '@nestjs/core'
      // Roles是一个函数，接受strings[]类型的参数
      export const Roles = Reflector.createDecorator<strings[]>()
    ```
    使用Roles
    ```js
      @Post()
      @Roles(['admin']) // 把角色metadata绑定在handler上，这里的逻辑是角色为admin的用户，才能创建数据。
      async create(@Body() createDto: CreateDto){
        this.catService.create(createDto)
      }
    ```
    自定义guard，使用metadata，实现角色判断逻辑
    ```js
      @Injectable()
      export class RoleGuard {
        constructor(private reflector: Reflector){}
      }
    ```
    获取handler上的metadata
    ```js
      const roles = this.reflector.get(Roles, context.getHandler())
    ```
    
    如果是在controller上添加角色metadata，那就在class上获取
    ```js
      const roles = this.reflector.get(Roles, context.getClass())
    ```
    如果在controller和handler上都添加了角色metadata，则可以同时获取metadata，并根据实际采用不同的合并方式
    ```js
      // override
      const roles = this.reflector.getAllAndOverride(Roles, [context.getHandler(), context.getClass()])

      // merge
      const roles = this.reflector.getAllAndMerge(Roles, [context.getHandler(), context.getClass()])
    ```

  - SetMetadata
    不推荐直接使用`@SetMetadata()`装饰器来设置metadata，可以自定义一个装饰器：
    ```js
      import { SetMetaData } from '@nestjs/common'

      export const Roles =  (...roles: string[]) => SetMetaData('roles', roles)
    ```
    和Reflector#createDecorator很像，但是可以自定义metadata的key。

    使用方法也一样，唯一的区别是在获取metadata时要用自定义的key
    ```js
      const roles = this.reflector.get('roles', context.getClass())
    ```