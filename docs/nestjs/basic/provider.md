---
title: Provider
---

1. The main idea of a provider is  that it can be injected as a dependency;
2. `Controllers` should handle HTTP requests and delegate more complex tasks to providers.
    providers负责处理更复杂的任务。
3. Many of the basic Nest classes my be treated as a provider - serivces, repositories, factories, helpers, and so on.