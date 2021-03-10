---
title: css布局相关
# id: css-layout
---

## 盒模型

## margin纵向重叠和负值

## BFC

块级格式化上下文

设置了形成BFC属性的元素，是一个独立的渲染区域，内部的渲染元素不会影响边界以外的元素。

常见的形成BFC的条件：float不是none，position是absolute或fixed，overflow不是visible，display是flex或inline-block

## float布局及clearfix

## flex布局

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

- 纯文字类，使用`line-height`；
- 绝对定位 + transform；
- flex布局；
- 绝对定位 + margin-top: `margin-left: -height/2;`；
- table布局：父元素,`display: table`；子元素：`display: table-cell;vertical-align: middle`；

## 响应式

1. rem

使用媒体查询，来设置html元素的font-size属性