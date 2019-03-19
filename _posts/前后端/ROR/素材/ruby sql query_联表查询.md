* 20180707

## 视图views的遍历n+1条查询，怎么改成联表查询

1、根据视图展示的字段，列出数据表，以及相应要展示的字段

2、看字段要联合哪些表来查询，如果所有字段不能写成一条查询，就分开多条写（根据所展示的字段所对应的数据表）

3、联表查询要得到的结果是一个集合，比如

```
groups = [{shop.name1, order.id1, order.total1}, {shop.name2, order.id2, order.total2}]
```

4、常用的语法有：

```
joins(:xx).where(id: ids)，group("yy")，select("sum(aaa) AS a, bbb AS b, count(*)")
```

比如，先联表查询 shop.ids，再 scope 查询 orders，最后 group 分组，分组里要展示的内容写在 select 中

```
@shop_groups = Order.joins(:shop).where(shops: {id: @shops.ids}).unpending.purchase.enabled.group('shops.id').select('shops.id, shops.name, SUM(order_total_amount) as total_amount, SUM(number_of_items_shipped) as total_item,COUNT(*) AS order_counts')
```

group 按 datetime 分组

```
Order.group("DATE(purchase_date)").select('SUM(order_total_amount) as total_amount')
```



## 联表查询：join和include的区别？

搜索



## ruby/rails sql query on ?

## 1、select

```
Shop.select(:id, :name, :created_at)
Shop.select("id AS dd, name AS nn, created_at AS cc")
Shop.select("id AS dd, name AS nn, DATE(created_at) AS cc")
```

## 2、group

### 1】group success

```
Shop.group(:id, :name, :created_at)
SELECT `shops`.* FROM `shops` GROUP BY `shops`.`id`, `shops`.`name`, `shops`.`created_at`
```

### 2】group error

```
Shop.group(:name, :created_at)
```

解决办法：

```
Shop.group(:name, :created_at).size
```

## 3、组合

### 1】date或datetime

```
Order.group(:shop_id).select('SUM(order_total_amount) as total_amount')
正确：SELECT SUM(order_total_amount) as total_amount FROM `orders` GROUP BY `orders`.`shop_id`

Order.group(:shop_id).select('shop_id, SUM(order_total_amount) as total_amount, created_at')
报错：SELECT shop_id, SUM(order_total_amount) as total_amount, created_at FROM `orders` GROUP BY `orders`.`shop_id`

解决办法一：
Order.group(:shop_id, :created_at).select('shop_id, SUM(order_total_amount) as total_amount, created_at')
正确：SELECT shop_id, SUM(order_total_amount) as total_amount, created_at FROM `orders` GROUP BY `orders`.`shop_id`, `orders`.`created_at`

解决办法二：
Order.where("created_at <= ?", Time.now).group(:shop_id).select('SUM(order_total_amount) as total_amount')
正确：SELECT SUM(order_total_amount) as total_amount FROM `orders` WHERE (created_at <= '2018-07-04 09:38:35.030638') GROUP BY `orders`.`shop_id`
```

总结：单数的字段才能被group_by（对应的数据库语句是select 单数字段），select复数shops会报错，比如

demo1

```
Order.group(:shop_id).select(:order_total_amount)
报错：select复数orders.order_total_amount会，SELECT `orders`.`order_total_amount` FROM `orders` GROUP BY `orders`.`shop_id`

如果改成SUM(order_total_amount)就变成一个新字段，就不会报错
```

demo2

```
Shop.group(:name)
报错：SELECT `shops`.* FROM `shops` GROUP BY `shops`.`name`

除非选择这个报错的字段来排序，比如
Shop.group(:name).select('name')
正确：SELECT `shops`.`name` FROM `shops` GROUP BY `shops`.`name`
```

### 2】count

```
Order.group(:shop_id).select('SUM(order_total_amount) as total_amount, count(*)')
SELECT COUNT(*)
```

