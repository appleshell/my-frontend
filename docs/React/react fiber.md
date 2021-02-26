---
title: React Fiber Architecture
---

翻译自[React Fiber Architecture](https://github.com/acdlite/react-fiber-architecture)

React Fiber的目标是增加在动画，布局和gestures(字面是手势，我理解为交互)领域的适用性。它的主要功能是incremental rendering(渐进式渲染)：能够将渲染工作分割成块，并将其分散到多个帧上。

其他的功能还包括：当新的更新进来时，能够暂停，中止或者复用工作；能够给不同类型的更新指定优先级；