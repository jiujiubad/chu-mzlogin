---
title: bug-缺少id，model关系没设置，create的action没指明model关系
date: '2017-12-01 12:00'
categories:
  - ror知识点
tags:
  - bug
img: 'https://ws1.sinaimg.cn/large/006tNc79gy1fnfw7fgtkoj30dv0dh0sq.jpg'
abbrlink: 523a3588
---

* 201711
* 编程+rails



## 第一种：No route matches {:action=>"show", :controller=>"orders", :id=>nil} missing required keys: [:id]

```
ActionController::UrlGenerationError in Account::Orders#index
Showing /Users/apple/rails/jdstore1130/app/views/account/orders/index.html.erb where line #13 raised:

No route matches {:action=>"show", :controller=>"orders", :id=>nil} missing required keys: [:id]
Extracted source (around line #13):
11
12
13
14
15
16
              
    <% @orders.each do |order| %>
      <tr>
        <td><%= link_to(order.id, order_path(order.token)) %></td>
        <td><%= order.created_at %></td>
      </tr>
    <% end %>
```



## 第二种：undefined method

```
NoMethodError in OrdersController#show
undefined method `product_lists' for nil:NilClass

Extracted source (around line #5):
3
4
5
6
7
8
              
  def show
    @order = Order.find_by_token(params[:id])
    @product_lists = @order.product_lists
  end

  def create

```





## 解决办法：

1、检查model里的关系设置

2、检查create的action有没有指明外键（即model中有设置belongs_to :xx）相关的关系（如@productj.user = current_user）

3、检查html的输入参数，是要用常用参数(@xx)，还是用id参数(@xx.yy_id)

4、如果有新增栏位，尝试清空该栏位的空的值。比如进入rails c，输入Order.where(token: nil).destroy_all