* 201805
* 编程+rails



1）在view中插入

```
<%= debug(xxx) if Rails.env.development? %>
```

比如：

```
<%= debug(InboundItem.where(seller_sku: inventory.seller_sku).pluck(:quantity_shipped).reduce(&:+)) if Rails.env.development? %>
```

2）在controller或model中插入

```
debugger 
```

