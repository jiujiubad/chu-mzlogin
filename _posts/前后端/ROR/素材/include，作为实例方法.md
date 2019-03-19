# 一、模块module的混入mixin

```
module A
  def self.qq
    puts "qq"
  end

  def ww
    puts "ww"
  end
end

class X
  include A
end

class Y
  extend A
end

module J
  include A
end

module K
  extend A
end
```

## 1、common

### 1】模块有类方法，但没有实例方法new

```
A.qq => qq
A.new => NoMethodError: undefined method `new' for A:Module
```

### 2】模块的类方法，不能被include或extend，即不能被mixin混入

```
X.qq
Y.qq 
J.qq
K.qq

=> NoMethodError: undefined method `qq' for Y:Class
```

> 首先，在模块里定义的self类方法，所有人都无法使用，没意义。
>
> 其次，实例方法又不能new实例化。
>
> 再次，模块没有继承。
>
> 综上，==模块里只会定义实例方法，通过被include或extend，模块才能被使用==。

## 2、几种mixin混入方式

### 1】class include module，作为实例方法

```
X.ww => NoMethodError
X.new.ww => ww
```

### 2】module include module，作为实例方法，但因module不能实例化而报错

```
J.ww => NoMethodError
J.new.ww => NoMethodError
```

### 3】class extend module，作为类方法

```
Y.ww => ww
Y.new.ww => NoMethodError
```

### 4】module extend module，作为类方法

```
K.ww => ww
K.new.ww => NoMethodError
```



# 二、类的继承

```
module A
  def self.qq
    puts "qq"
  end

  def ww
    puts "ww"
  end
end

class B
  def self.qq
    puts "qq"
  end

  def ww
    puts "ww"
  end
end
```

### 1】模块继承模块/继承类：error，所以模块没有继承。

```
module V < A
end

module W < B
end

=> SyntaxError: unexpected '<'
```

### 2】类继承模块：error

```
class Z < A
end

=> TypeError: superclass must be a Class (Module given)
```

### 2】类继承类：success，所以类只能继承其他类（比如B），继承后能使用B的实例方法和类方法。

```
class U < B
end

U.qq => qq
U.new.ww => ww
```



# 三、应用：concern



