---
title: bug-搜索gem ransack，用will_paginate分页后，输入为空时报错
date: '2018-01-03 00:10'
categories:
  - ror知识点
tags:
  - bug
img: 'https://ws1.sinaimg.cn/large/006tNc79gy1fnfw7fgtkoj30dv0dh0sq.jpg'
abbrlink: 9207c6ea
---

* 201711
* 编程+rails





# [bug]搜索gem ransack，用will_paginate分页后，输入为空时报错

```
ArgumentError in Products#search
Showing /Users/apple/rails/jdstore1130/app/views/products/search.html.erb where line #19 raised:

The @products variable appears to be empty. Did you forget to pass the collection object for will_paginate?
Extracted source (around line #19):
              
<% end %>

<%= will_paginate @posts %>

```

<img src="https://ws2.sinaimg.cn/large/006tNc79gy1fn1gt5n63cj30n609nweq.jpg">

原因：`<%= will_paginate @posts %>`位置放错。

解决办法：把`<%= will_paginate @posts %>`放在`<% if @products.blank?>。。。<% end %>`里面。

```
<% if @products.blank? %>
  输入为空
<% else %>
  <% @products.each do |product| %>
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
  <%= will_paginate @posts %>
<% end %>
```



