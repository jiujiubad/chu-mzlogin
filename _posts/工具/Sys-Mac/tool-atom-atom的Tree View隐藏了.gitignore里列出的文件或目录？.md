---
title: tool-atom-atom的Tree View隐藏了.gitignore里列出的文件或目录？
date: '2017-12-7 00:10'
categories:
  - 工具
tags:
  - 工具
  - atom
img: 'https://ws4.sinaimg.cn/large/006tKfTcgy1fnfd8csp18j308506wdfq.jpg'
abbrlink: 4561aa0
---

* 201801
* 编程+mac





原来是因为 Tree View 这个插件有个选项，可以隐藏版本控制系统里被忽略掉的文件，比如在 .gitignore 文件里列出来的东西。你可以取消这个选项。

1. 打开 Settings - Packages
2. w搜索 tree-view
3. 点击 Settings
4. 取消勾选的 Hide VCS Ignored Files

![img](https://talk.ninghao.net/uploads/default/181/1efbd2d313cb7767.png)