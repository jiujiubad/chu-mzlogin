# 第二十章 Time 类与 Date 类



## 20.1 Time 类与 Date 类

`Time` 类用于表示时间、时区

`Date` 类只用于表示年月日



## 20.2 时间的获取

`Time.new ` 获取表示当前时间

`Time.now` 获取表示当前时间

`t.year`

`t.month`

`t.day`

`Time.mktime(year[, month[, day[, hour [, min[, sec[, usec]]]]]]])` 根据指定时间获取 `Time` 对象



## 20.3 时间的计算

```
t = Time.now
p t                    #=> 2013-03-30 03:11:44 +0900
t2 = t + 60 * 60 * 24  #=> 增加24 小时的秒数
p t2                   #=> 2013-03-31 03:11:44 +0900
```



## 20.4 时间的格式

`t.strftime(format)` 显示的时间格式

`t.to_s` 与 `"%Y-%m-%d %H:%M:%S %z"` 是等价的

```
t = Time.now
p t.to_s                              #=> 2013-03-30 03:13:14 +0900
p t.strftime("%Y-%m-%d %H:%M:%S %z")  #=> 2013-03-30 03:13:14 +0900
```

`t.rfc2822` 生成符合电子邮件头部信息中的 Date ：字段格式的字符串

`t.iso8601` 生成符合 ISO 8601 国际标准的时间格式的字符串



## 20.5 本地时间

`t.utc` 把 `Time` 对象的时区变更为国际协调时间（UTC）

`t.localtime` 把 UTC 变更为本地时间



## 20.6 从字符串中获取时间

`Time.parse(str)` 解析参数字符串 *str*，返回对应的 `Time` 对象

```
require "time"

p Time.parse("Sat, 30 Mar 2013 03:54:15 +0900")
    #=> 2013-03-30 03:54:15 +0900
p Time.parse("2013/03/30")
    #=> 2013-03-30 00:00:00 +0900
```



## 20.7 日期的获取

`Date.today` 得到表示当前日期的 `Date` 对象。使用 `Date` 类需要引用 `date` 库。

`Date` 类有一个特点是，可以对月末的日期做-1 处理（-2 表示月末的前一天）

```
require "date"

d = Date.new(2013,2,-1)
puts d    #=> 2013-02-28

d = Date.new(2016, 2, -1)
puts d    #=> 2016-02-29
```



## 20.8 日期的运算

通过使用 `>>` 运算符，我们就可以获取后一个月相同日期的 `Date` 对象。同理，使用 `<<` 运算符得到的是表示前一个月相同日期的 `Date` 对象。如果该月中没有相同的日期（例如 2 月 30 日），则会返回月末的日期。

```
require "date"

d = Date.today
puts d        #=> 2013-03-30
puts d >> 1   #=> 2013-04-30
puts d >> 100 #=> 2021-07-30
puts d << 1   #=> 2013-02-28
puts d << 100 #=> 2004-11-30
```



## 20.9 日期的格式

通过 `strftime` 方法也可以将日期按指定的格式转换为字符串。但结果中时间的部分会全部变为 0

```
require "date"

t = Date.today
p t.strftime("%Y/%m/%d %H:%M:%S")
  #=> "2013/03/30 00:00:00"
```



## 20.10 从字符串中获取日期

使用 `Date.parse` 方法可以将字符串转换为日期

```
require "date"

puts Date.parse("Sat Mar 30 03:50:12 JST 2013")  #=> 2013-03-30
puts Date.parse("H25.05.30")                     #=> 2013-05-30
puts Date.parse("S48.9.28")                      #=> 1973-09-28
```

