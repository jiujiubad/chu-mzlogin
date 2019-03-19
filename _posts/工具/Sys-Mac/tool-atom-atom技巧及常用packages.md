---
title: tool-atom-atom技巧及常用packages
date: '2017-11-20 00:10'
categories:
  - 工具
tags:
  - 工具
  - atom
  - 常用
img: 'https://ws4.sinaimg.cn/large/006tKfTcgy1fnfd8csp18j308506wdfq.jpg'
abbrlink: c5bd9801
---

* 201801
* 工具+mac

## atom终端快速删除命令小技巧

有时候在linux终端中执行某个命令时，往往会输错命令，想删除掉重敲可以按backspace键，但这样较慢，一种简便技巧是，按住esc键同时按backspace键会较快删除【esc+backspace】组合键。或者【ctrl+u】组合键



# install常用的packages

## dash

收集了各种官方文档供我们查询。

在atom中选中要查的语句然后`ctrl+h`，会跳出dash的查询结构。

## emmet

可以自动补全那些烦琐的标签头尾，然后自动把光标跳到中间。

```
试试.row然后按`tab
```

```
试试div>div>h2+(table>(thead>tr>th*6)+(tbody>tr>td*6))+br+div+hr+div然后按`tab
```

```
试试.container>tbody>thead>tr>td*5
```

```
试试a.dropdown.dropdown-toggle[data-toggle="dropdown"]#my.dropdown
```



1、修改快捷键

	"%%":   "<%= | %>",
	"%":   "<% | %>",
2、替换注释功能，解决atom和emmet冲突

3、更多请看看这个图表：https://docs.emmet.io/cheat-sheet/



## minimap

可以查看整个代码页面位置（相当于小地图）

![](http://olmrxx9ks.bkt.clouddn.com/2017-02-19-minimap.gif)



# 常用快捷键

## 快速打开指定文件

`command+t`或`command+p` ，然后进行**模糊搜索**，比如/app/views/admin/orders/index.html.erb只要输入`ad or in`即可快速定位文件。

## 进入Settings

`command+,`

多用`⌘`+`return`,作用：无论你的光标在什么位置，快速在下面切入新的一行。

多用`⌘`+`shift`+`return`,作用：无论光标位置，快速在上方切入新的一行。

commond+d,可以选中相同字符位置（需多次），批量编辑。

![](http://olmrxx9ks.bkt.clouddn.com/2017-02-19-aa.gif)