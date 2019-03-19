---
title: tool-atom-【转发】打code时如何减少手动挪光标的次数
date: '2017-11-15 00:10'
categories:
  - 工具
tags:
  - 工具
  - atom
img: 'https://ws4.sinaimg.cn/large/006tKfTcgy1fnfd8csp18j308506wdfq.jpg'
abbrlink: 5974411c
---

* 201801
* 编程+mac



原文by黄鸿亮：http://hongliang.site/2017/03/10/2017-03-10-how-to-add-your-own-custom-code-snippets-to-emmet-snippets/

几个工具by黄鸿亮：http://activeliang-blog.logdown.com/posts/1433420-guangzhou-2017-2-19-offline-meetup-extracted-records

# atom打code时如何减少手动挪光标的次数&&emmet增加自定义片段的方法。

** 发表于 2017-03-10 | ** 分类于 [mac ](http://hongliang.site/categories/mac/)| ** [0 Comments](http://hongliang.site/2017/03/10/2017-03-10-how-to-add-your-own-custom-code-snippets-to-emmet-snippets/#comments)

#### 写在前面：（可以直接看文未的方法）

web程序员应该都知道emmet有多好用。打code如飞，不知道的只可以去看看我的另一篇有emmet相关介绍的文档：[文档链接（看第三张图你就明白了）](http://activeliang-blog.logdown.com/posts/1433420-guangzhou-2017-2-19-offline-meetup-extracted-records) .在使用一段时间后发现一个问题，诸如：`<%%>`，没有快捷的输入方法，这对符号，我细数了一下，在先打头跟尾再把光标移动回中间的情况下要敲`9`个键。相信学ruby-on-rials的人都知道，这个符号是经常要作用的！所以我在想能否有快捷的输入，比如能：输入`%`+`tab键`自动补全这对符号，并把光标停留在中w间，那就太完美了！于是我开始寻找答案……

##### 配置atom:

- 在atom内建的增加snippets的方法来实现，亲测有效，方法如下：（但：打开emmet后会被覆盖。）[![img](http://olmrxx9ks.bkt.clouddn.com/blog/2017-03-10-Snip20170310_2.png)](http://olmrxx9ks.bkt.clouddn.com/blog/2017-03-10-Snip20170310_2.png)[![img](http://olmrxx9ks.bkt.clouddn.com/blog/2017-03-10-154048.jpg)](http://olmrxx9ks.bkt.clouddn.com/blog/2017-03-10-154048.jpg)注意：不开emmet的时候完美使用，开了emmet后这个方法无效，会补emmet原生默认的定义给覆盖掉。

  然后，我又开始找解决这种冲突的方法，最后我发现，最直接的方法就是直接在emmet上增加snippets.

##### 苦逼的解决问题之路：

- google了一圈发现全网竟然没有一篇可行的确定的教程，最ok的教程也只是跟你说有这么一个方法可以增加snippets来实现，但是没有给出具体方法。只是给了官方文档的链接。

- 官方文档只是跟你说了一堆杂七杂八的东西，然后关于怎么配置，一点儿也没有说。只是说这个东西需要自己来创建。后来算是找到了一个文件，但作者提供的路径我们根本找不到，（有可能是sublime的，但是我们用的是atom）自己创建一个文件加 路径后，无效！

- ##### 网上关于这个的99.9%的教程都不是mac下的atom下的emmet。大多不适用。

- 能试的都试过了，甚至连下方中的正确方法都试过了，但是当时竟然没有成功，现在写这个教程的时候还在无限纳闷……

- 就这样一直在网络上游荡……就像警察抓小偷一样，明明有一点线索了但就是找不到一个完整的可行的方法！试多了，错多了，时间也折腾多了，就崩溃了，是的，我崩溃了，那一刻我多么想，不要再为这个浪费时间了，事实上我已经疯狂地追踪了十个小时了！真想找个人过来，给他点钱，帮我做出来，可以有钱也没有用啊，去哪里找？？

- ##### 最后， 我用google翻译，发邮件给emmet原作者，没想到他回复了，给了一些提示，我报着试一试的态度，竟然成功了！

##### 这个方法来得太不容易了……！

### 方法如下：

1. 打开preferences,快捷键：`⌘`+`,`[![img](http://olmrxx9ks.bkt.clouddn.com/blog/2017-03-10-161157.jpg)](http://olmrxx9ks.bkt.clouddn.com/blog/2017-03-10-161157.jpg)点击进入emmet,[![img](http://olmrxx9ks.bkt.clouddn.com/blog/2017-03-10-161246.jpg)](http://olmrxx9ks.bkt.clouddn.com/blog/2017-03-10-161246.jpg)[![img](http://olmrxx9ks.bkt.clouddn.com/blog/2017-03-10-Snip20170310_5.png)](http://olmrxx9ks.bkt.clouddn.com/blog/2017-03-10-Snip20170310_5.png)代码在这里，请跟着复制粘贴：

   ```
   "%":   "<%| %>",
   ```

   ok!保存，重启atom,实现你的打code如飞吧！

   注意：此功能只在html文件里有效，也只有html里需要这个功能！

   注意：此功能只在html文件里有效，也只有html里需要这个功能！

   注意：此功能只在html文件里有效，也只有html里需要这个功能！

   注意：此功能只在html文件里有效，也只有html里需要这个功能！

   注意：此功能只在html文件里有效，也只有html里需要这个功能！

   #### 演示：

   展开后光标会停留在中间……[![img](http://olmrxx9ks.bkt.clouddn.com/blog/2017-03-10-123.gif)](http://olmrxx9ks.bkt.clouddn.com/blog/2017-03-10-123.gif)

#### 再补充几点：基本就不用怎么手动挪光标了……

###### （基本就可以很少去挪动光标了）

1. 用上面的方法，再增加一个我们学ROR经常用的片段：`"a": "<a href=\"|\" ></a>",`(请用复制粘贴)，这一次放在位置不一样：[![img](http://olmrxx9ks.bkt.clouddn.com/blog/2017-03-18-003323.jpg)](http://olmrxx9ks.bkt.clouddn.com/blog/2017-03-18-003323.jpg)

2. 插件emmet和编辑器atom均内置注释功能，快捷键均为`⌘`+`/`，通常emmet会覆盖掉atom。但atom的更好用点，我们为了想让atom来注释，需要这样做：把emmet的注释功能改掉。

   - 打开这个文件：[![img](http://olmrxx9ks.bkt.clouddn.com/blog/2017-04-15-121647.jpg)](http://olmrxx9ks.bkt.clouddn.com/blog/2017-04-15-121647.jpg)
   - 按快捷键`⌘`+`⇪`+`f`，输入`emmet:toggle-comment`进行搜索。得到如图：[![img](http://olmrxx9ks.bkt.clouddn.com/blog/2017-04-15-122006.jpg)](http://olmrxx9ks.bkt.clouddn.com/blog/2017-04-15-122006.jpg)双击打开这个文件。[![img](http://olmrxx9ks.bkt.clouddn.com/blog/2017-04-15-122202.jpg)](http://olmrxx9ks.bkt.clouddn.com/blog/2017-04-15-122202.jpg)把`cmd-/`改掉，可以参考改成`cmd-0`,或者改成其他没有经常用的快捷键盘也行。

3. 修改快速打开新文件的快捷键盘：参考这篇blog:[如何修改Atom自带的快捷键&&使用⌘+E快速打开新文件~](http://activeliang-blog.logdown.com/posts/1623280-asdf)

4. ###### 多用`⌘`+`return`,作用：无论你的光标在什么位置，快速在下面切入新的一行。

5. ###### 多用`⌘`+`shift`+`return`,作用：无论光标位置，快速在上方切入新的一行。

6. ###### 多掌握一些emmet的内建功能：比如：(试着自己操作感受下，请用复制粘贴的，输完按`tab`键，看看展开的结果。)

   - `a.dropdown.dropdown-toggle[data-toggle="dropdown"]#my.dropdown`
   - `.container>tbody>thead>tr>td*5`
   - 更多请看看这个图表：[https://docs.emmet.io/cheat-sheet/](https://docs.emmet.io/cheat-sheet/)

### 写在后面：

- 助教和老师都不赞成新手用这种偷懒的方式，新手请一个字一个字的打。李笑来老师甚至不太赞成新手用atom,sublime这种高级的编辑器！
- 你也可以用这个方法增加你自己代码段！

##### 类似的简单粗暴小教程：

- [利用Heroku搭建自己的梯子，3步实现免费科学上网。](http://hongliang.site/2017/10/20/%E5%88%A9%E7%94%A8Heroku%E6%90%AD%E5%BB%BA%E8%87%AA%E5%B7%B1%E7%9A%84%E6%A2%AF%E5%AD%90%EF%BC%8C3%E6%AD%A5%E5%AE%9E%E7%8E%B0%E5%85%8D%E8%B4%B9%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91%E3%80%82)
- [mac上一键离线整个网站的方法（以便断网浏览）](http://hongliang.site/2017/10/18/mac%E4%B8%8A%E4%B8%80%E9%94%AE%E7%A6%BB%E7%BA%BF%E6%95%B4%E4%B8%AA%E7%BD%91%E7%AB%99%E7%9A%84%E6%96%B9%E6%B3%95%EF%BC%88%E4%BB%A5%E4%BE%BF%E6%96%AD%E7%BD%91%E6%B5%8F%E8%A7%88%EF%BC%89/)
- [Mac上高速下载百度网盘资源的方法（2步）](http://hongliang.site/2017/10/18/Mac%E4%B8%8A%E9%AB%98%E9%80%9F%E4%B8%8B%E8%BD%BD%E7%99%BE%E5%BA%A6%E7%BD%91%E7%9B%98%E8%B5%84%E6%BA%90%E7%9A%84%E6%96%B9%E6%B3%95%EF%BC%882%E6%AD%A5%EF%BC%89/)
- [打code时如何减少手动挪光标的次数&&emmet增加自定义片段的方法。](http://hongliang.site/2017/03/10/2017-03-10-how-to-add-your-own-custom-code-snippets-to-emmet-snippets/)
- [如何修改Atom自带的快捷键&&使用⌘+E快速打开新文件~](http://hongliang.site/2017/03/21/2017-03-21-asdf/)

本文有帮你节约到时间吗？赏几个钢蹦玩玩~😄[![img](http://olmrxx9ks.bkt.clouddn.com/2017-10-18-094733.jpg)](http://olmrxx9ks.bkt.clouddn.com/2017-10-18-094733.jpg)

[**全栈营60天盘点](http://hongliang.site/2017/03/10/2017-03-10-full-stack-camp-60-days-counted/)

[如何快速在erb中输入<%%>顺便把光标停留在中间**](http://hongliang.site/2017/03/10/2017-03-10-how-to-enter-in-the-erb-has-also-put-the-cursor-in-the-middle/)