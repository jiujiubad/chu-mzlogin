# 第八章

## 8.2.6 类方法的几种写法
class << Foo #第一种：<<
  def aoe
    self
  end
end

class Bar
  class << self #第二种：X << self
    def aoe
      self
    end
  end
end

def Foo.boe #第三种：X.method
  self
end

class Hua
  def self.aoe #第四种：self.method
    self
  end
end


## 8.2.9 public/private/protected 是否在类方法和实例方法中调用
class Foo
  def self.aoe
    print "aoe, "
    student rescue print "Private Error, "
    self.student rescue print "Private Error, "
    teacher rescue print "Protected Error, "
    self.teacher rescue print "Protected Error"
  end
  
  def boe
    print "boe, "
    student rescue print "Private Error, "
    self.student rescue print "Private Error, "
    teacher rescue print "Protected Error, "
    self.teacher rescue print "Protected Error"
  end

  private
    def student
      print "student, "
    end
  protected
    def teacher
      print "teacher, "
    end
end

# private 和 protected 都不能在类方法中调用
Foo.aoe #=> aoe, Private Error, Private Error, Protected Error, Protected Error

# private 和 protected 都是在实例方法中调用，但是 private 不能加 self
f1 = Foo.new
f1.boe #=> boe, student, Private Error, teacher, teacher,

# private 和 protected 都不能被实例（比如 f1）调用
f1.student #=> NoMethodError
f1.teacher #=> NoMethodError

## 是否被继承
class Bar < Foo
  def self.foe
    print "foe, "
    student rescue print "Private Error, "
    self.student rescue print "Private Error, "
    teacher rescue print "Protected Error, "
    self.teacher rescue print "Protected Error"
  end

  def goe
    print "goe, "
    student rescue print "Private Error, "
    self.student rescue print "Private Error, "
    teacher rescue print "Protected Error, "
    self.teacher rescue print "Protected Error"
  end
end

# private 和 protected 都不能在类方法中被继承
Bar.foe #=> foe, Private Error, Private Error, Protected Error, Protected Error

# private 和 protected 都能在实例方法中被继承，但是 private 不能加 self
b1 = Bar.new
b1.goe #=> goe, student, Private Error, teacher, teacher,

# private 和 protected 都不能被实例（比如 b1）调用
b1.student #=> NoMethodError
b1.teacher #=> NoMethodError



class Point
  attr_accessor :x, :y   # 定义存取器
  protected :x=, :y=     # 把x= 与y= 设定为protected

  def initialize(x=0.0, y=0.0)
    @x, @y = x, y
  end

  def swap(other)        # 交换x、y 值的方法
    tmp_x, tmp_y = @x, @y
    @x, @y = other.x, other.y
    other.x, other.y = tmp_x, tmp_y   # 在同一个类中
                                      # 可以被调用
    return self
  end
end

def x
  @x
end

def x=(foo)
  @x = foo
end


# 8.4
class C1                    # 定义C1
  def hello                 # 定义hello
    "Hello"
  end
end

class C2 < C1               # 定义继承了C1 的子类C2
  alias old_hello hello     # 设定别名old_hello
  def hello                 # 重定义hello
    "#{old_hello}, new"
  end
end

q1 = C2.new
q1.old_hello #=> "Hello"
q1.hello #=> "Hello, new"


## 8.5 单例类
str1 = "Ruby"
str2 = "Ruby"
　
class << str1
 def hello
   "Hello, #{self}!"
 end
end


class Foo
  def aoe
    print "aoe"
  end
end

class Bar < Foo
end

class Gou << Foo
end

class << Foo
  def boe
    print "boe"
  end
end

f1 = "foo"
class << c1
  def boe
    print "boe"
  end
end


module HelloModule          # module 关键字
  Version = "1.0"           # 定义常量

  def hello(name)           # 定义方法
    puts "Hello, #{name}."
  end

  module_function :hello    # 指定hello 方法为模块函数
end

p HelloModule::Version      #=> "1.0"
HelloModule.hello("Alice")  #=> Hello, Alice.

include HelloModule         # 包含模块
p Version                   #=> "1.0"
hello("Alice")              #=> Hello, Alice.


module M1
end

module M2
end

module M3
  include M2
end

class C
  include M1
  include M3
  include M1  #同个模块第二次调用会被忽略
end

C.ancestors #=> [C, M3, M2, M1, Object, Kernel, BasicObject]


module Edition
  def edition(n)
    "#{self} 第#{n} 版"
  end
end

str = "Ruby 基础教程"
str.extend(Edition)     #=> 将模块Mix-in 进对象
str.include(Edition)

p str.edition(4)        #=> "Ruby 基础教程第4 版"



module A
  def aoe
    print "aoe"
  end
end

class Foo
  include A  #Mix-in为实例方法
end

Foo.aoe #=> NoMethodError
Foo.new.aoe #=> aoe

class Bar
  extend A  #Mix-in为类方法
end

Bar.aoe #=> aoe
Bar.new.aoe #=> NoMethodError


class Foo
  def self.aoe
    puts "aoe"
  end

  def boe
    puts "boe"
  end
end

class Bar < Foo
  
end



def fetch_and_downcase(ary, index)
  if str = ary[index]
    return str.downcase
  end
end

ary = ["Boo", "Foo", "Woo"]
hash = {0 => "Boo", 1 => "Foo", 2 => "Woo"}

p fetch_and_downcase(ary, 1)  #=> "foo"
p fetch_and_downcase(hash, 1)  #=> "foo"



require "net/http"
require "uri"
url = URI.parse("http://www.ruby-lang.org/ja/")
http = Net::HTTP.start(url.host, url.port)
doc = http.get(url.path)
puts doc


# 第九章


# 第十章 错误处理与异常

# 10.3
class A
  def self.foo
    begin
      puts "Begin Foo"
      nil.count
      puts "Error when Foo"
    rescue => e
      puts "e: #{e}"
      puts "e.class: #{e.class}"
      puts "e.message: #{e.message}"
      puts "e.backtrace: #{e.backtrace}"
    end
  end
end

# 10.4
class B
  def self.foo
    begin
      nil.count
    rescue => e
      puts "class: #{e.class}, message: #{e}"
    ensure
      puts "I'm relly good !"
    end
  end
end

# 10.5
class C
  def self.foo
    i = 0
    begin
      nil.count
    rescue => e
      i += 1
      puts i
      retry if i<5
      puts "class: #{e.class}, message: #{e}"
    end
  end
end

# 10.7
class B
  def self.foo
    nil.count
  rescue => e
    puts "class: #{e.class}, message: #{e}"
  ensure
    puts "I'm relly good !"
  end
end

# 10.8
class D
  def self.foo(val)
    case val
    when 1
      File.open(bar)
    when 2
      File.open()
    else
      nil.bar
    end
  rescue NameError => e
    puts "#{e.class}: #{e}"
  rescue ArgumentError => e
    puts "#{e.class}: #{e}"
  rescue NoMethodError => e
    puts "#{e.class}: #{e}"
  end
end

# 10.10
class E
  def self.foo(val)
    case val
    when 1
      raise message
      puts "==** **=="
      File.open(bar)
    when 2
      raise Runtime22Error
      puts "==** **=="
      File.open()
    else
      raise Runtime22Error, message
      puts "==** **=="
      nil.bar
    end
  rescue NameError => e
    puts "#{e.class}: #{e}"
    puts "--** **--"
    raise
  rescue ArgumentError => e
    puts "#{e.class}: #{e}"
    puts "--** **--"
    raise
  rescue NoMethodError => e
    puts "#{e.class}: #{e}"
    puts "--** **--"
    raise
  end
end

# 第十一章 块

# 11.2.1
array = ["ruby", "Perl", "PHP", "Python"]
sorted = array.sort do |a, b|
  a <=> b
  # puts "a: #{a}, b: #{b}"
end
p sorted    #=> ["PHP", "Perl", "Python", "ruby"]

# 11.2.2
ary = %w(Ruby is a language)
call_num = 0    # 块的调用次数
sorted = ary.sort do |a, b|
  puts "#{a} <=> #{b}"
  call_num += 1 # 累加块的调用次数
  a.length <=> b.length
end
puts "调用块的次数: #{call_num}"

# 11.2.3
ary = %w(Ruby is a open source programming language)
sorted = ary.sort_by{ |item| item.length }

# 11.3.1
def total(from, to)
  result = 0                # 合计值
  from.upto(to) do |num|    # 处理从from 到to 的值
    if block_given?         #   如果有块的话
      result += yield(num)  #     累加经过块处理的值
    else                    #   如果没有块的话
      result += num         #     直接累加
    end
  end
    return result             # 返回方法的结果
end

p total(1, 10)                  # 从1 到10 的和 => 55
p total(1, 10){|num| num ** 2 } # 从1 到10 的2 次幂的和 => 385

# 11.3.2
def aoe(num)
  num += yield(num) if block_given?
  puts num
end
aoe(100){|x| x**2}  #=> 10100

# 11.3.3
def foo
  yield()             # 0 个块变量
  yield(4)            # 1 个块变量
  yield(5, 8, 3)      # 3 个块变量
end

foo do |a|
  p [a]
end

foo do |a, b, c|
  p [a, b, c]
end

foo do |a, b, c, d, e|
  p [a, b, c, d, e]
end

foo do |*a|
  p [a]
end

# 11.3.4
(1..6).each do |num|
  if num == 3
    break "end"
  end
  print "#{num}, "
end

# 11.3.5
(1..6).each do |num|
  if num == 3
    next 100
  end
  print "#{num}, "
end

# 11.3.6
(1..6).each do |num|
  if num == 3
    print "aoe: #{num}, "
    redo
  end
  print "#{num}, "
end

# 11.3.7
hello = Proc.new{|name| puts "Hello, #{name}."}

hello.call("World")  #=> Hello, World.

# 11.3.8
def total(from, to, &block)
  result = 0                # 合计值
  from.upto(to) do |num|    # 处理从from 到to 的值
    if block                #   如果有块的话
      result += block.call(num)
    else                    #   如果没有块的话
      result += num         #     直接累加
    end
  end
    return result             # 返回方法的结果
end

p total(1, 10)                  # 从1 到10 的和 => 55
p total(1, 10){|num| num ** 2 } # 从1 到10 的2 次幂的和 => 385

# 11.3.9
def aoe(num)
  puts num
  puts "block: #{yield(num)}" if block_given?
end
aoe(10){|foo| foo*10 }

# 11.3.10
def aoe(num, &blk)
  puts num
  puts "block: #{blk.call(num)}" if block_given?
end
aoe(10){|foo| foo*10 }

# 11.3.11
def call_each(ary, &block)
  puts "ary: #{ary} !"
  ary.each(&block)
end

call_each ([1, 3, 5]) {|foo| p foo}

# 11.4.1
foo = 0
[1, 3, 4].each do |num|
  foo = num
end
puts foo  #=> 4


foo = 0
[1, 3, 4].each do |foo|
  foo = 5
end
puts foo  #=> 0

foo=bar=0
[1, 3, 4].each do |foo; bar|
  foo = 5
  bar = 50
end
print foo, bar  #=> 00


foo=bar=0
[1, 3, 4].each do |foo, bar|
  foo = 5
  bar = 50
end
print foo, bar  #=> 00

# 第十二章 数值类

# 12.8
ary = []
4.times{|i| ary<<i}
ary  #=> [0, 1, 2, 3]

ary = []
2.upto(5){|i| ary<<i}
ary  #=> [2, 3, 4, 5]

ary = []
9.downto(2){|i| ary<<i}
ary  #=> [9, 8, 7, 6, 5, 4, 3, 2]

ary = []
2.step(12, 3){|i| ary<<i}
ary  #=> [2, 5, 8, 11]

# 第十三章 数组

# 13.10
ary1 = [1, 2, 3, 4, 5]
ary2 = [10, 20, 30, 40, 50]
result = []
ary1.zip(ary2) do |a, b, c|
  result << a + b + c
end

tmp = str.each_line.collect do |line|
  line.chomp * 3
end

# 15.3.1
h={a:1,b:2,c:4}
h.to_a    #=> [[:a, 1], [:b, 2], [:c, 4]]
h.keys    #=> [:a, :b, :c]
h.values  #=> [1, 2, 4]

# 15.8
# 计算单词数量
count = Hash.new(0)
## 统计单词
File.open("ruby_basic.rb") do |f|
  f.each_line do |line|
    words = line.split
    words.each do |word|
      count[word] += 1
    end
  end
end
## 输出结果 注意：{a:1,b:2}.sort = [[:a, 1], [:b, 2]]
count.sort{|a, b|
  a[1] <=> b[1]
}.each do |key, value|
  print "#{key}: #{value}\n"
end

open("http://www.ruby-lang.org") do |io|
  puts io.read  # 将Ruby 的官方网页输出到控制台
end

# 18.2.1
Dir.open("/Users/aaron/PJ") do |dir|
  dir.each do |name|
    p name
  end
end

# 18.2.2
def traverse(path)
  if File.directory?(path)  # 如果是目录
    dir = Dir.open(path)
    while name = dir.read
      next if name == "."   # ※
      next if name == ".."  # ※
      traverse(path + "/" + name)
    end
    dir.close
  else
    process_file(path)      # 处理文件
  end
end
def process_file(path)
  puts path                 # 输出结果
end

# 21.2.1
def counter
  c = 0         # 初始化计数器
  Proc.new do   # 每调用 1 次 call 方法，计数器加1
    c += 1      # 返回加 1 后的 Proc 对象
  end
end

# 创建计数器 c1 并计数
c1 = counter
 p c1.call       #=> 1
 p c1.call       #=> 2
 p c1.call       #=> 3

 # 创建计数器 c2 并计数
 c2 = counter    # 创建计数器c2
 p c2.call       #=> 1
 p c2.call       #=> 2

 # 再次用 c1 计数
 p c1.call       #=> 4


# 22.1.1
htmlfile = "cathedral.html"
textfile = "cathedral.txt"

html = File.read(htmlfile)

File.open(textfile, "w") do |f|
  in_header = true
  html.each_line do |line|
    if in_header && /<a name="1">/ !~ line
       next
     else
       in_header = false
     end
     break if /<a name="version">/ =~ line
     f.write line
   end
 end

 # 22.1.2
require 'cgi/util'
htmlfile = "cathedral.html"
textfile = "cathedral.txt"

html = File.read(htmlfile)

File.open(textfile, "w") do |f|
  in_header = true
  html.each_line do |line|
    if in_header && /<a name="1">/ !~ line
      next
    else
      in_header = false
    end
    break if /<a name="version">/ =~ line
    line.gsub!(/<[^>]+>/, '')
    esc_line = CGI.unescapeHTML(line)
    f.write esc_line
  end
end

# 22.3.1
pattern = Regexp.new(ARGV[0])
filename = ARGV[1]

count = 0
File.open(filename) do |file|
  file.each_line do |line|
    if pattern =~ line
      line.scan(pattern) do |s|
        count += 1
       end
       print line.gsub(pattern){|str| "<<#{str}>>"}
     end
   end
 end
 puts "count: #{count}"