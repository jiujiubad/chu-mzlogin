---
layout: post
title: 'gem rails-erd 数据库关系图pdf'
date: 2017-08-25 10:00
comments: true
categories: 
---
* 201708
* 编程+rrails



1、执行`brew install graphviz`

2、Gemfile中加入` gem "rails-erd"`,执行`bundle install`

3.`rake erd`
然后就可以发现atom项目文件下生成的资料库关系的图示文件 erb.pdf
不过这时候如果你直接点击该pdf文件，会显示出乱码

4.下载一个pdf阅读器
在Finder中找到该erb.pdf，选择用pdf阅读器打开，效果如下

![](https://ws1.sinaimg.cn/large/006tKfTcgy1fiw4h215lpj30zx0jdq5w.jpg)