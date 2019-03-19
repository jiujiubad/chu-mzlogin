# 2.1.1
class D
  def x; 1; end
end
class D
  def y; 3; end
end
d1 = D.new
d1.x  #=> 1
d1.y  #=> 3

# 2.1.2 引用失败了
require "monetize"
p1 = 100.to_money("USD")
p1.format

# 猴子补丁前，确认是否已有该方法名
[].methods.grep /^re/

# 返回 Module 所有顶层的常量
Module.constants
Module.constants.grep /\AClass/


# 2.4 模块与方法的查找顺序：include 和 prepend
module M1; end
module M2; end
class C
  include M1 #插入到祖先链中的上方
  prepend M2 #插入到祖先链中的下方
end
class D < C; end
D.ancestors  #=> [D, M2, C, M1, Object, Kernel, BasicObject]

# 查看 Kenel 下的方法
Kernel.private_instance_methods.grep(/^pr/)

# 任何时候，有且只有一个当前对象 self
class MyClass
  def foo
    @var = 10
    bar()
    self
  end
  def bar
    @var += 1
  end
end
MyClass.new.foo  #=> #<MyClass:0x00007fa3c49c4860 @var=11>

# 当前 self 是谁
class M; self; end  #=> M

# 细化 refine 失败，据说新版本 ruby 的 using 要用 module 来包裹：https://ruby-china.org/topics/33950
module A
  refine String do
    def to_aoe
      puts "aoe"
    end
  end
end
using StringExtensions  #=> RuntimeError (main.using is permitted only at toplevel)

# 2.5 小测验
module A
  def aoe
    puts "aoe"
  end
end
module B
  def boe
    puts "boe"
  end
end
class Foo
  include A
  include B
end


# 3.2.1 动态派发 send（替代用 . 调用方法）
class Foo
  def aoe(val)
    puts "aoe is: #{val}"
  end
end
f1 = Foo.new
f1.aoe(10)              #=> aoe is: 10
Foo.new.send(:aoe, 10)  #=> aoe is: 10

# 3.2.2 动态定义 define_method（替代用 def 定义方法）
class Foo
  define_method :aoe do |a|
    puts "aoe is: #{a}"
  end
end
f1 = Foo.new
f1.aoe(10)  #=> aoe is: 10

# 3.2.3 教程 demo：动态派发 + 动态定义
class DZ
  def self.define_component(name)
    define_method "get_#{name}_info" do
      p "get_#{name}_info"
    end
    define_method "get_#{name}_price" do
      p [50, 90, 110, 200].sample
    end
  end
  define_component :mouse
  define_component :cpu
  define_component :keyboard
end

class Computer
  def initialize(data_source)
    @data_source = data_source
    data_source.methods.grep(/^get_(.*)_info$/) {Computer.define_component $1} #最后一步，内省初始化调用
  end

  def self.define_component(name)
    define_method (name) do
      info = @data_source.send "get_#{name}_info"
      price = @data_source.send "get_#{name}_price"
      result = "#{name.capitalize}: #{info} ($ #{price})"
      return "* #{result}" if price >= 100
      result
    end
  end
end

c1 = Computer.new(DZ.new)
c1.mouse
c1.cpu
c1.keyboard

# 3.3.1 教程 demo 幽灵方法
class DZ
  def self.define_component(name)
    define_method "get_#{name}_info" do
      p "get_#{name}_info"
    end
    define_method "get_#{name}_price" do
      p [50, 90, 110, 200].sample
    end
  end
  define_component :mouse
  define_component :cpu
  define_component :keyboard
end

class Computer
  def initialize(data_source)
    @data_source = data_source
  end

  def method_missing(name)
    super if !@data_source.respond_to?("get_#{name}_info")
    info = @data_source.send "get_#{name}_info"
    price = @data_source.send "get_#{name}_price"
    result = "#{name.capitalize}: #{info} ($ #{price})"
    return "* #{result}" if price >= 100
    result
  end

  def respond_to_missing?(method, include_private = false)
    @data_source.respond_to?("get_#{method}_info") || super
  end
end

c1 = Computer.new(DZ.new)
c1.mouse
c1.cpu
c1.keyboard
c1.respond_to?(:cpu)  #=> false

# 3.4.1 幽灵方法 bug 小测验
class A
  def method_missing(name, *args)
    person = name.to_s.capitalize
    # super unless ["Aoe", "Boe", "Coe"].include? person #改良死循环（num 作用域问题）
    # num = 0 #改良死循环
    3.times do
      num = rand(10) + 1
      puts "#{num}.."
    end
    "#{person} got a #{num}"
  end
end
a1 = A.new
a1.aoe
a1.boe
a1.coe

# 4.1.1
def aoe
  return yield if block_given?
  "aoe"
end

# 4.3.1
def aoe
  yield
end
a1 = 1
aoe do 
  a1 += 1
  b1 = 1
end

a1  #=> 1
a2  #=> NameError

# 4.3.2 演示切换作用域
v1 = 1
class Foo
  v2 = 2
  local_variables # 保存了当前环境下所有定义的局部变量的数组
  def aoe
    v3 = 3
    local_variables
  end
  local_variables
end

f1 = Foo.new
f1.aoe  #=> [:v3]
f1.aoe  #=> [:v3]
local_variables  #=> [:f1, :v1, :_]

# 4.3.3 让变量穿越两个作用域
my_var = "Success"
Foo = Class.new do 
  puts "#{my_var} in the class"
  
  define_method :aoe do
    "#{my_var} in the method"
  end
end
Foo.new.aoe  #=> "Success in the method"

# 4.3.4 共享作用域
def define_methods
  shared = 0
  Kernel.send :define_method, :counter do
    shared
  end
  Kernel.send :define_method, :inc do |x|
    shared += x
  end
end

# 4.4.1 instance_eval
class A
  def initialize
    @x = 5
  end
  private
  def foo
    @x = "private"
  end
  protected
  def bar
    @x = "protected"
  end
end

a1 = A.new  #=> #<A:0x00007ffa55856428 @x=5>
a1.instance_eval{@x=10}
a1  #=> #<A:0x00007ffa55856428 @x=10>
a1.instance_eval{foo}
a1  #=> #<A:0x00007ffa55856428 @x="private">
a1.instance_eval{bar}
a1  #=> #<A:0x00007ffa55856428 @x="protected">

# 4.4.2 instance_exec
class B
  def initialize
    @x = 5
  end
  def boe
    @y = 20
    B.new.instance_exec(@y){|y| @x=10, @y=y, @z=30}
  end
end

b1 = B.new  #=> #<B:0x00007f81f80ea8b8 @x=5>
b1.boe  #=> [10, 20, 30]
b1      #=> #<B:0x00007f81f80ea8b8 @x=5, @y=20>

# 4.5.1 Proc 转为块
def aoe(name)
  "#{name}, #{yield} !"
end
my_proc = proc {"Bill"}
aoe("hello", &my_proc)


# 5.1.1 当前类
class A
  def aoe
    def boe; end
  end
end

# 5.4.1 单件类
obj = Object.new
s1 = class << obj
  self
end
#=>  #<Class:#<Object:0x00007f9e8c89fdc8>>

class A
  
end
a = A.new
b = class << a
  self
end

# 5.4.2 
str = "abc"
def str.aoe
  puts "aoe-abc"
end
str.aoe  #=>aoe-abc
str.class

# 6.7.1
class String
  def self.inherited(name)
    puts "#{self} was inherited by #{name}"
  end
end
class B < String; end

# 10.1.1 类扩展
module A
  def aoe
    puts "aoe"
  end
end

class Foo
  include A
  module B
    def boe
      puts "boe"
    end
  end
end


class A
  puts "self: #{self} !"
  def foo
    puts "self: #{self} !"
  end

  def self.bar
    puts "self: #{self} !"
  end
end

module A
    Y = 10
  class C
    X = 3
  end
end

class B
  include A
  Cont1 = 1
  puts A.constants
end
