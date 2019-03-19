---
title: ror-function-搜索gem ransack
date: '2018-01-02 00:10'
categories:
  - ror功能
tags:
  - ror功能
img: 'https://ws3.sinaimg.cn/large/006tNc79gy1fnfvqdlgzej30d608s74i.jpg'
abbrlink: c311c03b
---

* 201801
* 编程+rails



# 忘了记录：

# 1、ransack搜索两种做法，一种是放在navbar搜索时在新的search页显示，一种是放在index搜索的时候不跳转新页面。第一种做排序报错，没解决，第二种可以排序，但是模糊搜索的对象设置是放在view页面的感觉很奇怪。

# 2、分类功能两种做法，一种是一对多对产品添加栏位，一种是多对多，多对多的好处是在后台两边都可以编辑和查看产品。第一种直接在ransack的模糊搜索设置中加入分类的栏位，第二种不知道如何通过ransack做筛选。

# 3、用自己的github案例整理教程



http://milesmao233.logdown.com/posts/1366768-search-and-sort-functions-simple-ransack可以排序的搜索，搜索功能做起来非常简单，按官方github的做法。



### 参考资料

一、**「搜索功能」**、**「关键字高亮」**、**「排序」**

[如何在navbar上添加搜索栏并实现搜索结果 job-listing by-戴建林](https://forum.qzy.camp/t/navbar/486)，一篇搞定三个功能。
[ransack详细解释篇：如何用ransack gem实现搜索功能 by-lacfo](https://forum.qzy.camp/t/ransack-gem/455)，参考这篇了解代码作用。

[github ransack](https://github.com/activerecord-hackery/ransack)

[github will_paginate](https://github.com/mislav/will_paginate)
[github will_paginate-bootstrap](https://github.com/bootstrap-ruby/will_paginate-bootstrap)



## 改进

```
<% if render_highlight_content(product, @query_string).blank? %>
  <%= link_to(product.title, admin_product_path(product)) %>
<% else %>
  <%= link_to(render_highlight_content(product, @query_string), admin_product_path(product)) %>
<% end %>
```





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



