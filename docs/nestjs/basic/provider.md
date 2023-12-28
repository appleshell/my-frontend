---
title: Provider
---

1. The main idea of a provider is  that it can be injected as a dependency;
2. `Controllers` should handle HTTP requests and delegate more complex tasks to providers.
    providers负责处理更复杂的任务。
3. Many of the basic Nest classes my be treated as a provider - serivces, repositories, factories, helpers, and so on.
4. `Providers`注入方式通常使用`constructor-based`注入，即通常使用基于class的constructor来注入provider。
5. nest是围绕着`Dependency injection`这个设计模式建立的。可以通过[Angular](https://angular.io/guide/dependency-injection)的一篇文章来了解