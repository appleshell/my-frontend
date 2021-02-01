---
title: css布局相关
id: css-layout
---

> ## 实现一个元素的水平居中

- 对于行内元素：`text-align: center`；
- 对于确定宽度的块级元素：

1. 使用 margin：`margin: 0 auto`；
2. 绝对定位和 margin-left: `margin-left: -width/2;`

- 宽度未知的块级元素：

1. flex 布局：`justify-content: center`；
2. 绝对定位+transform；
3. 使用 inline-block: `display: inline-block; text-align: center`；
4. `display: table; margin: 0 auto;`

> ## 实现一个元素的垂直居中
