---
title: ror-tips-clone和dup的区别
date: '2017-11-18 00:10'
categories:
  - ror知识点
tags:
  - ror知识点
img: 'https://ws1.sinaimg.cn/large/006tNc79gy1fnfwh0s580j305k050a9w.jpg'
abbrlink: 2a3e03d
---

* 201711
* 编程+ruby



ruby中clone和dup都是对一个对象的浅拷贝，其区别如下：
1.clone会拷贝单例方法，而dup不会。

```
a = Object.new
def a.hello
    "hello"
end

a.dup.hello   # raises NoMethodError
a.clone.hello # return "hello"

```

2.dup不能对frozen状态的对象进行拷贝，而clone可以。