# 第二十一章 Proc 类



## 21.1 Proc 类是什么

`Proc`，就是使块对象化的类。

`Proc.new(...)` 创建

```
hello1 = Proc.new do |name|
  puts "Hello, #{name}."
end
　
hello2 = proc do |name|
  puts "Hello, #{name}."
end
　
hello1.call("World")    #=> Hello, World.
hello2.call("Ruby")     #=> Hello, Ruby.
```

`pro.call(..)` 执行块

`pro[..]` 执行块

### lambda

`Proc.new`、`proc` 等有另外一种写法叫 `lambda`。

第一个不同点是，`lambda` 的参数数量的检查更加严密。如果参数数量不正确，程序就会产生错误。

```
prc1 = Proc.new do |a, b, c|
  p [a, b, c]
end
prc1.call(1, 2)    #=> [1, 2, nil]

prc2 = lambda do |a, b, c|
  p [a, b, c]
end
prc2.call(1, 2)    #=> 错误（ArgumentError）
```

第二个不同点是，`lambda` 可以使用 `return` 将值从块中返回

```
def power_of(n)
  lambda do |x|
    return x ** n
  end
end

cube = power_of(3)
p cube.call(5)  #=> 125
```

使用 `Proc.new` 方法时，由于程序运行时 `power_of` 方法的上下文会消失，因此程序就会出现错误。

```
def power_of(n)
  Proc.new do |x|
    return x ** n
  end
end

cube = power_of(3)
p cube.call(5)  #=> 错误（LocalJumpError）
```

> 用 `Proc.new` 方法或者 `proc` 方法创建的 `Proc` 对象的情况下，由于这些方法都接收块，在调用 `Proc#call` 方法的时候并没有适当的返回对象，因此就会发生错误。而 `lambda` 的情况下则与 `return` 一样，将值返回给 `Proc#call` 方法。另一方面，由于 `next` 方法的作用在于中断 1 次块的执行，因此无论如何创建 `Proc` 对象，都可以将值返回给 `call` 方法。

`lambda` 有另外一种写法——“`->( 块变量 ){ 处理 }`”。块变量在 `{ ～ }` 之前，看上去有点像函数。使用 `->` 的时候，我们一般会使用 `{ ～ }`而不是 `do ～ end`。

对符号 `:to_i` 使用 `Symbol#to_proc` 方法

```
%w(42 39 56).map{|i| i.to_i }  #=> [42, 39, 56]
%w(42 39 56).map(&:to_i)			 #=> [42, 39, 56]
```



## 21.2 Proc 的特征

```
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
```

通过这个例子我们可以看出，变量 `c1` 与变量 `c2` 引用的 `Proc` 对象，是分别保存、处理调用 `counter` 方法时初始化的本地变量的。与此同时，`Proc` 对象也会将处理内容、本地变量的作用域等定义块时的状态一起保存。

像 `Proc` 对象这样，将处理内容、变量等环境同时进行保存的对象，在编程语言中称为闭包（closure）。

使用闭包后，程序就可以将处理内容和数据作为对象来操作。这和在类中描述处理本身、在实例中保存数据本质上是一样的，只是从写程序的角度来看，使用类的话当然也就意味着可以使用更多的功能。



闭包--- 简明解释 (使用 Ruby)：https://ruby-china.org/topics/23633

> 函数式编程语言内部是无状态的, 但是我们可以通过使用闭包来持久化一些状态,



## 21.3 Proc 类的实例方法

`prc.lambda?` 判断 *prc* 是否为通过 `lambda` 定义的方法

```
prc1 = Proc.new{|a, b| a + b}
p prc1.lambda?  #=> false
　
prc2 = lambda{|a, b| a + b}
p prc2.lambda?  #=> true
```

