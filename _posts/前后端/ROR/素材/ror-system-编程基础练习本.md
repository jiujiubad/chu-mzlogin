---
title: ror-system-编程基础练习本
date: '2017-12-13 10:35'
categories:
  - ror系统
tags:
  - ror系统
img: 'https://ws4.sinaimg.cn/large/006tNc79gy1fnfep1kp2qj30jk0dtwez.jpg'
abbrlink: dc81847
---

* 201712
* 编程+ruby



# 注意：tiems、while、each可以解决大部分问题。

### 	

# 1、前言准备

# 2、输入、处理、输出

* Puts，输出变量，并换行
* print，输出变量
* gets，从键盘拿到输入的值
* =，赋值，指派右边的值给左边的变量
* 字符串"xx"或'xx'
* `#{}`，将变量内嵌在字符中
* ruby中，变量用小写字母，并且用_分开



# 3、基本算术

* 数据类型：string、integer、float、array、hash
* 算术：+、-、*、/、%
* 转换：to_i、to_f、to_s
* 浮点数常用方法：
  * .round四舍五入，即大更大小更小
  * .ceil无条件进制，即只会更大
  * .floor无条件舍去，即只会更小



# 4、控制流程

* 关系运算，回传boolean即true或false
  * `==`
  * `!=`
  * `<`
  * `>`
  * `<=`
  * `>=`

* 逻辑运算：&&且、||或、！反

* boolean转型：在 Ruby 之中只要不是 `false` 或 `nil`，都会自动判断成 `true`。

  * ```
    if ""
      # 会执行
    end*
    ```

  * ```
    if nil
      # 不会执行
    end
    ```



# 5、方法 Method

* 调用已定义的方法

  ```
  def hello(name)
    puts "Hello, #{name}"
  end

  hello("ihower")   # 这样会调用 hello 方法
  hello "ihower"    # 在 Ruby 语言中 () 可以省略
  ```

* 用return回传一个值，然后可以存进变量str

  ```
  def get_hello(name)
    return "Hello, #{name}"
  end

  str = get_hello("ihower")
  puts str
  ```

* 如果没有写 `return`，该方法的最后一行的值会自动被返回。例如上述程式的 `return` 可以省略：

  ```
  def get_hello(name)
    "Hello, #{name}"
  end
  ```

！！！！99问题：puts和return的区别？？



# 6、循环 Loop

* 循环，就是可以重复执行某段程式码，直到满足某个条件。

  ```
  x = 10
  while x <= 10
    puts x
    x = x + 1
  end
  ```

* 在 `while` 循环中，用 `break` 关键字，会提前中断循环



# 7、数组 Array

* 数组是一个有顺序的容器，用数字当作索引。索引从0开始

  * 原则上里面的元素，数据类型最好都是一样的，例如都存整数，或是都存字符串。
  * 数组里面还可以放数组，这样会变成二维数组：

* 用for走访数组，ruby中常用each

  ```
  array.each do |i|
    puts i
  end
  ```

  * 如果走访时，需要索引值，可以改用 `each_with_index` 方法：

  ```
  array.each_with_index do |i, j|
    puts i
    puts j   # j 从 0 开始数
  end
  ```

* 数组的操作：

  * `array.size` 会回传数组长度

    `array[1]` 会读取第二个元素

    `array[1] = 999` 会更改第二的元素的值

    `array[99999]` 读取一个不存在的值，会回传 `nil`

    `array[0]` 或 `array.first` 是数组的第一个元素

    `array[-1]` 或 `array.last` 是数组的最后一个元素

    `array.push(999)` 或 `array << 999` 会新增一个元素 999 到数组的最后面

    `array.unshift(999)` 会新增一个元素 999 到数组的最前面

    `array.delete_at(i)` 会删除索引值在 i 的元素

* Splite字符串转化成数组，join把数组转化成字符串

  ```
  str = "ABCDEFG"

  str[0]  # 得到 "A"

  str[1] = "x"
  str   # 变成 "AxCDEFG"

  str.split("") # 用 "" 拆开字符串，得到数组 ["A", "x", "C", "D", "E", "F", "G"]

  ["x", "y", "z"].join(" ") # 用 " " 串接成字符串，得到 "x y z"
  ```





# 8、散列 Hash

* 散列Hash，就是用键(key)当作索引的容器，例如：

  ```
  h = { "a" => 123, "b" => 456 }

  h["a"] 就是 123

  h["b"] 就是 456

  h["qweqkleklwqen"] 如果读取一个不存在的key，结果会是 nil

  h["new_key"] = 123 如果本来没有这个 key，就会直接新增一组 key-value
  ```

* 如何走访散列：


  ```
  h.each do |key, value|
    puts key
    puts value
  end
  ```

* `h.keys` 会回传一个数组包括所有 keys

  `h.values` 会回传一个数组包括所有 values

  `h.merge(h2)` 会合并散列 h2 到散列 h



# 9、对象 Object

* 对象(Object)，也是一种数据类型，这种数据除了拥有属性，也有方法可以调用。

* 在 Ruby 之中，其实每种数据类型，例如 String、Integer、Float、Array、Hash 等等，也都是对象(Object)。例如字符串的 `size` 方法和 `split` 方法：

  * `"abc".size` 会回传 3
  * `"a,b,c,d".split(",")` 会回传数组 `["a", "b", "c", "d"]`

* 其中 `.` 就是调用方法的意思。

* 需要透过类 Class 自订义 Object。Class 就像一种样板，定义出同一种类型的对象有哪些共同的属性和方法。

  ```
  class Car

    attr_accessor :color  # 这会定义属性 @color

    def run
      puts "This #{@color} car is running"
    end
  end
  ```

* 有了类，就可以用 `new` 来产生出对象：

  ```
  car1 = Car.new
  car1.color = "red"
  car1.run

  car2 = Car.new
  car2.color = "blue"
  car2.run
  ```

* 内建的类

  ```
  "foobar".class 会回传 String 是个类

  String.new("foobar") 等同于 "foobar"

  [1,2,3].class 会回传 Array 是个类

  Array.new([1,2,3]) 等同于 [1,2,3]

  不过因为这些数据类型太常用了，所以就不需要写 .new 来产生，直接用符号表示就可以了。
  ```

* 常数，大写开头的变量`Pi = 3.1415926`。所有的类Class都是常数。





# 10、档案处理

* 读取档案就是将数据从硬盘放进内存里面，让程序可以操作。

  写入档案则是将内存的数据写入硬盘进行保存。

* 开档读取和写入，用Ruby 的 [File API](https://ruby-doc.org/core-2.4.1/File.html)

  ```
  读取：
  file = File.open("foo.txt")
  doc = file.read("foo.txt")
  ```

  ```
  写入
  File.open("bar.txt", "w+") do |f|
    f << "aaa"
    f << "\n"
    f << "bbb"
  end
  ```



# 11、推荐资源

[Ruby 基础教程, 人民邮电](http://www.ptpress.cn/book.aspx?id=39228)，如果你要找工作面试，请尽量念完这一本。

如果想继续练习基础编程，或是面试的公司有考算法，请练习以下的题库网站(请练习 Easy 程度程度即可，更高难度需要学完数据结构课程)

- [Coderbyte](https://coderbyte.com/challenges)
- [LeetCode Online Judge](https://leetcode.com/problemset/algorithms/) 硅谷、BAT 大公司面试必备刷题题库网站
- [Codility](https://codility.com/programmers/lessons/1-iterations/) 模拟线上算法测试，很刺激

如果这教程对你来说还是偏难太过抽象，建议你可以找啊哈磊的[小学生坐在马桶上都能看懂的编程入门书](http://www.ahalei.com)，会用更浅显的对话和例子，用一整本书的长度来讲这教程的内容。



# 课后练习

### 21、选择排序法

```
# 给定一数组内含数字，请实作选择排序法进行排序。
# https://zh.wikipedia.org/wiki/选择排序
# 解释：
# 1、当i=0时，
# 2、用j做循环，判断if arr[j] < arr[i]即前后两个数哪个小（当j做完循环，相当于从头到尾比较了数组里每个数字的大小，即找到最小值。并记录最小值min的下标min_index）
# 3、arr[i], arr[min_index] = arr[min_index], arr[i] 用于把第i个索引对应的数组值，和整个数组的最小值进行交换。

def insertion_sort(arr)
  for i in 0..(arr.size-2)
    min_index = i
    for j in (i+1)..(arr.size-1)
      if arr[j] < arr[i]
        min_index = j
      end
    end
    a = arr[i]
    arr[i] = arr[min_index]
    arr[min_index] = a
  end
  return arr
end

arr =  [7, 68, 42, 46, 9, 91, 77, 46, 86, 1]

answer = insertion_sort(arr)

puts answer.to_s # 应该是 [1, 7, 9, 42, 46, 46, 68, 77, 86, 91]
```

```
# 方法二：找到最小值，交换最小值
def insertion_sort(arr)
  for i in 0..(arr.size-2)
    for j in (i+1)..(arr.size-1)
      if arr[j] < arr[i]
        min = arr[j]
        arr[j] = arr[i]
        arr[i] = min
      end
    end
  end
  return arr
end

arr =  [7, 68, 42, 46, 9, 91, 77, 46, 86, 1]

answer = insertion_sort(arr)

puts answer.to_s # 应该是 [1, 7, 9, 42, 46, 46, 68, 77, 86, 91]
```

