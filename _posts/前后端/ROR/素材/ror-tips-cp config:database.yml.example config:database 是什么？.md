---
title: ror-tips-cp config/database.yml.example config/database 是什么？
date: '2017-11-21 00:10'
categories:
  - ror知识点
tags:
  - ror知识点
img: 'https://ws1.sinaimg.cn/large/006tNc79gy1fnfwh0s580j305k050a9w.jpg'
abbrlink: a72a0756
---



* 201711
* 编程+ruby
* ​

## [config/database.yml文件](http://xyy601-blog.logdown.com/posts/1717201-2017417-programming-error-records-ad-hoc-no-config-databaseyml-file)

今天在练习job-listing时，从github上fork专案后，直接运行rails s，在localhost:3000上发生报错：

![](https://ws1.sinaimg.cn/large/006tNc79gy1flq53a6wnnj30le09y75l.jpg)

图中信息提示，没有文件config/database.yml文件

这是因为我们一般要保护config/database.yml文件，因此在上传到github之前会创建一个
config/database.yml.example文件用来代替config/database.yml文件
但是它不是真正的config/database.yml文件

因此，如果想保证专案能正常运行，需要建立一个config/database.yml文件，并将
config/database.yml.example文件内容复制过去

所以需要运行命令 `cp config/database.yml.example config/database.yml`