---
title: bug-自动化测试1-3  gem_rspec-rails报错nomethoderror/ undefined method 'this' for
date: '2017-11-05 09:00'
categories:
  - ror知识点
tags:
  - bug
img: 'https://ws1.sinaimg.cn/large/006tNc79gy1fnfw7fgtkoj30dv0dh0sq.jpg'
abbrlink: 9178391d
---

* 201711
* 编程+rails





1、执行`rspec leap_year_spec.rb`报错如下：

![](https://ws1.sinaimg.cn/large/006tKfTcgy1fl4zs344p3j30zy0hen0c.jpg)



2、google搜索`gem rspec`找到两个github，一个是[rspec](https://github.com/rspec)/**rspec**（这个跟教材一样），一个是[rspec](https://github.com/rspec)/**rspec-rails**。用第二个，找到`gem 'rspec-rails'`，在gemfile文件中安装，然后`bundle`。



3、再测试`rspec leap_year_spec.rb`，搞定如下：

![](https://ws4.sinaimg.cn/large/006tKfTcgy1fl4zvzvzirj30ym0pqadr.jpg)

