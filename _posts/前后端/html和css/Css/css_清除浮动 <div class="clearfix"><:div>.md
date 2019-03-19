---
layout: post
title: '清除浮动 <div class="clearfix"></div>'
date: 2017-05-24 09:37
comments: true
categories: 
---
* 201705
* 编程+前端



DIVCSS5案例说明：这里设置一个css宽度（css width）为500px;盒子，css边框（css border）为红色，css背景（css background）为黑色、css padding为10px盒子，里面包裹着2个小盒子，一个css 浮动靠右（float:right）、一个css float靠左（float:left）,两者边框为白色，背景颜色为灰色,宽度为200px,css高度(css height)为150px。这样我们来观察案例效果，看浮动产生并使用clear清除浮动。

```
.divcss5{width:500px;background:#000;border:1px solid #F00;padding:10px} 
.divcss5_left,.divcss5_right{ 
border:1px solid #FFF;background:#999;width:200px;height:150px 
} 
/* css注释： 这里为了截图分别，对css代码换行 */ 
.divcss5_left{ float:left}/* css注释： 设置浮动靠左 */ 
.divcss5_right{ float:right}/* css注释：设置浮动靠右 */ 
```

```
<div class="divcss5"> 
    <div class="divcss5_left">float left盒子</div> 
    <div class="divcss5_right">float right盒子</div> 
</div> 
```

![](http://ww3.sinaimg.cn/large/006tNbRwgy1ffwl8v20jej30gb0dc40r.jpg)

## 这个时候需要clear来清除浮动，让css命名为“divcss5”盒子撑开。代码如下：
```
<div class="divcss5">
     <div class="divcss5_left">float left盒子</div>
     <div class="divcss5_right">float right盒子</div>
     <div class="clearfix"></div>
 </div>
```

# 总结：使用clear可以清除float产生的浮动，注意clear样式对象加入位置，如上案例对“.divcss5”清除浮动，我们就只需要在此对象div标签结束前加入即可清除内部小盒子产生浮动。