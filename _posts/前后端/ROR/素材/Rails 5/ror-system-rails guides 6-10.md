---
title: ror-system-rails guides 6-10
date: '2017-12-14 00:10'
categories:
  - ror系统
tags:
  - ror系统
img: 'https://ws4.sinaimg.cn/large/006tNc79gy1fnfep1kp2qj30jk0dtwez.jpg'
abbrlink: 70576f9e
top: 2
---

* 201801
* 编程+rails



# 六、Active Record 查询接口

![](https://ws4.sinaimg.cn/large/006tKfTcgy1flcyut03i2j31kw0xyqkb.jpg)





# 七、Action View 概览

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fld2ujhm47j31kw110dtz.jpg)







# 八、Rails 布局和视图渲染

 ![](https://ws1.sinaimg.cn/large/006tKfTcgy1fld4sh442rj31kw0se4aa.jpg)



`render` 告诉 Rails 构建响应时使用哪个视图（或其他静态资源），即渲染哪个视图。

`redirect_to` ，它告诉浏览器向另一个 URL 发起新请求，即重定向。

`yield` 标明一个区域，渲染的视图会插入这里。是保持布局简洁的利器。

##### 3.4.6 局部变量





# 八、表单辅助方法

![](https://ws4.sinaimg.cn/large/006tKfTcgy1fld8one29aj31kw10kwuy.jpg)





```
使用两个散列作为参数，我们可以把第一个散列放在大括号中，或者把两个散列都放在大括号中。
form_tag({controller: "people", action: "search"}, method: "get", class: "nifty_form")
```

fields_for在`form_for` 内使用



在模型中使用单表继承（single-table inheritance，STI）时，如果只有父类声明为资源，在子类上就不能使用记录识别技术。这时，必须显式说明模型名称、`:url` 和 `:method`。





# 九、Action Controller 概览

![](https://ws3.sinaimg.cn/large/006tNc79gy1fle6di03xbj31kw0xcwxk.jpg)



* 关联数组是这样的数组，它的每个数据元素与一个键相对配对，该键用于识别数据元素。由于散列函数用来创建关联数组中的指定元素，并在关联数组中查找指定元素，因此关联数组通常称为散列。在某种意义上，数组元素与列表类似，而散列元素的存放与几何类似，其元素之间没有相对次序。在Ruby中，数组与散列之间的两个最本质的区别是：数组使用数值下标来定位特定的元素，而散列使用字符串值（键）来定位元素；数组中的元素按下标排序，而散列中的元素则不是。散列的创建方法有两种：new方法或将一个字面量赋值给一个变量。
* params允许批量赋值
* 在控制器中，可以通过实例方法 `session` 访问会话。会话是惰性加载的。如果在动作中不访问，不会自动加载。
* 闪现消息flash(:noitce、:alert、:warning)，是会话的一个特殊部分，每次请求都会清空。也就是说，其中存储的数据只能在下次请求时使用，因此可用于传递错误消息等。
* `:only` 选项的意思是只跳过这些动作。





# 十、Rails 路由全解

![](https://ws3.sinaimg.cn/large/006tNc79gy1fle9zn9n6qj31kw0z4dy3.jpg)



* 有一个长期存在的缺陷使 `form_for` 辅助方法无法自动处理单数资源。有一个解决方案是直接指定表单 URL，例如：

  ```
  form_for @geocoder, url: geocoder_path do |f|
  ```

* 如果想把 `/articles` 路径（不带 `/admin` 前缀） 映射到 `Admin::Articles` 控制器上，可以这样声明：

  ```
  scope module: 'admin' do
    resources :articles, :comments
  end
  ```

* ```
  resources :photos do
    get 'preview', on: :member
  end
  ```

  如果不使用 `:on` 选项，创建的成员路由也是相同的，但资源 ID 就必须通过 `params[:photo_id]` 而不是 `params[:id]` 来获取了。

* 对于把旧系统的 URL 地址映射到新 Rails 应用上的情况，简单路由即非资源式特别适用。