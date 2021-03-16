---
title: webpack基本知识点
---

## 基本配置

- 拆分配置和merge
- 启动本地服务
- 处理ES6
- 处理样式
- 处理图片
- 模块化

## 高级配置

- 多入口
- 抽离css
- 抽离公共代码
- 懒加载
- 处理JSX
- 处理Vue

配置内容：

入口，entry
出口，output，注意使用hash
开发环境，dev-server
  配置host和端口
  historyApiFallback
  hot
  proxy
module
  babel-loader
  css处理，注意loader顺序
  图片处理
    小图片编译成base64
  字体文件处理
resolve
  文件处理顺序
  alias
plugin
  HTMLWebpackPlugin
  miniCssextractPlugin，抽离css也要用hash
  HotModuleReplacementPlugin
optimization  优化，
  压缩css
  minimizer：TerserJSPlugin   OptimizeCSSAssertPlugin 
  分割代码块，为了抽离公共代码和第三方模块代码
  splitChunks:
  
## module chunk bundle

module--各个源码文件，webpack中一切皆模块
chunk--多模块合成，splitChunk生成chunk，入口文件也会生成chunk
bundle--最终输出的文件

## webpack性能优化

优化打包构建速度--开发体验和效率

- 优化babel-loader  // 使用缓存和控制编译文件的范围

- ignorePlugin  // 忽略引入，例如moment.js库，忽略掉语言文件，然后手动引入需要的语言文件。既提升了打包速度，还减少了bundle的体积
- noParse  // 避免重复打包，例如xxx.min.js之类的文件

- happyPack  开启多进程打包

  js是单线程，开启多进程打包

  提高构建速度（特别是多核CPU）

- ParallelUglifyPlugin 开启多进程打包并压缩

  webpack内置了Uglify攻击压缩JS，

  js是单线程，开启多进程压缩更快

  和happyPack同理

  项目大，打包慢时，可以开启多进程。但是项目小，打包快时，开启多进程反而会降低打包速度（会有进程开销，开启进程，进程间通信）。

- 自动刷新  dev-server会自动开启自动刷新
- 热更新  HotModuleReplacementPlugin

  自动刷新：整个网页全部刷新，速度较慢；整个网页全部刷新，状态丢失（表单数据丢失，多层路由后又回到首页）

  热更新：新代码生效，网页不刷新，状态不丢失

  热更新需要注册哪些模块会触发热更新。

- DLLPlugin  动态链接库插件

  前端框架，如Vue，React，体积大，构建慢

  较稳定，不常升级版本

  同一个版本只构建一次即可，不用每次都重新构建


  webpack 已内置DllPlugin支持

  Dllplugin -- 打包出dll文件，比如第一次打包，先把vue或react打包成dll文件

  DllReferencePlugin -- 使用dll文件，后面打包，就通过这个插件来使用打包过的文件

优化产出代码--产品性能

体积更小；合理分包，不重复加载；速度更快、内存使用更少

- 小图片base54

- bundle加hash

- 懒加载

- 提取公共代码

- IgnorePlugin

- 使用CDN加速  配置publicPath

- 使用production，mode = production时

  自动会压缩代码

  Vue，React等会自动删除调试代码（如开发环境warning）

  自动启用Tree-Shaking（ES Module可以，commonjs不可以）

- Scope Hosting

  多个文件被打包进一个函数，不用每个文件打成一个函数，代码体积更小

  创建函数作用域更少

  代码可读性更好



ES6 Module和commonjs

ES6 Module是静态引入，编译时引入，不能放在条件判断中

而Commonjs是动态引入，执行时引入，可以放在条件判断中。

webpack打包是编译过程，因此只能用ES6 Module来做tree-shaking



-----------------------------------------------------------

webpack常见面试题

1. 前端项目为什么要进行构建和打包

2. module chunk bundle的区别

3. loader和plugin的区别

4. 常见的loader和plugin

5. webpack和babel的区别

6. 如何产出一个lib

7. babel-polyfill和babel-runtime的区别

8. webpack如何实现懒加载

9. 为何Proxy不能被polyfill

10. webpack性能优化

