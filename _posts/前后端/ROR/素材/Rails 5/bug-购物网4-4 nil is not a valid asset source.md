---
title: bug-购物网4-4 nil is not a valid asset source
date: '2017-11-30 02:40'
categories:
  - ror知识点
tags:
  - bug
img: 'https://ws1.sinaimg.cn/large/006tNc79gy1fnfw7fgtkoj30dv0dh0sq.jpg'
abbrlink: de723084
---

* 201711
* 编程+rails



![](https://ws2.sinaimg.cn/large/006tNc79gy1fm03pxgvd4j30rm09jta6.jpg)



### 原因：

```
	<% if @product.image.present? %>
      <%= image_tag(@product.image.thumb.url, class:"thumbnail") %>
    <% else %>
      <%= image_tag("http://placehold.it/200x200&text=No Pic", class:"thumbnail") %>
    <% end %>
```

admin后台设置了以上代码，如果新建商品没有上传图片，返回products的index页面时就会报错，因为它的代码如下：

```
<% @products.each do |product| %>	
	<%= link_to product_path(product) do %>
      <%= image_tag(product.image.thumb.url, class:"thumbnail") %>
    <% end %>
<% end %>
```

这里是直接拿@products做循环，遇到image的值为nil时就会报错。



### 解决办法：在products的index也加上这段代码

```
<% if @product.image.present? %>
      <%= image_tag(@product.image.thumb.url, class:"thumbnail") %>
    <% else %>
      <%= image_tag("http://placehold.it/200x200&text=No Pic", class:"thumbnail") %>
    <% end %>
```

