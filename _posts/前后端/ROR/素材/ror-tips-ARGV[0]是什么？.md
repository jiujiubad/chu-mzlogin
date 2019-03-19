---
title: 'ror-tips-ARGV[0]是什么？'
date: '2017-11-19 00:10'
categories:
  - ror知识点
tags:
  - ror知识点
img: 'https://ws1.sinaimg.cn/large/006tNc79gy1fnfwh0s580j305k050a9w.jpg'
abbrlink: 2fb899c2
---

* 201711
* 编程+ruby



```
argc：命令行总的参数的个数，即argv中元素的格式。
*argv[ ]：字符串数组，用来存放指向你的字符串参数的指针数组,每一个元素指向一个参数。
argv[0]：指向程序的全路径名。
argv[1]：指向在DOS命令行中执行程序名后的第一个字符串。
argv[2]：指向第二个字符串。
```

```
argc是参数个数,定义为int
argv是字符串数组,存的是参数,定义为char**或者char* argv[]
比如你编译好的程序为my.exe
在命令行执行 my.exe 1 2 3
那argc就是4，argv[0]是"my.exe"，argv[1]是"1"，argv[2]是"2"，argv[3]是"3";
```



