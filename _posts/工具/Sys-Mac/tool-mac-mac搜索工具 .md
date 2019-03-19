---
title: tool-mac-mac搜索工具
date: '2017-12-18 00:10'
categories:
  - 工具
tags:
  - 工具
  - mac
img: 'https://ws2.sinaimg.cn/large/006tKfTcgy1fnfcwsitmgj30da08pjrg.jpg'
abbrlink: 5756f3fc
---

* 201712
* 工具+mac



# 一、总结：本文只有这一段有用，其他测试过没效果

1）spotlight搜索很烂

2）两个搜文件名比spotlight好用的工具：**『easyfind』**、**『find any file』**

> 注意：在知乎搜了一天，发现mac上的各种搜索工具，只支持搜索文件名，不支持搜索文件内的内容。想要搜索内容，自己搭博客、或是用别人的博客、或是利用google或百度的搜索方法`site:网址 关键词`。

===================

# 二、以下测试没卵用

太正确了啊，mac 下文件肉眼可见就是搜不出来，简直烦躁。

founder 不能识别通配符，只能从首字搜起，如123.abc 输入 "12" 将(也许) 有效，但如输入  23，或者*.abc则无效。

Alfred略好一点，可以支持通配符如：*.abc 或者*3.abc这样。just so so。

Alfred有一个workflow，答主可以试试哒～

Disklens，但是也有个很讨厌的问题就是 “他不仅搜索文件名，也搜索文件内容”，这样搜索的结果简直令人崩溃（比如我想找一个叫  Design_Proj 的文件夹，结果他搜出了几百个log文件——仅因为这些log文件中记录了这个文件夹的名字）

everything的作者曾在15年初回复我说，mac也许会开发（估计脱离了NTFS结构没什么好办法 ）

试试houdahspot for Mac

为何不用 **mdfind**？

Easyfind！！！

mac的搜索工具强烈安利find any file

**DEVONsphere Express**

ifile

闹了半天原来不搜索文件内容



`> mdfind <关键词>`





## 1、kind:文件类型 关键词

* 文件的类型，常用的有，image （图片）， pdf， doc（文档）， music（音乐），folder（目录）， mail （邮件），bookmark （书签） ， contact （联络人）等
  * kind:image paris，找巴黎的照片
  * kind:music britney，搜索小甜甜的歌



## 2、date:日期 关键词

* 常用有today（今天）， yesterday（昨天）， this week（本周）， this month（本月）等
  * date:yesterday 



## 3、搜索doc文件里的关键词

