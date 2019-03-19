---
title: ror-tips-rails g controller xx --no-assets与rails g controller xx有什么区别？
date: '2017-11-13 00:10'
categories:
  - ror知识点
tags:
  - ror知识点
img: 'https://ws1.sinaimg.cn/large/006tNc79gy1fnfwh0s580j305k050a9w.jpg'
abbrlink: 4f7cb584
---

* 201711
* 编程+ruby



1）`rails g controller xx --no-assets`与平时的`rails g controller xx`有什么区别？

从执行结果可以看出，区别在于前者不会产生asset文件，即相关的css和js文件。

```
invoke  assets
invoke    coffee
create      app/assets/javascripts/XXX.coffee
invoke    scss
create      app/assets/stylesheets/XXX.scss
```



