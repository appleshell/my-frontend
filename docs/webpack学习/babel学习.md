---
title: babel学习
---




## babel-polyfill

为不兼容js新语法，新API的运行环境提供兼容方案

是core-js和regenerator的集合。

  core-js是各种polyfill的集合，regenerator是Generator函数的polyfill。

babel 7.4之后，babel-polyfill已经废弃了，推荐直接使用core-js和regenerator。

babel本身只转换新语法，对于新API，例如Promise，Array.prototype.includes，则不会转换。

babel-polyfill按需引入，在.babelrc中配置，降低打包的体积

## babel-runtime

babel-polyfill会污染全局环境，babel-runtime可以解决这个问题，通过自定义方法名。比如在开发第三方库的时候，一定要使用babel-runtime