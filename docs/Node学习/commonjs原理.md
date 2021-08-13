---
title: commonjs原理
---

参考文章：

[小邵教你玩转 nodejs 之剖析:实现 commonJs 源码](<https://github.com/iamswr/iamswr_article/blob/master/node_article/002.%E5%B0%8F%E9%82%B5%E6%95%99%E4%BD%A0%E7%8E%A9%E8%BD%ACnodejs%E4%B9%8B%E5%89%96%E6%9E%90:%E5%AE%9E%E7%8E%B0commonJs%E6%BA%90%E7%A0%81(2).md>)

[面试题：Commonjs 和 Es Module 区别](https://mp.weixin.qq.com/s/dvg8wuJ3p1AAWqTnH3zg6Q)

Module 是模块的构造函数，每 require 一个文件，都会给这个文件创建一个 module 实例对象

### 加载一个模块的简单流程

1. 从`require(id)`方法开始
2. `require`方法内部调用`Module._load()`方法
3. `Module._load()`方法

   - 先从缓存中查找模块是否加载过，如果加载过就直接返回模块
   - 如果没有加载过，就调用`new Module()`创建一个新模块，并放入缓存中

     ```js
     const module = cachedModule || new Module(filename, parent);

     Module._cache[filename] = module;
     ```

   - 调用`module.load()`方法，开始加载模块

4. `module.load()`方法内部调用`Module._extensions[extension]`方法，其中extension是所加载文件的后缀，这里就以`.js`为例

5. `Module._extensions['.js']`方法

    - 调用`let content = fs.readFileSync(filename, utf-8)`读取模块内容为字符串形式
    - 内部调用`module._compile(content, filename)`，对模块内容进行编译

6. `module._compile(content, filename)`方法

    - 调用`Module.wrap(content)`方法，将模块的字符串内容包装进函数

      ```js
      let wrap = function(script) {
        return Module.wrapper[0] + script + Module.wrapper[1];
      };

      const wrapper = [
        '(function (exports, require, module, __filename, __dirname) { ',
        '\n});',
      ];
      ```

    - 调用node内置的vm模块的`runInThisContext(content)`方法，将包装好的字符串转换成函数，赋值给`compiledWrapper`
    - 使用apply方法调用`compiledWrapper`模块包装函数，将this指向`module.exports`。所以如果在模块中打印this，会发现this指向的就是`module.exports`。调用的时候还要把其他参数传递进去，`exports,require,module,filename,dirname`
    - 由上述可知，模块代码就是在这一步骤被执行的

7. 至此，module.exports中就包含了内容，然后函数调用栈再一个一个回到上层

    - 在`module.load`方法中，调用完`Module._extensions[extension]`方法后，还要将`module.loaded`属性设为true，表示模块加载完毕

    - 回到`Module._load()`方法中，模块加载完后，该方法最后返回`module.exports`

    - 最终在require方法中，返回了`module.exports`

8. 这就是commonjs加载的大概过程，require方法最终返回的是模块文件中`module.exports`对象
