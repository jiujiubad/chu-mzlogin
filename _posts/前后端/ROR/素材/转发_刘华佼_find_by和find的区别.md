---
layout: post
title: '转发_find_by和find的区别_刘华佼'
date: 2017-11-02 12:30
comments: true
categories: 
---
* 201711
* 编程+ruby



教材[5-4 Step 3: 购物车设计 Part 2](https://fullstack.xinshengdaxue.com/posts/682)有一段：

```
app/controllers/application_controller.rb
class ApplicationController < ActionController::Base

 # ...略



+  helper_method :current_cart

+  def current_cart
+    @current_cart ||= find_cart
+  end

+  private

+  def find_cart
+    cart = Cart.find_by(id: session[:cart_id])
+    if cart.blank?
+      cart = Cart.create
+    end
+    session[:cart_id] = cart.id
+    return cart
+  end
end

```

这里面的一句：`cart = Cart.find_by(id: session[:cart_id])`中的find_by不太好理解。那如何了解find_by呢？find_by与find又有什么区别呢？

首先，找到它们的定义，在Dash（一个app）中搜索find和find_by：

![img](http://ww2.sinaimg.cn/large/006tNc79gy1ffh5vleq61j30gb08wq55.jpg)

![img](http://ww2.sinaimg.cn/large/006tNc79gy1ffh63pxv22j30gi05taav.jpg)

看了之后觉得不太好理解，那就在rails c里实际操作一下吧！

我做的练习里有Cart这个元素，先Cart.all看看有什么东东：

![img](http://ww3.sinaimg.cn/large/006tNc79gy1ffh689kt9yj313x02mt9u.jpg)

可以看到只有2个cart，再用cart测试下find函数，在测试find之前，先用我们最熟悉的.first试试看：

![img](http://ww2.sinaimg.cn/large/006tNc79gy1ffh5urune6j30zb07qq6u.jpg)

测试结果显示：Cart.find(1)，Cart.find(2)，都可以查到相应id的cart；id=3的cart不存在，于是报ActiveRecord：：RecordNotFound的错误。

同样的用find_by试试是什么效果：

![img](http://ww3.sinaimg.cn/large/006tNc79gy1ffh5utrj9uj30zi026aan.jpg)

￼

没有报错，只是返回nil。

那这就是find和find_by的一个区别了：如果查找不到希望找的元素，find会报ActiveRecord：：RecordNotFound的错误，而find_by不报错，返回nil。

网上还介绍了一种用法：
`Product.find_by(title: 'the yellow book’）`

我们也来试试看：

![img](http://ww2.sinaimg.cn/large/006tNc79gy1ffh6tjqd6qj313y02r75m.jpg)

￼

报错了！什么原因？因为title是Product的字段，而不是Cart的字段。

先看看Product.all，果然有title:

![img](http://ww2.sinaimg.cn/large/006tNc79gy1ffh69gfkecj313y05777s.jpg)

￼

那就用Product来测试吧！

￼

![img](http://ww3.sinaimg.cn/large/006tNc79gy1ffh6a6z6rlj313x036408.jpg)

这下OK了！

还有一种写法哦！

![img](http://ww4.sinaimg.cn/large/006tNc79gy1ffh6aqk15vj313y03adhq.jpg)

看看find_by这么厉害，其实find也很厉害：它可以同时搜索多个指定id的特定元素：

![img](http://ww4.sinaimg.cn/large/006tNc79gy1ffh6bc3byfj313y04h421.jpg)

￼

如果觉得这里面的rails c显示的代码很乱，可以在Gemfile里安装一个gem 'awesome_rails_console' ，安装后bundle install，这样显示就清爽多了有木有：

![img](http://ww2.sinaimg.cn/large/006tNc79gy1ffh5van818j313x06jdi0.jpg)


[Tim Chang](https://disqus.com/by/disqus_ILz5wOT1Mm/) • [6个月前](http://dumpling001-blog.logdown.com/posts/1817416-5-11-how-to-learn-ruby-on-rails-find-by-and-find-the-difference#comment-3303841518)

看起來是 find 只能找id
find_by 可以找 裡面所有的元素 (title, description, quantity, price)

[**](https://disqus.com/embed/comments/?base=default&f=liuhuajiao&t_i=http%3A%2F%2Fdumpling001-blog.logdown.com%2Fposts%2F1817416-5-11-how-to-learn-ruby-on-rails-find-by-and-find-the-difference&t_u=http%3A%2F%2Fdumpling001-blog.logdown.com%2Fposts%2F1817416-5-11-how-to-learn-ruby-on-rails-find-by-and-find-the-difference&t_d=5-11%20%E5%A6%82%E4%BD%95%E4%BA%86%E8%A7%A3Ruby%20on%20Rails%E4%B8%AD%EF%BC%8Cfind%E4%B8%8Efind_by%E7%9A%84%E5%8C%BA%E5%88%AB%EF%BC%9F%20%C2%AB%20%E5%88%98%E5%8D%8E%E4%BD%BC%E7%9A%84%E5%85%A8%E6%A0%88%E5%AD%A6%E4%B9%A0%E8%AE%B0%E5%BD%95&t_t=5-11%20%E5%A6%82%E4%BD%95%E4%BA%86%E8%A7%A3Ruby%20on%20Rails%E4%B8%AD%EF%BC%8Cfind%E4%B8%8Efind_by%E7%9A%84%E5%8C%BA%E5%88%AB%EF%BC%9F%20%C2%AB%20%E5%88%98%E5%8D%8E%E4%BD%BC%E7%9A%84%E5%85%A8%E6%A0%88%E5%AD%A6%E4%B9%A0%E8%AE%B0%E5%BD%95&s_o=default#) **•[回复](https://disqus.com/embed/comments/?base=default&f=liuhuajiao&t_i=http%3A%2F%2Fdumpling001-blog.logdown.com%2Fposts%2F1817416-5-11-how-to-learn-ruby-on-rails-find-by-and-find-the-difference&t_u=http%3A%2F%2Fdumpling001-blog.logdown.com%2Fposts%2F1817416-5-11-how-to-learn-ruby-on-rails-find-by-and-find-the-difference&t_d=5-11%20%E5%A6%82%E4%BD%95%E4%BA%86%E8%A7%A3Ruby%20on%20Rails%E4%B8%AD%EF%BC%8Cfind%E4%B8%8Efind_by%E7%9A%84%E5%8C%BA%E5%88%AB%EF%BC%9F%20%C2%AB%20%E5%88%98%E5%8D%8E%E4%BD%BC%E7%9A%84%E5%85%A8%E6%A0%88%E5%AD%A6%E4%B9%A0%E8%AE%B0%E5%BD%95&t_t=5-11%20%E5%A6%82%E4%BD%95%E4%BA%86%E8%A7%A3Ruby%20on%20Rails%E4%B8%AD%EF%BC%8Cfind%E4%B8%8Efind_by%E7%9A%84%E5%8C%BA%E5%88%AB%EF%BC%9F%20%C2%AB%20%E5%88%98%E5%8D%8E%E4%BD%BC%E7%9A%84%E5%85%A8%E6%A0%88%E5%AD%A6%E4%B9%A0%E8%AE%B0%E5%BD%95&s_o=default#)•[分享 ›]()

- ​
- [****](https://disqus.com/embed/comments/?base=default&f=liuhuajiao&t_i=http%3A%2F%2Fdumpling001-blog.logdown.com%2Fposts%2F1817416-5-11-how-to-learn-ruby-on-rails-find-by-and-find-the-difference&t_u=http%3A%2F%2Fdumpling001-blog.logdown.com%2Fposts%2F1817416-5-11-how-to-learn-ruby-on-rails-find-by-and-find-the-difference&t_d=5-11%20%E5%A6%82%E4%BD%95%E4%BA%86%E8%A7%A3Ruby%20on%20Rails%E4%B8%AD%EF%BC%8Cfind%E4%B8%8Efind_by%E7%9A%84%E5%8C%BA%E5%88%AB%EF%BC%9F%20%C2%AB%20%E5%88%98%E5%8D%8E%E4%BD%BC%E7%9A%84%E5%85%A8%E6%A0%88%E5%AD%A6%E4%B9%A0%E8%AE%B0%E5%BD%95&t_t=5-11%20%E5%A6%82%E4%BD%95%E4%BA%86%E8%A7%A3Ruby%20on%20Rails%E4%B8%AD%EF%BC%8Cfind%E4%B8%8Efind_by%E7%9A%84%E5%8C%BA%E5%88%AB%EF%BC%9F%20%C2%AB%20%E5%88%98%E5%8D%8E%E4%BD%BC%E7%9A%84%E5%85%A8%E6%A0%88%E5%AD%A6%E4%B9%A0%E8%AE%B0%E5%BD%95&s_o=default#)


- ​

  ​

  [![头像](https://c.disquscdn.com/uploads/users/24806/775/avatar92.jpg?1494330257)](https://disqus.com/by/jiaozierliu/)

  [刘华佼](https://disqus.com/by/jiaozierliu/) 管理员 [** Tim Chang](http://dumpling001-blog.logdown.com/posts/1817416-5-11-how-to-learn-ruby-on-rails-find-by-and-find-the-difference#comment-3303841518) • [6个月前](http://dumpling001-blog.logdown.com/posts/1817416-5-11-how-to-learn-ruby-on-rails-find-by-and-find-the-difference#comment-3304869781)

  Dash上找到的：
  find的用法：
  Person.find(1) # returns the object for ID = 1
  Person.find("1") # returns the object for ID = 1
  Person.find("31-sarah") # returns the object for ID = 31
  Person.find(1, 2, 6) # returns an array for objects with IDs in (1, 2, 6)
  Person.find([7, 17]) # returns an array for objects with IDs in (7, 17)
  Person.find([1]) # returns an array for the object with ID = 1
  Person.where("administrator = 1").order("created_on DESC").find(1)

  find_by的用法：
  Post.find_by name: 'Spartacus', rating: 4
  Post.find_by "published_at < ?", 2.weeks.ago

  看起来你说的是对的，Person.find("31-sarah")，rating: 4，2.weeks.ago 就是这些不太明白，但不是高频小套路就不用care了。

  ​

  [**](https://disqus.com/embed/comments/?base=default&f=liuhuajiao&t_i=http%3A%2F%2Fdumpling001-blog.logdown.com%2Fposts%2F1817416-5-11-how-to-learn-ruby-on-rails-find-by-and-find-the-difference&t_u=http%3A%2F%2Fdumpling001-blog.logdown.com%2Fposts%2F1817416-5-11-how-to-learn-ruby-on-rails-find-by-and-find-the-difference&t_d=5-11%20%E5%A6%82%E4%BD%95%E4%BA%86%E8%A7%A3Ruby%20on%20Rails%E4%B8%AD%EF%BC%8Cfind%E4%B8%8Efind_by%E7%9A%84%E5%8C%BA%E5%88%AB%EF%BC%9F%20%C2%AB%20%E5%88%98%E5%8D%8E%E4%BD%BC%E7%9A%84%E5%85%A8%E6%A0%88%E5%AD%A6%E4%B9%A0%E8%AE%B0%E5%BD%95&t_t=5-11%20%E5%A6%82%E4%BD%95%E4%BA%86%E8%A7%A3Ruby%20on%20Rails%E4%B8%AD%EF%BC%8Cfind%E4%B8%8Efind_by%E7%9A%84%E5%8C%BA%E5%88%AB%EF%BC%9F%20%C2%AB%20%E5%88%98%E5%8D%8E%E4%BD%BC%E7%9A%84%E5%85%A8%E6%A0%88%E5%AD%A6%E4%B9%A0%E8%AE%B0%E5%BD%95&s_o=default#) **•[回复](https://disqus.com/embed/comments/?base=default&f=liuhuajiao&t_i=http%3A%2F%2Fdumpling001-blog.logdown.com%2Fposts%2F1817416-5-11-how-to-learn-ruby-on-rails-find-by-and-find-the-difference&t_u=http%3A%2F%2Fdumpling001-blog.logdown.com%2Fposts%2F1817416-5-11-how-to-learn-ruby-on-rails-find-by-and-find-the-difference&t_d=5-11%20%E5%A6%82%E4%BD%95%E4%BA%86%E8%A7%A3Ruby%20on%20Rails%E4%B8%AD%EF%BC%8Cfind%E4%B8%8Efind_by%E7%9A%84%E5%8C%BA%E5%88%AB%EF%BC%9F%20%C2%AB%20%E5%88%98%E5%8D%8E%E4%BD%BC%E7%9A%84%E5%85%A8%E6%A0%88%E5%AD%A6%E4%B9%A0%E8%AE%B0%E5%BD%95&t_t=5-11%20%E5%A6%82%E4%BD%95%E4%BA%86%E8%A7%A3Ruby%20on%20Rails%E4%B8%AD%EF%BC%8Cfind%E4%B8%8Efind_by%E7%9A%84%E5%8C%BA%E5%88%AB%EF%BC%9F%20%C2%AB%20%E5%88%98%E5%8D%8E%E4%BD%BC%E7%9A%84%E5%85%A8%E6%A0%88%E5%AD%A6%E4%B9%A0%E8%AE%B0%E5%BD%95&s_o=default#)•[分享 ›]()

  - ​
  - [****](https://disqus.com/embed/comments/?base=default&f=liuhuajiao&t_i=http%3A%2F%2Fdumpling001-blog.logdown.com%2Fposts%2F1817416-5-11-how-to-learn-ruby-on-rails-find-by-and-find-the-difference&t_u=http%3A%2F%2Fdumpling001-blog.logdown.com%2Fposts%2F1817416-5-11-how-to-learn-ruby-on-rails-find-by-and-find-the-difference&t_d=5-11%20%E5%A6%82%E4%BD%95%E4%BA%86%E8%A7%A3Ruby%20on%20Rails%E4%B8%AD%EF%BC%8Cfind%E4%B8%8Efind_by%E7%9A%84%E5%8C%BA%E5%88%AB%EF%BC%9F%20%C2%AB%20%E5%88%98%E5%8D%8E%E4%BD%BC%E7%9A%84%E5%85%A8%E6%A0%88%E5%AD%A6%E4%B9%A0%E8%AE%B0%E5%BD%95&t_t=5-11%20%E5%A6%82%E4%BD%95%E4%BA%86%E8%A7%A3Ruby%20on%20Rails%E4%B8%AD%EF%BC%8Cfind%E4%B8%8Efind_by%E7%9A%84%E5%8C%BA%E5%88%AB%EF%BC%9F%20%C2%AB%20%E5%88%98%E5%8D%8E%E4%BD%BC%E7%9A%84%E5%85%A8%E6%A0%88%E5%AD%A6%E4%B9%A0%E8%AE%B0%E5%BD%95&s_o=default#)

  ​

  ​

  ​

  - ​

    ​

    [![头像](https://c.disquscdn.com/uploads/users/24806/775/avatar92.jpg?1494330257)](https://disqus.com/by/jiaozierliu/)

    [刘华佼](https://disqus.com/by/jiaozierliu/) 管理员 [** 刘华佼](http://dumpling001-blog.logdown.com/posts/1817416-5-11-how-to-learn-ruby-on-rails-find-by-and-find-the-difference#comment-3304869781) • [6个月前](http://dumpling001-blog.logdown.com/posts/1817416-5-11-how-to-learn-ruby-on-rails-find-by-and-find-the-difference#comment-3307716894)

    附上Nic老师的回答：

    1)
    31-sarah，这是找某笔数据吧，不代表任何意义
    rating: 4 ，只是他想要找这个 table 里面的 rating 栏位，数值是4而已
    2.weeks.ago，直接翻中文就知道意思了，这个是 ruby 的用法，可以查询 ruby week ago 搜看看 google

    ​

    [**](https://disqus.com/embed/comments/?base=default&f=liuhuajiao&t_i=http%3A%2F%2Fdumpling001-blog.logdown.com%2Fposts%2F1817416-5-11-how-to-learn-ruby-on-rails-find-by-and-find-the-difference&t_u=http%3A%2F%2Fdumpling001-blog.logdown.com%2Fposts%2F1817416-5-11-how-to-learn-ruby-on-rails-find-by-and-find-the-difference&t_d=5-11%20%E5%A6%82%E4%BD%95%E4%BA%86%E8%A7%A3Ruby%20on%20Rails%E4%B8%AD%EF%BC%8Cfind%E4%B8%8Efind_by%E7%9A%84%E5%8C%BA%E5%88%AB%EF%BC%9F%20%C2%AB%20%E5%88%98%E5%8D%8E%E4%BD%BC%E7%9A%84%E5%85%A8%E6%A0%88%E5%AD%A6%E4%B9%A0%E8%AE%B0%E5%BD%95&t_t=5-11%20%E5%A6%82%E4%BD%95%E4%BA%86%E8%A7%A3Ruby%20on%20Rails%E4%B8%AD%EF%BC%8Cfind%E4%B8%8Efind_by%E7%9A%84%E5%8C%BA%E5%88%AB%EF%BC%9F%20%C2%AB%20%E5%88%98%E5%8D%8E%E4%BD%BC%E7%9A%84%E5%85%A8%E6%A0%88%E5%AD%A6%E4%B9%A0%E8%AE%B0%E5%BD%95&s_o=default#) **•[回复](https://disqus.com/embed/comments/?base=default&f=liuhuajiao&t_i=http%3A%2F%2Fdumpling001-blog.logdown.com%2Fposts%2F1817416-5-11-how-to-learn-ruby-on-rails-find-by-and-find-the-difference&t_u=http%3A%2F%2Fdumpling001-blog.logdown.com%2Fposts%2F1817416-5-11-how-to-learn-ruby-on-rails-find-by-and-find-the-difference&t_d=5-11%20%E5%A6%82%E4%BD%95%E4%BA%86%E8%A7%A3Ruby%20on%20Rails%E4%B8%AD%EF%BC%8Cfind%E4%B8%8Efind_by%E7%9A%84%E5%8C%BA%E5%88%AB%EF%BC%9F%20%C2%AB%20%E5%88%98%E5%8D%8E%E4%BD%BC%E7%9A%84%E5%85%A8%E6%A0%88%E5%AD%A6%E4%B9%A0%E8%AE%B0%E5%BD%95&t_t=5-11%20%E5%A6%82%E4%BD%95%E4%BA%86%E8%A7%A3Ruby%20on%20Rails%E4%B8%AD%EF%BC%8Cfind%E4%B8%8Efind_by%E7%9A%84%E5%8C%BA%E5%88%AB%EF%BC%9F%20%C2%AB%20%E5%88%98%E5%8D%8E%E4%BD%BC%E7%9A%84%E5%85%A8%E6%A0%88%E5%AD%A6%E4%B9%A0%E8%AE%B0%E5%BD%95&s_o=default#)•[分享 ›]()