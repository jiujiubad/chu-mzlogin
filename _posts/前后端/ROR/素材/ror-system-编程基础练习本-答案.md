---
title: ror-system-编程基础练习本-答案
date: '2017-12-13 14:10'
categories:
  - ror系统
tags:
  - ror系统
img: 'https://ws4.sinaimg.cn/large/006tNc79gy1fnfep1kp2qj30jk0dtwez.jpg'
abbrlink: 3ee41ba2
---

* 201712
* 编程+ruby



01

```
# 题目: 输入名字，输出 "Hello, 名字"

print "请输入你的名字，然后按 Enter: "
your_name = gets

# ...

puts "Hello, #{your_name}"

```

02

```
# 题目: 交换 a, b 变数的值

a = 100
b = 2

puts "a 是 #{a}"
puts "b 是 #{b}"

c = a
a = b
b = c

puts "a 应该是 2，现在是 #{a}"
puts "b 应该是 1，现在是 #{b}"

```

03

```
# 题目: 使用者输入直角三角形的宽和高，输出三角形的面积

print "请输入直角三角形的高，然后按 Enter: "
a = gets

print "请输入直角三角形的底边，然后按 Enter: "
b = gets

c = a.to_f * b.to_f / 2

puts "直角三角形的面积是: #{c}"

```

04

```
# 题目: 输入有多少片比萨饼和多少人，输出每人可以分到几片，以及剩下几片

print "请输入有多少片比萨饼，然后按 Enter: "
pizzas = gets

print "请输入有多少人要吃，然后按 Enter: "
people = gets

a = pizzas.to_i / people.to_i
b = pizzas.to_i % people.to_i

puts "每人可分得几片: #{a} 片"
puts "还剩下几片: #{b} 片"

```

05

```
# 题目: 输入体重和身高，输出身体质量指数(BMI)和建议
# BMI 公式为 bmi = ( 体重 / (身高x身高) )，单位是公斤和米
# 如果 BMI < 18.5，显示过轻
# 如果 BMI >= 24，显示过重
# 如果 BMI 介于 18.5 ~ 24，显示正常

print "请输入您的体重(公斤)，然后按 Enter: "
weight = gets

print "请输入您的身高(厘米)，然后按 Enter: "
height = gets

bmi = weight.to_f / (height.to_f * height.to_f)

if bmi < 18.5
  r = "过轻"
elsif bmi >= 24
  r = "过重"
else
  r = "正常"
end

puts "您的 BMI 是: #{bmi}"

puts "您的 BMI 结果是: #{r}"

```

06

```
# 题目: 输入一个数字 x，请判断是否正数、零或负数，以及是不是偶数


print "请输入一个整数，然后按 Enter: "
x = gets

if x.to_f > 0
  a = "正数"
elsif x.to_f < 0
  a = "负数"
else
  a = "零"
end

if x.to_f % 2 == 0
  b = "偶数"
else
  b = "奇数"
end


puts "这个数是#{a}"
puts "这个数是#{b}"

```

07

```
# 题目: 使用者输入 x,y,z，请根据以下的判断输出结果
# 当 x < 0 输出 "A"
# 当 x > 0，且
#   当 y > 0，且
#     当 z > 0 输出 "B"
#     当 z < 0 输出 "C"
#   当 y < 0
#     当 z > 0 输出 "D"
#     当 z < 0 输出 "E"

print "请输入一个整数x，然后按 Enter: "
x = gets

print "请输入一个整数y，然后按 Enter: "
y = gets

print "请输入一个整数z，然后按 Enter: "
z = gets

x = x.to_i
y = y.to_i
z = z.to_i

if x < 0
  a = "A"
elsif x > 0 && y > 0
  if z > 0
    a = "B"
  else
    a = "C"
  end
elsif x > 0 && y < 0
  if z > 0
    a = "D"
  else
    a = "E"
  end
end

puts "结果是#{a}"

```

08

```
# 题目: 使用者输入 x,y,z，请输出三个数中最大的数

print "请输入一个数字x，然后按 Enter: "
x = gets

print "请输入一个数字y，然后按 Enter: "
y = gets

print "请输入一个数字z，然后按 Enter: "
z = gets

x = x.to_f
y = y.to_f
z = z.to_f

if x >= y && x >= z
  max = x
elsif y >= x && y >= z
  max = y
elsif z >= x && z >= y
  max = z
end


puts "最大的数是 #{max}"

```

09

```
# 题目: 输入直角三角形的宽和高，输出三角形的面积

def calculate_area(a, b)
  a.to_f * b.to_f / 2
end

print "请输入直角三角形的高，然后按 Enter: "
a = gets

print "请输入直角三角形的底边，然后按 Enter: "
b = gets

answer = calculate_area(a,b)

puts "直角三角形的面积是: #{answer}"

```

10

```
# 题目: 使用者输入 x,y,z，请输出三个数中最大的数

def find_max(x, y, z)
  if x >= y && x >= z
    x
  elsif y >= x && y >= z
    y
  elsif z >= x && z >= y
    z
  end
end

print "请输入一个数字x，然后按 Enter: "
x = gets

print "请输入一个数字y，然后按 Enter: "
y = gets

print "请输入一个数字z，然后按 Enter: "
z = gets

# ....

answer = find_max(x,y,z)

puts "最大的数是 #{answer}"

```

11

```
# 题目: 列出 1 到 100 之间，所有 7 的倍数

i = 1
while ( i <= 100 )

  if i % 7 == 0
    puts i
  end

  i+=1
end

```

12

```
# 题目: 求 1~100 所有偶数的和

i = 1
total = 0

while ( i <= 100 )

  if i % 2 == 0
    total += i
  end

  i+=1
end

puts total

```

13

```
# 题目: 输入一个数字 N，输出 N * N 乘法表

print "请输入数字 N，然后按 Enter: "
n = gets.to_f

【解法一】纵向：
i = 1
j = 1
while (i <= n)
  while (j <= n)
    puts "#{i} * #{j} = #{i * j}"
    j += 1
  end
  i += 1
  j = i
end

# 【解法二】横向：
# i = 1
# while (i <= n)
#   j = 1
#   while (j <= i)
#     puts "#{i} * #{j} = #{(i * j)}"
#     j += 1
#   end
#   i += 1
# end

```

14、真假值要用"return true"、"return false"

```
# 输入一个数字 N，请检查是不是质数

def is_prime(n)
  i = 2
  while (i <= (n-1))
    if n % i == 0
      return false
      break
    end
    i += 1
  end
  return true
end

print "请输入数字 N，然后按 Enter: "
n = gets

if is_prime(n.to_i)
  puts "这是质数"
else
  puts "这不是质数"
end

```

15、rand(100)用法、while(true)用法

```
# 题目 猜数字游戏：程序会先产生随机数，然后用户开始猜数字。程序会针对猜的数字回答太高、太低或猜中，猜中后程序就会终止。

target = rand(100)

while (true)
  print "请猜一个 0~99 的数字 N，然后按 Enter: "
  n = gets.to_i

  if n == target
    puts "恭喜猜中啦! "
    break
  elsif n > target
    puts "太高了，再猜一次"
  elsif n < target
    puts "太低了，再猜一次"
  end

end

```

16

```
# 给定一阵列内含数字，输出最大值

【解法一】：
def find_max(array)
  array.max
end

# 【解法二】：
# def find_max(array)
#   a = array[0]
#   array.each do |i|
#     if i > a
#       a = i
#     end
#   end
#   return a
# end

arr = [8, 12, 36, 53, 9, 75, 3, 71, 59, 88]

max = find_max(arr)
puts "Max is #{max}" # 应该是 88
```

17

```
# 使用者不断输入数字存进 Array，最后输出总和、平均、最大值、最小值

arr = []

while (true)
  print "请输入数字，结束请直接按 Enter: "
  user_input = gets
  if user_input == "\n"
    break
  else
    arr << user_input.to_i
  end
end

puts arr.to_s

def sum(arr)
  s = 0
  arr.each do |i|
    s += i
  end
  return s.to_f
end

def avg(arr)
  return sum(arr) /arr.size
end

puts "总和是 #{sum(arr)}"
puts "平均是 #{avg(arr)}"
puts "最大值是 #{arr.max}"
puts "最小值是 #{arr.min}"

```

18

```
# 建构一个阵列有N个的元素，内容是 0, 1, 4, 9, 16, 25...... 每个元素是该索引的平方

arr = []

print "请输入数字 N，然后按 Enter: "
n = gets.to_i

j = 0
while (j < n)
  arr << (j * j)
  j += 1
end
puts arr.to_s
```

19

```
# 给定一阵列内含数字，输出另一个数组只包含偶数

def filter_even(arr)
  x = []
  arr.each do |f|
    if f % 2 == 0
      x << f
    end
  end
  return x
end

arr =  [7, 68, 42, 46, 9, 91, 77, 46, 86, 1]

puts filter_even(arr).to_s # 应该是 [68, 42, 46, 46, 86]

```

20

```
# 承上题，请排序并去除重复的数字
# Hint: 可用 arr.sort 排序，和 arr.uniq 去除重复

def filter_even(arr)
  x = []
  arr.each do |f|
    if f % 2 == 0
      x << f
    end
  end
  return x.uniq.sort
end

arr =  [7, 68, 42, 46, 9, 91, 77, 46, 86, 1]


puts filter_even(arr).to_s
puts "________" # 应该是 [42, 46, 68, 86]
```

21

```
# 给定一数组内含数字，请实作选择排序法进行排序。
# https://zh.wikipedia.org/wiki/选择排序

#【解法一】：找到最小值，交换最小值索引
# 1、当i=0时，
# 2、用j做循环，判断if arr[j] < arr[i]即前后两个数哪个小（当j做完循环j=1、j=2、j=3..，相当于从头到尾比较了数组里每个数字的大小，即找到最小值。并记录最小值min的下标min_index）
# 3、arr[i], arr[min_index] = arr[min_index], arr[i] 用于把第i个索引对应的数组值，和整个数组的最小值进行交换。

#【解法二】：找到最小值，交换最小值

def insertion_sort(arr)
  for i in 0..(arr.size-2)
  	# min = arr[i] 这一行可以省略，因为当i=0，分别执行j=1、j=2..
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

22

```
# 给定一阵列内含数字，请输出 0~9 中不见的数字

def find_missing(arr)
  arr1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  arr = arr1 - arr
end

answer = find_missing( [2,2,1,5,8,4] )

puts answer.to_s # 应该是 [0,3,6,7,9]

```

23

```
# 给定一 Hash，输出有最大 value 的 key

def find_max(hash)
  arr = hash.values 
  hash.each do |key, value|
    if value == arr.max
      return key
    end
  end
end

h = {
  "a" => 71,
  "b" => 38,
  "c" => 21,
  "d" => 80,
  "e" => 10
}

answer = find_max(h)

puts "有最大 value 的是 #{answer}" # 应该是 d

```

24

```
# 给定一 Hash，输出 value 是偶数的 keys

def find_even_keys(hash)
  arr = []
  hash.each do |key, value|
    if value % 2 == 0
      arr << key
    end
  end
  return arr
end

h = {
  "a" => 71,
  "b" => 38,
  "c" => 21,
  "d" => 80,
  "e" => 10
}

answer = find_even_keys(h)

puts "有偶数 value 的 keys 有 #{answer}" # 应该是数组 [b,d,e]

```

25

```
# 计算一个阵列中各个元素的出现频率

#【解法一】：

def count(arr)
  h = {}

  arr.each do |i|
    if h[i] == nil
      h[i] = 1
    else
      h[i] += 1
    end
  end

  return h # 回传一个 hash
end

arr =  ["a", "d", "d", "c", "b", "c", "c", "c", "d", "d", "e", "e", "e", "d", "a", "c", "e", "a", "d", "e"]

answer = count(arr)

puts answer # 答案应该是 {"a"=>3, "d"=>6, "c"=>5, "b"=>1, "e"=>5}

# 【解法二】：
# def count(arr)
#   h = Hash.new(0)
# 
#   arr.each do |i|
#     h[i] += 1
#   end
# 
#   return h # 回传一个 hash
# end
```

26

```
# 给定一个数组包含 Hash，请过滤和排序

arr = [
  { "name" => "Peter", "age" => 30 },
  { "name" => "John", "age" => 15 },
  { "name" => "David", "age" => 45 },
  { "name" => "Steven", "age" => 22 },
  { "name" => "Vincent", "age" => 6 },
]

def choose_arr(arr)
  brr = []
  arr.each do |a|
    if a["age"] > 18
      brr << a
    end
  end
  return brr.sort_by{|i| i["age"]}
end

puts "所有成年人，并由小到大: #{choose_arr(arr)}"

# 答案应该是
#[
#  { "name" => "Steven", "age" => 22 },
#  { "name" => "Peter", "age" => 30 },
#  { "name" => "David", "age" => 45 }
#]

```

27

```
class Person
  attr_accessor :first_name, :last_name
  def greet
    puts "Hello, #{first_name} #{last_name}"
  end
end

p1 = Person.new
p1.first_name = "Peter"
p1.last_name = "Wang"
p1.greet # 输出 "Hello, Peter Wang"

p2 = Person.new
p2.first_name = "William"
p2.last_name = "Zhang"
p2.greet # 输出 "Hello, William Zhang"

```

28

```
# 请打开 wordcount.txt，计算每个单字出现的次数

doc = File.read("wordcount.txt")

h = Hash.new(0)
doc.each_line do |line|
  line = line.gsub(/[,'".]/, "")
  line = line.strip
  words = line.split("")

  words.each do |word|
    h[word]+=1
  end
end

h.each do |key, value|
  puts "#{key} : #{value}"
end
```

29

```
# 简易 Todo 代办事项应用

text = File.read("todos.txt")

todos = []
text.each_line do |line|
  todos << line.chomp
end

todos.each_with_index do |todo, index|
  puts "#{index}: #{todo}"
end

while (true)
  print "请输入指令 1. add 2. remove 3. save，然后按 Enter: "
  command = gets.chomp

  if command == "add"
    print "请输入代办事项: "
    todos << gets.chomp
    todos.each_with_index do |todo, index|
      puts "#{index}: #{todo}"
    end
  elsif command == "remove"
    print "请输入要删除的编号: "
    todos.delete_at(gets.to_i)
    todos.each_with_index do |todo, index|
      puts "#{index}: #{todo}"
    end
  elsif command == "save"
    puts "存盘离开"

    File.open("todos.txt", "w+") do |f|
      todos.each do |i|
        f << i
        f << "\n"
      end
    end

    break;
  else
    puts "看不懂，请再输入一次"
  end
end

```

todos.txt

```
Buy book
Go Shopping
Walk
Gogo

```

wordcount.txt

```
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis nulla a magna tincidunt cursus. In condimentum lobortis nulla ut congue. Mauris aliquet, tortor vestibulum aliquet cursus, lorem dolor rhoncus mauris, id imperdiet nunc arcu at nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque lobortis dignissim ligula ut condimentum. Vestibulum a massa sit amet ex fringilla semper in nec ligula. Vivamus eget mauris ex.

Sed accumsan justo orci, sit amet rutrum sapien dignissim ac. Mauris ullamcorper leo id vulputate lobortis. Mauris mollis at metus non gravida. Vivamus tempor auctor lacus, ac tincidunt nisi mattis at. Nullam a magna at nunc convallis ornare. Phasellus ultricies mi justo, ac faucibus dui tempus bibendum. Fusce eget ornare neque. Phasellus rutrum viverra magna in mollis. Proin nec sagittis risus. Praesent non viverra magna. Etiam aliquet nunc vitae velit sodales sollicitudin.

Morbi pellentesque semper ultrices. Praesent ultricies enim sed lorem hendrerit, in tempor nibh lobortis. Maecenas metus est, commodo et felis at, dignissim dapibus justo. Nunc et malesuada massa. Nunc eu sem eget sapien maximus viverra. Duis feugiat lacus et justo finibus, in pretium enim hendrerit. Proin at iaculis est, eget bibendum velit. Proin ac eros mi. Mauris hendrerit ultrices neque eu ultrices. Praesent gravida, massa at eleifend vulputate, arcu risus luctus tellus, ac aliquam ligula eros et nulla. Aliquam finibus lectus eget posuere maximus.

Proin tincidunt nisl eget neque faucibus, porta blandit massa consectetur. Nam nec augue eget ex suscipit ultrices. Vivamus pretium nibh vitae ante vulputate blandit. Phasellus ante justo, vestibulum eget mi ut, faucibus imperdiet felis. Duis accumsan posuere eros at volutpat. Aenean lacinia semper ipsum et elementum. Pellentesque ornare risus ipsum. Proin fermentum ac leo ac condimentum.

Vestibulum at eleifend sem. Pellentesque maximus condimentum elit quis lacinia. Duis ac scelerisque mauris. Sed id viverra quam. Quisque in ex lacus. Nunc efficitur metus enim, in pharetra leo suscipit id. Vestibulum rutrum elementum nibh eget efficitur. Nulla quis mi maximus, commodo nisi nec, fringilla felis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur rhoncus non sapien quis laoreet. Aenean mattis nulla vitae enim scelerisque, at bibendum leo auctor.
```



