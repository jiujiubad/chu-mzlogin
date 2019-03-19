---
title: ror-system-编程语言第二集
date: '2017-12-14 00:10'
categories:
  - ror系统
tags:
  - ror系统
img: 'https://ws4.sinaimg.cn/large/006tNc79gy1fnfep1kp2qj30jk0dtwez.jpg'
abbrlink: e7d42cb4
---

* 201712
* 编程+ruby



# 函数式编程

## 12、匿名函式

* 函式也是一种数据类型。又叫做 [First-class function 头等函数](https://zh.wikipedia.org/wiki/%E5%A4%B4%E7%AD%89%E5%87%BD%E6%95%B0)。

* 以下的 Ruby 程式码中，变量 `x` 就是一个**函式变量**。它的值 `->{ puts "Hello World"}` 叫做**匿名函式**。匿名函式要透过 `.call` 才会实际调用。

  ```
  x = -> { puts "Hello World" }
  x.call # 输出 Hello World
  ```

  * `->` 等同于 `lambda` 等同于 `Proc.new`

  ​

  ```
  x = function(){ console.log("Hello World") }
  x() # 输出 Hello World
  ```

  * 在 JavaScript 中调用一个函式一定要加上括号，所以用 `x()` 表示触发调用。

* 既然函式也是一种数据类型，我们就可以将这个函式变量当作参数来传递

  ```
  foo = -> { puts "foo" }

  def bar(x)
    puts "bar"
    x.call
  end

  bar(foo)

  # 输出

  # bar

  # foo
  ```

  * 注意到第一行宣告 `foo` 函式的时候，我们并没有真的调用它，直到 `x.call` 时才调用它。

* 直接内嵌的写法

  ```
  def bar(x)
    puts "bar"
    x.call
  end

  bar( ->{ puts "zoo" } )

  # 输出

  # bar

  # zoo
  ```

* ruby写法

  * 如果参数列最后一个参数是匿名函式，那么就会用这种简化的写法：传入的匿名函式用 `{ ...}` 或 `do .... end` 表示，然后在函式里面用 `yield` 这个关键字来实际调用它。
  * 通常单行的程式会用 `{ ... }` 的写法，多行则会用 `do ... end` 的写法。这只是 Coding Style 惯例而已，作用是一样的。

  ```
  def bar
    puts "bar"
    yield("zoo")
  end

  bar do |x|
    puts x
    puts "foo"
  end

  # 输出

  # bar

  # zoo

  # foo

  其中 yield("zoo") 会将 "zoo" 带入匿名函式，也就是函式 bar 的 x 参数
  ```



## 13、匿名函式的应用

* 匿名函式可以将函数当作参数。

* pre-and post-processing前置和后置处理

  * 首先一定要打开档案，完成后一定要调用 `close` 方法

    ```
    f = File.open("myfile.txt", 'w')  # 前置处理
    f.write("Lorem ipsum dolor sit amet")
    f.write("Lorem ipsum dolor sit amet")
    f.close  # 后置处理
    ```

  * 改用传入 block 参数的写法，这样就会自动关档了：

    ```
    File.open("myfile.txt", 'w') do |f|
      f.write("Lorem ipsum dolor sit amet")
      f.write("Lorem ipsum dolor sit amet")
    end
    ```

* callback function

  [回调函数](https://zh.wikipedia.org/wiki/%E5%9B%9E%E8%B0%83%E5%87%BD%E6%95%B0)的意思是先挖好坑，让调用这个 API 的人可以填要执行什么。

  * 例如 Rails ActiveRecord 可以注册 [callback 方法](https://ihower.tw/rails/activerecord-lifecycle-cn.html#sec1)，在 `save` 前后做一些事情。我们在百宝箱 2-3 自订 Model 网址曾经用过 `before_validation :generate_friendly_id, :on => :create`，这会在 `save` 前去调用 `generate_friendly_id` 方法。

  * 调用函式在 JavaScript 用的就更多了，例如绑事件：

    ```
    $("div").click(function(){
      console.log("click!")
    })

    这个 click 的参数就是一个回调函式用法，当我们真正 click 时，才会调用这个匿名函式。
    ```

* Closure 闭包特性

  意思是它会将外面的作用域(scope)一起包进来，函式内可以读取到函数外的变量，但是在匿名函式中新建立的变量，离开匿名函式后会清掉。

  ```
  arr = [1,2,3]
  outer = 1

  arr.each do
    puts outer  # 可以读取到外面的 outer 变量

    inner = 4   # 新建立一个 inner 变量

  end

  inner  # 错误 NameError，找不到 inner 这个变量
  ```





## 14、Combinator functions

*  Combinator functions，指的是处理容器的三个组合招数。

* 1、映射map，的意思就是将容器里面的元素，一对一变换成另一个新的容器。

  ```
  arr = [1,2,3,4,5,6,7,8,9,10]

  result = arr.map { |i| i+1 }

  puts result
  # 输出 [2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  ```

* 2、过滤select，就是将容器里的元素，根据某些条件过滤建立另一个容器。

  ```
  arr = [1,2,3,4,5,6,7,8,9,10]

  result = arr.select{ |i| i % 2 == 0 }  # 这个匿名函式要回传 true 或 false
  puts result
  ```

* 3、归纳reduce，就是将一个容器里的元素，归纳成一个值：

  ```
  arr = [1,2,3,4,5,6,7,8,9,10]
  result = arr.reduce(0) { |sum, i| sum + i }
  puts result

  reduce 的第一个参数 0 是初始值，然后这个匿名函式依序走访容器，两个参数 sum 跟 i，前者 sum 是前一次循环的回传结果。i 是这次走访的元素。
  ```

  * 找最大值其实也可以用 `reduce` 方法：

    ```
    arr = [9, 2, 10, 6, 2, 4, 5, 6, 0, 4]

    max = arr.reduce do |max, i|
      if max > i
        max
      else
        i
      end
    end

    puts max
    # 输出 10
    ```

* 综合应用：假如我们想从以下的数据找出小于 1000 的最大的金额，要怎么找呢？

  ```
  tickets = [
    { name: "Ticket A", amount: 100 },
    { name: "Ticket B", amount: 1123 },
    { name: "Ticket C", amount: 670 },
    { name: "Ticket D", amount: 50 },
    { name: "Ticket E", amount: 990 },
  ]

  result = tickets.map{ |t| t[:amount] }.select{ |a| a < 1000 }.reduce{ |x,y|
  (x > y)? x : y }

  puts result
  # 输出 990
  ```





# 面向对象编程

## 15、什么是面向对象?

* 所谓的对象(Object)就是指一个带有状态和方法的容器。

  ```
  var my_object = {
    name: "ihower",
    move: function(){
      console.log( this.name + " is moving" )
    }
  }

  my_object.move()
  ```

  `my_object` 有两个属性，一个是 `name` 一个是 `move`，而 `move` 其实是一个匿名函式。这个对象有自己的状态(`name` 是 ihower)，有自己的方法(move)。我们把相关的数据和方法，一起包进物件里面。

  `my_object.move()` 可以看成是朝对象 `my_object` 发送一个 `move` 讯息。接收者 `my_object` 接到一个 `move` 讯息。

* 所谓的类(Class)就是去定义了某一种类型的对象所拥有的属性和方法。除了 JavaScript，其他编程语言包括 Ruby，都是要先定义类(Class-based)才能创造对象。

  * 你可以想像类(Class)就是对象(Object)的模版
  * 由类产生出来的 Object对象，又叫做 Instance (实例)



## 16、Ruby 语法说明

```
class Person

    def initialize(name)
        @name = name
    end

    def say(word)
        puts "#{word}, #{@name}"
    end

end

p1 = Person.new("ihower")
p2 = Person.new("ihover")

p1.say("Hello") # 输出 Hello, ihower

p2.say("Hello") # 输出 Hello, ihover
```

* 类一定是大写开头，也是一种常数
* `initialize` 是**对象的建构方法**，当调用 `new` 的时候的会把参数传进这里
* `@` 开头的变量，也就是范例中的 `@name` 叫做**对象变量**(instance variable)。这个是对象的内部状态。
* `def` 会定义对象的方法

```
class Person

    @@name = “ihower”

    def self.say
        puts @@name
    end

end

Person.say # 输出 ihower
```

- 两个 `@@` 开头的变量，也就是 `@@name` 叫做**类变量**(class variable)，这个是属于类的
- 用 `self.def` 开头定义的方法，也就是 `def self.say` 叫做**类方法**。用 `Person.say` 就会调用。

另外，对象变量(@开头)和类变量(@@开头)，都是封装在类内部，类外无法存取。都需透过定义方法才可以存取到。如下：

```

```

​	

* attr_ 的用法

  ```
  class Person

    attr_accessor :name

    attr_reader :foo
    attr_writer :bar
  end
  ```

  其中 `attr_accessor :name` 等同于刚刚我们自定义的存取方法。`attr_reader` 只定义读、`attr_writer` 只定义写。

* public(公开)、protected 和 private 不同，默认是 public。

  * privated_method 或 protected_method。这两个方法只能在内部调用。
  * protected 允许调用同一类的对象。private 则严格限制在内部调用。
  * 我们希望管控有哪些 public 方法。这些 public 是公开的 API 会给程序员调用的，如果有任何修改都会影响到软件的其他地方要一起修改。但是 private 但 protected 方法就只会影响这个对象的内部而已。



## 17、特性一: 封装(encapsulation)

*  面向对象的其中一个特色就是封装，调用者不需要关心内部结构，只需根据公开接口进行操作。这样内部的结构可以根据架构需求而修改，而不会影响到其他程式。

* 如果改用面向对象来写，首先定义分数的类：

  ```
  class MyRational

    attr_accessor :x, :y

    def initialize(x, y)
      @x, @y = x, y
    end

    def add(target)
      MyRational.new(@x*target.y + @y*target.x, @y*target.y)
    end

  end

  # 2/3 + 3/4

  a = MyRational.new(2,3)
  b = MyRational.new(3,4)
  c = a.add(b)

  puts "#{c.x}/#{c.y}"

  ```

！！！！99：这个例子没看懂？？



## 18、特性二: 继承(inheritance)

* 继承可以让父类的定义都复制到子类，在 Ruby 中用 `class Child < Parent` 符号表示：
* 在 Rails 中也很常见继承，打开任一个 Model 档案，都是继承自 `ApplicationRecord`。再打开会发现 `ApplicationRecord` 继承自 `ActiveRecord::Base`。后者是 Rails 框架的核心类，我们之所以可以调用 `.save`、`.find`、`.where` 等等方法就是在 `ActiveRecord::Base` 中定义的。
* 打开任一个 Controller 档案，都是继承自 `ApplicationController`，然后 `ApplicationController` 又是继承自 `ActionController::Base`，我们之所以可以调用 `before_action`、`render`、`redirect_to` 等等方法就是在 `ActionController::Base` 中定义的。



* module用法一：多重继承。如果有多个父类要继承，在 Ruby 中会用到 module：

  * 其中 module Ownership 会用 include 的语法 mix-in(混入)到 Car 里面。

  ```
  module Ownership
    def show_owner
      puts "#{self.class} show_owner called"
    end
  end

  class Vehicle
    def move
      puts "move"
    end
  end

  # Car has two parents: Car and Ownership

  class Car < Vehicle
    include Ownership
  end

  class House
    include Ownership
  end

  car = Car.new
  house = House.new

  car.show_owner()
  house.show_owner()

  ```

* module用法二：命名空间


  ```
  module  A
    class B
    end
  end
  如果要使用它要用 A::B。
  ```

  如果 module A 已经定义过了，则可以这样写：

  ```
  class A::C

  end
  ```

* module用法三：定义模块方法：

  ```
  module MyUtil

    def self.foobar
      puts "foobar"
    end

  end

  MyUtil.foobar
  # 输出 foobar
  ```



## 19、特性三: 多态(polymorphism)

* 多态的意思是可以把很多不一样的东西，当作同一种东西来处理。

  * 例如箱子有很多种，打开的实作方式各有不同(有的有锁、有的没锁)，但是这些箱子都有提供「打开」这个接口可以操作。下命令的人只需要知道呼叫这个指令即可。

  ```
  box1 = { :name => "Box1", :type => "locked" }
  box2 = { :name => "Box2", :type => "unlocked"}
  box3 = { :name => "Box3", :type => "seal" }

  def open_box(box)
    if box[:type] == "locked"
      puts "Open locked"
    elsif box[:type] == "unlocked"
      puts "Open unlocked"
    elsif box[:type] == "seal"
      puts "Open Seal"
    end
  end

  arr = [box1, box2, box3]
  arr.each do |x|
    open_box(x)
  end

  这样设计的缺点是不好扩充，维护性低。因为无论是新增不同的箱子，或是修改某一个箱子打开的行为，都得修改同一个方法，复杂度全部集中在 open_box 之中。
  ```

  * 让我们改用面向对象来写：

  ```
  class Box
    attr_accessor :name

    def initialize(name)
      @name = name
    end

    def open
      puts "Open default box"
    end
  end

  class LockedBox < Box
    def open
      puts "Open locked"
    end
  end

  class UnlockedBox < Box
    def open
      puts "Open Unlocked"
    end
  end

  class SealBox < Box
    def open
      puts "Open seal"
    end
  end

  box1 = LockedBox.new("Box1")
  box2 = UnlockedBox.new("Box2")
  box3 = SealBox.new("Box3")

  arr = [box1, box2, box3]
  arr.each do |x|
    x.open()
  end

  代码看起来好像变多了，但是扩充性和维护性比较好。这种多型的特型让我们不需要担心确切的数据类型，只要接口一致(都有 open 方法)就可以操作。
  ```

* 鸭子型别 Duck Typing

  在动态语言中，不同对象只要方法的接口一样，就可以有多态的特型，这又叫做 [Duck Typing](https://zh.wikipedia.org/wiki/%E9%B8%AD%E5%AD%90%E7%B1%BB%E5%9E%8B)：当看到一只鸟走起来像鸭子、游泳起来像鸭子、叫起来也像鸭子，那么这只鸟就可以被称为鸭子。

  * 名词释疑：方法的「接口(Interface)」指的是方法的名称和参数，方法的「实作(Implement)」指的是方法内实际要做的代码。上述的 LockedBox、UnlockedBox 和 SealBox 都有一样的 open 接口，但是子类别中定义了不同的实作。



## 20、面向对象设计

面向对象设计又是一门学问，有兴趣的学员，可以朝以下参考资源搜寻：

- [面向对象设计实践指南: Ruby 语言描述](https://book.douban.com/subject/25795276/) 人民邮电
- [SOLID](http://en.wikipedia.org/wiki/SOLID_%28object-oriented_design%29) OO 设计原则
- [Design Patterns 设计模式](https://zh.wikipedia.org/wiki/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F)，最有名的即 GoF patterns。设计模式针对了特定的情境，提供设计解法(通常是如何设计你的类别)，并且「命名」这些模式让程序员可以方便沟通和当作命名的元素。另一方面也是提供一种可以临摹的设计范例。常见的设计模式包括 Factory, Adapter, Composite, Decorator, Iterator, Observer 等等



# 异常处理 Exception

## 21、什么是异常处理 Exception

* `RuntimeError` 是一个 Ruby 内建的默认异常对象，用来储存关于这个异常的信息。Rails 还有内建其他不同的异常对象，详见 [Ruby API](https://ruby-doc.org/core-2.2.0/Exception.html)。

* `raise` 的大多是 Ruby 本身或是我们使用的库和框架之中，例如：

  * 当你对一个对象调用一个不存在的方法时，Ruby 会丢出 `NoMethodError` 异常
  * 在 Rails 中当URL找不到任何路由规则可以符合时，会丢出 `Routing Error` 异常

* Ruby 语法说明: rescue

  * 在 `rescue` 我们会写如何去处理(拯救)异常，而 `rescue => e` 的 `e` 是个异常对象，会储存关于这个异常的信息。
  * 常见的 `rescue` 可能是显示错误讯息，告诉用户这个操作失败了，然后程序回复正常继续执行。

* Ruby 语法: ensure

  * `ensure` 部分则是不管有没有发生异常，都一定会执行到。

* Ruby 语法: 顶层异常捕获

  ```
  def 某个方法名称
    # do something

    raise 'An error has occured.'
  rescue => e
    puts 'I am rescued.'
  ensure
    puts 'This code gets executed always.'
  end

  上述的 begin...rescue 语法，如果放在 def 方法定义中，则可以用以下的简略写法。也就是可以省略掉原本异常处理的 begin 跟结尾的 end。
  ```



## 22、什么是 callstack 和 backtrace

* 在一个复杂的软件中，方法内会调用其他方法，然后方法又在调用其他方法，例如以下范例，c 方法调用 b 方法、b 方法内又调用 a 方法。这种一层一层的关系，又叫做 `callstack`。

  ```
  def a
    puts "a"
    raise "A error"
  end

  def b
    puts "b"
    a()
  end

  def c
    puts "c"
    b()
  end

  begin
    c()
  rescue => e
    puts e.message
    puts e.backtrace
  ensure
    puts "finally"
  end
  ```

  * 在上述的 `rescue` 中，我们用 `e.backtrace` 可以列出调用的 `callstack` 关系，**`backtrace` 的意思就是回朔当初的调用关系**。
  * 在 Rails 中如果发生异常，根据 development 模式或 production 模式，最外层有不同的异常处理策略：在开发时最外层的 `rescue` 会显示错误的 backtrace，这样可以帮助我们了解发生错误的来龙去脉：

  ![](https://ws3.sinaimg.cn/large/006tNc79gy1flisbbmh8wj30v70jw41d.jpg)

  * 默认显示 Application Trace 也就是我们写的代码 backtrace，而 Framework Trace 则是发生在 Rails 框架内的 backtrace。
  * 如果是 production 模式，默认的最外层 `rescue` 其实是显示 500 错误画面(也就是 public/500.html)。



## 23、异常处理策略

* 在看 Ruby API 或是 gem 的 API 文档时，你可以注意一下它们是如何处理异常情况的。——在gem的页面，**搜索`Exceptions`**即可看到相关语法。

  ![](https://ws2.sinaimg.cn/large/006tNc79gy1flisgjeylkj31iw0pyqah.jpg)

* 如果你用 `save` 的话，如果失败只会回传 `false` 然后就继续执行下去，用了 `save!` 如果失败程序会中断。



## 24、关于 Rails 的异常处理

*  `find` API

  * 如果找不到数据，会丢 `ActiveRecord::RecordNotFound` 的例外。在 show action 我们经常用这个 API。


*   在 development 开发模式中，你会看到 ActiveRecord::RecordNotFound 异常。在 production 上线模式，会显示 404 页面(public/404.html)

* 在百宝箱第一集的「自定义 Model 网址」中，我们新增了一个 `friendly_id` 字段，然后 show action 改成：

  ```
    def show
      @event = Event.find_by_friendly_id!(params[:id])
    end
  ```

  * 为什么这里偏好用抛出异常的策略呢？如果我们改用 `Event.find_by_friendly_id(params[:id])` 的话，找不到数据时会回传 `nil`，那么 @event 变成 `nil` 程序继续执行，抛出异常是 `NoMethodError` 最后程序中断。这时候要找到真正异常的原因就会多花一点时间。
  * 我们希望在异常发生的第一时间就中断程序(fail fast)，而不是让程序无声地继续执行下去，最后像一个未爆弹一样最后莫名其妙地炸掉。

* 可以在 controller 中宣告 `rescue_from` 去救回特定的异常对象。

* gem用于异常通知

  *  [Exception Notifier](https://github.com/smartinez87/exception_notification)
  *  [Rollbar](https://rollbar.com) 推荐这套，有免费额度一个月记录 5000 个异常
  *  [Airbrake](https://airbrake.io)
  *  这些第三方服务可以在网站发生异常错误的时候自动将错误讯息收集起来，并且提供了还蛮不错的后台可以浏览，还可以统计及追踪异常处理的情况。免费的方案对于小网站就很够用，非常推荐使用。





# 元编程 Meta-Programming

## 25、元编程: define_method

* 元编程(Meta-programming)的意思是让程序帮我们写程序。

  * 这就是 Rails 很多 API 用法之所以这么 magic 背后的秘密武器。撰写元编程的能力是库和框架作者的必备技巧。
  * 推荐[Ruby元编程](https://book.douban.com/subject/26575429/)一书。

* define_method，是个 Ruby 的类方法，可以动态定义对象方法。

  * `define_method(:foo) { puts "bar" }` 等同于

    ```
    def foo
      puts "bar"
    end
    ```

  * 区别与def，差别在 `define_method` 用匿名函式来定义方法，所以有 Closure(闭包) 特性。

  * Rails 很多这样的宣告背后，都是用 `define_method` 做出来的



## 26、元编程: method_missing

* Ruby 在调用方法找不到时，会改调用这个 `method_missing` 这个方法。

  ```
  class Car
    def go(place)
      puts "go to #{place}"
    end

    def method_missing(name, *args)
      if name.to_s =~ /^go_to_(.*)/
        go($1)
      else
        super
      end
    end
  end

  car = Car.new

  car.go_to_taipei
  # go to taipei
  ```


  car.blah # NoMethodError: undefined method `blah`
  ```

  * 当调用 `go_to_XXXX` 时，因为我们并没有特别定义这个方法，所以就会改成调用 `method_missing` 方法，在这个方法中我们再检查是不是 `go_to_` 开头，如果是的话就调用 `go` 方法，不然就改调用 `super` 回到原本的行为，也就是抛出 NoMethodError 异常。
  * `super` 当你在类别中复写一个方法时，透过 `super` 可以调用到上一层被你复写的方法。

* 例如 ActiveRecord 的 `find_by_XXX("YYY")` 功能，会变成 `where( :XXX => "YYY" ).first`

* 又例如在 Web API 教程中，用到 Jbuilder 样板来输出 JSON。其中的 `number`、`available_seats` 和 `created_at` 方法其实都进到 `method_missing` 了。

  ```
  app/views/api/v1/trains/show.json.jbuilder
  json.number @train.number
  json.available_seats @train.available_seats
  json.created_at @train.created_at
  ```

！！！！！！！99：method_missing到底是什么鬼，完全看不懂？？？？



## 27、元编程: Monkey Patch

* [猴子补丁](https://zh.wikipedia.org/wiki/%E7%8C%B4%E8%A1%A5%E4%B8%81)的意思是直接复写 Class 的定义去修改行为，在 Rails 中常用这招来扩增原本 Ruby 的行为，例如：

* try方法

  * try 这个方法的原理是什么呢？

  ```
  class NilClass
    def try(*args)
      nil
    end
  end
  ```

* blank? 方法

  * blank? 这个方法的原理是什么呢？

  ```
  class Object    # 在 Ruby 中所有的类都会继承自 Object 这个类

    def blank?
      respond_to?(:empty?) ? empty? : !self
    end
    
    def present?
      !blank?
    end

  end

  class NilClass
    def blank?
      true
    end
  end

  class FalseClass
    def blank?
      true
    end
  end

  class TrueClass
    def blank?
      false
    end
  end
  ```



# 编码风格

## 28、编码风格 Coding Style

编码风格对于团队开发十分重要，维持一惯的风格可以增加代码的可读性。在 Ruby 和 Rails 社区中，大多会遵守以下的风格指南：

- [Ruby 风格指南](https://github.com/JuanitoFatas/ruby-style-guide/blob/master/README-zhCN.md)
- [Rails 风格指南](https://github.com/JuanitoFatas/rails-style-guide/blob/master/README-zhCN.md)
- [Udacity Frontend Nanodegree Style Guide](http://udacity.github.io/frontend-nanodegree-styleguide/index.html)
- [A guide for programming in style](https://github.com/thoughtbot/guides/tree/master/style)

对个人来说，编码风格也代表了你的代码有没有在编程语言社区「接地气」，更是代码给人的第一印象。一个缩进不佳的代码，给人的第一印象就是「不专业」。
  ```