---
title: >-
  bug-亚马逊awe_ec2 Swap file "/etc/shadowsocks/.config.json.swp" already exists!
  [O]pen Read-Only, (E)dit anyway, (R)ecover, (D)elete it, (Q
date: '2017-11-14 11:00'
categories:
  - ror知识点
tags:
  - bug
img: 'https://ws1.sinaimg.cn/large/006tNc79gy1fnfw7fgtkoj30dv0dh0sq.jpg'
abbrlink: 723a2ffb
---

* 201711
* 编程+rails





# 亚马逊的AWS不能SSH登录了怎么办？

![](https://ws4.sinaimg.cn/large/006tKfTcgy1flhedxi3rpj30k004h3yq.jpg)



## 【bug】Swap file "/etc/shadowsocks/.config.json.swp" already exists! [O]pen Read-Only, (E)dit anyway, (R)ecover, (D)elete it, (Q



Linux下编程难免会开启多次vim编辑， 同一个文件如果在上一次编辑时未进行保存，则在下一次想要进行编辑时就会出现：

swap file "*.swp" already exists!

[O]pen Read-Only, (E)dit anyway, (R)ecover, (D)elete it, (Q)uit, (A)bort:

原因：

使用vim编辑文件实际是先copy一份临时文件并映射到内存给你编辑， 编辑的是临时文件， 当执行：w后才保存临时文件到原文件，执行：q后才删除临时文件。

每次启动编辑时都会检索这个文件是否已经存在临时文件， 有则询问如何处理，就会出现如上情景。

 解决方法（删除这个临时文件即可）：

rm *.swp



# linux用VI编辑后保存退出命令是什么啊？

按esc，再按住shift再按两下’z‘键。