---
layout: post
title: 'position绝对定位absolute relative left top right left'
date: 2017-05-24 09:17
comments: true
categories: 
---
* 201705
* 编程+前端



# 使用z-index前

```
<!DOCTYPE html> 
<html> 
<head> 
<meta charset="utf-8" /> 
<title>div重叠 叠加实例 未排层叠顺序 www.divcss5.com</title> 
<style> 
.div-relative{position:relative; color:#000; border:1px solid #000; width:500px; height:400px} 
.div-a{ position:absolute; left:30px; top:30px; background:#F00; width:200px; height:100px} 
/* css注释说明： 背景为红色 */ 
.div-b{ position:absolute; left:50px; top:60px; background:#FF0; width:400px; height:200px} 
/* 背景为黄色 */ 
.div-c{ position:absolute; left:80px; top:80px; background:#00F; width:300px; height:300px} 
/* DIV背景颜色为蓝色 */ 
</style> 
</head> 
<body> 
<div class="div-relative"> 
<div class="div-a">我背景为红色</div> 
<div class="div-b">我背景为黄色</div> 
<div class="div-c">我背景为蓝色</div> 
</div> 
</body> 
</html> 
```
![](http://ww1.sinaimg.cn/large/006tNbRwgy1ffwkndxf8ij30ef0bot9b.jpg)


# 使用z-index后
```
<!DOCTYPE html> 
<html> 
<head> 
<meta charset="utf-8" /> 
<title>div重叠 叠加实例 排层叠顺序 www.divcss5.com</title> 
<style> 
.div-relative{position:relative;color:#000;border:1px solid #000;width:500px;height:400px} 
.div-a{ position:absolute;left:30px;top:30px;z-index:100;background:#F00;width:200px;height:100px} 
/* div背景色为红色 */ 
.div-b{ position:absolute;left:50px;top:60px;z-index:80;background:#FF0;width:400px;height:200px} 
/* 背景为黄色 */ 
.div-c{ position:absolute;left:80px;top:80px;z-index:70;background:#00F;width:300px;height:300px} 
/* 背景为蓝色 */ 
</style> 
</head> 
<body> 
<div class="div-relative"> 
<div class="div-a">我背景为红色</div> 
<div class="div-b">我背景为黄色</div> 
<div class="div-c">我背景为蓝色</div> 
</div> 
</body> 
</html> 
```
![](http://ww3.sinaimg.cn/large/006tNbRwgy1ffwko3c8z3j30ek0bt3yz.jpg)


## 总结：要实现DIV重叠，并改变实现DIV盒子层叠重叠顺序，我们对父级使用position:relative,对子级使用position:absolute、z-index（重叠顺序）、left，right，top，bottom绝对定位相当于父级具体位置。

## 通常我们使用position:absolute；position:relative进行绝对定位布局，通过CSS进行定义定位，DIV布局HTML，注意什么地方使用position:relative，什么地方使用position:absolute进行定位，同时不要忘记使用left、right、top、bottom的配合定位具体位置。绝对定位如果父级不使用position:relative，而直接使用position:absolute绝对定位，这个时候将会以body标签为父级，使用position:absolute定义对象无论位于DIV多少层结构，都将会被拖出以<body>为父级（参考级）进行绝对定位。绝对定位非常好用，但切记不要滥用，什么地方都用，这样有时会懒得计算距离上、下、左、右间距，同时可能会造成CSS代码臃肿，更加经验适当使用，用于该使用地方。
在绝对定位时候我们可以使用css z-index定义css层重叠顺序。
```
<style> 
.divcss5{ position:relative;width:400px;height:200px; 
border:1px solid #000} 
/* 定义父级position:relative 为就认为是绝对定位声明吧 */ 
.divcss5-a{ position:absolute;width:100px;height:100px; 
left:10px;top:10px;background:#000} 
/* 使用绝对定位position:absolute样式 并且使用left top进行定位位置 */ 
.divcss5-b{ position:absolute;width:50px;height:50px; 
right:15px;bottom:13px;background:#00F} 
/* 使用绝对定位position:absolute样式 并且使用right bottom进行定位位置 */ 
</style> 
```

```
<div class="divcss5"> 
    <div class="divcss5-a"></div> 
    <div class="divcss5-b"></div> 
</div> 
```

![](http://ww1.sinaimg.cn/large/006tNbRwgy1ffwl559zqxj30f70em76i.jpg)