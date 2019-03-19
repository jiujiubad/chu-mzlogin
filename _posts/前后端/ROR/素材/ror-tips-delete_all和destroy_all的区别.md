---
title: ror-tips-delete_all和destroy_all的区别
date: '2017-11-25 00:10'
categories:
  - ror知识点
tags:
  - ror知识点
img: 'https://ws1.sinaimg.cn/large/006tNc79gy1fnfwh0s580j305k050a9w.jpg'
abbrlink: e4cee3cd
---

* 201711
* 编程+ruby



## delete_all和destroy_all的区别

1、delete 是 sql 操作，直接在数据库执行 sql，不触发回调，直接删除不管其他。delete_all删除大量数据时速度更快些，但是危险的。所以，限制 delete 的方法是在 db 层面增加校验，而在 Rails（或 ActiveRecord） 里增加回调和 validates 保护数据。

2、destroy 是 model 操作，触发各种回调，在回调里也许做判定或其他事情，对于 Rails 来说是安全的删除方法。destroy不会删除model之间的关联，而delete会。