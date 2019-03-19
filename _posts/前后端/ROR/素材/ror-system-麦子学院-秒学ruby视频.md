---
title: 麦子学院-秒学ruby视频
date: '2018-02-28 00:10'
categories:
  - ror系统
tags:
  - ror系统
img: 'https://ws4.sinaimg.cn/large/006tNc79gy1fnfep1kp2qj30jk0dtwez.jpg'
abbrlink: d68f77d2
top: 3
---

* 201802
* 编程+ruby



<img src="https://ws3.sinaimg.cn/large/006tNc79gy1foyw3p4fg2j31kw0zkdrx.jpg" width="800">

# 第一讲

## 1、大纲

ruby是一种脚本语言，简约而不简单。

ruby有特殊的**『面向对象』**的特征，比如**『元编程，即通过代码去实现代码』**。

本系列课程的大纲如下：

<img src="https://ws1.sinaimg.cn/large/006tNc79gy1fov86kp0s2j31kw0zkdrx.jpg" width="500">

掌握以上的课程就算是ruby入门了，但我会穿插一些**『ruby为什么这样做？代码为什么这样写？ruby的标准规范是怎么写的？应该去如何学习ruby？』**

作业放在github，比百度网盘好的是，可以修改，大家可以通过github了解ruby，学习git的使用。

## 2、写代码

irb

```
puts "hello world"
puts ("hello world")

a = "hello"
puts a

b = 3
c = 2
b+c #5
a+b #报错
```

从上边的报错可以看出，ruby里，我们没有定义类型，但是它有String。我们定义的变量，它有自动类型推导，成为**『duck type鸭子类型』**，只要看起来像那么它就是这个类型。



# 第二讲、基本数据类型

## 1、数字

irb

```
1.methods

1.to_s
1.2.to_s

0.4-0.3 #0.10000000000000003
```

1在ruby里它不止是一个类、也是一个类支持的对象、一个类的实例。

1为什么是一个类的对象？用1.methods可以查看一个对象的所以函数（方法）。

ruby中万物皆对象，ruby其实是没有基本的数据类型。

### 作业：

1）为什么0.4-0.3=.10000000000000003？

## 2、文本（字符串）

```
a = 2
b =3
"hello #{a+b}" #字符串插值

"hello"+"world"+"!" #字符串相加
```

## 3、范围

```
1..2  #大于等于1，小于等于2
1...3 #大于等于1，且小于3


```

## 4、运算符号

```
"hello"*3 
"hello".methods

a = "hello"
a[0] = "1"
a #"1ello"
```

ruby中一切皆对象，所以对象的操作都应该是一个方法，"hello".methods显示了各种方法。

### 作业：

2）"hello".methods可以查看对象的方法，其中:<, :>, :<=, :>=是怎么使用的？

## 5、true、false、nil

```
2 == 2
3 == 1

true.methods

"hello".nil?
"".nil?
"".methods
"".empty?
```



# 第三讲、语句及异常处理

irb

```
a = gets
100
puts a

a.chomp 去掉字符串尾部的\n\t\r，每次去掉一个。
a.chomp.to_i
```



新建input.rb

```
inputs = gets.to_i
puts inputs
```

运行`ruby input.rb`



## 1、条件式

新建if.rb

```
input = gets.to_i
if input == 2
  puts "相等了"
  system "say 妈妈问我怎么不开心！" #播放中文语音
elsif input == 100
  system "say 3333"
else input == 300
  system "say 一百块都不给我"
end
```

运行`ruby if.rb`，输入数字，会播放中文语音。

if语句，如果判断为false或nil，不会执行代码。



if 的另外一种写法

```
input = gets.to_i
system "say 一百块都不给我" if input == 100
```



与if相反的是unless，当false或nil时，会执行代码。

```
unless input == 100
  puts "123"
else
  puts "321"
end
```

不像if有elsif的用法，unless是没有elsunless的。	 

### 作业：

1）要输入三角形的三条边的长度，然后判断这三条边所构成的三角形，是一个怎样的三角形？或者根本不是一个三角形？



# 第四讲、case语句和循环

新建case.rb

```
case object
  when 1..2 #大于等于1，小于等于2
    puts "小于3"
  when 4...8 #大于等于4，小于8
    puts "小于8"
end
```

## 1、循环、控制语句

新建loop.rb

```
input = gets.chomp.to_i
while input!=0
  puts "hahahahaha"
  break if input == 2
  next if input == 3
  puts "aaaaa"
end
```

until与while相反，类似于unless与if。但是平时少用until这种反直觉的代码。

break与next是循环语句中的控制语句，根据所给条件跳出或略过。



# 第五讲、代码块和异常处理

## 1、代码块

例子1：1...5000的加法运算。

新建block.rb

```
# 比较麻烦的语句：
# sum = 0
# i = 1
# while true
#   sum += 1
#   i += 1
#   break if i == 5001
# end

sum = 0
(1..5000).each{|i|
  sum += i
}
puts sum
```

运行`ruby block.rb`



## 2、异常处理

例子2：对0做除数（即1/0、2/0、3/0等）这种情况，进行简单的异常处理。

新建error.rb

```
a = 100
while true
  b = gets.to_i
  puts a/b
end
```

运行`ruby error.rb`，当输入0时，程序报错退出。

我们希望输入0，有输入不合法的提示，但不会退出，可以继续输入。



异常处理的办法，还是上面的error.rb文件

```
a = 100
while true
  b = gets.to_i
  begin
    puts a/b #将可能出现异常的代码放在这里
  rescue Exception => e
    puts "请不要输入零" #处理方法放这里
  end
end
```

### 作业：

1）这里的e是什么？用puts方法或p方法把e打印出来。

——puts出来的e是divided by 0。



# 第六讲、函数（方法）的使用

function，有叫函数或叫方法。

本节学习：

1、方法的调用。

2、自定义方法。

3、带默认值的自定义方法。

4、带返回值的自定义方法。



irb

```
a = gets #获取键盘的输入值的方法，会返回一个值
123
a.to_i #to_i方法转化成数字，会返回一个值
```

上边用了两个方法，第一个方法通过名字gets调用，第二个方法通过点号调用。这有什么不同？下节会讲。



新建function.rb

```
def  test 
  puts "test"
end
```

运行`require '/Users/apple/function.rb'`，即用require方法导入文件。

puts为什么跟着字符串过后就可以打印出来呢？也就是说一个函数（方法）你可以把一个值给放进去处理过后，

还可以得出一个值来。我们**『把放进去的值叫参数，得出来的值叫返回值』**。



还是用function.rb

```
def add(a,b)
  return a+b
end
```

重新require导入文件，即运行`require '/Users/apple/function.rb'`。

输入`add(3,2)`或省略括号`add 3,2`，会有结果，而输入`add 3`会报错。



什么叫带默认值参数的函数呢？

还是用function.rb

```
def add(a=3,b=2)
  return a+b
end
```

重新require导入文件。

输入`add 4`或`add 6,9`，都会有结果。

### 作业：

1）第三讲的作业讲过，输入一个三角形的三条边，会是一个什么样的三角形？把这些内容写在一个方法里面，这个方法有三个参数叫a、b、c，然后给a、b、c赋值，然后用puts打印出是什么三角形。



# 第七讲、类

本节学习：

1、什么是类？

2、类与实例的区别。

3、自定义简单的类。



## 1、什么是类？

```
1 2 3 4 数字类
"a" "b" "c" 字符串类
```

如上，类其实是某一集合，是一种集合。

比如，数字集合的带有数字类的特性，可以做四则运算。



对类的简单了解：

```
"a".class #得到String

String #String
String.class #Class
Class.class #Class
```



## 2、实例

实例一般是用new方法来创建的。

```
a = String.new
b = String.new("33")
```

因此得知一些概念：

1）一个类具有自己的某些特性，我们称之为方法，它的实例一旦被创建也会被带有。

2）一个类它有自己的构造方法，通过new来调用，来生成实例。



新建classs.rb

```
class Student 
  def initialize(name, no, gender)
    @name = name #类变量@name
    @no = no
    @gender = gender
  end
  
  def sayHi
    puts "我叫#{@name}，学号#{@no}。"
  end
end
```

导入` require '/Users/apple/class.rb'`。

输入

```
Student
a = Student.new("Bob", "1", "不明")
a
a.sayHi
```

### 作业：

1）构建Teachure类，sayHi的方法用“我叫xx，我是xx课程的老师。”

——

```
class Teacher
  def initialize(name, lesson)
    @name = name
    @lesson = lesson
  end

  def sayHi
    puts "我叫#{@name}，我是#{@lesson}的老师。"
  end
end
```



# 第八讲、自定义类

本节学习：

1、类常量。

2、类变量。

3、方法的访问和控制。



新建class.rb，本例用setter、getter分别给变量修改值、取值。

```
class Student
  def initialize(name, no, gender)
    @name = name
    @no = no 
    @gender = gender
  end
  
  #setter
  def name=(name) #在ruby里，符号可以作为方法名的一部分
    @name = name  
  end 
  
  #getter
  def name 
    return @name
  end
  
  def sayHi
    puts "我是#{@name}，座位号#{@no}"
  end
end
```

运行

```
require '/Users/apple/class.rb'
a = Student.new("bob","1","不明")
a
a.name = "aoa"
a.name
```

以上，带@的变量在该实例中是共通的，把这样的类变量叫做**『实例变量』**。也就是说这个实例变量将外界传进来的值给存起来了。



简化上述setter、getter代码

```
class Student
  Version = "1.0" #新增类常量
  
  attr_accessor :name #可读可写
  # attr_reader :no #只可读不可写
  # attr_writer :gender #只可写不可读
  
  def initialize(name, no, gender)
    @name = name
    @no = no 
    @gender = gender
  end
  
  private #方法的访问控制，此时sayHi不能通过a.sayHi调用
  
  def sayHi
    puts "我是#{@name}，座位号#{@no}"
  end
end
```

其中，类常量首字母大写。类常量的访问`Student::Version`。



方法的访问控制：①、public和private。②、另一种在继承里讲（第九讲）。

### 作业：

1）把第七讲的Teacher类升级一下，加入getter、setter方法。给它的sayHi方法加private、升级到1.0版本。

——

```
class Teacher
  Version = "1.1"
  attr_accessor :name
  attr_accessor :lesson

  def initialize(name, lesson)
    @name = name
    @lesson = lesson
  end

  private

  def sayHi
    puts "我叫#{@name}，我是#{@lesson}的老师。"
  end
end

```



# 第九讲、类方法|实例方法|类的继承

本节学习：

1、类方法。

2、实例方法。

3、类的继承。



## 1、类方法

irb

```
String.然后按键盘的Tab键
```

上述出现的方法都是String类的方法，这些方法不需要类去实例化就可以调用的。

比如String.name，是类方法（或叫类函数），它没有to_i等方法。

```
class Student
    def self.nick_name
      return "学生类"
    end
end
```

此时就能使用String.nick_name。

## 2、实例方法

第七讲我们说过实例一般是用new来创建，比如a = String.new("12")，是实例方法（或叫实例函数），它可以调用a.to_i等。第八讲我们写的sayHi就是实例方法。

```
def sayHi
  puts "我叫#{@name}，我的座位号是#{@no}。"
end
```

此时就能使用a.sayHi。

## 3、类的继承

比如，在第八讲例子的基础上，要再新建一个大学生类，同样要有name、no、gender，并且要有一个sayEnglish方法，sayHi方法也不一样。

```
class Student
  Version = "1.0" #新增类常量
  
  attr_accessor :name #可读可写
  # attr_reader :no #只可读不可写
  # attr_writer :gender #只可写不可读
  
  def initialize(name, no, gender)
    @name = name
    @no = no 
    @gender = gender
  end
  
  private #方法的访问控制，此时sayHi不能通过a.sayHi调用
  
  def sayHi
    puts "我是#{@name}，座位号#{@no}"
  end
end

class UniversityStudent < Student #类的继承
  def sayHi  #重新定义方法，会覆盖
    puts "我们是大学生"
  end
  
  def sayEnglish
    puts "my English is very good."
  end
end
```

用<来表示继承。重新定义方法，会覆盖。

### 作业：

1）扩充一个小学生类，里面有sayHi和sayHello方法要跟第八讲写的不一样。

```
class Student
  Version = "1.0" #新增类常量
  attr_accessor :name #可读可写
  # attr_reader :no #只可读不可写
  # attr_writer :gender #只可写不可读

  def initialize(name, no, gender)
    @name = name
    @no = no
    @gender = gender
  end

  def sayHi
    puts "我是#{@name}，座位号#{@no}"
  end

  def self.nick_name
    return "学生类"
  end
end

class Pupil < Student
  def sayHi
    puts "小学生驾到。"
  end

  def sayHello
    puts "农药里的小学生。"
  end
end
```



# 第十讲、扩充类和模块

问题：现在要做String里添加方法（函数），但String是ruby官方的类，要如何在这个类里增加一个方法呢？我们并不能去继承String类，然后在所有地方替换掉，要怎么做好？

本节学习：

1、扩充类。

2、模块

①、模块是什么？

②、使用模块。

③、模块的作用。



## 1、扩充类

打开class.rb，在Student类里扩充实例方法，在String类里扩充类方法。

```
class Student
  attr_accessor :name
  attr_accessor :no
  attr_accessor :gender
  
  def initialize(name, no, gender)
    @name = name
    @no = no 
    @gender = gender
  end
end

class Student #在Student类里扩充实例方法
  def sayHi
    puts "学生"
  end
end

class String #在String类里扩充类方法
  def self.nick_name 
    p "小s"
  end
  
  def self.name
    p "字符串类"
  end
end
```

运行

```
require '/Users/apple/student.rb'

a = Student.new("bob","1","不明")
a.sayHi

String.nick_name
String.name
```

## 2、模块

1）什么是模块？

——更像方法的集合体，把这些方法人为的集合起来。比如，数学运算的所有方法和常量放在一起，Math模块。

```
Math::PI
Math.sqrt(2) 或 Math::sqrt(2)
```

2）模块和类方法有什么区别？

* 模块可以调用常量，如Math::PI。
* 模块可以调用方法，如Math.sqrt(2)。


* 模块不包含类的特征。比如，类方法有实例，即可以用new方法，而模块没有实例即没有new方法。
* 模块也没有继承。

3）模块有什么作用？请看第十一讲。

### 作业：

1）向String类扩充一个方法，比较两个字符串的大小，如果a字符串比b字符串大，就返回大，否则返回小。

——

```
class String 
  def self.compare(a,b)
    if a > b
      puts "a大"
    else
      puts "a不是大"
    end
  end
end
```



# 第十一讲、自定义模块

本节学习：

1、回顾模块

2、定义一个简单的module



新建module.rb

```
module Mathematics
  PI = 3.1415
  
  def sqrt(number)
    Math.sqrt(nember)
  end
end
```

运行

```
require '/Users/apple/module.rb'
Mathematics::PI #3.1415
Mathematics::sqrt(2) #报错
Mathematics.sqrt(2)  #报错
```

因为模块无法实例化，所以这里的实例方法sqrt无法直接调用。



修改module.rb

```
module Mathematics
  PI = 3.1415
  
  def self.sqrt(number) #把实例方法改成类方法
    Math.sqrt(number)
  end
end
```

运行

```
require '/Users/apple/module.rb'
Mathematics::PI #3.1415
Mathematics.sqrt(2)  #1.4142135623730951
```



如何调用实例方法？用Mixin。

修改module.rb

```
module Mathematics
  PI = 3.1415
  
  def self.sqrt(number) #把实例方法改成类方法
    Math.sqrt(number)
  end
  
  def hello
    puts "hello"
  end
end

class Student
  include Mathematics

  def initialize(no)
    @no = no
  end
end
```

运行

```
require '/Users/apple/module.rb'
Student.new(1)
a=_
a.hello 
```

a=_，是什么意思？

通过include，可以获得实例的方法。

模块的意义，在于把一些变量、常量打包在一起，谁需要它就include导入它，混合进其他类中所以称为Mixin。

模块不仅能Mixin实例方法，还可以方法混模块、模块混模块、模块混类、类中再用模块，在以后的Mixin章节会专门讲这一点。



# 第十二讲、运算符

本节学习：

1、逻辑运算符

2、条件运算符

3、范围运算符

4、自定义符号



## 1、逻辑运算符

真：不是nil且不是false

假：nil或false

与运算&&

或运算||

```
a = true
b = false
a && b #false
a || b #true
a= (4>3) #true
(4>3) && b #false
```

## 2、条件运算符

简写，c=(a>b) ? a : b

```
a = 4
b = 3
c = (a>b) ? a : b
```

## 3、范围运算符

.. 大于等于且小于等于

...大于等于且小于          

```
a = "Hello Ruby"
a[0..4]
b = a[0...4] 或b=_
b
```

## 4、自定义符号

在ruby中，符号可以作为方法名，所以自定义符号其实也是自定义方法名。

新建vector.rb

```
class Vector
  attr_reader :x, :y
  
  def initialize(x,y)
    @x = x
    @y = y
  end
   
  def +(the_vector)
    puts @x
    puts @y
    puts the_vector.x
    puts the_vector.y
    return Vector.new(@x+the_vector.x,@y+the_vector.y)
  end
end
```

运行

```
require "/Users/apple/ventor.rb"
a = Vector.new(2,3)
b = Vector.new(1,2)
a+b
a+(b)
```

### 作业：

1）根据以上Vector类，补写减法。

——

```
class Vector
  attr_accessor :x, :y

  def initialize(x,y)
    @x = x
    @y = y
  end

  def -(the_vector)
    Vector.new(@x-the_vector.x,@y-the_vector.y)
  end
end

```

2）给String类拓展一个加法的运算，让字符串加数字可以得到新的字符串。 



# 第十三讲、数值类|字符串类

## 1、数值类

Numeric，数值类。

分类两个子类：

1）Integer，整数

* Fixnum，普通整数
* Bignum，大整数

2）Float，浮点数



### 1.1 整数和浮点数，类型转换

```
1.2.to_i
1.to_f

1.to_s

"1".to_i
"1".to_f
```

如上，ruby的转换非常简单，因为它所有变量都是一个类的实例，都带有实例方法如to_i、to_f。



### 1.2 介绍三个方法：

```
1.5.round #2 
1.4.round #1

1.4.ceil  #2
1.5.floor #1
```

其中，round四舍五入，ceil是进一法，floor是退一法。非常常用。



### 1.3 Math模块，常用方法如下，大家一一去测试。

PI

E

sqrt、sin、cos、log、exp



## 2、字符串类

### 2.1 创建字符串

几种方法如下：

```
a = "2"
a = String.new("2")
"#{a}"
a = %Q{我们是}
a = %q|我们是|
```



### 2.2 常用方法

1）计算字符串的长度，"123".length、"".length

2）是否为空，"".empty?

3）一个字符串是否包含另外一个字符串

```
a = "hello ruby"
b = "ruby"
a.include?(b)
```

4）两个字符串是否相等，a == b

### 作业：

1）回顾本节方法，并从ruby官网看看还有哪些方法，把它们摘抄进来。非常简单，但是非常的费时间。



# 第十四讲、数组类|Hash类

## 1、数组类（Array）

### 1.1 创建数组

数组是一个有序的集合。

```
a = [1,2,3,4,5,6]
a[0]
a[1]

a = Array.new
a[0]=1
a[3]=3
a
a[2]=5
a

a = "hello"
a[0]=1
a
```

如上，字符串就是个特殊的数组。



### 1.2 常用方法

1）数组长度，[1,2,3].length

2）[1,2,3].empty?

3）交集&、并集|、全集+

```
a = [1,2,3]
b = [2,3,4]
a & b #[2,3]
a | b #[1,2,3,4]
a + b #[1,2,3,2,3,4]
```

4）怎么把一个元素加入到数组？

```
a = [1,100,2,100,3,4,100]

a[a.length] = 4
a.push(4) #把一个值放到数组末尾
a.pop     #删除数组最后的值
a.pop(3)  #删除数组最后3个值
a.insert(1,100) #插入：位置1，值100
a.delete(100) #删除数组里所有的100
```



## 2、哈希类（Hash）

### 2.1 创建哈希

哈希是一种无序集合。

```
h = {:a => "1"}
h[:a]

h = Hash.new
h[:a]=1
h
```



### 2.2 常用方法

与数组类似，大家自己去查。

1）哈希和数组的转换，to_a、to_h

### 作业：

1）去ruby官网搜集，数组和哈希还有什么常用的方法，记下来，在后面的课可能会用到。



# 第十五讲、文件类|文件夹类|时间类

## 1、文件类

### File和FileUtils

重命名

```
File.rename("class.rb","c.rb") #返回0，说明已重命名
```

复制

```
require "FileUtils"
FileUtils.cp("c.rb", "c_1.rb")
```

删除

```
File.delete("c_1.rb") #返回1，说明文件被彻底删除。慎用！
```

## 2、文件夹类

打开

```
d = Dir.open("../Desktop/")
```

读取文件名

```
d = Dir.open("../Desktop/")
while file_name = d.read
  p file_name
end
```

创建

```
Dir.mkdir("temp")
```

删除

```
Dir.delete("temp")
```

## 3、时间类

date类和time类区别不大。而DateTime，它的区别度就更小，和Time类的所有方法几乎是一致的。

只是不同的是DateTime的单位是天，而Time类是秒，而Date是精确到天。

### 3.1 Time

```
Time.new
Time.new

t = Time.now

t.year
t.month
t.day
t.yday #现在是一年中的第几天

Time.now.to_s

Time.new.strftime("%Y%m%d%H:%M:%S") #自定义书缠绵，年月日时分秒
```

### 3.2 Date

```
require "date"
d = Date.today
d.year
d.day+3
d.day-3
d.day-3 > d
```

### 3.3 DateTime

```
require 'date'
DateTime.new(2018,4,2,11,11,11)
```

### 作业：

1）自己打开一个文件夹，在里面添加一些文件，然后用今天学习的读取文件夹的方式，给里面的所有文件循环的重命名。用Time.new获取时间的方式得到的字符串，命名所有的文件。



# 第十六讲、迭代器

## 1、什么是迭代器

迭代器是ruby特有的循环处理方式。大括号的内容就是迭代器。

## 2、怎么用？

```
5.times {p "hello"} #大括号的内容就是迭代器

数组
a = [1,2,3,4,5,6]
a.each{|i| p i}

哈希
h = {:a => "1", :b => "2"}
h.each{|key, value| p "#{key}:#{value}"}

第十五讲的文件夹
自己尝试
d = Dir.open("../99")
d.each{|i| p i}
```



除了each外，还有sort

```
a = [1,2,3,4,5,6]
a.sort{|a,b| b<=>a} #[6, 5, 4, 3, 2, 1]
```

sort是正序排列

倒序排列，如上用b<=>a



## 3、如何自定义？

新建diedaiqi.rb

```
class Book
  attr_accessor :title, :author
  
  def initialize(title, author)
    @title = title
    @author = author
  end
end

class BookList
  def initialize()
    @book_list = Array.new
  end
  
  def add(book)
    @book_list.push(book)
  end
  
  def length
    @book_list.length
  end
  
  def [](n)
    @book_list[n]
  end
  
  def []=(n, book)
    @book_list[n] = book
  end
  
  def delete(book)
    @book_list.delete(book)
  end
  
  def each_title
    @book_list.each{|book|
      yield(book.title)
    }
  end
end

BookList.new.each_title{|title|
  p title
}
```

迭代器的相关知识，重在多写，多写才是速成的必备之法。

### 作业：

1）以上代码涉及我们前面学过的所有内容，自己要能敲出来，在终端里试一试。更重要的是，希望能在each_title后再传一个参数，然后能在yield里去处理这个参数，看看究竟是怎么一回事。其实一点都不复杂，代码已经给出来了，希望大家用心去学。



# 第十七讲、Mixin混入

## 1、重新认识Module

### 1.1 Module和Class的关系

用superclass

```
String.superclass #Object
Class.superclass  #Module
Module.superclass #Object
```

类是继承于模块，它有模块的很多特性。

### 1.2 Module与Namespace

用来隔绝重复的类名、变量名、方法名。

### 1.3 使用场景，比如Devise

Devise用来做用户信息验证的。比如，用户名是否正确，登录后自动更新ip地址，自动更新登录时间等。

Devise分为很多个小模块，判断用户名模块、认证模块等。

```
User
include Devise::login
```

## 2、Mixin

### include和extend

新建module.rb

```
module First
  A = 1
  def greet
    p "greet"
  end
end

module Second
  B = 2
  def self.hello
    p "hello"
  end
end

class Student
  include First
  include Second
  extend First
  extend Second
  def initialize(no)
    @no = no
  end
end
```

运行

```
require '/Users/apple/module2.rb'
a = Student.new(1)
a.greet #没有报错，因为有include First
Student.greet #没有报错，因为有extend First
a.hello #报错
Student.hello #报错
```

这里说明两件事：

1）模块的类方法（如上Second里的self.hello）是永远不能被Minin混入的。

2）模块的实例方法，分别通过include、extend被派到类的两种范围去。

* include会把方法派到实例方法中去
* extend会把方法派到类方法中去

明白了这两点后，再去看gem devise，就比较轻松了。因为它大部分是模块混合，让你选择性地混入。

### 作业：

1）好好去看下Devise库。



# 第十八讲、代码规范|用途

## 1、代码规范

代码规范，是为了强化代码的可读性。



1）命名

变量名，用Snake case蛇形命名法，比如hello_world

常量名，用HELLO_WORLD = 1

类和模块的首字母大写，骆驼命名法，HelloWorld

2）

不采用分号

一般不在一行中写代码，如def hello_world end

case语句，case、when、end是一条竖线对齐的

判断式if，用三元运算的问号表达式来简写。

判断式嵌套好几层if，坚决不用问号表达式来简写。



## 2、用途

### 千奇百怪，比如我，会用来：

写脚本、批量修改文件名或文件夹、自动转换简繁体、自动帮我上传某些文件。



### 大数据处理和服务器开发是ruby比较常用的

ruby作为脚本语言， 易懂易学、函数封装简单、方法调用容易，所以在大数据处理方面表现的非常优秀。

在硅谷，ruby非常的流行于做大数据处理方面。比如，现在有10GB的日志文件，要从里面找到有用的信息，大家一般就用ruby去处理这样的日志文件。

但只用来做脚本就太可惜了，ruby也可以做服务器开发，比如国内的团800、百词斩、暴走漫画，国外的推特、github。



### ruby在web领域

网站上面常用的ruby框架有，Rails、Sinatra，这两个框架是基于网络框架Rack来进行开发的。



### ruby开发Android、ios

RubyMotion，有兴趣的可以去看看它是怎么做到两个平台同时开发的，非常有意思。



更深入的学习，需要大家进一步去了解以上列举的框架、网站、编程规范。