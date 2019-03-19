* 20180707



# 一、ruby

## 什么时候用类方法？什么时候用实例方法？

看方法里作用的对象是一个对象（用实例方法），还是一个集合（用类方法）。

比如，针对Order查询出集合orders，用类方法

```
orders = Order.joins(:shop).where(shops: {id: @shops.ids}).unpending.purchase.enabled.group(:shop_id).select('shops.name,SUM(order_total_amount) as total_amount, SUM(number_of_items_shipped) as total_item,COUNT(*) AS order_counts')
```

比如，针对对象sg更新字段，用实例方法

```
def update_shop_region(sg)
	sg.update_columns(
      ids_pending: ids_pending,
      ids_unpending: ids_unpending
  )
end

A.instance_values  #查看一个对象里的实例变量
```



## *attribute_names

类的字段



## Hash[[header, spreadsheet.row(i)].transpose]

### 1】transpose → new_ary

```
a = [[1,2], [3,4], [5,6]]
a.transpose   #=> [[1, 3, 5], [2, 4, 6]]
```



### [Ruby的.nil? .empty? .blank? .present? ](http://blog.51cto.com/bohsu/1324907)

1）ruby一笔数据是否存在，present、exist、empty、any效能对比？

```
present? =>  2892.7 ms
any?     =>   400.9 ms
empty?   =>   403.9 ms
exists   =>     1.1 ms
```

* 结论：exists效能最好，优先用。



## **Time**.now.in_time_zone(**"**Pacific Time (US & Canada)**"**)



## ruby decimal vs float

```
t.decimal  :balance, precision: 10, scale: 2  #保留两位，最高10000000.00
```



## Keeping Multiple Values for the Same Hash Key

https://www.safaribooksonline.com/library/view/ruby-cookbook/0596523696/ch05s06.html





app/models/concerns/mws_request.rb的mws_next_token方法

### compact

```
[ "a", nil, "b", nil, "c" ].compact! #=> [ "a", "b", "c" ]
```

### *[1,2]  相当于遍历



### ruby fetch， 用于config/database.yml

# 二、rails