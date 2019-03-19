---
layout: post
title: '教程_带缩略图的轮播图_bootstrap'
date: 2017-05-31 10:13
comments: true
categories: 
---
* 201705
* 编程+前端



### 代码出处：[bootstrap菜鸟教程轮播图实例3](http://www.runoob.com/bootstrap/bootstrap-carousel-plugin.html)。根据教程代码做迁移改进。

### 好处是：支持大小屏幕自适应；在原代码基础上增加轮播图居中、轮播的间隔时间、轮播速度；把原来代码的按钮变成缩略图。

![](https://ws1.sinaimg.cn/large/006tNc79gy1fg4kisz74lj31bb0or1kx.jpg)

### 本贴目录（按照先会用再理解的原则）：一、3张轮播最小可行代码；二、问题及解决办法；三、代码介绍；四、8张轮播图代码

# 一、3张轮播最小可行代码
### 使用方法：看下图，①bootstrap引用文件放在文件开头；②最底下的黄色框script部分放在最下方，如果有`<body>` 标签，放在标签前如图；③中间的编号和大小图放在`<body>`中。最后，替换三张大图片、三张小图片完成。但，这是可能你会发现一些小问题，请往下看。
### PS : 如果遇到小图或按钮点击无效，请按照这篇帖子[这可能是全栈营最详细的【下拉菜单和按钮失效】解决办法](https://forum.qzy.camp/t/bootstrap/1685?u=11163)，检查是否是js冲突。

![](https://ws4.sinaimg.cn/large/006tNc79gy1fg4li20pr9j30o40s2gtk.jpg)

```
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>黑暗料理</title>
	<link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<script src="https://cdn.bootcss.com/jquery/2.1.1/jquery.min.js"></script>
	<script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<style>

</style>
</head>
<body>

<div id="myCarousel" class="carousel slide">
	<!-- 轮播（Carousel）指标 -->
	<ol class="carousel-indicators">
		<li data-target="#myCarousel" data-slide-to="0" class="active"></li>
		<li data-target="#myCarousel" data-slide-to="1"></li>
		<li data-target="#myCarousel" data-slide-to="2"></li>
	</ol>

	<!-- 轮播（Carousel）项目 -->
	<div class="carousel-inner">
		<div class="item active">
		    <img src="https://ws2.sinaimg.cn/large/006tNc79gy1fg3q1j3od4j30zk0k0noz.jpg" alt="First slide" class="center-block">
		</div>
		<div class="item">
		    <img src="https://ws4.sinaimg.cn/large/006tNc79gy1fg3q1kw8y4j30zk0k0e81.jpg" alt="Second slide" class="center-block">
		</div>
		<div class="item">
		    <img src="https://ws3.sinaimg.cn/large/006tNc79gy1fg3q1lidm8j30zk0k01as.jpg" alt="Third slide" class="center-block">
		</div>
	</div>
	<!-- 轮播（Carousel）导航 -->
	<!-- <a class="carousel-control left" href="#myCarousel" data-slide="prev">‹</a>
	<a class="carousel-control right" href="#myCarousel" data-slide="next">›</a> -->
</div>

<!-- 控制按钮 -->
<div style="text-align:center; margin-top:10px;">
  <span class="slide-one">
    <img src="https://ws1.sinaimg.cn/large/006tNc79gy1fg4k4xmot1j302h01e3yn.jpg">&nbsp;
  </span>
  <span class="slide-two">
    <img src="https://ws3.sinaimg.cn/large/006tNc79gy1fg4k4xi37kj302h01e3ym.jpg">&nbsp;
  </span>
  <span class="slide-three">
    <img src="https://ws2.sinaimg.cn/large/006tNc79gy1fg4k4xdy7ij302h01emx8.jpg">&nbsp;
  </span>
</div>

<script>
	$(function(){
		// 初始化轮播
		$(".start-slide").click(function(){
			$("#myCarousel").carousel('cycle');
		});
		// 停止轮播
		$(".pause-slide").click(function(){
			$("#myCarousel").carousel('pause');
		});
		// 循环轮播到上一个项目
		$(".prev-slide").click(function(){
			$("#myCarousel").carousel('prev');
		});
		// 循环轮播到下一个项目
		$(".next-slide").click(function(){
			$("#myCarousel").carousel('next');
		});
		// 循环轮播到某个特定的帧
		$(".slide-one").click(function(){
			$("#myCarousel").carousel(0);
		});
		$(".slide-two").click(function(){
			$("#myCarousel").carousel(1);
		});
		$(".slide-three").click(function(){
			$("#myCarousel").carousel(2);
		});
	});
</script>
</body>
</html>
```

# 二、问题及解决办法
### 1、图片高度不一致。
### ①解决办法一：在每个图片的`<img>` 标签最后，加上`style="width:80%;"`，百分比可以自己调。代码如下（小图一样做法）
```
	<!-- 轮播（Carousel）项目 -->
	<div class="carousel-inner">
		<div class="item active">
		    <img src="https://ws1.sinaimg.cn/large/006tNc79gy1fg4lonl8d3j30p90guaqk.jpg" alt="First slide" class="center-block" style="width:80%;">
		</div>
		<div class="item">
		    <img src="https://ws3.sinaimg.cn/large/006tNc79gy1fg4loos7f5j30ui0hy4qp.jpg" alt="Second slide" class="center-block" style="width:80%;">
		</div>
		<div class="item">
		    <img src="https://ws2.sinaimg.cn/large/006tNc79gy1fg4lopqxo5j30qx0hy13j.jpg" alt="Third slide" class="center-block" style="width:80%;">
		</div>
	</div>
```

### ②解决办法二：用截图软件snip、或自带图片工具、或ps，或搜一下在线剪图工具，把图片做成一样高度。（我用的是ps，如果在这一步折腾太久，可以找我帮忙）

### 2、小图的处理（把大图复制一份出来修改）。下面的三步，可以一次性把小图修成一样的大小。注意：这个工具会直接改变图片的大小，所以要从所有大图复制一份出来修改。

![](https://ws3.sinaimg.cn/large/006tNc79gy1fg4m4y9kbuj30gk0bxgof.jpg)

![](https://ws1.sinaimg.cn/large/006tNc79gy1fg4m6ia3xwj30n80fhq7h.jpg)

![](https://ws3.sinaimg.cn/large/006tNc79gy1fg4m81sxhrj30n90fljwr.jpg)

### 3、轮播时间。在`<script>` 标签的最后，加上以下代码。`4000` 代表轮播间隔时间，值越小越快。（注意：如果鼠标有动作，或是放在图片上，会默认停止轮播）
```
		$('.carousel').carousel({
				interval: 4000
		});
```

### 4、轮播速度。用css，在`app/assets/stylesheets/application.scss` 增加以下代码，或在html上方`<head>` 里增加`<style>` 标签并放入css代码。3个秒数自己调，值越小切换速度越快。
```
.carousel-inner > .item {
  -webkit-transition: -webkit-transform 1s ease-in-out;
  -o-transition: -o-transform 1s ease-in-out;
  transition: transform 1s ease-in-out;
```

# 三、代码介绍
### 1、bootstrap引用文件，是三个文件库，直接不用管。
```
<head>
	<link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<script src="https://cdn.bootcss.com/jquery/2.1.1/jquery.min.js"></script>
	<script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>
```

### 2、数字编号（在大图上显示为小圆点），如果继续增加图片，比如我做八张，只要多复制5个`<li data-target="#myCarousel" data-slide-to="2"></li>`，依次把数字改成3、4、5、6、7。——这里的数字是供下方的`<script>` 调用。
```
<div id="myCarousel" class="carousel slide">
	<!-- 轮播（Carousel）指标 -->
	<ol class="carousel-indicators">
		<li data-target="#myCarousel" data-slide-to="0" class="active"></li>
		<li data-target="#myCarousel" data-slide-to="1"></li>
		<li data-target="#myCarousel" data-slide-to="2"></li>
	</ol>
```

### 3、大图，在`<img src="">` 的src里增加图片的链接地址，需要八张图就复制八个。`class="center-block"` 表示大图居中。`style="width:80%;"` 当图片没有处理成高度一致时，要用这一句把图片高度统一，百分比可以自己调整。
```
	<div class="carousel-inner">
		<div class="item active">
		    <img src="https://ws1.sinaimg.cn/large/006tNc79gy1fg4lonl8d3j30p90guaqk.jpg" alt="First slide" class="center-block" style="width:80%;">
		</div>
		<div class="item">
		    <img src="https://ws3.sinaimg.cn/large/006tNc79gy1fg4loos7f5j30ui0hy4qp.jpg" alt="Second slide" class="center-block" style="width:80%;">
		</div>
		<div class="item">
		    <img src="https://ws2.sinaimg.cn/large/006tNc79gy1fg4lopqxo5j30qx0hy13j.jpg" alt="Third slide" class="center-block" style="width:80%;">
		</div>
	</div>
```

### 4、小图，复制多5张小图后，要把`class="slide-one"` 的`one`依次改为`four five six seven eight`，表示第4~8张小图。`margin-top:10px;` 是与大图的距离，可以调。`&nbsp;` 是小图与小图之间的距离，可以复制多几个继续增大间距。

### 5、轮播左右引用和按钮。这部分我觉得自己不需要，被我注解掉。
```
	<!-- 轮播（Carousel）导航 -->
	<a class="carousel-control left" href="#myCarousel" data-slide="prev">‹</a>
	<a class="carousel-control right" href="#myCarousel" data-slide="next">›</a>
```

### 6、`<script>` 控制区，这部分不用改动
```
<script>
	$(function(){
		// 初始化轮播
		$(".start-slide").click(function(){
			$("#myCarousel").carousel('cycle');
		});
		// 停止轮播
		$(".pause-slide").click(function(){
			$("#myCarousel").carousel('pause');
		});
		// 循环轮播到上一个项目
		$(".prev-slide").click(function(){
			$("#myCarousel").carousel('prev');
		});
		// 循环轮播到下一个项目
		$(".next-slide").click(function(){
			$("#myCarousel").carousel('next');
		});
```

### 7、`<script>` 调用区。
### ①同步骤2，比如我们要有八张轮播图，那么就要多复制5个，把数字依次改成3、4、5、6、7。
```
		$(".slide-three").click(function(){
			$("#myCarousel").carousel(2);
		});
```
### ②同步骤4，要把`$(".slide-three")` 中的数字`three`，依次改成`four five six seven eight`

# 四、8张轮播图代码
```
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>黑暗料理</title>
	<link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<script src="https://cdn.bootcss.com/jquery/2.1.1/jquery.min.js"></script>
	<script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<style>
.carousel-inner > .item {
  -webkit-transition: -webkit-transform 1s ease-in-out;
  -o-transition: -o-transform 1s ease-in-out;
  transition: transform 1s ease-in-out;
}
</style>
</head>
<body>

<div id="myCarousel" class="carousel slide">
	<!-- 轮播（Carousel）指标 -->
	<ol class="carousel-indicators">
		<li data-target="#myCarousel" data-slide-to="0" class="active"></li>
		<li data-target="#myCarousel" data-slide-to="1"></li>
		<li data-target="#myCarousel" data-slide-to="2"></li>
		<li data-target="#myCarousel" data-slide-to="3"></li>
		<li data-target="#myCarousel" data-slide-to="4"></li>
		<li data-target="#myCarousel" data-slide-to="5"></li>
		<li data-target="#myCarousel" data-slide-to="6"></li>
		<li data-target="#myCarousel" data-slide-to="7"></li>
	</ol>

	<!-- 轮播（Carousel）项目 -->
	<div class="carousel-inner">
		<div class="item active">
		    <img src="https://ws2.sinaimg.cn/large/006tNc79gy1fg3q1j3od4j30zk0k0noz.jpg" alt="First slide" class="center-block">
		</div>
		<div class="item">
		    <img src="https://ws4.sinaimg.cn/large/006tNc79gy1fg3q1kw8y4j30zk0k0e81.jpg" alt="Second slide" class="center-block">
		</div>
		<div class="item">
		    <img src="https://ws3.sinaimg.cn/large/006tNc79gy1fg3q1lidm8j30zk0k01as.jpg" alt="Third slide" class="center-block">
		</div>
		<div class="item">
				<img src="https://ws1.sinaimg.cn/large/006tNc79gy1fg3ramc72rj30zk0k0npd.jpg" alt="Third slide" class="center-block">
		</div>
		<div class="item">
				<img src="https://ws3.sinaimg.cn/large/006tNc79gy1fg3ran3pghj30zk0k0h6z.jpg" alt="Third slide" class="center-block">
		</div>
		<div class="item">
				<img src="https://ws4.sinaimg.cn/large/006tNc79gy1fg3rdgbwd5j30zk0k01h5.jpg" alt="Third slide" class="center-block">
		</div>
		<div class="item">
				<img src="https://ws4.sinaimg.cn/large/006tNc79gy1fg3rdh9d9hj30zk0k0b29.jpg" alt="Third slide" class="center-block">
		</div>
		<div class="item">
				<img src="https://ws1.sinaimg.cn/large/006tNc79gy1fg3rdu3xq3j30zk0k0e81.jpg" alt="Third slide" class="center-block">
		</div>
	</div>
	<!-- 轮播（Carousel）导航 -->
	<!-- <a class="carousel-control left" href="#myCarousel" data-slide="prev">‹</a>
	<a class="carousel-control right" href="#myCarousel" data-slide="next">›</a> -->
</div>

<!-- 控制按钮 -->
<div style="text-align:center; margin-top:10px;">
  <span class="slide-one">
    <img src="https://ws1.sinaimg.cn/large/006tNc79gy1fg4k4xmot1j302h01e3yn.jpg">&nbsp;
  </span>
  <span class="slide-two">
    <img src="https://ws3.sinaimg.cn/large/006tNc79gy1fg4k4xi37kj302h01e3ym.jpg">&nbsp;
  </span>
  <span class="slide-three">
    <img src="https://ws2.sinaimg.cn/large/006tNc79gy1fg4k4xdy7ij302h01emx8.jpg">&nbsp;
  </span>
	<span class="slide-four">
		<img src="https://ws3.sinaimg.cn/large/006tNc79gy1fg4k4x4bitj302h01e0sv.jpg">&nbsp;
	</span>
	<span class="slide-five">
		<img src="https://ws1.sinaimg.cn/large/006tNc79gy1fg4k4x0rhtj302h01emxa.jpg">&nbsp;
	</span>
	<span class="slide-six">
		<img src="https://ws2.sinaimg.cn/large/006tNc79gy1fg4k4wwq3jj302h01ejrh.jpg">&nbsp;
	</span>
	<span class="slide-seven">
		<img src="https://ws4.sinaimg.cn/large/006tNc79gy1fg4k4wrf50j302h01e3ym.jpg">&nbsp;
	</span>
	<span class="slide-eight">
		<img src="https://ws2.sinaimg.cn/large/006tNc79gy1fg4k4wmjsgj302h01et8s.jpg">&nbsp;
	</span>
</div>

<script>
	$(function(){
		// 初始化轮播
		$(".start-slide").click(function(){
			$("#myCarousel").carousel('cycle');
		});
		// 停止轮播
		$(".pause-slide").click(function(){
			$("#myCarousel").carousel('pause');
		});
		// 循环轮播到上一个项目
		$(".prev-slide").click(function(){
			$("#myCarousel").carousel('prev');
		});
		// 循环轮播到下一个项目
		$(".next-slide").click(function(){
			$("#myCarousel").carousel('next');
		});
		// 循环轮播到某个特定的帧
		$(".slide-one").click(function(){
			$("#myCarousel").carousel(0);
		});
		$(".slide-two").click(function(){
			$("#myCarousel").carousel(1);
		});
		$(".slide-three").click(function(){
			$("#myCarousel").carousel(2);
		});
		$(".slide-four").click(function(){
			$("#myCarousel").carousel(3);
		});
		$(".slide-five").click(function(){
			$("#myCarousel").carousel(4);
		});
		$(".slide-six").click(function(){
			$("#myCarousel").carousel(5);
		});
		$(".slide-seven").click(function(){
			$("#myCarousel").carousel(6);
		});
		$(".slide-eight").click(function(){
			$("#myCarousel").carousel(7);
		});
		$('.carousel').carousel({
				interval: 4000
		});
	});
</script>
</body>
</html>
```
### PS：本贴案例用于我们的[jdstore作品第四版黑暗料理模块](https://fullstack.xinshengdaxue.com/works/556)，希望你能帮我们做下测试和提意见，如果喜欢请帮我们投上一票。谢谢你能读到最后。

![](https://ws1.sinaimg.cn/large/006tNc79gy1fg4nhi6hr3j31cc0ow4qp.jpg)

这有一些其他的教程 可能对你有帮助 

[这可能是全栈营最详细的【带缩略图的轮播图】教程]
(https://forum.qzy.camp/t/topic/1684)

[这可能是全栈营最详细的【省市区详细地址】教程] 
(https://forum.qzy.camp/t/topic/1659)

[这可能是全栈营最详细的【下拉菜单和按钮失效】解决办法]
(https://forum.qzy.camp/t/topic/1685)

[这可能是最详细的全栈营【seed】教程]
(https://forum.qzy.camp/t/seed/1626)

[这可能是最容易出现的全栈营【七牛云上传】教程]
(https://forum.qzy.camp/t/topic/1617)

[这可能是全栈营最详细的【客服系统】教程]
(https://forum.qzy.camp/t/topic/1615)

欢迎随时和我交流