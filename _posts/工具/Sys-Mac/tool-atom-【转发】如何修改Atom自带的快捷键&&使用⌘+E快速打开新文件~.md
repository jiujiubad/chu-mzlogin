---
title: tool-atom-【转发】如何修改Atom自带的快捷键&&使用⌘+E快速打开新文件~
date: '2017-11-15 00:10'
categories:
  - 工具
tags:
  - 工具
  - atom
img: 'https://ws4.sinaimg.cn/large/006tKfTcgy1fnfd8csp18j308506wdfq.jpg'
abbrlink: 30a08ba7
---

* 201801
* 编程+mac



原文by黄鸿亮：http://hongliang.site/2017/03/21/2017-03-21-asdf/#comments

# 如何修改Atom自带的快捷键&&使用⌘+E快速打开新文件~

** 发表于 2017-03-21 | ** [0 Comments](http://hongliang.site/2017/03/21/2017-03-21-asdf/#comments)

#### 发生了什么事？

- 随时rails学习的不断深入，文件数量越来越多，要调出其中一个文件，再用以前的方法：在树状图里面找，效率太低。所以，用模糊搜索会大大加速文件定位的速度！

  > 比如，要快速切换到/app/views/admin/orders/index.html.erb, 只需要在模糊探索框内输入 `ad or in`即可快速定位到这个文件。如何弹出模糊搜索框：

  atom自带的快捷键是： `⌘`+`t` ，但是这个组合键，对于使用windows机械键盘的人来说，键程太远，按起来很别扭。如果能改成`⌘`+`e`，那就方便很多了！

#### 问题：用atom自带的增加快捷键功能无效！原因：`⌘`+`e`已经被占用。

于是，解题思路就有了如下：

- 找到atom的相关的关键代码，改掉它。
- 找到如何设置优先等级的方法。

##### 然而，都行不通！…………………………………………………………/捂脸。

###### 解决过程：一阵google+一顿百度，没有找到教程，最后自己尝试出来。此处省略n个字。

### 解决方案：

###### 打开这个文件：[![img](http://olmrxx9ks.bkt.clouddn.com/blog/2017-03-21-155722.jpg)](http://olmrxx9ks.bkt.clouddn.com/blog/2017-03-21-155722.jpg)输入以下代码：[![img](http://olmrxx9ks.bkt.clouddn.com/blog/2017-03-21-155746.jpg)](http://olmrxx9ks.bkt.clouddn.com/blog/2017-03-21-155746.jpg)来，代码如下：

```
如何修改Atom自带的快捷键&&使用⌘+E快速打开新文件~
 发表于 2017-03-21 |  0 Comments
发生了什么事？

随时rails学习的不断深入，文件数量越来越多，要调出其中一个文件，再用以前的方法：在树状图里面找，效率太低。所以，用模糊搜索会大大加速文件定位的速度！

比如，要快速切换到/app/views/admin/orders/index.html.erb, 只需要在模糊探索框内输入 ad or in即可快速定位到这个文件。如何弹出模糊搜索框：

atom自带的快捷键是： ⌘+t ，但是这个组合键，对于使用windows机械键盘的人来说，键程太远，按起来很别扭。如果能改成⌘+e，那就方便很多了！

问题：用atom自带的增加快捷键功能无效！原因：⌘+e已经被占用。

于是，解题思路就有了如下：

找到atom的相关的关键代码，改掉它。
找到如何设置优先等级的方法。
然而，都行不通！…………………………………………………………/捂脸。

解决过程：一阵google+一顿百度，没有找到教程，最后自己尝试出来。此处省略n个字。

解决方案：

打开这个文件：输入以下代码：来，代码如下：

1
2
3
4
5
'.platform-darwin atom-text-editor':
  'cmd-e': 'unset!'
'.platform-darwin':
  'cmd-e': 'fuzzy-finder:toggle-file-finder'
解读：unset!先把原先的快捷键取消掉，再在下面重新设置新的。

搞定！

写在后面：如果你有更好的解决方法，请留言告诉我……~
另外一篇关于修改快捷键的blog:打code时如何减少手动挪光标的次数&&emmet增加自定义片段的方法。

2017-3-21 学习记录ORID
2017-3-22 遇到一个坑，记录

```

解读：`unset!`先把原先的快捷键取消掉，再在下面重新设置新的。

#### 搞定！

写在后面：如果你有更好的解决方法，请留言告诉我……~
另外一篇关于修改快捷键的blog:[打code时如何减少手动挪光标的次数&&emmet增加自定义片段的方法。](http://activeliang-blog.logdown.com/posts/1531858-how-to-add-your-own-custom-code-snippets-to-emmet-snippets)

[**2017-3-21 学习记录ORID](http://hongliang.site/2017/03/21/2017-03-21-2017-3-21-learning-record-orid/)

[2017-3-22 遇到一个坑，记录**](http://hongliang.site/2017/03/22/2017-03-22-2017-3-22-encountered-a-pit-records/)