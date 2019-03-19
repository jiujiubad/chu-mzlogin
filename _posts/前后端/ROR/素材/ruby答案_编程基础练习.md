---
layout: post
title: '答案_编程基础练习'
date: 2017-12-01 12:18
comments: true
categories: 
---
* 201712
* 编程+ruby



原文地址：http://wangjiao-blog.logdown.com/posts/2049737



# [wangjiao's Blog](http://wangjiao-blog.logdown.com/)

- [**About Me](http://wangjiao-blog.logdown.com/pages/about-me)
- [**Archive](http://wangjiao-blog.logdown.com/archives)
- [**feeds](http://wangjiao-blog.logdown.com/posts.atom)

4 个月 ago

## [7/15 programming-exercise](http://wangjiao-blog.logdown.com/posts/2049737)

**Object:**
在编程基础练习簿这一章节，我们 fork 了全栈营的 [programming-exercise](https://github.com/growthschool/programming-exercise) 专案。专案中，有写好的 `.rb` 档案，学习的目的是完成这些档案，得到想要的结果。

通过本章的学习，能够更好地理解Ruby 语法，包括 String、Number、Array(数组)、Hash(散列)、Object对象各自是什么，以及每个 Class 基本的一些 method。

**Reflective:**
这一章节一共29个小题目，每个题目就是补全相应的 `.rb` 档案，内容并不是很多。可是，我却花了一周左右的时间完成。每天回来之后，不能够很快地进入学习状态，总是拖到10点左右才开始练习。

**Interpretive:**

**Fork programming-exercise 专案**

- Fork全栈营的 programming-exercise 专案
- `git clone git@github.com:your_name/programming-exercise.git`
- `cd programming-exercise` 执行 `.rb` 档案的方法：`ruby xxx.rb`

**输入、处理、输出**
`print` 会输出变量到荧幕上，不换行
`put` 会输出变量到荧幕上，并换行
`gets` 从键盘拿到输入的值

变量赋值用 `=` 号，比如 `your_name = gets`。与 Javascript 不同，不需要 `var` 去指派变量。

字符串 `String` 
"用双引号包起来"
'或是用单引号'
"如果里面有'单引号'，那就要用双引号包起来"
'如果里面有"双引号"，就用单引号包起来'
"如果你坚持双引号里面用双引号，就要使用 \" 逸出"

`#{}`可以在字符串中引入变量，这在之前的练习中就学习过了，而且字符串必须用"双引号"包起来。
Ruby 语法中， 用`#`注解，其后的代码并不会执行。

------

01-hello.rb`# 题目: 输入名字，输出 "Hello, 名字"print "请输入你的名字，然后按 Enter: "your_name = getsputs "Hello, #{your_name}"`

------

02-variable.rb`# 题目: 交换 a, b 变数的值a = 1b = 2puts "a = #{b}"puts "b = #{a}"c = aa = bb = c puts "a 应该是 2，现在是 #{a}"puts "b 应该是 1，现在是 #{b}"`

------

03-triangle.rb`# 题目: 使用者输入直角三角形的宽和高，输出三角形的面积print "请输入直角三角形的高，然后按 Enter: "a = getsprint "请输入直角三角形的底边，然后按 Enter: "b = getsputs "直角三角形的面积是: #{a.to_f * b.to_f/2}"`

------

基本算术

数据类型：
String 字符串
Integer 整数 没有小数点的就是整数）
Float 浮点数（有小数点的就是浮点数）
Array 数组
Hash 散列

数字的运算包括： 加 `+`、 减`-` 乘`*`、 除`／`、 余`%`(余数）
整数除整数，还是整数；浮点数的运算结果，才是浮点数。

`gets`拿到的，是「字符串」，即使我们输入的是数字，所以在计算之前，需要进行数据转换。在 Rails controller 中，params的值，也都是字符串。
`.to_i`可以将字符串，转化为整数
`.to_f`可以将整数，转化为浮点数
`.to_s`可以转化为字符串

四舍五入：`round`；无条件进制：`ceil`；无条件舍去小数：`floor`

------

03-triangle.rb`# 题目: 使用者输入直角三角形的宽和高，输出三角形的面积print "请输入直角三角形的高，然后按 Enter: "a = getsprint "请输入直角三角形的底边，然后按 Enter: "b = getss = a.to_f * b.to_f / 2puts "直角三角形的面积是: #{s}"`

------

04-pizzas.rb`# 题目: 输入有多少片比萨饼和多少人，输出每人可以分到几片，以及剩下几片print "请输入有多少片比萨饼，然后按 Enter: "pizzas = getsprint "请输入有多少人要吃，然后按 Enter: "people = getsa = pizzas.to_i / people.to_ib = pizzas.to_i % people.to_iputs "每人可分得几片: #{a} 片"puts "还剩下几片: #{b} 片"`

------

控制流程 if else

关系运算子，返回的值为 boolean：==（等于）、>=（大于等于）、 <=（小于等于）、 >（大于）、 <（小于）、!=（不等于）

Boolean转型，除了 `false`、 `nil` 之外，其他的值返回的都是 true

逻辑运算子：
`&&` 逻辑和； `||` 逻辑或； `!`逻辑非

if`if elsif elseend `

------

------

06-integer-positive.rb`# 题目: 输入一个数字 x，请判断是否正数、零或负数，以及是不是偶数print "请输入一个整数，然后按 Enter: "x = getsif x.to_i > 0  puts "这个数是正数"elsif x.to_i == 0  puts "这个数是零"else  puts "这个数是负数"endif x.to_i % 2 == 0  puts "这个数是偶数"else  puts "这个数是奇数"end`

------

------

08-find-max.rb`# 题目: 使用者输入 x,y,z，请输出三个数中最大的数print "请输入一个数字x，然后按 Enter: "x = gets.to_fprint "请输入一个数字y，然后按 Enter: "y = gets.to_fprint "请输入一个数字z，然后按 Enter: "z = gets.to_fif x >= y && x >= z  puts "最大的数是x"elsif y >= x && y >= z  puts "最大的数是y"else  puts "最大的数是z"end`

------

方法 Method

用 def

```
def hello
    puts "Hello"
end 
hello()  #这样会调用 hello 方法
hello   #在 Ruby 语言中，（）括号可以省略
```

带入参数

```
def hello(name)
    puts "Hello, #{name}"
end 
hello("Jane")  #这样会调用 hello 方法
hello "Jane"   #在 Ruby 语言中，（）括号可以省略
```

回传值

```
def get_hello(name)
    return "Hello, #{name}"
end 
str = get_hello("ihower")
puts str
```

在方法中用 `return` 返回一个值，让我们可以把它存进一个变量，在后面的程序来使用。
如果没有写 `return`，该方法的最后一行的值会`自动`被返回。

------

09-function.rb`# 题目: 输入直角三角形的宽和高，输出三角形的面积def calculate_area(a, b)  a * b / 2endprint "请输入直角三角形的高，然后按 Enter: "a = gets.to_fprint "请输入直角三角形的底边，然后按 Enter: "b = gets.to_fanswer = calculate_area(a,b)puts "直角三角形的面积是: #{answer}"`

------

10-function.rb`# 题目: 使用者输入 x,y,z，请输出三个数中最大的数def find_max(x, y, z)  if x >= y && x >= z    return x  elsif y>= x && y >= z    return y  else    return z  endendprint "请输入一个数字x，然后按 Enter: "x = gets.to_fprint "请输入一个数字y，然后按 Enter: "y = gets.to_fprint "请输入一个数字z，然后按 Enter: "z = gets.to_f# ....answer = find_max(x,y,z)puts "最大的数是 #{answer}"`

------

循环 Loop

```
x = 0
while x < 10
    puts x 
end 
```

在 `while`循环 中， 用`break`关键字，可以提前中断循环

------

11-seven.rb`# 题目: 列出 1 到 100 之间，所有 7 的倍数i = 1while ( i <= 100 )  if i % 7 == 0    puts i  end  i+=1end`

------

`# 题目: 求 1~100 所有偶数的和i = 1total = 0while ( i <= 100 )  if i % 2 == 0    total += i  end  i+=1endputs total`

------

13-nn.rb`# 题目: 输入一个数字 N，输出 N * N 乘法表print "请输入数字 N，然后按 Enter: "n = gets.to_ii = 1 while ( i <= n )     j = i   while ( j <= n )     puts " #{i} * #{j} = #{i * j}"     j += 1   end   i += 1 end`

------

14-prime.rb`# 输入一个数字 N，请检查是不是质数def is_prime(n)  i = 2  while (i <= (n/2) )      if n % i == 0        return false        break      else        i += 1      end  end  return trueendprint "请输入数字 N，然后按 Enter: "n = getsif is_prime(n.to_i)  puts "这是质数"else  puts "这不是质数"end`

------

15-guess-number.rb`# 题目 猜数字游戏：程序会先产生随机数，然后用户开始猜数字。程序会针对猜的数字回答太高、太低或猜中，猜中后程序就会终止。target = rand(100)while (true)  print "请猜一个 0~99 的数字 N，然后按 Enter: "  n = gets  if n.to_i < target    puts "太低了，再猜一次"  elsif n.to_i > target   puts "太高了，再猜一次"  else    puts "恭喜猜中啦! "    break  endend`

------

数组 Array

```
array.first
```

 

 

```
arr[0]
```

 

```
array.last
```

 

```
array[-1]
```

 

```
array.size
```

 

```
array.push(999)
```

 

 

```
array << 999
```

 

```
array.unshift(999)
```

 

```
array.delete_at(i)
```

 

```
array[99999]
```

 

 

```
nil
```

```
arr[1]
```

 

```
arr[1]
```

 

------

```
for
```

```
for i in array
    puts i 
end 
```

在 Ruby 中，更习惯用 `each`

```
array.each do |i|
    puts i 
end 
```

如果走访时，需要用索引值：

```
array.each_with_index do |i, j|
    puts i 
  puts j  # j 从 0 开始数
end 
```

------

16-array-sum.rb`# 给定一阵列内含数字，输出最大值def find_max(array)  m = array[0]  array.each do |i|    if m <= i      m = i    end  end  mendarr = [8, 12, 36, 53, 9, 75, 3, 71, 59, 88]max = find_max(arr)puts "Max is #{max}" # 应该是 88`

------

17-array-stats.rb`# 使用者不断输入数字存进 Array，最后输出总和、平均、最大值、最小值arr = []while (true)  print "请输入数字，结束请直接按 Enter: "  user_input = gets  if user_input == "\n"    break  else    arr << user_input.to_i  endendputs arr.to_sdef sum(arr)  sum = 0  for i in arr    sum += i  end  return sumenddef average(arr)  return sum(arr) /arr.sizeendputs "总和是 #{sum(arr)}"puts "平均是 #{average(arr)}"puts "最大值是 #{arr.max}"puts "最小值是 #{arr.min}"`

------

18-square.rb`# 建构一个阵列有一百个的元素，内容是 0, 1, 4, 9, 16, 25...... 每个元素是该索引的平方arr = []print "请输入数字 N，然后按 Enter: "n = gets.to_ii = 0while ( i < n)  arr.push(i * i)  i += 1endputs arr.to_s `

------

19-filter.rb`# 给定一阵列内含数字，输出另一个数组只包含偶数def filter_even(arr)  even_arr = []  arr.each do |n|    if (n % 2 == 0)      even_arr.push(n)    end  end  return even_arrendarr =  [7, 68, 42, 46, 9, 91, 77, 46, 86, 1]puts filter_even(arr).to_s # 应该是 [68, 42, 46, 46, 86]`

------

20-sortin.rb`# 承上题，请排序并去除重复的数字# Hint: 可用 arr.sort 排序，和 arr.uniq 去除重复def filter_even(arr)  even_arr = []  arr.each do |n|    if n % 2 == 0      even_arr.push(n)    end  end  return even_arr.uniq.sort endarr =  [7, 68, 42, 46, 9, 91, 77, 46, 86, 1]puts filter_even(arr).to_s # 应该是 [42, 46, 68, 86]`

------

21-selection-sort.rb`# 给定一数组内含数字，请实作选择排序法进行排序。# https://zh.wikipedia.org/wiki/选择排序def insertion_sort(arr)    temp = 0    i = 0    l = arr.size - 1    while ( i < l )        min = i        j = i + 1        while (j < arr.size )            if arr[min] > arr[j]                min = j            end            j += 1        end        temp = arr[min]        arr[min] = arr[i]        arr[i] = temp        i += 1    end    return arrendarr =  [7, 68, 42, 46, 9, 91, 77, 46, 86, 1]answer = insertion_sort(arr)puts answer.to_s # 应该是 [1, 7, 9, 42, 46, 46, 68, 77, 86, 91]`

------

22-missing.rb`# 给定一阵列内含数字，请输出 0~9 中不见的数字def find_missing(arr)  arr1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]  arr = arr1 - arr endanswer = find_missing( [2,2,1,5,8,4] )puts answer.to_s # 应该是 [0,3,6,7,9]`

------

散列 Hash

走访散列

```
h.each do |key, value|
    puts key
  puts value 
end 
```

`h.keys` 回传一个数组，包括所有 keys
`h.values` 回传一个数组，包括所有 values
`h.merge(h2)` 合并散列 h2 到 h

------

23-hash-max.rb`# 给定一 Hash，输出有最大 value 的 keydef find_max(hash)  arr = hash.values  hash.each do |key, value|      if value == arr.max          return key      end  endendh = {  "a" => 71,  "b" => 38,  "c" => 21,  "d" => 80,  "e" => 10}answer = find_max(h)puts "有最大 value 的是 #{answer}" # 应该是 d`

------

24-hash-even.rb`# 给定一 Hash，输出 value 是偶数的 keysdef find_even_keys(hash)  arr = []  hash.each do |key, value|      if value % 2 == 0          arr.push(key)      end  end  return arr endh = {  "a" => 71,  "b" => 38,  "c" => 21,  "d" => 80,  "e" => 10}answer = find_even_keys(h)puts "有偶数 value 的 keys 有 #{answer}" # 应该是数组 [b,d,e]`

------

25-hash-count.rb`# 计算一个阵列中各个元素的出现频率def count(arr)  h = {}  arr.each do |i|    if h[i] == nil      h[i] = 1    else      h[i] += 1    end  end  return h # 回传一个 hashendarr =  ["a", "d", "d", "c", "b", "c", "c", "c", "d", "d", "e", "e", "e", "d", "a", "c", "e", "a", "d", "e"]answer = count(arr)puts answer # 答案应该是 {"a"=>3, "d"=>6, "c"=>5, "b"=>1, "e"=>5}`

------

------

对象 Object

如何定义 Object

```
Class Car
    attr_accessor :color        # 这会定义属性 @color
  
  def run 
    puts "This #{@color} color car is running"
  end 
end 
```

有了类，可以用来产生对象 Object

```
car1 = Car.new
car1.color = "red"
car1.run

car2 = Car.new
car2.color = "blue"
car2.run
```

在 Ruby 中，大写开头的变量，叫做常数，所有的类（Class）都是常数。

```
STATUS = ["pending", "confirmed"]
Pi = 3.1415926
```

------

27-class.rb`class Person    attr_accessor :first_name, :last_name        def greet        puts "Hello, #{@first_name} #{@last_name}"    endendp1 = Person.newp1.first_name = "Peter"p1.last_name = "Wang"p1.greet # 输出 "Hello, Peter Wang"p2 = Person.newp2.first_name = "William"p2.last_name = "Zhang"p2.greet # 输出 "Hello, William Zhang"`

------

档案处理

------

所谓的读取档案就是将数据从硬盘放进内存里面，让程序可以操作。反之写入档案则是将内存的数据写入硬盘进行保存。

读取档案内容

------

```
file = File.open("foo.txt")
doc = file.read("foo.txt")
```

写入档案

------

```
File.open("bar.txt", "w+") do |f|
  f << "aaa"
  f << "\n"
  f << "bbb"
end
```

------

28-wordcount.rb`# 请打开 wordcount.txt，计算每个单字出现的次数doc = File.read("wordcount.txt")h = {}doc.each_line { |line|    words = line.split    words.each { |w|        word = w.gsub(/[,()'".]/,'').downcase        if h.has_key?(word)            h[word] = h[word] + 1            else            h[word] = 1        end    }}puts h`

------

29-todos.rb`# 简易 Todo 代办事项应用text = File.read("todos.txt")todos = []text.each_line do |line|  todos << line.chompendtodos.each_with_index do |todo, index|  puts "#{index}: #{todo}"endwhile (true)  print "请输入指令 1. add 2. remove 3. save，然后按 Enter: "  command = gets.chomp  if command == "add"    print "请输入代办事项: "    todos << gets.chomp    todos.each_with_index do |todo, index|        puts "#{index}: #{todo}"    end  elsif command == "remove"    print "请输入要删除的编号: "    todos.delete_at(gets.to_i)    todos.each_with_index do |todo, index|        puts "#{index}: #{todo}"    end  elsif command == "save"    puts "存盘离开"    File.open("todos.txt", "w+") do |f|      todos.each do |i|        f << i        f << "\n"      end    end        break;  else    puts "看不懂，请再输入一次"  endend`

------

**Decisional:**
在写这篇 logdown 的时候，同时回顾了一遍教材。之前练习的时候，一心想要把作业完成，有些知识点被自己忽略了，通过回顾教材，更好地理解了各章节的内容。同时，在这个过程中，改正了之前代码的一些错误，并完善某些代码。

如果找工作，最好念完 [Ruby 基本教程，人民邮电](http://www.ptpress.cn/book.aspx?id=39228)

如果想继续练习基础编程，或是面试的公司有考算法，请练习以下的题库网站(请练习 Easy 程度程度即可，更高难度需要学完数据结构课程)

- [Coderbyte](https://coderbyte.com/challenges)
- [LeetCode Online Judge](https://leetcode.com/problemset/algorithms/) 硅谷、BAT 大公司面试必备刷题题库网站
- [Codility](https://codility.com/programmers/lessons/1-iterations/) 模拟线上算法测试，很刺激

[← 7/6 百宝箱第三集（排序 ranked-model、新增registration model） ](http://wangjiao-blog.logdown.com/posts/2017949-7-6-iii-of-treasure-box-collection-sort-ranked-model-new-registration-model)[7/16 数据库 SQL 入门 →](http://wangjiao-blog.logdown.com/posts/2052903)

 

 

 

- **July 15, 2017 15:33
- **[Permalink](http://wangjiao-blog.logdown.com/posts/2049737)

**Copyright © 2013 wangjiao . Powered by [Logdown](http://logdown.com/).
Based on work at subtlepatterns.com.