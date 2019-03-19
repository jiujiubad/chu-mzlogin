---
title: web-page-landding_page模板之anndo&吉米
date: '2017-11-17 00:10'
categories:
  - web页面
tags:
  - web页面
img: 'https://ws2.sinaimg.cn/large/006tNc79gy1fnfvej9iydj30ci08z3yo.jpg'
abbrlink: f5818f78
---

* 201711
* 编程+前端



## 不同页面分别用什么注释标记：

welcome#index.html.erb用：`<!--==== 轮播（Carousel）指标 ====-->`

css用：`/*===== Intro 首页-广告轮播 =====*/`、`/* 标题 */`

## 参考链接：

[by anndo 如何科学的“抄” jobs/index页面而不变成僵尸页面？](https://forum.qzy.camp/t/jobs-index/1469)

[by anndo & 吉米【JA魔改秘笈】还卡在前端的坑吗？教你如何第一次做Landing Page就上手！！](http://xbearx1987-blog.logdown.com/posts/1915835)



# 一、css的小技巧

## 1、怎么抄别人的代码？

1）将抄来的CSS代码用一个ID选择器包裹起来，如下图：

​	![](https://ws4.sinaimg.cn/large/006tNc79gy1fmbkj2pp1bj30l10mqt9w.jpg)

2）将html代码也用同样的ID包裹起来，如下图：![](https://ws4.sinaimg.cn/large/006tNc79gy1fmbkj6dgvyj30sj0nqq40.jpg)

由于ID选择器是唯一的，这样一来，我们就完全不怕抄来的代码命名冲突或重复了；

## 2、如何快速引用版块？

1）找到对应的HTML代码，并复制到你的index页面里

* 每一个板块都是用`<section></section>`包住

* 请记住这个板块的Class名称，此范例为`show-box`

  ![](https://ws2.sinaimg.cn/large/006tNc79gy1fmbkmh0ijrj30m80bb74l.jpg)

2、找到对应的CSS代码，并复制到你的application.scss页面里

* 可直接搜索CSS名称，此范例为`show-box`，里面会包含所有此`<section>`所用到的CSS

  ![](https://ws4.sinaimg.cn/large/006tNc79gy1fmbkoag1ixj30f80m8dg6.jpg)

## 3、从新专案到做出首页的顺序？

### 3.1、命名方法：

* 比如products文件夹，index第一层用`<div class="box-product">` ，show用box-product-show（这样方便搜索，搜box-就是文件名，搜-box就是模块名），后面每个模块改用` <section class="模块名-box">`包起来。
* asset/images，照片命名用`名字_序号.png`
* css注解，`/*===== Push 首页-立即购买 =====*/`。html注解`<!--===== 广告轮播 =====-->`。



### 3.2、实作

1）rails new

2）bootstrap、fontawesome、

3）footer、navbar、welcome#index

4）首页图片放入asset/images，包括合作品牌`brand_1-9.png`、分类`category_1-3`、用户说`founder_1-2`、大图轮播`intro_1-3`、产品图`item_1-9`。

```
<div class="welcome-box">
  <!--===== 广告轮播 =====-->
  <section class="intro-box">
    <div class="row">
      <div class="col-md-12">
        <div id="intro" class="carousel slide" data-ride="carousel">
        ...
        </div>
      </div>
    </div>
  </section>
  
  <!--===== 品牌故事 =====-->
  <section class="story-box">
    <div class="row">
      <div class="col-md-10 col-md-offset-1">
      ...
      </div>
    </div>
  </section>
  
  <!--===== 商品分类 =====-->
  <section class="categories-box">
    <div class="row">
      <div class="col-md-4 category-content">
        <%= link_to '#' , class: "category_3" do %>
          <%= link_to '#' , class: "category_3" do %>
            <div class="category-box">
              <%= image_tag("category_3.jpg") %>
            </div>
            <div>
              <h3>锅碗</h3>
              <p>相較於琺瑯和陶瓷材質的牛奶鍋，不鏽鋼的質感多了一點硬派的感覺。</p>
            </div>
         <% end %>
      </div>
      ...
    </div>
  </section>
  
  <!--===== 推荐商品 =====-->
  <section class="show-box">
    <div class="row">
      <div class="col-md-10 col-md-offset-1">
        <div class="row">
          <div class="col-md-3">
            <%= link_to '#' do %>
            ...
            <% end %>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <!--===== 合作品牌 =====-->
  <section class="brand-box">
    <div class="row">
      <div class="col-md-10 col-md-offset-1">
        <%= image_tag("brand_1.png") %>
        <%= image_tag("brand_1.png") %>
        ...
      </div>
    </div>
  </section>
  
  <!--===== 立即购买 =====-->
  <section class="push-box">
    <%= link_to('立即购买', '#', class:'btn btn-push' ) %>
  </section>
```

5）navbar的js

```
+$(window).scroll(function () {
 +  /*===== Welcome#index - 首页导览列变化 =====*/
 +	if ($(this).scrollTop() > 125) {
 +		$('#navbar').addClass('scroll_navbar')
 +	} else {
 +		$('#navbar').removeClass('scroll_navbar')
 +	}
 +})
```

相应的css

```
/*===== 基础栏位设定======*/
.width-25 {
       width: 25%;
     }
.width-100 {
       width: 100%;
     }
/*===== Navbar 导览列 ======*/
+ .navbar-default {
 +   background: rgba(0,0,0,0.5); //半透明背景
  
 +   /* 文字连结 */
 +   a {
 +     color: #fff !important;
 +   }
     a:focus {
     	color: #0070DE !important;
     }
+   /*===== 导览列滑动特效 ======*/
 +   &.scroll_navbar {
 +     background-color: #fff; //背景颜色
 +
 +     /* 文字连结 */
 +     a {
 +       color: #000 !important;
 +     }
 +     a:hover,
 +     a:active,
 +     a:focus {
 +       color: #0070DE !important;
 +     }
 +   /* 搜索栏 */
     .search-box {
       margin-top: 7.5px;
       input {
         height: 35px;
       }
 
```

html

```
+<div class="row">
 +  <div class="col-md-12">
 +    <div class="navbar navbar-default navbar-fixed-top" role="navigation" id="navbar">
      ...
      </div>
    </div>
  </div>
```

6）footer的css

```
  /*===== Footer 页脚 ======*/
   .footer{
     text-align: center;
 -   min-height: 200px;
 -   background-color: #02061A;
 +   min-height: 175px; //最小高度
 +   background-color: #222;
 ...
   background: image_url("start.jpg") no-repeat scroll top center/ cover; //背景图片
```

html

```
<footer class="footer">
  <div class="container">
    <div class="row">
      <div class="col-md-8 col-md-offset-2">
      ...
      </div>
    </div>
  </div>
</footer>
```



## 4、通用css代码怎么写？

### 4.1、什么需要通用？

1）对于body：

* 裁剪内容

* body的位置`position: relative;`

* 字的大小`font-size`、间距`letter-spacing`、行距

* 链接a下划线`text-decoration:none !important`

* 页面内容container-fluid

  ```
  /*===== 網站通用設置 ======*/
  body {
    overflow-x: hidden; //裁切內容，超出視窗不顯示
    position: relative;
    letter-spacing: 1px;
    font-size: 14px;
    
    a {
      text-decoration:none !important;
    }

      /*===== 頁面內容設定 ======*/
    .container-fluid {
      margin-top: 55px;
      min-height: 550px;
    }
  ```

* 换页按钮

* 立即购买按钮，更改btn-default样式，加入hover、active、focus样式

  ```
  .btn-default {
        margin-top: 30px;
        padding: 15px 20px 15px 20px;
      }

      .btn-default:hover,
      .btn-default:active,
      .btn-default:focus {
        background-color: #fff;
      }
  ```

* 基础栏位.width-25、.width-50、.height-200等

* 表格标题th、内容td设置居中`vertical-align: middle !important;`

* div排版

  ```
  .left-box {
      float: left;
    }

    .right-box {
      float: right;
    }
  ```

  ​

2）对于一个页面-box：

* 字体大小h1/h2/h3，设置font-size、font-weight

* short-line

  ```
  .short-line {
      background: #eb5424;
      margin: 15px auto 35px auto;
      width: 125px;
      height: 2px;
    }
  ```

* 按钮如.btn-push，和.btn-intro，设置通用的hover、active、focus，以及transition淡入淡出效果

  ```
  .btn-push:hover,
    .btn-intro:hover {
      background-color: rgba(235, 84, 36, 0.5);
      border-color: #eb5424;
      color: rgba(255, 255, 255, 0.9);
    }

    .btn-push,
    .btn-intro {
      -webkit-transition: all 0.4s ease-in-out;
      -moz-transition: all 0.4s ease-in-out;
      -ms-transition: all 0.4s ease-in-out;
      -o-transition: all 0.4s ease-in-out;
      transition: all 0.4s ease-in-out;
    }
  ```

3）字体直接接入字体库

* ```
  @import url('https://fonts.googleapis.com/css?family=Oswald');

  @import url(https://fonts.googleapis.com/css?family=Raleway:400,900,700,600,500,300,200,100,800);
  @import url(https://fonts.googleapis.com/css?family=Acme);
  ```




# 【问题1】尝试设置通用代码、找好bootstrap套件，做一个完整首页？

——以前经常遇到的解决不了的问题：

* 导航栏手机端缩成汉堡型无法展开，如果不收缩又会完全挡住大图；
* 导航栏置顶也是用navbar-fixed-top
* 导航栏搜索框怎么自己设置
* 大图如果自适应，文字不会居中会乱跑；大图如果用bootstrap的巨幕，又只能设置固定大小不能自适应
* footer置底并没有看到什么相关代码，是怎么做到的？

## 1、大图轮播模块

1）下载图片素材，发现除了合作商标、用户头像外，其余模块图片都是一样大小。

2）设置首页welcome#index，首页所用图片放入app/asset/images

3）[带标题的大图模块引入](http://www.runoob.com/try/try.php?filename=bootstrap3-plugin-carousal-caption)，并在第一行加入`data-ride="carousel"`（同一页有多个轮播时才能正常自动轮播）

>  轮播失效请检查`app/assets/javascripts/application.js`是否缺少`//= require bootstrap/alert`、`//= require bootstrap/dropdown`、`//= require bootstrap-sprockets`

```
<div id="myCarousel" class="carousel slide" data-ride="carousel">
	<!-- 轮播（Carousel）指标 -->
	<ol class="carousel-indicators">
		<li data-target="#myCarousel" data-slide-to="0" class="active"></li>
		<li data-target="#myCarousel" data-slide-to="1"></li>
		<li data-target="#myCarousel" data-slide-to="2"></li>
	</ol>   
	<!-- 轮播（Carousel）项目 -->
	<div class="carousel-inner">
		<div class="item active">
			<img src="/wp-content/uploads/2014/07/slide1.png" alt="First slide">
			<div class="carousel-caption">标题 1</div>
		</div>
		<div class="item">
			<img src="/wp-content/uploads/2014/07/slide2.png" alt="Second slide">
			<div class="carousel-caption">标题 2</div>
		</div>
		<div class="item">
			<img src="/wp-content/uploads/2014/07/slide3.png" alt="Third slide">
			<div class="carousel-caption">标题 3</div>
		</div>
	</div>
	<!-- 轮播（Carousel）导航 -->
	<a class="carousel-control left" href="#myCarousel" 
	   data-slide="prev">&lsaquo;</a>
	<a class="carousel-control right" href="#myCarousel" 
	   data-slide="next">&rsaquo;</a>
</div> 
```

4）加入外层标签

```
div.box-welcome>section.intro-box>div.row>div.col-md-12
```

5）修改图片；加入文字；变成链接，用`<%= link_to '#', target: "_blank" do %>`意思是新窗口打开。

>  注意文字层是加`<div class="carousel-caption">`，否则文字会在图片下另起一行。

```
            <div class="item">
              <%= link_to '#', target: "_blank" do %>
                <%= image_tag("intro_3.jpg") %>
                <div class="carousel-caption">
                  <h3>精选厨具</h3>
                  <p>优质进口厨具，做菜更加便利</p>
                </div>
              <% end %>
            </div>
```

6）上一步的代码加入css

>  文字用百分比`margin-top: -40%;`，手机自适应不会乱跑

```
/*==== intro 轮播图 ====*/
.intro-box {
  .item {
    h3 {
      margin-top: -40%;
      font-size: 50px;
      letter-spacing: 5px;
    }
    p {
      font-size: 20px;
    }
    img {
      width: 100%;
    }
  }
}
```

7）换页按钮html，把`&lsaquo;`换成font-awesome图标。

>  `<span class="sr-only">Previous</span>`是残障人士用用屏幕阅读器阅读的效果，可以不加。

```
          <a class="carousel-control left" href="#myCarousel"
        	   data-slide="prev">
            <i class="fa fa-angle-left" aria-hidden="true"></i>
          </a>
```

8）换页按钮css，一样的文字用百分比`margin-top: 140%;`

```
.carousel-control {
    i {
      margin-top: 140%; //按钮高度
      font-size: 50px; //按钮大小
    }
  }
```

## 2、品牌故事模块

1）html基本信息写入

```
  <h2>品牌故事</h2>
  <h1>JDStore</h1>
  <div class="short-line"></div>
  <%= image_tag("founder_1.png") %>
  <h3>Victor</h3>
  <p>我們希望能為大家帶來種類多樣、價格低廉並且設計獨特，且讓大多數人可以負擔的起的家具家飾品，爲了實現這樣的想法，我們從產品設計、原料採購、生產製造，到在分店中的經營，都不斷在創新和尋求改善。 </p>
  <hr/>
  <h3>Kelly</h3>
  <p>我們知道如果要提供顧客便宜、品質又好的商品，企業必須有效的管理成本及運用創新的製造方法，這是從未改變的信念，最有效的利用原料，尋找更經濟、更有效率及更有創意的製作或包裝方式，降低成本，回饋給大家! </p>
  <%= image_tag("founder_2.png") %>
```

2）模块居中用偏移`col-md-offset-1`还是自定义`col-center` ？还是自定义好些，因为如果模块占用`col-md-9`这种单数，不管怎么偏移都不会对称居中。

> 模块中的细节位置再用`col-md-offset-1`调整，如步骤3）中。

```
/*==== Common ====*/
body {
  font-family: 'Noto Sans SC', sans-serif;
  color: #666;
  .col-center{
    float: none;
    margin: 0 auto;
  }
}
```

排版1

```
section.story-box>div.row>div.col-md-10.col-center
```

3）排版2。新开一行row，头像占`col-md-3 col-md-offset-1` ，文字占`col-md-7`

4）box-welcome的css，每个模块反复用到的元素

> 用`div`定义短线，方法与`<hr/>`一样，这里保留hr宽度满屏于是div做short-line来区分开。粗细用height，宽度width，左右方向位置居中是`margin: 0 auto;`的auto，上下方向位置加入`margin: 30px auto;`或`margin: 15px auto 30px auto;`

```
/*==== box-welcome ====*/
.box-welcome {
  h2 {
    font-size: 24px;
    font-weight: 600;
  }
  .short-line {
    background-color: #0070DE;
    margin: 15px auto 30px auto;
    width: 150px;
    height: 1.5px;
  }
}
```

5）story-box的css

* 以前喜欢用row标签的margin-top来调模块位置，这里用section标签的story-box，设置padding
* p标签用`text-align: justify;`，两端对齐的意思
* img标签用`border-radius: 50%`显示原形，50%以上都是圆形
* img标签，用`width: 150px;`设置图片大小。
  * 轮播大图用百分比，好处是大小屏幕保持图片占满窗口；
  * 这里人物头像用150px（苹果6是375px），即便手机看也不会挡住。而且，如果用百分比，大概ipad大小到手机屏幕大小，图片会变成单独一行一张图，变得特别大。——凡是元素用到px，特别是宽度，都要看一下是否会影响手机端显示。

```
/*==== story 品牌故事 ====*/
.story-box {
  background-color: #fff;
  text-align: center;
  padding: 50px 62.5px 50px 62.5px;//位置
  h3 {
    font-size: 20px;
    text-align: left;
  }
  p {
    color: #333;
    line-height: 24px;
    text-align: justify;
  }
  img {
    border-radius: 50%;
    width: 150px;
  }
}
```

## 3、服务优势模块

1）html基本信息写入

```
<h2>服务优势</h2>
  <div class="short-line"></div>
  <%= image_tag("service_1.png") %>
  <h3>品质保证</h3>
  <p>本店的商品皆通过市场验证，使用最高级的材料制作而成，品质为业界领先标准。</p>
  <%= image_tag("service_2.png") %>
  <h3>快速送达</h3>
  <p>全国皆享有当天下单、隔日送达的服务，过程中有任何损坏皆由我们负责，请放心购买。</p>
  <%= image_tag("service_3.png") %>
  <h3>安心使用</h3>
  <p>设计皆考量人体工学及真实使用情境，使用起来更安心。</p>
```

2）排版1

```
section.service-box>div.row>div.col-md-10.col-center
```

3）排版2，新增row

```
div.row>(div.col-md-4.col-sm-4.col-xs.12>div.service-item)*3
```

4）service-box的css

```
/*==== service 服务优势 ====*/
.service-box {
  background-color: #f8f8f8;
  text-align: center;
  padding: 50px 62.5px 50px 62.5px;
  .service-item {
    margin: 0 25px;
    img {
      width: 100px;
    }
    h3 {
      font-size: 18px;
    }
    p {
      color: #666;
      line-height: 24px;
      text-align: justify;
      margin-top: 25px;
    }
  }
}
```

## 4、商品分类模块

1）html基本信息写入

```
<%= image_tag("category_1.jpg") %>
  <h3>器皿</h3>
  <p>不鏽鋼材質便於清洗，不怕碰撞，緻密紋理相當迷人。鍋體兩側都有尖口，左右撇子都好用。可以煮兩到三人份的奶茶、一人份的湯麵、粥類，料理後亦可直接端上桌，可愛又方便！</p>
  <%= image_tag("category_2.jpg") %>
  <h3>厨具</h3>
  <p>工房Aizawa最受歡迎的牛奶鍋，由創立於大正11年、以製作金屬食器聞名的老舖Aizawa工房製作而成。在職人們的手中，金屬冷硬的質感，帶上了手工製作的細緻與溫度。</p>
  <%= image_tag("category_3.jpg") %>
  <h3>锅碗</h3>
  <p>相較於琺瑯和陶瓷材質的牛奶鍋，不鏽鋼的質感多了一點硬派的感覺，鍋體上細緻的金屬紋理相當迷人。由白梣木手工製成的木柄，如同松鼠尾巴般圓潤好握、防燙，傾倒的角度也相當順手。</p>
```

2）排版1

```
section.category-box>div.row>div.col-md-10.col-center
```

3）排版2

```
div.row>(div.col-md-4.col-sm-4.col-xs-12.category-item)*3
```

4）排版3，图片链接

```
<%= link_to '#' do %>... <% end %>
```

5）通用css，加在common位置

```
a {
    color: #666;
  }
  a:hover {
    color: #7f8c8d;
    transition: 0.5s;
    text-decoration: none;
  }
```

6）css

```
/*==== category 商品分类 ====*/
.category-box {
  background-color: #fff;
  text-align: center;
  padding: 50px 62.5px 50px 62.5px;
  .category-item {
    img {
      width: 250px;
    }
    h3 {
      font-size: 18px;
      padding: 20px 0;
    }
    p {
      line-height: 24px;
      text-align: justify;
    }
  }
}
```

## 5、推荐商品模块

1）html基本信息写入。

【问题】如果两行都用p，要分别定义位置就不能直接用p标签来定义，而是要加多一层div？

* 解法一：`<p class="p1">`和`<p class="p2">`，然后定义`.p1{}`和`.p2{}`


* 解法二：一个改成h6标签，但注意h会自动加粗。建议用第一种

```
  <!--==== 推荐商品 ====-->
  <h2>推荐商品</h2>
  <div class="short-line"></div>
  <%= image_tag("item_1.jpg") %>
  <p>两手锅</p>
  <p>$550</p>
  <%= image_tag("item_2.jpg") %>
  <p>平底锅</p>
  <p>$750</p>
  <%= image_tag("item_3.jpg") %>
  <p>铁制茶壶</p>
  <p>$450</p>
  <%= image_tag("item_4.jpg") %>
  <p>茶壶</p>
  <p>$250</p>
  <%= image_tag("item_5.jpg") %>
  <p>八角点心盘</p>
  <p>$150</p>
  <%= image_tag("item_6.jpg") %>
  <p>点心盘</p>
  <p>$80</p>
  <%= image_tag("item_7.jpg") %>
  <p>木盘</p>
  <p>$125</p>
  <%= image_tag("item_8.jpg") %>
  <p>酱料碟</p>
  <p>$20</p>
  <%= image_tag("item_9.jpg") %>
  <p>酱料碟</p>
  <p>$50</p>
  <%= image_tag("item_10.jpg") %>
  <p>马克杯</p>
  <p>$80</p>
  <%= image_tag("item_11.jpg") %>
  <p>陶锅</p>
  <p>$650</p>
  <%= image_tag("item_12.jpg") %>
  <p>8号锅</p>
  <p>$500</p>
```

2）排版1

```
section.recommend-box>div.row>div.col-md-10.col-center
```

3）排版2

```
div.row>(div.col-md-3.col-sm-6.col-xs-12.recommend-item)*12
```

4）排版3，图片和文字整个模块变成链接，并给图片加上`div.recommend-part1   `（为了给图片加边框效果）

```
<%= link_to '#' do %>... <% end %>
```

5）css，其中hover用`opacity: 0.6;`是最简单粗暴的动画效果。图片阴影用`box-shadow: 2px 2px 5px #888`。

```
/*==== 推荐商品 ====*/
.recommend-box {
  background-color: #f8f8f8;
  text-align: center;
  padding: 50px 0;
  .recommend-item {
    .recommend-part1 {
      img {
        width: 100%;
      }
      box-shadow: 2px 2px 5px #888;
      margin-top: 15px;
    }
    .recommend-part1:hover {
      opacity: 0.6;
    }
    h6 {
      font-size: 14px;
      margin-top: 30px;
    }
    p {
      margin-bottom: 40px;
    }
  }
}
```

## 6、用户反馈模块

1）bootstrap轮播模块，替换照片`<%= image_tag("feedback_1") %>`。

2）此时既不会自动轮播、点击小圆也没反应。

3）把4个`myCarousel`的id换成`feedback`，此时点击小圆会翻页，但仍不会自动轮播。

4）轮播第一行即有id的一行，加上`data-ride="carousel"`，可以轮播了。

5）html基本信息，放到轮播的item中

```
  		<h2>用户反馈</h2>
        <div class="short-line"></div>
        
<div class="item active">
  <p class="p1">这是我用过最好的网站，商品众多、下单方便、送货快速，还能订制特殊规格的锅具，强力推荐。</p>
  <%= image_tag("feedback_1.png") %>
  <p class="p2">Eddie - 上班族</p>
</div>
<div class="item">
  <p class="p1">我是这网站的忠实用户，已经在这买好几年了，质量一直很好，而且不定时会有折扣，真的很划算！</p>
  <%= image_tag("feedback_2.png") %>
  <p class="p2">Anna - 家庭主妇</p>
</div>
<div class="item">
  <p class="p1">身为一个学生，预算不太多，却也能在这找到便宜又有设计感的器皿，让我生活又添加一份乐趣。</p>
  <%= image_tag("feedback_3.png") %>
  <p class="p2">Kobe - 大学生</p>
</div>
```

6）排版

```
section.feedback-box>div.row>div.col-md-10.col-center
```

7）css，常用部分

border到这里接触了三种用法，border用来做边框，border-shadow做阴影，border-radius做圆角或圆。

> 居中喜欢用`margin: 0 auto;`，好处是可以继续改调整位置，如下的`argin: 0 auto 25px auto; `

```
/*==== 用户反馈 ====*/
.feedback-box {
  background-color: #fff;
  text-align: center;
  padding: 50px 0 100px 0;
  .item {
    img {
      width: 80px;
      border-radius: 50%;
      margin: 0 auto 25px auto;
      border: 2px solid #ccc;
    }
    .p1 {
      max-width: 550px;
      margin: 0 auto 25px auto;
    }
    .p2 {
      margin-top: 25px;
    }
  }
}
```

8）css，轮播按钮

旋转角度的css没有接触过。

```
  .carousel-indicators {
    margin-bottom: -70px;
    li {
      background-color: #666;
      height: 13px;
      width: 13px;
      margin: 0 5px;
      border-radius: 0;

      /* 按钮转向45度 */
      -moz-transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
      -o-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
    li.active {
      background-color: #0070DE;
    }
  }
```

## 7、合作品牌模块

1）html基本信息写入。

```
  <h2>合作品牌</h2>
  <div class="short-line"></div>
  <%= image_tag("brand_1.png") %>
  <%= image_tag("brand_2.png") %>
  <%= image_tag("brand_3.png") %>
  <%= image_tag("brand_4.png") %>
  <%= image_tag("brand_5.png") %>
  <%= image_tag("brand_6.png") %>
  <%= image_tag("brand_7.png") %>
  <%= image_tag("brand_8.png") %>
  <%= image_tag("brand_9.png") %>
```

2）排版

```
section.brand-box>div.row>div.col-md-10.col-center
```

3）css

```
/*==== 合作品牌 ====*/
.brand-box {
  background-color: #f8f8f8;
  text-align: center;
  padding: 50px 0;
  img {
    width: 150px;
    margin: 10px 15px;
  }
}
```

## 8、立即购买模块

1）html基本信息写入。

```
<section class="push-box">
    <%= link_to('立即购买', '#', class:'btn btn-push' ) %>
  </section>
```

2）css

> 插入背景图片两种方法，测试发现`background: image_url("")`不太好，不能用ipic图片。
>
> `background-image: url("");`好用，既能用本地app/asset/images图片，又能用ipic图片

```
/*==== 立即购买 ====*/
.push-box {
  background-image: url("start");
  height: 200px;
  padding: 75px 0 0 0;
  text-align: center;
  .btn-push {
    color: #fff;
    font-size: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px 20px;
    -webkit-transition: all 0.4s ease-in-out;
    -moz-transition: all 0.4s ease-in-out;
    -ms-transition: all 0.4s ease-in-out;
    -o-transition: all 0.4s ease-in-out;
    transition: all 0.4s ease-in-out;
  }
  .btn-push:hover {
    background-color: #0070DE;
    border-color: #0070DE;
  }
```



[问题]仍有一些自适应问题，以及如何做才能方便调整到韵儿爸爸那种对齐？

```
app/views/layouts/application.html.erb
<body>
    <div class="content">

      <div class="container-fluid">
        <%= render "common/navbar" %>
        <%= render "common/flashes" %>
        <%= yield %>
      </div>

    </div>


    <%= render "common/footer" %>

    <script src="https://qiyukf.com/script/aa9e006de13d137b3ef3b6fe0704d745.js" defer async></script>

  </body>
```

index中

```
<!-- 首页精选商品列表 -->
  <div class="container all-product-box">
    <div class="row">

      <div class="container topspan">
        <div class="row">
          <div class="col-xs-6">
            <h3 class="titspan">商城</h3>
          </div>
          <div class="col-xs-6">
            <%= link_to("more >", products_path, class: "pull-right morespan") %>
          </div>
        </div>
      </div>

      <% @products.each do |product| %>
        <div class="col-xs-6 col-md-3 text-center product-list-style">
          <% link_to product_path(product) %>
            <% if product.image.present? %>
              <%= link_to image_tag(product.image.thumb.url, class: "product-list-style-img img-responsive center-block all_image_css"), product_path(product), target: "_blank" %>
            <% else %>
              <%= link_to image_tag("http://placehold.it/200x200&text=No Pic", class: "product-list-style-img img-responsive center-block all_image_css"), product_path(product), target: "_blank" %>
            <% end %>
          <br>
          <%= link_to(product.title, product_path(product), target: "_blank") %>
          <br>
          <strong>￥ <%= link_to(product.price, product_path(product), target: "_blank") %></strong></p>
        </div>
      <% end %>

    </div>
  </div>

```

另一个html

```
<!-- 用户评价版面   -->
  <div class="row landing-page-eva">
    <div class="container">
      <div class="col-md-12">
        <h3 class="tagline">听听他们 怎么说</h1>
          <div class="col-xs-12 col-sm-6 col-md-6 landing-page-eva-style">
            <div class="col-xs-3">
              <%= image_tag("xdite.jpg", class: "img-circle img-responsive img-center frontpage-img") %>
            </div>
            <div class="col-xs-9">
              <h5>Xdite  (学习牛人、编程大神)</h5>
              <p>作为一个程序员，之前我并不关心身边的琐碎小事，是个典型的”差不多先生”。
                但是自从加入「极简生活法」以后，ta的生活教程令我完全沉迷。
                我开始在乎身边的小细节，开始动手改善家居，生活变得精致，心情变得舒服。</p>
            </div>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6 landing-page-eva-style">
            <div class="col-xs-3">
              <%= image_tag("xiaolai.jpg", class: "img-circle img-responsive img-center frontpage-img") %>
            </div>
            <div class="col-xs-9">
              <h5>李笑来  (比特币大咖、投资人)</h5>
              <p>传统电商还能活吗？特么真挺难！因为玩法落后了。那该怎么玩？「极简生活法」说——跨界。
                社群互动+优质内容+协助成长，你买到的不只是商品，还有远比商品贵得多得多的附加价值。
                对这个项目我有点心动了...</p>
            </div>
          </div>
      </div>
    </div>
  </div>
```

css

```
// 商品展示列表样式设置，为商品栏做好排版整形
  .product-list-style {                                 //图片+文字 块样式整形
    margin: 3em auto 2em;
  }
  .product-list-style-img {                             //文字 块样式整形
    margin-bottom: 1.2em;
  }
  .all-product-box {
    margin-bottom: 3em;
  }
```



## 小结：

1、html的css标签命名套路——①、最外层div用`box-product`、`box-product-show`；②、每个模块section用`模块名+box`；③、底下细分col-md-4的时候用`模块名+item`；④、再往下细分用`模块名+part1`；[1]按钮用`btn+模块名`

2、css一般定义看颜色、定形尺寸、定位尺寸



#### [问题]这里文字h1/h2/h3/p要像韵儿爸爸那样在welcome-box中设置，否则各种自定义无法保证网站字体大小、颜色、行高、对齐方式一致。行距在body设置。

#### [问题]一个网站设置多少种字体大小和颜色？50、36、（20、14、24）、16、18。韵儿爸爸48、（24、19、14、12）

#### [问题]关于网页字体和单位？——如果把某个元素的font-size设为16px，那么1em就等于16px。h1/h2/h3/h4/h5/h6不同显示器显示效果不同，chrome测试分别对应36、30、24、18、14、12px。



## 【笔记】韵儿爸爸三个妙招提升颜值：

1）对齐。让人迅速找到视觉规律

![](https://ws1.sinaimg.cn/large/006tKfTcgy1fmcy45ykzsj30yc0ocdjr.jpg)

2）重复。

* 思源黑体字（需开vpn载入）

* 全站字色#666用于压低亮度

  ```
  @import url('https://fonts.googleapis.com/earlyaccess/notosanssc.css');   //引入google思源黑简在线字体 需要使用VPN才可生效
  body {
       font-family: 'Noto Sans SC', sans-serif;            // google思源黑简作为主字体
       color: #666;                                        // 修改全站的字体主色 压低亮度
       }
  ```

* 重复两种色调。如#f5f5f5、#7f8c8b搭原来的#fff，如#f8f8f、#333333搭原来的#fff

3）留白。尽量做减法扣掉背景，只留下商品

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fmcy43zoluj31kw0tmq8s.jpg)







# 2、部署后heroku很多bug，涉及环境配置

# 3、部署要写seed，和接七牛云

### 

## 【问题2】按钮怎么始终居中，按钮样式怎么设置才不容易出问题？

css如下

```
.push-box {
  /* 区块 */
  text-align: center;
  padding: 75px 0 0 0;
  height: 200px;
  background: image_url("start.jpg") no-repeat scroll top center/ cover; //背景图片
}
```



## 【问题3】大图轮播的图片大小要一样吗？合作品牌的图片大小要一样吗？







