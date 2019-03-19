---
layout: post
title: 'git fetch与git pull的区别'
date: 2017-11-03 02:51
comments: true
categories: 
---
* 201711
* 编程+其他



原文网址：http://dumpling001-blog.logdown.com/posts/1839660

网上一篇文章这样介绍[git fetch](https://www.oschina.net/translate/git-fetch-and-merge?lang=chs&page=2#)：

> “git fetch”命令执行完毕之后，还不会立即将下载的文件合并到你当前工作目录里，这就给你了一个选择下一步操作的机会，要是想将从远程分支下载的文件更新到你的工作目录里，你需要执行一个“合并（merge）”操作。例如，我当前的本地分支为”master“（执行git checkout master后），这时我想执行合并操作：
>
> git merge origin/master
>
> 如果你只是想看看本地分支和远程分支的差异，你可以使用下面的命令：
>
> git diff master origin/master
>
> 单独进行下载和合并是一个好的做法，你可以先看看下载的是什么，然后再决定是否和本地代码合并。而且分开来做，可以清晰的区别开本地分支和远程分支，方便选择使用。

作者建议：

> “不要用git pull，用git fetch和git merge代替它。”
>
> git pull的问题是它把过程的细节都隐藏了起来，以至于你不用去了解git中各种类型分支的区别和使用方法。当然，多数时候这是没问题的，但一旦代码有问题，你很难找到出错的地方。看起来git pull的用法会使你吃惊，简单看一下git的使用文档应该就能说服你。
>
> 将下载（fetch）和合并（merge）放到一个命令里的另外一个弊端是，你的本地工作目录在未经确认的情况下就会被远程分支更新。当然，除非你关闭所有的安全选项，否则git pull在你本地工作目录还不至于造成不可挽回的损失，但很多时候我们宁愿做的慢一些，也不愿意返工重来。

[阮一峰写的《Git远程操作详解》](http://www.ruanyifeng.com/blog/2014/06/git_remote.html)这样介绍：

> 一旦远程主机的版本库有了更新（Git术语叫做commit），需要将这些更新取回本地，这时就要用到git fetch命令。
>
> $ git fetch <远程主机名>
>
> 上面命令将某个远程主机的更新，全部取回本地。
>
> git fetch命令通常用来查看其他人的进程，因为它取回的代码对你本地的开发代码没有影响。
>
> 默认情况下，git fetch取回所有分支（branch）的更新。如果只想取回特定分支的更新，可以指定分支名。
>
> $ git fetch <远程主机名> <分支名>
>
> 比如，取回origin主机的master分支。
>
> $ git fetch origin master
>
> 所取回的更新，在本地主机上要用"远程主机名/分支名"的形式读取。比如origin主机的master，就要用origin/master读取。