---
title: Module
---

1. A Module is a componet. Every application has a root module. It is the starting point Nest uses to build the application graph.
2. 一个功能模块可以通过export对外暴露封装在其内的providers，当别的模块import这个模块后，别的模块就可以把这些暴露的providers注入到需要的位置。
3. nest中，模块都是单例的，被import多次的模块，指向的都是同一个模块