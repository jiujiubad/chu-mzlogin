---
title: ror-system-编程语言第一集
date: '2017-12-14 00:10'
categories:
  - ror系统
tags:
  - ror系统
img: 'https://ws4.sinaimg.cn/large/006tNc79gy1fnfep1kp2qj30jk0dtwez.jpg'
abbrlink: d7c2c06c
---

* 201712
* 编程+ruby



# 程序是如何运作的？

## 1、前言

- 程序在计算机中是如何执行的?
- Ruby 编程语言和其他程式语言有什么不同?
- 计算机的架构是什么？内存是干嘛的？
- 操作系统是干嘛的?
- 各种数据型态的差异
- 为什么有乱码? 什么是 Unicode 万国码?
- 什么是正规表示法 Regular Expression，这可以干嘛？
- 什么是算法、数据结构？
- 如何用 BigO 评估算法效能，了解不同数据结构的效能差异





## 2、什么是编程语言

### 2.1、高级语言

* 低级语言指的是[机器语言](https://zh.wikipedia.org/wiki/%E6%9C%BA%E5%99%A8%E8%AF%AD%E8%A8%80)和[汇编语言](https://zh.wikipedia.org/wiki/%E6%B1%87%E7%BC%96%E8%AF%AD%E8%A8%80)，一步一步指示电脑微处理器如何动作，是最原始的编程语言。低级语言不是说比高级语言差，而是指抽象化的程度比较低，与电脑硬件的指令直接对应的意思。

* 机器语言会指示 CPU 进行什么操作：首先将指令和数据从内存搬进 CPU 的寄存器，接着 CPU 进行计算，然后将结果从CPU 寄存器搬回内存，代码长得像这样：

  ```
  000000 00001 00010 00110 00000 100000
  100011 00011 01000 00000 00001 000100
  000010 00000 00000 00000 10000 000000
  ```

* 汇编语言，基本上就是对应机器语言，只是给予符号意义，长得像这样：

  ```
  MOV eax, 1
  ADD eax, 4
  SUB eax, 2
  MOV num, eax
  INVOKE printf, ADDR formatStr, num
  ret    0
  ```

* 低级语言写起来很费事，但电脑跑起来飞快。注意，不同 CPU 的机器码(又叫做 native code)是不一样的。因此 Intel x86 和 ARM CPU 的代码、32位元和64位元的程序是不通用的。

### 2.2、高级语言

* 在 C 语言中，使用变量需要先宣告数据型态，例如这里是 `int` 表示整数。它会预先跟内存要固定的空间(int 会要 4 bytes)。在 C 语言中，要使用变量都必须跟内存先讲要多少空间。
* 电脑可以执行机器码，但是无法直接消化高级语言，这些高级语言的源代码都必须经过一个编译(compile)的过程，转换成二进制机器语言，也就是可执行的档案。
* 目前绝大部分编程语言的编译器，都是用 C 语言写的，例如 Ruby 也是用 C 语言写的。



## 3、什么是操作系统

* 不同的操作系统，会提供不同的 API 让编程语言可以调用硬件资源。



## 4、内存管理

### 4.1、内存

* 了解内存是编程非常重要的概念，因为如果你把内存用光了，操作系统就得去把硬盘模拟成内存使用，但是由于硬盘的速度跟内存差太多了，整台电脑的效能会急剧下滑，就会呈现当机的状态。一台电脑的内存是有限的，你的 MacBook 可能只有 4G 或 8G，租一台服务器，最重要的也是先看有多少内存空间可以使用。内存越多，可以同时执行的程序就越多。
* C 语言中需要手动管理内存。在硬件资源有限或需要效能至上的软件中，手动管理内存有其必要，但是缺点就是降低了开发效率，开发者必须注意好内存管理，用的时候要先宣告，不用的时候要释放回操作系统。

### 4.2、java语言

* 第二重要的可能就是 Java 语言了Java 有许多重大的发明，其中面向对象我们下一个教程会教的重点，另外就是内部 Virtual Machine(VM)跨平台设计，以及和[垃圾回收 Garbage Collection (GC)](https://zh.wikipedia.org/zh-cn/%E5%9E%83%E5%9C%BE%E5%9B%9E%E6%94%B6_(%E8%A8%88%E7%AE%97%E6%A9%9F%E7%A7%91%E5%AD%B8)) 了，我们先谈谈 GC。
  * GC 是编程语言的一种内部功能，作用是自动把再没有用到的变量，把内存释出回操作系统。
  * ​



## 5、编译型语言和解释型语言

* 编译型语言包括：C 语言、C++、Java 语言等等，这种语言要求一定要先把全部代码编译变成机器码(native code)，也就是可执行的档案。软件散布和分享的时候，是拿最后的执行档。在这类语言中，使用变量必须事先宣告类型，例如这个变量一开始宣告是 int，那就一定只能是 int，不能换成存字符串。

  * 编译型语言每次修改代码，都必须重新把程序编译好，如果程序任一行有错，就无法编译。但是因为都先编译好了，所以执行的速度比较快，而且执行档很小。刚刚的 C 语言范例，编译后只有8K的大小。

  ​

* 解释型语言包括: Ruby、Python、JavaScript、PHP 等等，这种语言不需要先编译，而是透过一种叫做解释器(interpreter)的软件，逐行编译然后直接执行。软件散布和分享的时候，是拿源代码。在这类语言中，使用变量不需要事先宣告类型，一开始存整数，后来换成存字符串也可以。

  * 解释型语言不需要先编译，修改起来比较方便，写代码也快一些，但是任何错误都要等到真正执行之后，才会知道。因为要等到执行时才编译，所以执行的速度较慢。一个只有一行的 Ruby 代码程序，如果要再另一台电脑跑起来，那台电脑也必须把 Ruby 解释器安装起来，而且跑起来至少需要 5MB 的内存，即使只是输出一行 Hello World。
  * 「机器语言 -> 组合语言 -> C 语言 -> Java 语言 -> 动态语言」越往右边执行效能较差，但开发起来效率比较好。

* 另一方面由于硬件效能的增强，人力开发成本比起软件的执行期的效能，也越来越重要。在硬件资源有限的行动装置及嵌入式系统上，仍是静态语言的天下。



## 6、各种编程语言介绍

### 6.1、编程语言种类

- C 语言: 开发系统程式 (System Programming)、操作系统、编译器等等工具必备语言。经过编译可以移植到不同硬件上。
- C++ 语言: 多了一大堆功能和面向对象的超级复杂版 C 语言，大型软件如 Google Chrome, Qt, WebKit, V8, HHVM 或是效能要求高的游戏等等，用 C++ 比较多。但是 C++ 由于语法太多太复杂，被认为是最不好上手的语言之一。Linux 和 Git 的发明人 Linus，就坚决反对 C++。
- Java 语言: 提供跨平台 VM、面向对象，使用 GC 内存垃圾自动回收，由于发展已久，效能也非常好，后端很多企业软件和中间件使用，在超大型网站中也十分常见，例如阿里巴巴、Twitter、Linkedin 服务端。前端方面要 Android 软件也是用 Java 语言。
- Scala 语言、Clojure 语言、JRuby 语言等等：这些语言都建构上 JVM 上，透过编译变成 Java 字节码，就可以在不同平台上执行。这些语言用自己偏好的语法设计，然后搭上 Java VM 发展成熟的便车，可以调用 Java 的库。
- C# 语言: 微软的官方语言，当年是仿 Java 所推出的编程语言。它的 .NET framework 等同于 JVM 的设计。在 .NET 上还有其他微软的编程语言 VB.NET, ASP.NET, F# 等等
- Objective-C 和 Swift，苹果专用的编程语言，撰写 MacOS 和 iOS 应用必备
- PHP 语言，当年发明的时候叫做 Personal Home Page，所以叫做 PHP。PHP 的初衷是作为 HTML 样板(就像是 Rails 里面的 html.erb)，主攻 Web 应用。因为容易上手使用，在 2000 年初搭配 MySQL 数据库非常流行。
- Python 语言: 也是动态语言的一种，和 Ruby 时常拿来对比。近年来在数据分析和机器学习领域用得很多。
- JavaScript 语言: 托浏览器的福，成为全世界最风行的语言。后端可以用 [Node.js](https://nodejs.org/en/) 单独将 JavaScript 跑在服务器上，而不需要依赖浏览器的环境。
- R 语言: 用于数据分析领域，学术领域用的很多。但不会拿来做软件应用。



### 6.2、应用案例

- Java: Google, Oracle
- Swift, Objective-C: Apple
- C#: Microsoft, stack overflow
- PHP: wikipedia, vimeo, facebook
- Ruby: airbnb, shopify, github, twitter, groupon, basecamp, hulu+
- Python: youtube, quora, google, instagram, pinterest



* Java 当年的一个理念是跨平台(Windows、Mac、Linux 等)
* Ruby 其实也是跨平台。不过很多 Ruby 库是用 C 语言写的，因此不一定能在不同平台上顺利编译成功，因为这些 C 代码可能有依赖操作系统的。
* Web 应用，浏览器才是真正跨平台的软件。



- 开发系统程式(例如操作系统、编译器)，适合 C 语言
- 开发 Web 后端应用，适合 PHP/Ruby/Python/Node.js
- 开发 Web 前端应用，得用 JavaScript
- 开发 Android 应用，得用 Java
- 开发 iOS 应用，得用 Swift 或 Objective-C



### 6.3、编程语言和编程语言的实作（即编译器）

* 最后，「编程语言」和「编程语言的实作」是不一样的概念，前者是指语法的规格定义，后者是指编译器(或解释器)。同一门编程语言，但是有不同家的编译器(或解释器)是常见的事情，例如：
  * JavaScript 的语法标准叫做 [ECMAScript](http://zh.wikipedia.org/wiki/ECMAScript)，但是 JavaScript 的实作有很多，包括 Chrome 浏览器用的 [V8 引擎](https://zh.wikipedia.org/zh-cn/V8_(JavaScript%E5%BC%95%E6%93%8E))、Safari 用 [WebKit](https://zh.wikipedia.org/zh-cn/WebKit)、Firefox 用 SpiderMonkey。虽然都叫 JavaScript 语言，但是真正跑在不同浏览器时，实际上是不同的解释器，还是有差异的。
  * Ruby 有 [CRuby](https://www.ruby-lang.org/)(又叫做 MRI，大家目前安装的就是 MRI 版本)、[JRuby](http://jruby.org)、[Rubunius](https://rubinius.com)、 [RubyMotion](http://www.rubymotion.com) 等等
  * PHP 有 [Zend Engine](http://php.net) (这是官方版) 和 [HipHop](https://github.com/facebook/hhvm/wiki) (这是 Facebook 针对 PHP 重写过的 PHP 解释器，以改进效能)
  * Objective-C 和 Swift 当然就谨此 Apple 一家出编译器
  * .NET 有微软官方版和 [Mono](http://www.mono-project.com)
  * Java 有 HotSpot (这是 Oracle 的官方版本) 和 OpenJDK (这是开源版本，在 Linux 安装的话会装到这个版本)



# 编程语言的设计

## 7、数据类型 Data Type: 基本数据类型

* 基本数据类型包括 String 字符串、Integer 整数、Float 浮点数、Boolean 布林、nil 空值等。

* 各个国家自定义了各自语言的字符集，例如：

  ```
  GB 2312 信息交换用汉字编码字符集，收录了6763个简体汉字
  Big5 大五码，收录了13,060个繁体汉字，在台湾、香港与澳门使用
  Shift JIS 日文
  ```

  * 乱码是因为使用字符集去显示。

* [Unicode 万国码](https://zh.wikipedia.org/wiki/Unicode#.E5.8E.86.E5.8F.B2)，这个计划定义了全世界所有语言的编码。在这个计划下，定义了几个字符集标准：

  ```
  UTF-32 用 4 bytes 来存一个字符
  UTF-16 用 2 或 4 bytes，汉字会是 4 bytes
  UTF-8 用不定长度 1~4 bytes，一个英文字母用 1 byte 存储，一个汉字会用 3 bytes 存储
  ```

  * 其中 UTF-32 很少使用，因为太浪费空间了。本来一个英文字母用 1 byte 就可以存，改成用 4 bytes 后，前面三个 bytes 都是 0，耗费的空间变成四倍。
  * 蛮多编程语言内部是用 UTF-16 时做字符串的，例如 Java 和 Python。
  * 至于 UTF-8 则是目前最为通行的标准，既能表示所有语言，空间上又比较节省。比如ruby。

* Symbol 是 Ruby 语言特有的类型，作用跟字符串很像，但是是唯一且不会变动的识别名称，用冒号 `:` 开头，例如 `:this_is_a_symbol`

* Float符点数有个最大的缺点就是输入与储存的值不一定精确、计算后的结果可能会有微小误差(因为无法刚好用 2 的指数来表示，只能逼近)

  ```
  0.1 + 0.2  # 得到 0.30000000000000004
  0.1 + 0.2 == 0.3   # 得到 false
  ```

  * > 在 JavaScript 语言中，所有数值都是浮点数。

* Decimal 十进制数

  ```
  # 总共六位数，小位数三位

  t.decimal  "currency_rate", precision: 6, scale: 3
  ```



## 8、组合数据类型 (Reference Data Types)

* 组合数据类型，包括 Array、Hash 和程序员自订的复合资料类型(也就是 Class)，这种类型的数据是一种容器，里面可以放上述的基本数据类型，或是组合其他的组合数据类型。



* Array，每个数组元素，在内存里面的大小是固定的。透过索引，我们可以很快就计算出该元素在内存中的位置。

  ```
  |1|2|3|4|5|6|7|8|
  ```

  * 例如假设每个元素占 4 bytes，`arr[0]` 在内存位置 100，那 `arr[3]` 就是 100 + 4*3 在位置 112 了。

* Hash，一种 Key-Value 的容器，通常用 Symbol 或字符串当作索引，要了解散列 Hash 的原理，需要先知道什么是散列函数。

  ```
  |aa|ab|ac|ad|.....|zx|zy|zz|
  ```

  * 假设初始位置是 100，如果给一个 key 算出来的散列值是 ad，那我们就把值放在 100 + 4*3 在位置 112。这样设计的好处是，随便给一个 key，都可以马上算出它在内存中的位置，非常有效率。

* 为什么编程语言会这样设计呢？这是因为组合数据类型是个容器，这个容器可能存有非常多的数据，复制的成本是很高的。因此在默认的情况下，我们不会真的去复制它的值，而是复制引用而已。

* 就地编辑(in-place editing)，做排序。

  ```
  a = [5,1,9]
  b = a.sort

  b 会是排序好的 [1,5,9]，但是 a 是没有变的，还是 [5,1,9]
  ```

  ```
  a = [5,1,9]
  a.sort!

  这个 a 直接被修改了，变成 [1,5,9]
  ```

  * > 对 Ruby 来说，这个 `!` 只是名字的一部分，没有特别的作用。只是一个惯例提醒你说这个方法会有 副作用(side-effect)。

  * 比执行速度的话，「In-place」做修改(mutate) 是比「回传新的副本」还快，因为后者需要新的内存空间来存储。不过，实际写代码时，我们一般会偏好「回传新的副本」的方式，因为这样比较不容易有 bug。


！！！！99问题：xx（params）参数里，值params，参数是基本类型还是引用类型？？



* 组合数据类别的 `=` 指派只会复制引用，如果需要真的复制值，会改用 `clone` 方法，改了 `a[0]`，就不会影响到 `b` 了。

  ```
  a = [1,2,3]
  b = a.clone
  a[0] = 999
  a
  b
  ```



## 9、作用域 Variable Scope

* 变量作用域 Variable Scope 指的是变量可以被存取到的范围，一般分成本地变量(Local variable)和全局变量(Global variable)

  ```
  def foo
   x = 1
  end

  x = 2

  foo()

  x # 仍然是 2
  ```

  * 这段简单的程序中，宣告在方法里面的局部变量 `x`，只可以在该方法内存取的到，对外面来说是没有影响的。对 Ruby 来说，一个局部变量的 scope 就是在该方法内。

* 至于全局变量则是不管在程式哪里，都可以存取的到。在 Ruby 之中会用 开头，例如 

  ```$THIS_IS_GLOBAL_VERIABLE```

* Ruby 还有对象变量(Instance variable) Scope 和类变量(Class variable) scope。



## 10、正则表达式 Regular Expression

* [正则表达式 Regular Expression](https://zh.wikipedia.org/wiki/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F)是一种精巧比对字串的方式。例如``` /\A[a-z0-9\-]+\z/ ```，检查字符串必须是小写a到z，或数字0到9，或是横线`-`。
  * `.` 符合任何单一字符
  * `\w` 单字字符
  * `\d` 数字字符
  * `\s` 任何空白
  * `\S` 非空白
  * `^` 行首位置
  * `*` 出现 0 次以上
  * `+` 出现 1 次以上
  * `?` 出现 0 或 1 次
  * `{m,n}` 出现 m 次到 n 次
  * `[a-z]` a 到 z 范围内的任何单一字符
  * `[^a-z]` 非 a-z 之外的任何单一字符

！！！！！！99看完还是不懂``` /\A[a-z0-9\-]+\z/ ```每个字符的意思？？？？



# 算法和数据结构

## 11、什么是算法?

* 结构化程式设计 (Structured programming) ，它采用函式、程式码区块、for循环以及while循环等结构，来取代传统的 [goto](https://zh.wikipedia.org/wiki/Goto)语法。

* 程式从可以随便跳来跳去的 goto 写法，变成限制成三种流程控制：循序(prodecure)、分歧(if-else)、反复(while loop)。

  ```
  例如，这是一个给数组求最大值的算法，先假设第一个元素最大，然后依序走访数组每一个元素，检查哪一个比较对就指派给 max 变量。最后跑完剩下来的 max 就是最大值。

  def find_max(arr)
    max = arr[0]

    arr.each do |a|
      if a > max
        max = a
      end
    end

    return max
  end
  ```



## 12、如何评估算法

* 用一种叫做 Big-O 的符号来描述算法的复杂度，复杂度可以分成时间复杂度和空间复杂度。前者计算这个算法要花多少步骤，后者则是耗费多少内存空间。通常我们比较关心前者。

  ![](https://ws4.sinaimg.cn/large/006tNc79gy1flijft886ij30pp0isabu.jpg)

* 在编程基础练习中，有一题是在数组中找到最大(或最小)的数字，例如 `arr = [5,1,9,4]`，以下两种算法都可以得到答案：def find_max(arr)  max = arr[0]  arr.each do |a|    if a > max      max = a    end  end  return maxend

  * 第二种看起来比较简单，但是现在你可以判断第一种方法是 O(n)，第二种确是 O(nlogn) 了，前者比较好。

  ```
  def find_max(arr)
    max = arr[0]

    arr.each do |a|
      if a > max
        max = a
      end
    end

    return max
  end
  ```

  ```
  def find_max(arr)
    arr.sort.last
  end
  ```



## 13、什么是数据结构?

* 数据结构定义资料之间的相互关系，是设计算法的载体，数据输入输出和设计算法步骤时，都会对应于使用的数据结构。
  * 对 Ruby 程序员来说，最常用的就是 Array 和 Hash。

* 插入和删除到容器里面

  * 如果刚好在最后(例如 Arrar#push 方法)，是 O(1)
  * 如果在数组中间插入一个值，因为数组是内存中「连续」的空间，中间新插入，会需要搬动后面所有元素的位置往后移动一格，这是 O(n) 的算法
  * 对散列 Hash 来说，插入是平均复杂度是 O(1)

* 检查一个值都没有在容器里面

  * Array 是 O(n)，需要走访整个数组依序检查

  * Hash 是 O(1)，只要将 key 经过散列算法，就可以直接检查那个位置有没有数据。


    ​```
       user     system      total        real
       0.000000   0.000000   0.000000 (  0.005854) # 数组一
       0.060000   0.010000   0.070000 (  0.064084) # 十倍大的数组二：时间约成长 10 倍
       0.000000   0.000000   0.000000 (  0.000005) # 散列一:
       0.000000   0.000000   0.000000 (  0.000005) # 十倍大的散列二: 时间一样
    ​```

* 数据库打索引的原理也是一样的，没有打索引就是 O(n)，有打索引是 O(logn)。



## 14、算法的极限

* 有没有不能计算的问题？
  * 例如[停机问题](https://zh.wikipedia.org/wiki/%E5%81%9C%E6%9C%BA%E9%97%AE%E9%A2%98)：你没办法写一个软件，去判断另一个软件会不会当机。
  * Big-O 是 O(2^N)，要求最佳解是不切实际的，只能用最佳化逼近解。
    * 已知最佳解就是 O(2^N) 的算法问题，就叫做 [NP 类型](https://zh.wikipedia.org/wiki/NP_(%E5%A4%8D%E6%9D%82%E5%BA%A6))的算法问题，例如河内塔步骤：假设有 N 个的环，那么最佳解的移动步骤是 2^N - 1
    * 西洋棋必胜策略也是 NP 类型
  * 已知有指数时间解，但是不确定有没有更好的多项式时间解，这就作 [NP-Complete](https://zh.wikipedia.org/wiki/NP%E5%AE%8C%E5%85%A8) 类型的问题。例如 [旅行推销员问题](https://zh.wikipedia.org/wiki/%E6%97%85%E8%A1%8C%E6%8E%A8%E9%94%80%E5%91%98%E9%97%AE%E9%A2%98)是 O(n!) n阶层时间。



## 15、推荐书籍

这门教程的知识点非常多，包括了计算机大学本科 1. 数据结构 2. 算法 3. 操作系统 4. 编译器 5. 编程语言，大一到大三共五门必修课程的主要概念。我推荐以下的书籍可以继续进修：

- [改变未来的九大算法](https://book.douban.com/subject/24529132/) 介绍九个影响世界的重要的算法，没有代码，是科普书
- [一路编程](https://book.douban.com/subject/26937425/)，入门程度的概括性介绍软件编程
- [代码之随](https://book.douban.com/subject/25927585/) 介绍编程语言的设计
- [程序是怎样跑起来的](https://book.douban.com/subject/26365491/)
- [计算机是怎样跑起来的](https://book.douban.com/subject/26397183/)
- [大话数据结构](https://book.douban.com/subject/6424904/)
- [算法图解](https://book.douban.com/subject/26979890/)

> 放心，这些都不是大部头的教科书



## 16、关于算法和找工作面试

有些公司很爱考算法题目，特别是大型公司，例如 Google、Microsof、Facebook、BAT 等大企业。因为他们偏好学历好计算机本科系刚毕业，聪明、底子好的学生，不看重作品集，招聘后再内训。

如果你对这类型公司有偏好，你需要熟悉各种数据结构的操作算法，例如 Stack、Queue、Linked List、Tree、Graph 等等。

基本的解题策略是：先很快的用暴力解(Brute-force)，先别担心算法效率。然后再最佳化，找出哪些步骤是多余重复的计算。通常考官都会逐步提示你完成最佳化。

你需要花时间练习熟悉题型：例如

- [http://www.coderbyte.com/](http://www.coderbyte.com/)
- [https://leetcode.com/](https://leetcode.com/)
- [Cracking the Coding Interview](https://book.douban.com/subject/25753386/)

就算是大神，碰到这种公司不先刷题也是被拒的。

- [https://twitter.com/mxcl/status/608682016205344768](https://twitter.com/mxcl/status/608682016205344768)
- [http://osherove.com/blog/2011/4/5/my-google-rejection-letter.html](http://osherove.com/blog/2011/4/5/my-google-rejection-letter.html)