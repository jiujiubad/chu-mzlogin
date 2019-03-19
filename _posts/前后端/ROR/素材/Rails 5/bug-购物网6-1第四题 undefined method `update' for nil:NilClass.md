---
title: bug-购物网6-1第四题 undefined method `update' for nil/NilClass
date: '2017-11-30 09:15'
categories:
  - ror知识点
tags:
  - bug
img: 'https://ws1.sinaimg.cn/large/006tNc79gy1fnfw7fgtkoj30dv0dh0sq.jpg'
abbrlink: b36ae94d
---

* 201711
* 编程+rails



![](https://ws2.sinaimg.cn/large/006tNc79gy1flr4mlny8nj30gi08tab4.jpg)

```
NoMethodError in CartItemsController#update
undefined method `update' for nil:NilClass

Extracted source (around line #6):
        
    @cart = current_cart
    @cart_item = @cart.cart_items.find_by(product_id: params[:id])
    @cart_item.update(cart_item_params)
    redirect_to :back
  end
```



### 分析：因为这里不是show/new/edit页面，而是/carts页面，购物车里有很多个cart_item，所以系统不知道我们要删除哪一个。看变量名都知道，这里是cart_items而不是类变量单数@cart_item——因此，在simple_form_for里要加入url，指明要删除的cart_item，这个url是表单要提交到的url地址，可以用show的url。

### 解答：加入`url: cart_item_path(cart_item.product_id)`

```
<%= simple_form_for cart_item, url: cart_item_path(cart_item.product_id) do |f| %>
            <%= f.select :quantity, 1..cart_item.product.quantity %>
            <%= f.submit "更新", data:{disable_with:"正在更新.."} %>
          <% end %>
```



