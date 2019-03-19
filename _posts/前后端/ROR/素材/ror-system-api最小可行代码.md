---
title: ror-system-api最小可行代码
date: '2017-12-14 00:10'
categories:
  - ror系统
tags:
  - ror系统
img: 'https://ws4.sinaimg.cn/large/006tNc79gy1fnfep1kp2qj30jk0dtwez.jpg'
abbrlink: 867a72a6
---

* 201712
* 编程+ruby



# API最小可行代码

## 1、index为例最小可行代码

1）	config/routes

```
  namespace :api, :defaults => { :format => :json } do
    namespace :v1 do
      resources :products, :only => [:index]
    end
  end
```

2）新建api controller

`rails g controller api --no-assets`

修改 `api_controller.rb`

```
app/controllers/api_controller.rb
- class ApiController < ApplicationController
+ class ApiController < ActionController::Base
end
```

3）新建api products controller

`rails g controller api::v1::products --no-assets`

修改`app/controllers/api/v1/products_controller.rb`（查看db/schema看要加入什么栏位）

```
class Api::V1::ProductsController < ApiController
  def index
    @products = Product.all
    render :json => {
      :data => @products.map{ |product|
        { :title => product.title,
          :description => product.description,
          :quantity => product.quantity,
          :price => product.price,
          :created_at => product.created_at,
          :updated_at => product.updated_at,
          :image => product.image
        }
      }
    }
  end
end
```

## 2、用JBuilder重构代码

参考资料

http://motion-express.com/blog/20140829-ruby-gem-jbuilder

https://github.com/rails/jbuilder

### 2.1 最常用代码

1）比如分类views/categories文件夹下。

新建app/views/api/v1/categories/index.json.jbuilder

```
json.categories do
  json.array! @categories, :partial => "item", :as => "category"
end
```

新建app/views/api/v1/categories/show.json.jbuilder

```
json.partial! 'item', category: @category
```

用partial重构，app/views/api/v1/categories/_item.json.jbuilder

```
json.id category.id
json.name category.name
json.partial! 'api/v1/products/item', product: category.products #最关键的product:要单数
```

2）比如商品views/products文件夹下。

新建app/views/api/v1/products/index.json.jbuilder

```
json.partial! 'item', product: @products
```

新建app/views/api/v1/products/_item.json.jbuilder

```
json.products product.each{}  #最关键的product.each的product要单数
```

### 2.2 【bug】常见报错

1）写partial时，index的each{}如果写在共用表单，被show引用时会报错？？

解法一：不要用each{}，而是只写想要调用的栏位。

解法二：each{}还是放在index，可能部分数据会重复出现，但是不影响调用。

### 2.3  如果只需要部分数据，**用json.array!遍历**（即controller中用的map循环）

1）未重构：如下app/views/api/v1/categories/index.json.jbuilder

```
json.categories do
  json.array! @categories do |category|
    json.id category.id
    json.name category.name
    json.created_at category.created_at
  end
end
```

### 2.4 讲解：用共用表单partial实现index调用show的数据

1）案例，见2.1。

2）讲解。

在index，只有@products，不能读出来@product是谁，所有用`category: @product.category`仍会报错说category未定义。在show的_item，product就是当前的product，所以`category: @product.category`就是当前商品的分类。

所以，product的partial写法如下，最最关键的是`category:`必须是单数

```
json.partial! 'api/v1/categories/item', category: product.category
```

category的partial写法如下，最最关键的是`product:`必须是单数

```
json.partial! 'api/v1/products/item', product: category.products
```

