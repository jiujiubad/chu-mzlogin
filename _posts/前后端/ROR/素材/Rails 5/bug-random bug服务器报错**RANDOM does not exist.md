---
title: bug-random bug服务器报错**RANDOM does not exist
date: '2018-01-10 00:10'
categories:
  - ror知识点
tags:
  - bug
img: 'https://ws1.sinaimg.cn/large/006tNc79gy1fnfw7fgtkoj30dv0dh0sq.jpg'
abbrlink: 2a0e357f
---

* 201711
* 编程+rails



# 一、避免bug的写法

### Step1 先在model定义随机的scope，不同环境分开，否则服务端会报错

```
  if Rails.env.production? #远端
    scope :random8, -> { limit(8).order("RAND()") }
  elsif Rails.env.development? #本地
    scope :random8, -> { limit(8).order("RANDOM()") }
  end
```

### Step2 然后在controller#index调用

```
@suggests = Product.random8
```

### Step3 在views显示，复制index的，用suggests来做each循环。

```
<h2 style="margin-top:700px;" class="text-center">随机推荐8个</h2>
<% @suggests.each do |product| %>
  <div class="col-md-3">
    <%= link_to product_path(product) do %>
      <% if product.photos.present? %>
        <%= image_tag(product.photos[0].avatar.thumb.url, class: "thumbnail") %>
      <% else %>
        <%= image_tag("http://placehold.it/200x200&text=No Pic", class:"thumbnail") %>
      <% end %>
    <% end %>
    <%= link_to(product.title, admin_product_path(product)) %>
    ¥ <%= product.price %> 元
  </div>
<% end %>
```





# **二、random bug服务器报错**RANDOM does not exist

```
Completed 500 Internal Server Error in 21ms (ActiveRecord: 1.8ms)

ActionView::Template::Error (Mysql2::Error: FUNCTION rails_recipes.RANDOM does not exist: SELECT  `products`.* FROM `products` ORDER BY RANDOM() LIMIT 8):
```

### 参考资料

[Random in mysql2 for rails 4 app](https://stackoverflow.com/questions/22447634/random-in-mysql2-for-rails-4-app)

https://code.i-harness.com/zh-CN/q/29fee7，提到在**Rails 4**和**5中** ，使用**PostgreSQL**或**SQLite** ，使用`RANDOM()` 。大概同样适用于使用`RAND()` **MySQL**。



### 解决办法：Step1处，把开发环境、产品环境分开

```
  if Rails.env.production? #远端
    scope :random8, -> { limit(8).order("RAND()") }
  elsif Rails.env.development? #本地
    scope :random8, -> { limit(8).order("RANDOM()") }
  end
```



