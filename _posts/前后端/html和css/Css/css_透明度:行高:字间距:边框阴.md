---
layout: post
title: 'css 透明度/行高/字间距/边框阴影'
date: 2017-05-20 21:53
comments: true
categories: 
---
* 201705
* 编程+前端



# 圆角border-radius:0px 5px 5px 0px;

# 透明度opacity，值0-1
# 行高line-height，2em
# 字间距letter-spacing，0.1em
# 阴影box-shadow，值xpx ypx wpx #fff（x偏移支持负数值、y偏移支持负数值、模糊距离、颜色）
```
box-shadow: h-shadow v-shadow blur spread color inset;

h-shadow    必需。水平阴影的位置。允许负值。   
v-shadow    必需。垂直阴影的位置。允许负值。      
blur    可选。模糊距离。   
spread    可选。阴影的尺寸。    
color    可选。阴影的颜色。请参阅 CSS 颜色值。   
inset    可选。将外部阴影 (outset) 改为内部阴影。    
```


# CSS 一个DIV有四条边，怎么让只有下面一条边有阴影？
```
box-shadow:0px 15px 10px -15px #ccc;
```