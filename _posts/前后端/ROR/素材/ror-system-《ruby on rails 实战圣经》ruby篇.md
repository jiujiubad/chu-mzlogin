---
title: 《ruby on rails 实战圣经》ruby篇
date: '2018-01-20 00:10'
categories:
  - ror系统
tags:
  - ror系统
img: 'https://ws4.sinaimg.cn/large/006tNc79gy1fnfep1kp2qj30jk0dtwez.jpg'
abbrlink: b42ceda9
top: 2
---

* 201801
* 编程+ruby



# Ruby程式语言1

ruby是动态导向直译式语言。

图片**『github热门度  VS  stackoverflow问答频率』**。

# Ruby程式语言2

irb

ruby是动态语言（静态语言需要在编译时宣告变数形态）、强分型语言（整数和字串不能相加，需要转型）

四则运算，常用to_i、to_f等api转型。

更多方法：reverse、length、upcase、downcase。

字串内插#{verb}。



ruby完全地物件导向，所有东西都是物件。

关于物件的ruby内建api方法怎么查找？——搜索**『ruby api string/integer』**。



变数用小写，用_相连。

常数用大写，比如自带ENV、RUBY_PLATFORM。

nil。

单行注解用#，多行注解用`=begin xxxxx =end`。

array.inspect，如果用puts时显示一个一个数字，用inset显示的是一个阵列。



阵列Array的方法：  

push。同<<。

join，阵列变字串

split，字串变阵列

pop，删除阵列最后一个



each回圈循环

hash杂凑，常用字串符号:foo、:bar（识别名称）作为key。

物件和字串符号的区别？在irb里用"foo".object_id，:foo.object_id。或用"foo".reverse，:foo.reverse。发现物件可以连接方法，而字符只是一个识别名称不能用方法。

 

比较方法><=，||、&&

三元运算子是简化版的if..end，只要一行；

当elsif很多时，改用case..when...when..else..end。



回圈，while、until、loop常配合break if xxx



只有nil和false是假的，其他都是真。

​	

定义方法def，回传值return可以省略。

预设参数

命名惯例：?结尾表示是boolean值，!结尾表示有副作用。



# Ruby程式语言3

ruby重要特性：**『物件导向OOP』**。使用class来定义物件object，class相当于是物件的template。

Classl类别是大写开头的，使用new可以建立物件。



@name物件变数。**『物件变数』**可以在同个class的、不同def方法间调用，而**『区域变数』**只能在def里调用。

@@name**『类别变数』**，self.foo**『类别方法』**。物件可以有很多，但类别只有一份。



物件导向的特性：**『资料封装』**，在类别内，要存取只能通过public定义方法后才能存取的到。比如下面的attr_accessor 。

**『方法封装』**，private、或protected。要在其他的public公开方法里，才能呼叫private方法。



attr_accessor :name，等同于get name和set name（一般放在页面最上方），如下：

```
def name
  @name
end

def name=(e)
  @name = e
end
```



class的继承用<。跟module的区别是，一个类只能用<继承一个class。

module用法一，常用：Mixins。跟class区别：一个类可以include多个module、且module无法产生物件。常用在方法需要reuse重复使用的情况。

module用法二：namespace。



多型，不同class只要介面一致（即def 方法名相同）就可以同时被调用执行。当然如果是继承，也会是多型的情况。

动态型别（duck typing）。



# Ruby程式语言4

迭代器interator，常用each（很少用到while、until、for等回圈语法）。do..end是each的参数，称为匿名方法（code block）。

匿名方法，单行可用hash传递参数，多行用do..end传递参数。



其他迭代方式：

map，造出新阵列。

find_all，符合条件的留下来。

delete_if，根据条件删除。

sort，排序。

reduce，计算总和。每次回传结果变成下一次的sum。

reduce，比较最长字串。

```
longest = ["cat", "sheep", "bear"].reduct do |memo, word|
  (memo.length > word.length)? memo:word
end
```



File.open(xx) do..end，自动关闭档案。



yield，用来执行匿名方法code block。

yield(1)，可以带参数。

将code block转成物件&block。好处是可以去call其他方法，但效能差，所以大部分用yield。

```
def call_block(&block)
  block.call(1)
  block.call(2)
end
```



`def my_sum(*val)`，用*val传递不定参数。可以是[1,2]或[1,2,3]等。



参数尾的hash可以省略，比如my_sum("A", "B", :x=>123, :z=>456)。



例外处理

自定例外物件的class，继承自ruby内建的RuntimeError，比如`class MyException < RuntimeError`。

通过`raise MyException`调用。



动手练习：

http://www.codecademy.com/en/tracks/ruby

http://www.gotealeaf.com/books/ruby

[learnrubythehardway.org/book](learnrubythehardway.org/book)



# Ruby程式语言5

应用领域

ruby on rails

sinatra，轻量级web



web designer tools

* sass/less/haml
* compass
* middleman



Testing/BDD，单元测试

* rspec
* cucumber，可以测试非ruby的程式



DevOps，管理机器

* chef，自动化设定数百台管理机器
* puppet，同chef
* vagrant，虚拟机测试



homebrew



cocoapods，ios管理第三方套件

jekyll，静态html的genetor，用来做静态博客



redmine，专案管理的工具



rubyMotion，有趣，让你可以用ruby语法写Android、ios程式。



更多ruby的工具

https://www.ruby-toolbox.com

动手练习：用jekyll产生静态网页，并部署到github pages上。