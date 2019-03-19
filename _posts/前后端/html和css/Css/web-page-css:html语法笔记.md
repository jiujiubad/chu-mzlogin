---
title: web-page-css/html语法笔记
date: '2017-12-15 00:10'
categories:
  - web页面
tags:
  - web页面
img: 'https://ws2.sinaimg.cn/large/006tNc79gy1fnfvej9iydj30ci08z3yo.jpg'
abbrlink: ef9bbe6f
---

* 201712
* 编程+前端



# background-color: rgba(255,255,255,0.5)

## clearfix是什么？

![img](http://ww1.sinaimg.cn/large/006tNbRwgy1ffixfbtit1j30fa08c3z6.jpg)

用法注意：外层div加上clearfix，内层div加上pull-right属性，如下：

```
<div class="clearfix">
  <h4 class="pull-right">
    合计 <%= render_cart_total_price(current_cart) %> 元
  </h4>
</div>

<div class="clearfix">
  <%= link_to("确认结账", "#", class:"btn btn-danger btn-lg pull-right") %>
</div>
```



# 解决不了的问题：

1、首页大图用bootstrap的jumbotron巨幕可以简单出效果，但是不能自适应？

2、哪些属性可以在一开始就做通用设置，参考anndo和韵儿爸爸的代码？

3、按钮和文字排在同一行，并能自适应，比如导航栏？



# 简单粗暴的优化：

1、首页大图，用bootstrap巨幕（自适应有问题）

```
<div class="jumbotron">
	<div class="container">
		<h1>欢迎登陆页面！</h1>
		<p>这是一个超大屏幕（Jumbotron）的实例。</p>
		<p><a class="btn btn-primary btn-lg" role="button">
			学习更多</a>
		</p>
	</div>
</div>
```

css设置

```
background-image:url('http://fullstack-public.oss-cn-qingdao.aliyuncs.com/2017-04-15-542213.png')
```

2、后台操作按钮，比如编辑、删除等。bootstrap样式有warning、success、info、danger（四种很搭），default、prinary。

```
<%= link_to("隐藏", hide_admin_job_path(job), method: :post, class:"btn btn-warning btn-xs") %>
```

3、bootstrap缩略图

```
<div class="row">
    <div class="col-sm-6 col-md-3">
        <a href="#" class="thumbnail">
            <img src="/wp-content/uploads/2014/06/kittens.jpg"
                 alt="通用的占位符缩略图">
        </a>
    </div>
    <div class="col-sm-6 col-md-3">
        <a href="#" class="thumbnail">
            <img src="/wp-content/uploads/2014/06/kittens.jpg"
                 alt="通用的占位符缩略图">
        </a>
    </div>
    <div class="col-sm-6 col-md-3">
        <a href="#" class="thumbnail">
            <img src="/wp-content/uploads/2014/06/kittens.jpg"
                 alt="通用的占位符缩略图">
        </a>
    </div>
    <div class="col-sm-6 col-md-3">
        <a href="#" class="thumbnail">
            <img src="/wp-content/uploads/2014/06/kittens.jpg"
                 alt="通用的占位符缩略图">
        </a>
    </div>
</div>
```

4、表格，用table-bordered、table-hover，配合memet为`table.table.table-border.table-hover>(thead>tr>th*3)+(tbody>tr>td*3)`。自适应可以试用<div class="table-responsive">，感觉效果不好。

```
<table class="table table-bordered table-hover">
  <thead>
    <tr>
      <th>职位</th>
      <th>职位要求</th>
      <th>薪资上限</th>
      <th>薪资下限</th>
      <th>联系方式</th>
      <th>发布时间</th>
      <th>操作</th>
    </tr>
  </thead>
  <tbody>
    <% @jobs.each do |job| %>
      <tr>
        <td><%= link_to(job.title, job_path(job)) %></td>
        <td><%= job.description %></td>
        <td><%= job.wage_upper_bound %></td>
        <td><%= job.wage_lower_bound %></td>
        <td><%= job.contact_email %></td>
        <td><%= job.created_at %></td>
        <td>
          <%= link_to("编辑", edit_job_path(job)) %>
          <%= link_to("删除", job_path(job), method: :delete, data:{confirm:"确定删除职位？"}) %>
        </td>
      </tr>
    <% end %>
  </tbody>
</table>
```

5、通用设置：几级标题、段落文字大小字距行距颜色，参考韵儿爸爸、刘传关于设计感的文章。

6、调用ipic图片链接的方法：	

①、css里用background-image:url('https://ws2.sinaimg.cn/large/006tKfTcgy1flu31xaik3j31hc0u0aer.jpg');

②、```<img src="https://ws4.sinaimg.cn/large/006tNc79gy1fltnovmk4gj31440mf124.jpg">```

7、调用图片的方法

（`<img src="http://xx.com">`或`<%= image_tag(xx.url) %>`或`<%= image_tag("http://xx.com") %>`）：

①、```<img src='<%= image_url 'logo.png' %>' >```，文件夹是app/assets/images或是app/public/images。如果要修改收藏网址时显示的图片，用```<link rel="shortcut icon" href="/images/favicon.ico">```

②、调用文件夹app/assets/images，`<%= image_tag("intro_1.jpg") %>`

③、调用相对网址path，`<%= image_tag(@product.image.thumb.url) %>`。这里可以写成`@product.image.url`或`@product.image_url`

【小结】图片放asset/images，调用本地、网上图片都用`<%= image_tag("") %>`

8、格线系统col-md-12

```
.col-centered{  //Nic教程用的，panel居中
  float: none;
  margin: 0 auto;
}
```

