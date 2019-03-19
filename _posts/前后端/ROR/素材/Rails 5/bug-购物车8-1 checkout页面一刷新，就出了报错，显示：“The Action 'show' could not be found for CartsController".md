---
title: >-
  bug-购物车8-1 checkout页面一刷新，就出了报错，显示：“The Action 'show' could not be found for
  CartsController"
date: '2017-11-23 10:15'
categories:
  - ror知识点
tags:
  - bug
img: 'https://ws1.sinaimg.cn/large/006tNc79gy1fnfw7fgtkoj30dv0dh0sq.jpg'
abbrlink: 3d6294
---

* 201711
* 编程+rails



### 问题：checkout页面一刷新就出了报错，显示：“The Action 'show' could not be found for CartsController"。且只在chrome存在，在safari试验时正常，会跳出一个弹窗询问“是否要重新发送表单”。



助教的解答：助教有这么几种看法：1. checkout定义的是post的路径，所以第一次进去的时候是可以的。第二次刷新过后，浏览器变成了get的请求，get请求会自动去找show action，所以会报错。查看sever log，用chrome测试发现刷新后请求编程get，用safari测试刷新了还是post。2、chrome清楚缓存和cookie还是不行。3、又下载了QQ浏览器发现没有这个问题。



——可能是浏览器问题，先跳过