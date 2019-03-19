---
title: 麦子学院-mysql基础视频
date: '2018-03-02 23:10'
categories:
  - ror系统
tags:
  - ror系统
img: 'https://ws4.sinaimg.cn/large/006tNc79gy1fnfep1kp2qj30jk0dtwez.jpg'
abbrlink: 21c42a8
top: 3
---

* 201802
* 编程+sql

# 数据库就是一些常用的命令，你把它记住就可以。

# mysql位置，搜索/usr/local/mysql

net stop|start mysql156——怎么查看mysql的名字？

mysql -uroot -p -D jiujiu——登录时打开数据库jiujiu（可以）

```
-- 停止/开始mysql：
net stop|start mysql156——怎么查看mysql的名字？

-- 登录时打开数据库jiujiu：
mysql -uroot -p jiujiu
SELECT DATABASE();

-- 查看表
SHOW TABLES;
DESC name; #查看表结构
SELECT * FROM name; #查看表数据
SHOW CREATE TABLE name; #查看表的定义

```





# 二、安装及配置

## 1、开启

```
mysql -uroot -p #开启
net start mysql156

\s或status #当前服务器状态。其中Server/DB/Clien/Conn characterset要是utf8，否则数据会乱码。
```



## 2、配置

open /etc/ 打开文件目录，新建my.cnf。

修改权限sudo chmod -R 644 /private/etc/my.cnf。

设置编码方式如下：

```
[mysql]
default-character-set=utf8

[mysqld]
character-set-server=utf8
skip-grant-tables
```

重启mysql。

### 参考资料

[重置密码解决MySQL for Linux错误 ERROR 1045 (28000): Access denied for user 'root'@'localhost' (using passwo](http://blog.csdn.net/mrs_haining/article/details/78953259)

## 3、登录退出

```
mysql -uroot -p #登录。其中-u是用户名，-p是密码

退出：
\q
exit
quit
ctrl+c

mysql -hlocalhost -uroot -p #-h是服务器名称
mysql -h127.0.0.1-uroot -p

-P，端口号
-D，打开指定数据库
--promote=name，设置命令提示符
DELIMITER //，指定分隔符为比如//
-V，输出版本信息并退出
```



# 三、sql语句规范

```
mysql -uroot -proot --prompt=mysql #修改mysql命令提示符
prompt mysql> #修改命令提示符

\D，完整的日期
\d，当前数据库
\h，服务器名称
\u，当前用户名

SELECT VERSION(); 显示当前版本
SELECT NOW(); 显示当前时间
SELECT USER(); 显示当前用户

关键字与函数名称，全部大写
数据库名称、表名称、字段名称，全部小写
sql语句必须以分隔符结尾，即;或\
数据库名称、表名称、字段名称等尽量不要使用mql的保留字，如果需要使用的时候，要用反引号(``)把名称括起来

\T 位置  #保存文件

```



# 四、数据库的相关操作

以下命令中，所以的DATABAS都可以改用SCHEMA

```
\T /Users/apple/99/mysql/mysql99.txt

CREATE DATABASE jiujiu; #创建数据库
CREATE DATABASE IF NOT EXISTS jiujiu;
CREATE DATABASE IF NOT EXISTS jiujiu DEFAULT CHARACTER SET = 'GBK';

SHOW WARNINGS; #查看警告信息
SHOW DATABASES; #查看已有数据库
SHOW CREATE DATABASE name #查看数据库的编码方式
ALTER DATABASE name DEFAULT CHARACTER SET = UTF8; #修改数据库的编码方式

USE name; #打开数据库
SELECT DATABASE(); #获得当前打开数据库的名称

DROP DATABASE name #删除数据库
DROP DATABASE IF EXISTS name
```



# ===========================

# 五、数据表|数据类型

一张excel表相当于一个数据库。excel就相当于数据库管理软件。

数据表至少要有一列，或者说一定要有表结构。



## 数据类型

不用记，忘了可以查手册，三种方法查手册：

```
help tinyint
? INT
\h INT
```



整数，常用TINYINT、INT、BIGINT、布尔类型用TINYINT(1)。SMALLINT、MEDIUMINT。

浮点数，FLOAT（单点）、DOUBLE（双点如-1.79E+308）、DECIMAL（定点，内部以字符串存储）。

字符串。

* CHAR，定长。
  * 无论存一个字符，还是五个字符，占用的都是五个字符大小。
  * 所以，定长字符串，占用空间大，速度快。
* VARCHAR，变长（L+2)。
  * 根据实际存储内容来决定大小。
  * 所以，变长字符串，占用空间小，速度慢。
* TINITEXT
* TEXT，不能有默认值。
  * 数据检索的效率CHAR>VARVHAR>TEXT，所以能不用TEXT的尽量不用
* MEDIUMTEXT
* LONGTEXT
* ENUM
  * 枚举，插入值的时候，只能从中选一个值
  * mysql保存的时候是保存每个值的序号，而不是保存它们的值。
* SET
  * 可以从集合中选择多个值

日期时间类型。

* TIME
  * 范围-838:59:59到838:59:59，3个字节。
* DATE
  * 范围1000-01-01到9999-12-31，3个字节。
* **YEAR，最常用**
  * 范围1901到2155，1个字节。
* DATETIME
  * 范围1000-01-01 00:00:00到9999-12-31 23:59:59，8个字节。
* TIMESTAMP
  * 范围1970-01-01 00:00:01到2038-01-19 03:14:07，4个字节。
  * DATETIME和TIMESTAMP，都是用来存储日期加时间的，但是DATETIME范围更大。

二进制类型，用在保存视频、图片格式，用的比较少。一般我们保存的是视频、图片的路径。



比如一个报名表，要给每个栏位选择最合适的数据类型。



# 六、存储引擎

存储引擎是指表的数据类型。

同个数据库可以使用多种存储引擎的表。

```
SHOW ENGINES\G;  #查看存储引擎

查看结果如下：
Engine: PERFORMANCE_SCHEMA
Support: YES #mysql是否支持这种引擎
Comment: Performance Schema #对这个存储引擎的评论或注释
Transactions: NO #是否支持事务处理
          XA: NO #是否是分布式处理的XA处理规范
  Savepoints: NO #是否支持保存点


SHOW VARIABLES LIKE 'have%'; #查看显示支持的存储引擎信息
SHOW VARIABLES LIKE 'strong_engine'; #查看默认的存储引擎
```



常用的存储引擎：

1）InnoDB，创建frm和ibd。

优点是：

* 事物、回滚、修复、多版本并发控制
* 支持外键元素
* 创建储存表从表结构是存储在.sr文件中

缺点是：

* 读取效率较低
* 占用空间较大

> 如果对事物完整性要求较高，要实现并发控制，或需要频繁更新删除操作的数据库。默认就是用InnoDB。

2）MyISAM

优点是：

* 创建表是存储成三个文件。frm存储表结构、MYD存储数据、MYI存储索引。
* 静态型、动态型、压缩型。
* 占用空间小，处理速度快。

缺点是：

* 没有完整性、安全性、没有并发处理

> 主要用于插入和读取记录，但是不支持事物，对数据的并发性和完整性要求较低。

3）MEMORY

特点是：

* 所有数据存放在内存中，速度快，类型也是FM结构。
* 默认哈希索引，速度较快

缺点是：

* 服务器必须要有足够的内存
* 重启或关机后数据就会消失
* 很少使用到，一般都是一次性使用

> 要求速度快，且对安全性要求低的时候。而且MEMORY生命周期短，用于一次性的比较合适。且不能建立太大的表。



# 七、数据表的创建

1）建议在编辑器里写命令，然后复制到终端执行。

2）注解用`-- 空格接注释内容`

3）用``来写名称，可以防止名称和mysql的关键字冲突引起错误。

4）当需要输入中文的时候，需要临时转换客户端的编码方式，SET NAMES GBK;

5）给字段注释，通过COMMENT '注释内容'



```
-- 创建数据库
CREATE DATABASE IF NOT EXISTS `jiujiu` DEFAULT CHARACTER SET 'UTF8';
USE `jiujiu`;

-- 创建学员表（user）
-- 当需要输入中文的时候，需要临时转换客户端的编码方式，SET NAMES GBK;
-- 给字段注释，通过COMMENT '注释内容'
CREATE TABLE IF NOT EXISTS `user`(
id SMALLINT,
username VARCHAR(20),
age TINYINT,
sex ENUM('男','女','保密'),
email VARCHAR(50),
addr VARCHAR(200),
birth YEAR,
salary FLOAT(8,2),
tel INT,
married TINYINT(1) COMMENT '0代表结婚，非0代表未结婚'
)ENGINE=INNODB CHARSET=UTF8;

-- 创建课程表course
CREATE TABLE IF NOT EXISTS course(
cid TINYINT,
courseName VARCHAR(50),
courseDesc VARCHAR(200)
);

```



```
SHOW TABLES; #查看数据表
DESC name; #查看指定表的结构
```



### 作业：

```
-- 作业：

-- 创建新闻分类表cms_cate
-- 编号、分类名称、分类描述

-- 创建新闻表cms_news
-- 编号、新闻标题、新闻内容、新闻发布时间、点击量、是否置顶
```



# 八、测试整数|浮点数

```
-- 查看指定表的结构：
DESC name;
DESCRIBE name;
SHOW COLUMNS FROM name;

-- 查询表中所有记录
SELECT * FROM name;

-- 插入数据，可以指明字段名称，如果没有指明则每个字段都要给值
INSERT name VALUE|VALUES(值,...);
```



## 1、整数

```
CREATE TABLE test1(
num1 TINYINT,
num2 SMALLINT,
num3 MEDIUMINT,
num4 INT,
num5 BIGINT
);

DESC test1;

INSERT test1 VALUES(-128,-32768,-8388608,-2147483648,-922337203684775808);
SELECT * FROM test1;

-- 无符号，UNSIGNED（意思是不能为负）
CREATE TABLE test2(
num1 TINYINT UNSIGNED,
num2 TINYINT
);
在终端运行
INSERT test2 VALUES(0,-12); #这是正确的
INSERT test2 VALUES(-10,-12); #这是错误的
SELECT * FROM test2;


-- 什么叫显示长度呢？必须配合上零填充ZEROFILL
CREATE TABLE test3(
num1 TINYINT ZEROFILL,
num2 SMALLINT ZEROFILL,
num3 MEDIUMINT ZEROFILL,
num4 INT ZEROFILL,
num5 BIGINT ZEROFILL
);
DESC test3; #运行发现，会自动加上unsigned无符号、zerofill零填充。
INSERT test3 VALUES(1,1,1,1,1); #现在每一个都达不到查看DESC name;时的显示长度
SELECT * FROM test3; #发现会自动在前面补零
```



## 2、浮点

```
CREATE TABLE test4(
num1 FLOAT(6,2),
num2 DOUBLE(6,2),
num3 DECIMAL(6,2)
);
DESC test4;
INSERT test4 VALUES(3.2495,3.2495,3.2495);
INSERT test4 VALUES(3.1415,3.1415,3.1415);
SHOW WARNINGS; #因为保留小数点后两位，所以有警告。
SELECT * FROM test4; #结果为(3.25,3.25,3.25)，小数点后两位，且四舍五入。

不管是单浮点，还是双浮点，都有精度问题，而且根据平台不同精度也不同，所以不要比较或查询两个浮点数。
但定点数就不一样，内部是以字符串来存储的。定点数的精度比较高，而前两种都涉及到四舍五入。
SELECT * FROM test4 WHERE num1='3.14'; #空
SELECT * FROM test4 WHERE num2='3.14'; #空
SELECT * FROM test4 WHERE num3='3.14'; #有结果
```



# 九、测试字符串CHAR|VARCHAR|TEXT

字符串的特点，整理在第五章。

## 1、定长CHAR和变长VARCHAR字符串

```
-- 测试CHAR和VARCHAR
CREATE TABLE IF NOT EXISTS test5(
str1 CHAR(5),
str2 VARCHAR(5)
);
INSERT test5 VALUES('1','1');
SELECT * FROM test5;
INSERT test5 VALUES('123456','123456'); #报错，超过5个字符

INSERT test5 VALUES('1  ','1  '); #报错，超过5个字符
SELECT CONCAT(str1,'-'),CONCAT(str2,'-') FROM test5; #在1后面加一个-，看它是否有空格
发现，CHAR的空格默认被去掉，而VARCHAR没有去掉。

INSERT test5 VALUES('  a','  a');
SELECT CONCAT('-',str1),CONCAT('-',str2) FROM test5;
发现两个的空格都没被去掉。

INSERT test5 VALUES('啊','啊');
SELECT * FROM test5;  #写入中文成功

SELECT LENGTH('啊'); #utf8下，中文字占用长度3个
SELECT CHAR_LENGTH('啊'); #得到字符数，是1个字符
所以
INSERT test5 VALUES('啊啊啊啊啊','啊啊啊啊啊'); #也是可以

```



## 2、TEXT

```
CREATE TABLE test6(
str1 TEXT
);
DESC test6;
INSERT test6 VALUES('fdjaskfdlksa放大法大赛分懂啊分fdsfdasf');
SELECT * FROM test6;
```



# 十、测试字符串ENUM|SET

## 1、枚举类型ENUM

```
-- 测试枚举类型
CREATE TABLE IF NOT EXISTS test7(
sex ENUM('男','女','保密  ')
);
INSERT test7 VALUES('男  ');
INSERT test7 VALUES('女  ');
INSERT test7 VALUES('保密  ');

SELECT * FROM test7;

INSERT test7 VALUES('保密1  '); # 报错，因为只能从列表中列举的值里选一个

也可以写成序号
INSERT test7 VALUES(2);
SELECT * FROM test7;
INSERT test7 VALUES(0); #序号不能为0，只能从1开始

特殊，NULL也可以，因为
DESC test7; #可以看到DEFAULT是NULL
所以
INSERT test7 VALUES(NULL); #成功
SELECT * FROM test7;

再测试空字符
INSERT test7 VALUES(''); #报错，因为列表中没有''

```



## 2、集合类型SET

```
-- 测试集合类型
CREATE TABLE IF NOT EXISTS test8(
fav SET('A','B','C','D')
);
DESC test8;
INSERT test8 VALUES('A,C,D'); #检索出来的顺序是ACD
INSERT test8 VALUES('D,B,A'); #检索出来的顺序是ABD
SELECT * FROM test8;

但是mysql在保存这些值，是用二进制，即保存A,B,C,D分别是用1、2、4、8。
所以，可以用值来写
INSERT test8 VALUES('3'); #
SELECT * FROM test8; #结果是插入A,B
INSERT test8 VALUES('15');
SELECT * FROM test8; #结果是插入A,B,C,D
```



# 十一、测试时间类型YEAR|TIME

## 1、YEAR

```
-- 测试YEAR
CREATE TABLE IF NOT EXISTS test9(
birth YEAR
);
INSERT test9 VALUES(1901);
INSERT test9 VALUES(2155);
SELECT * FROM test9;

INSERT test9 VALUES(2156); #报错

用字符串时
INSERT test9 VALUES('1988'); #成功

用两位数字时
INSERT test9 VALUES(12); #成功，结果是2012
INSERT test9 VALUES(79); #成功，结果是1979
00-69之间，会转换成2000-2069
70-99之间，会转换成1970-1999

用0时
INSERT test9 VALUES(0); #成功，结果是0000
INSERT test9 VALUES('0'); #成功，结果是2000
INSERT test9 VALUES('00'); #成功，结果是2000
```



## 2、TIME

用3个字节来保存时间的。

mysql的时间是用天数加上小时，分钟秒来组成的。

```
-- 测试日期时间
CREATE TABLE IF NOT EXISTS test10(
test TIME
);
INSERT test10 VALUES('1 12:12:12');
SELECT * FROM test10; #结果是36:12:12


INSERT test10 VALUES('11:11');
SELECT * FROM test10; #结果是11:11:00

INSERT test10 VALUES('1234');
SELECT * FROM test10; #结果是00:12:34

INSERT test10 VALUES('12');
SELECT * FROM test10; #结果是00:00:12

INSERT test10 VALUES('0');
SELECT * FROM test10; #结果是00:00:00

INSERT test10 VALUES(0);
SELECT * FROM test10; #结果是00:00:00

INSERT test10 VALUES('66'); #报错，超出了范围
```



## 3、DATE

DATE是用3个字节来表示日期，存储范围是1000-01-01到9999-12-31。

```
? DATE

CREATE TABLE IF NOT EXISTS test11(
test DATE
);
INSERT test11 VALUES('12-6-7');
SELECT * FROM test11; #结果是2012-06-07

INSERT test11 VALUES('1267'); #报错

INSERT test11 VALUES('12 6 7'); #报错

INSERT test11 VALUES('12/6/7');
SELECT * FROM test11; #结果是2012-06-07

INSERT test11 VALUES('120607');
SELECT * FROM test11; #结果是2012-06-07

INSERT test11 VALUES('12@6/7');
SELECT * FROM test11; #结果是2012-06-07
```



# 十二、测试主键约束

创建数据表时，完整的约束条件：

* 主键，PRIMARY KEY
  * 像身份证一样做唯一标识符的作用，可以从多个张三中识别具体那一个。
  * 每个表都会有且只有一个主键或复合主键
  * 一般建在无意义的字段上，且不能出现重复的值，且非空。如编号id
* 自增长，AUTO_INCREMENT
  * 从1，每次加1。自增长只对整数有效果，对字符串没有意义。
  * 一个表只能有一个自增长字段
  * **自增长字段一定要配合主键使用**，即自增长一定是主键（但主键不一定是自增长）
* 外键，FOREIGN KEY
* 非空，NOT NULL
  * 如用户名和密码
* 唯一，UNIRUE
  * 一个表可以有多个唯一
  * 唯一字段的值不能出现重复，除了NULL
* 默认值，DEFAULT



## 1、PRIMARY KEY或简写成KEY

-- 查看创建表的定义

SHOW CREATE TABLE user1;



-- 测试单字段主键

```
CREATE TABLE IF NOT EXISTS user1(
id INT PRIMARY KEY, #这里可以简写成KEY
username VARCHAR(20)
);
DESC user1; #Null为NO，Key是PRI

SHOW CREATE TABLE user1;

插入id和用户名，只要id不重复就不会报错：
INSERT user1 VALUES(1,'king');
INSERT user1 VALUES(12,'QUEEN');
INSERT user1 VALUES(12,'QUEEN'); #报错
SELECT * FROM user1;
SELECT * FROM user1 WHERE id=1;
```



-- 测试多字段主键

```
CREATE TABLE IF NOT EXISTS user2(
id INT,
username VARCHAR(20),
card CHAR(18),
PRIMARY KEY(id,card)
);
DESC user2; #发现Key字段有两个PRI
INSERT user2 VALUES(1,'king','111');
SELECT * FROM user2;

id重复但card不重复
INSERT user2 VALUES(1,'queen','112');  #成功

INSERT user2 VALUES(1,'queen','112'); #报错，两个字段都重复了
```



# 十三、测试自增长约束

## 1、AUTO_INCREMENT

```
CREATE TABLE IF NOT EXISTS user5(
id SMALLINT KEY AUTO_INCREMENT,
username VARCHAR(20)
);
DESC user5; #Extra一列出现AUTO_INCREMENT

INSERT user5 VALUES(1,'king');
INSERT user5(username) VALUES('queen');
SELECT * FROM user5; #发现会为queen自动添加id为2

INSERT user5 VALUES(111,'king1');
INSERT user5(username) VALUES('queen1');
SELECT * FROM user5; #发现会为queen自动添加id为112

SHOW CREATE TABLE user5; #看到AUTO_INCREMENT=113，即当你再插入一个没有编码的记录时它的值就是自增长的值113

当id为NULL时，也会自增长：
INSERT user5 VALUES(NULL,'AAAA');
SELECT * FROM user5; #id为113

当id为DEFAULT时，也会自增长：
INSERT user5 VALUES(DEFAULT,'AAAA');
SELECT * FROM user5; #id为114


也可以在建表时指定自增长值：
CREATE TABLE IF NOT EXISTS user6(
id SMALLINT KEY AUTO_INCREMENT,
username VARCHAR(20)
)AUTO_INCREMENT=100;

SHOW CREATE TABLE user6; #看到AUTO_INCREMENT=100，即编号从100开始
INSERT user6(username) VALUES('queen1');
SELECT * FROM user6;

也可以修改自增长的值：
ALTER TABLE user6 AUTO_INCREMENT = 500;
SHOW CREATE TABLE user6; #看到AUTO_INCREMENT=500，即编号从500开始
```



# 十四、非空约束

## 1、NOT NULL

```
CREATE TABLE IF NOT EXISTS user7(
id INT UNSIGNED KEY AUTO_INCREMENT, #无符号、主键、自增长
username VARCHAR(20) NOT NULL,
password CHAR(32) NOT NULL,
age TINYINT UNSIGNED
);
DESC user7; #发现主键id自动为空，username和password设置NOT NULL也是为空，age默认为空

INSERT user7(username,password) VALUE('KING','KING');
SELECT * FROM user7; #发现age是Null

INSERT user7(username,password,age) VALUE('KING','KING',18);
SELECT * FROM user7; #发现age是18

INSERT user7(username,password) VALUE(NULL,NULL); #报错，不能为空
```



# 十五、默认值约束

## 1、DEFAULT

一般NOT NULL会配合默认值来使用。

```
CREATE TABLE IF NOT EXISTS user8(
id INT UNSIGNED KEY AUTO_INCREMENT, #无符号、主键、自增长
username VARCHAR(20) NOT NULL,
password CHAR(32) NOT NULL,
age TINYINT UNSIGNED DEFAULT 18,
addr VARCHAR(50) NOT NULL DEFAULT '北京',
sex ENUM('男','女','保密') NOT NULL DEFAULT '男'
);
DESC user8; #发现age可以为空但是有默认值18，addr不能为空但是有默认值北京，sex同addr

INSERT user8(username,password) VALUES('KING','KING');
SELECT * FROM user8; #发现我们没有传值时用的是默认age、addr、sex

INSERT user8 VALUES(2,'QUENN','QUEEN',29,'上海','保密');
INSERT user8 VALUES(3,'QUENN','QUEEN',DEFAULT,DEFAULT,'保密');
```



# 十六、唯一性约束

## 1、UNIRUE

```
CREATE TABLE IF NOT EXISTS user9(
id TINYINT UNSIGNED KEY AUTO_INCREMENT, #无符号、主键、自增长
username VARCHAR(20) NOT NULL UNIQUE,
card CHAR(18) UNIQUE
);
DESC user9;
SHOW CREATE TABLE user9;

INSERT user9(username) VALUES('A');
INSERT user9(username) VALUES('A'); #报错
SELECT * FROM user9;

特殊NULL不算重复
INSERT user9(username,card) VALUES('B1',NULL);
INSERT user9(username,card) VALUES('B2',NULL); #成功
```



# 十七、重命名数据表

```
第一种：
ALTER TABLE user9 RENAME user10; #这里省略了TO或AS
SHOW TABLES;

第二种：
RENAME TABLE user9 TO user10;
SHOW TABLES;
```



# 十八、添加|删除表字段

-- 添加字段

```
ALTER TABLE user9 ADD card1 CHAR(18);
DESC user9;

ALTER TABLE user9 ADD s1 VARCHAR(100) NOT NULL;
DESC user9;

以上默认添加到最后，可以指定要添加的位置FIRST，如下：
ALTER TABLE user9 ADD test2 VARCHAR(100) NOT NULL FIRST;
DESC user9;

添加到某一栏位之后AFTER XXXX：
ALTER TABLE user9 ADD test3 VARCHAR(100) NOT NULL AFTER username;
DESC user9;

选中一次表，完成多个操作：
ALTER TABLE user9
ADD test4 INT NOT NULL DEFAULT 123 AFTER card,
ADD test5 FLOAT(6,2) FIRST,
ADD test6 SET('A','B');
DESC user9;
```



--删除字段

```
ALTER TABLE user9 DROP test6;

选中一次表，完成多个操作：
ALTER TABLE user9
DROP test4,
DROP test2,
ADD test4 INT NOT NULL DEFAULT 123 AFTER card,
ADD test5 FLOAT(6,2) FIRST;
```



# 十九、修改表字段

MODIFY，修改字段类型、属性、位置。

CHANGE，修改比MODIFY多一个功能，可以修改字段名称。

```
-- 把test字段修改为CHAR(32) DEFAULT '123' 移动到第一个位置
ALTER TABLE user9 MODIFY test CHAR(32) DEFAULT '123' FIRST;

-- 把test字段改为test1
ALTER TABLE user9 CHANGE test test1 CHAR(32) DEFAULT '123';
```



# 二十、添加|删除默认值

SET DEFAULT

DROP DEFAULT

```
CREATE TABLE IF NOT EXISTS user11(
id TINYINT UNSIGNED KEY AUTO_INCREMENT,
username VARCHAR(20) NOT NULL UNIQUE,
age TINYINT UNSIGNED
);
DESC user11;

ALTER TABLE user11 ALTER age SET DEFAULT 18;
DESC user11;

ALTER TABLE user11 ALTER age DROP DEFAULT;
DESC user11;
```



# 二一、添加|删除主键

ADD KEY

DROP KEY

```
-- 添加主键
CREATE TABLE IF NOT EXISTS user12(
id INT
);
DESC user12;

ALTER TABLE test12 ADD PRIMARY KEY(id);
DESC user12;


-- 添加复合主键
CREATE TABLE IF NOT EXISTS user13(
id INT,
card CHAR(18),
username VARCHAR(20) NOT NULL
);
DESC user13;

ALTER TABLE user13 ADD PRIMARY KEY(id,card);
DESC user13;

-- 删除主键
ALTER TABLE user13 DROP PRIMARY KEY;
DESC user13;

-- 删除主键时的问题：如果主键有自增长，那么删除前要用MODIFY改成UNSIGNED，然后再删除主键
CREATE TABLE IF NOT EXISTS user14(
id INT UNSIGNED KEY AUTO_INCREMENT #id是主键，而且是自增长的
);
DESC user14;
ALTER TABLE user14 MODIFY id INT UNSIGNED;
ALTER TABLE user14 DROP PRIMARY KEY;
DESC user14;
```



# 二二、添加|删除唯一（索引）及其他

## 1、添加|删除索引

ADD UNIQUE

DROP UNIQUE

```
-- 添加索引
ALTER TABLE user13 ADD UNIQUE(username);
SHOW CREATE TABLE user13;

-- 添加带索引名称的索引
ALTER TABLE user13 ADD UNIQUE uni_username(username); #在card的字段上添加，索引名称是uni_card

-- 添加复合索引MUL
ALTER TABLE user13 ADD UNIQUE uni_id_username(id,username);
DESC user13; #看到复合唯一索引MUL


-- 删除索引
ALTER TABLE user13 DROP KEY uni_id_username;
```



## 2、修改表的存储引擎

```
SHOW CREATE TABLE user13; #默认ENGINE=InnoDB

ALTER TABLE user13 ENGINE=MyISAM;
```



## 3、修改自增长的值

```
ALTER TABLE user13 AUTO_INCREMENT=100;
SHOW CREATE TABLE user13;
```



### 关于表结构相关的命令到这里就介绍完了。以后可以通过工具可以很快速的实现，但是最好还是先把这些命令敲熟，记住了就会写。



# 二三、删除数据表

可以用命令删，也可以停止mysql服务后在文件夹里删

```
SHOW TABLES;
DROP TABLE user12;

让它不报错，而是产生警告：
DROP TABLE if EXISTS user12;
SHOW WARNINGS;

一次删除多张表：
DROP TABLE if EXISTS user11,suer10,user9;
SHOW TABLES;

删除的多张表时，如果有的不存在，那么只会删除存在的那些表：
DROP TABLE if EXISTS user1111111,suer10,user9;
SHOW WARNINGS;
```



# =============================

# 二四、插入记录

## 这部分学习对表中数据的操作。

* 首先是**『DML操作』**，即对数据的增、删、改。
  * 插入，INSERT name VALUES(...)
  * 更新，UPDATE name SET ..=.. WHERE ..
  * 删除，DELETE FROM name WHERE..
* 接着是**『DQL操作』**，即查询。



INSERT

```
CREATE TABLE IF NOT EXISTS user15(
id INT UNSIGNED KEY AUTO_INCREMENT, #无符号、主键、自增长
username VARCHAR(20) NOT NULL,
password CHAR(32) NOT NULL,
age TINYINT UNSIGNED DEFAULT 18,
addr VARCHAR(50) NOT NULL DEFAULT '北京',
sex ENUM('男','女','保密') NOT NULL DEFAULT '男'
);

-- 1、插入每个栏位的值
INSERT user15 VALUES(1,'KING','KING',18,'KING@gmail.com','男');
SELECT * FROM user15;

-- 2、插入指定栏位的值
INSERT user15(username,password) VALUES('A','AAA');
SELECT * FROM user15;

-- 3、一次插入多条记录
INSERT user15 VALUES(3,'KING','KING',18,'KING@gmail.com','男'),(4,'QING','QING',28,'QING@gmail.com','女');
SELECT * FROM user15;

-- 4、通过SET插入
INSERT user15 SET id=5,username='WING',password='WING',age=18,addr='WING@gmail.com',sex='男';
SELECT * FROM user15;

-- 5、把查询结果插入到表中
CREATE TABLE IF NOT EXISTS user16(
iid INT UNSIGNED KEY AUTO_INCREMENT, #无符号、主键、自增长
uuname VARCHAR(18) NOT NULL
);
INSERT user16 SELECT id,username FROM user15; #把user15的id和username插入到user16
SELECT * FROM user16;

错误的写法：字段数不一致
INSERT user16 SELECT * FROM user15; #报错
```



# 二五、更新|删除记录

## 1、UPDATE

学习**『DML增删改操作』**。

如果不写where，那么表中所有的数据都将被更新。

```
SELECT * FROM user15;

-- 1、把表中所有用户年龄更新为8
UPDATE user15 SET age=8; #
SELECT * FROM user15;

-- 2、同时修改多个栏位（没写where，会更新表中所有数据）
UPDATE user15 SET age=18,sex='女';

-- 3、用where来指定修改某些记录
UPDATE user15 SET age=38,sex='男' WHERE id=1;

-- 4、用条件式来更新
UPDATE user15 SET age=age-5 WHERE id>2;

-- 5、更新为默认值
UPDATE user15 SET age=DEFAULT;
```

等讲了SELECT后，where条件会有很多，包括排序ORDER BY、限制条数LIMIT等。



## 2、DELETE

```
SELECT * FROM user15;

-- 1、删除表中所有记录
DELETE FROM user16; #!!!!一定要谨慎

-- 2、用where来指定删除某些
DELETE FROM user15 WHERE id=1;

-- 3、当有AUTO_INCREMENT时，需要重置，否则会从它的值继续延续
ALTER TABLE user15 AUTO_INCREMENT=1;

-- 4、彻底清空（删除记录，并重置自增长的值）。但是不能用where指定。
TRUNCATE TABLE user14;
```



# 二六、SELECT查询|给表和字段起别名

学习**『DQL查询操作』**。

**是最重要的**，也是内容比较多的。

1）最简单的单表查询用法如下：

* SELECT FROM name

* WHERE 条件

* GROUP BY 对查询结果进行分组

* HAVING 对分组结果进行二次筛选

* ORDER BY 对筛选的结果进行排序

* LIMIT 限制显示的条数

2）查询表达式：

* *，代表所有列/字段

```
粘贴已给的cms数据库

-- 1、查询所有栏位
SHOW TABLES;

SELECT * FROM cms_admin; #*，表示查询所有的列。效率低。

SELECT cms_admin.* FROM cms_admin;

-- 2、查询某些栏位

SELECT id,username FROM cms_admin;

SELECT username,id,role FROM cms_admin;

-- 3、表来自于哪个数据库下db_name.tbl_name
SELECT id,username,role FROM cms.cms_admin;

-- 4、字段来自于哪张表

SELECT cms_admin.id,cms_admin.username FROM cms.cms_admin;

-- 5、给表名起别名，一般不超过两个字母

SELECT id,username FROM cms_admin AS a; #不建议省略AS

SELECT id,username FROM cms_admin a;

SELECT a.id,a.username,a.email,a.role FROM cms_admin AS a;

-- 6、给字段起别名

SELECT id AS '编号',username AS '用户名',email AS '邮箱',role '角色' FROM cms_admin;

SELECT a.id AS i,a.username AS u,a.email as e,a.role AS r FROM cms_admin AS a;

SELECT id AS proId,proId AS id,username FROM cms_user;

SELECT 1,2,3,4,5,id,username FROM cms_user;
```



# =====================表查询的几种用法：

# 二七、WHERE查询条件*比较

哪些情况下可以用WHERD？

* 比较
  * ＞、＜、＝、≥、<=>等
* 指定范围
  * BETWEEN 。。 AND 。。
* 指定集合
  * IN(..,..)
* 模糊查询
  * LIKE
* 是否为控制
  * IS NULL
* 逻辑运算符
  * AND、OR

```
-- WHERE条件
-- 1、查询编号为1的用户
SELECT id,username,email FROM cms_user WHERE id=1;

SELECT id,username,email FROM cms_user WHERE username='king';

-- 查询编号不为1的用户
SELECT  * FROM cms_user WHERE id!=1;

SELECT  * FROM cms_user WHERE id<>1; #也是不等于的意思

-- 2、添加age字段
ALTER TABLE cms_user ADD age TINYINT UNSIGNED DEFAULT 18;

INSERT cms_user(username,password,regTime,proId,age)

VALUES('test1','test1',1419811708,1,NULL);

SELECT * FROM cms_user;

-- 3、查询表中记录age值为NULL
SELECT * FROM cms_user WHERE age=NULL; #实际有但无法查到。

SELECT * FROM cms_user WHERE age<=>NULL; #与等号=的作用一样，但是有检测是否为NULL的作用

SELECT * FROM cms_user WHERE age<=>18;

-- 4、IS NULL 或者IS NOT NULL
SELECT * FROM cms_user WHERE age IS NULL;

```



# 二八、WHERE查询条件*指定范围BETWEEN AND|指定集合IN

```
-- 1、范围查询。编号在3~10之间的用户
SELECT * FROM cms_user WHERE id BETWEEN 3 AND 10;

-- 2、集合查询。编号为1，3，5，7，9，11，13，100
SELECT * FROM cms_user WHERE id IN(1,3,5,7,9,11,13,100,1000);

-- 查询proId为1 和3的用户

SELECT * FROM cms_user WHERE proId IN(1,3);

-- 查询用户名为king,queen,张三，章子怡的记录
SELECT * FROM cms_user WHERE username IN('king','queen','张三','章子怡');

SELECT * FROM cms_user WHERE username IN('KinG','QUEEN','张三','章子怡'); #结果发现，查询时忽略大小写

```



# 二九、WHERE查询条件*模糊查询LIKE

-- 模糊查询

-- %:代表0个一个或者多个任意字符

-- _:代表1个任意字符

```
-- 1、查询姓张的用户
SELECT * FROM cms_user WHERE username LIKE '张%';

-- 2、查询用户名中包含in的用户
SELECT * FROM cms_user WHERE username LIKE '%in%';

SELECT * FROM cms_user WHERE username LIKE '%'; #相当于查询所有记录

-- 3、查询用户名为3位的用户

SELECT * FROM cms_user WHERE username LIKE '___';

-- 用户名_i%
SELECT * FROM cms_user WHERE username LIKE '_I%';

SELECT * FROM cms_user WHERE username LIKE 'king';

SELECT * FROM cms_user WHERE username NOT LIKE '_I%';

```



三十、WHERE查询条件*逻辑运算符

```
-- 1、查询用户名为king并且密码为king的用户
SELECT * FROM cms_user WHERE username='king' AND password='king';

-- 查询编号大于等于3的变量年龄不为NULL的用户

SELECT * FROM cms_user WHERE id>=3 AND age IS NOT NULL;

-- 查询编号大于等于3的变量年龄不为NULL的用户 并且proId为的3
SELECT * FROM cms_user WHERE id>=3 AND age IS NOT NULL AND proId=3;

-- 查询编号在5~10的用户并且用户名为4位的用户

SELECT * FROM cms_user WHERE id BETWEEN 5 AND 10 AND username LIKE '____';

-- 2、查询用户名以张开始或者用户所在身份为2,4的记录
SELECT * FROM cms_user WHERE username LIKE '张%' OR proId IN(2,4);

```

### 作业：

1）大家自己写一些条件，把能用到的这些都用进去，自己尝试一下，需要多写。



# 三一、GROUP BY 分组查询

会把字段或值相同的放在一个组里。

分组后只会显示组中的第一条记录。

```
-- 1、按照用户所属省份分组proId
SELECT * FROM cms_user GROUP BY proId; # 只显示5条记录，分别是5个省份的第一条记录

-- 2、向用户表中添加性别字段

ALTER TABLE cms_user ADD sex ENUM('男','女','保密');

UPDATE cms_user SET sex='男' WHERE id IN(1,3,5,7,9);

UPDATE cms_user SET sex='女' WHERE id IN(2,4,6,8,10);

UPDATE cms_user SET sex='女' WHERE id IN(2,4,6,8,10);

UPDATE cms_user SET sex='保密' WHERE id IN(12,11);

-- 按照用户性别分组
SELECT * FROM cms_user GROUP BY sex;

-- 按照字段在表中的位置（数字）分组
SELECT * FROM cms_user GROUP BY 7; #7对应的是省份

-- 3、按照多个字段分组

SELECT * FROM cms_user GROUP BY sex,proId;

-- 4、查询编号大于等于5的用户按照sex分组

SELECT * FROM cms_user WHERE id>=5 GROUP BY sex;

```



# 三二、GROUP BY 配合 GROUP_CONCAT 得到分组详情

1）配合 GROUP_CONCAT 得到分组详情

2）配合聚合函数：

* COUNT()
* MAX()
* MIN()
* AVG()
* SUM()

3）配合 WITH ROLLUP 记录上面所有记录的总和。

```
-- 1、一个栏位详情。查询id,sex,用户名详情按照性别分组
SELECT id,sex,GROUP_CONCAT(username) FROM cms_user GROUP BY sex; #按性别分组，得到栏位username的详情

-- 2、多个栏位详情。查询proId，性别详情，注册时间详情，用户名详情 安装proId
SELECT proId,GROUP_CONCAT(username),GROUP_CONCAT(sex),GROUP_CONCAT(regTime)
FROM cms_user GROUP BY proId\G; #用\G显示更整洁

UPDATE cms_user SET age=11 WHERE id=1;
UPDATE cms_user SET age=21 WHERE id=2;
UPDATE cms_user SET age=33 WHERE id=3;
UPDATE cms_user SET age=44 WHERE id=4;
UPDATE cms_user SET age=25 WHERE id=5;
UPDATE cms_user SET age=77 WHERE id=6;
UPDATE cms_user SET age=56 WHERE id=7;
UPDATE cms_user SET age=88 WHERE id=8;
UPDATE cms_user SET age=12 WHERE id=9;
UPDATE cms_user SET age=32 WHERE id=10;
UPDATE cms_user SET age=65 WHERE id=11;
SELECT * FROM cms_user;

-- 3、查询编号,sex,用户名详情以及组中总人数按照sex分组

SELECT id,sex,GROUP_CONCAT(username)AS users,COUNT(*) AS totalUsers FROM cms_user GROUP BY sex; #用*号，统计表中的所有数据

-- 统计表中所有记录

SELECT COUNT(*) AS totalUsers FROM cms_user;

SELECT COUNT(id) AS totalUsers FROM cms_user;

-- COUNT(字段)不统计NULL值
SELECT COUNT(age) AS totalUsers FROM cms_user;

-- 4、查询编号,性别,用户名详情，组中总人数，组中最大年龄，最小年龄，平均年龄，以及年龄总和按照性别分组

SELECT id,sex,GROUP_CONCAT(username),
COUNT(*) AS totalUsers,
MAX(age) AS max_age,
MIN(age) AS min_age,
AVG(age) AS avg_age,
SUM(age) AS sum_age
FROM cms_user
GROUP BY sex;

-- 5、WITH ROLLUP，在表格最后一行统计所有记录值的总和
SELECT id,sex,
COUNT(*) AS totalUsers,
MAX(age) AS max_age,
MIN(age) AS min_age,
SUM(age) AS sum_age
FROM cms_user
GROUP BY sex WITH ROLLUP;

```



# 三三、HAVING 对分组结果进行二次筛选

HAVING 和 WHERE 差不多，前者是对分组结果进行二次筛选，后者是对分组进行一次筛选。

HAVING 只能在分组之后使用。

```
-- 查询性别sex,用户名详情,组中总人数，最大年龄，年龄总和,根据性别分组
SELECT sex,GROUP_CONCAT(username) AS users,
COUNT(*) AS totalUsers,
MAX(age) AS max_age,
SUM(age) AS sum_age
FROM cms_user
GROUP BY sex;

-- 1、查询组中人数大于2的
SELECT sex,GROUP_CONCAT(username) AS users,
COUNT(*) AS totalUsers,
MAX(age) AS max_age,
SUM(age) AS sum_age
FROM cms_user
GROUP BY sex
HAVING COUNT(*)>2;

-- 查询组中人数大于2并且最大年龄大于60的

SELECT sex,GROUP_CONCAT(username) AS users,
COUNT(*) AS totalUsers,
MAX(age) AS max_age,
SUM(age) AS sum_age
FROM cms_user
GROUP BY sex
HAVING COUNT(*)>2 AND MAX(age)>60;

-- 查询编号大于等于2的用户
SELECT sex,GROUP_CONCAT(username) AS users,
COUNT(*) AS totalUsers,
MAX(age) AS max_age,
SUM(age) AS sum_age
FROM cms_user
WHERE id>=2
GROUP BY sex
HAVING COUNT(*)>2 AND MAX(age)>60;

-- 2、如果HAVING没有配合GROUP BY，则查询结果没有起作用
SELECT id,sex,GROUP_CONCAT(username) AS users,
COUNT(*) AS totalUsers,
MAX(age) AS max_age,
SUM(age) AS sum_age
FROM cms_user
WHERE id>=2
HAVING COUNT(*)>2 AND MAX(age)>60;

```



# 三四、ORDER BY 对筛选的结果进行排序

```
SELECT * FROM cms_user;

-- 1、一个字段排序。按照id降序排列 DESC 默认的是ASC
SELECT * FROM cms_user ORDER BY id ; #默认是ASC升序

SELECT * FROM cms_user ORDER BY id ASC;

SELECT * FROM cms_user ORDER BY id DESC;

-- 按照年龄升序排列
SELECT * FROM cms_user ORDER BY age ASC;

SELECT * FROM cms_user ORDER BY 1 DESC; #1是字段的位置

UPDATE cms_user SET age=12 WHERE id=5;

-- 2、多个字段排序。如果第一个字段的值相同，会按照第二个字段的值来排序。

SELECT * FROM cms_user ORDER BY age ASC,id DESC;

SELECT id,age,sex,GROUP_CONCAT(username),COUNT(*) AS totalUsers,SUM(age) AS sum_age
FROM cms_user
WHERE id>=2
GROUP BY sex
HAVING COUNT(*)>=2
ORDER BY age DESC,id ASC;

-- 3、实现记录随机
SELECT * FROM cms_user ORDER BY RAND();

```



# 三五、LIMIT 对查询结果，限制显示条数

1）LIMIT 显示条数xx，显示查询结果的前xx条。

2）做分页经常用，通过两个参数：LIMIT偏移量、显示条数xx

```
-- 1、查询表中前3条记录

SELECT * FROM cms_user LIMIT 3;

SELECT * FROM cms_user ORDER BY id DESC LIMIT 5;

-- 2、0,1表示起始点是第0笔数据开始（不包含0），每页显示数量1
SELECT * FROM cms_user LIMIT 1;

SELECT * FROM cms_user LIMIT 0,1;

SELECT * FROM cms_user LIMIT 0,5; #相当于第一页显示5条

SELECT * FROM cms_user LIMIT 5,5 #相当于第二页显示5条

SELECT * FROM cms_user LIMIT 10,5; #相当于第三页显示5条。显示的是id为11、12的两笔（因为总共只有12笔数据）

```

### 3、复习，写一个完整的SELECT语句

* SELECT语句一定要自己敲会，多练习。因为查询时sql中的重点，以后再写程序的过程中也经常会使用到，来帮你完成一些功能。

```
SELECT id,sex,age,GROUP_CONCAT(username),
COUNT(*) AS totalUsers,
MAX(age) AS max_age,
MIN(age) AS min_age,
AVG(age) AS avg_age,
SUM(age) AS sum_age
FROM cms_user
WHERE id>=1
GROUP BY sex
HAVING COUNT(*)>=2
ORDER BY age DESC
LIMIT 0,2;

```



# 三六、配合SELECT语法 更新|删除应用

```
SELECT * FROM cms_user;

-- 1、LIKE。更新用户名为4位的用户，让其已有年龄-3

UPDATE cms_user SET age=age-3 WHERE username LIKE '____';

-- 2、LIMIT只能写一个参数。更新前3条记录，让已有年龄+10
UPDATE cms_user SET age=age+10 LIMIT 3; #注意：用LIMIT做更新/删除时，只能写一个参数

UPDATE cms_user SET age=age+10 LIMIT 0,3; #报错

-- 3、排序。按照id降序排列，更新前3条

UPDATE cms_user SET age=age+10 ORDER BY id DESC LIMIT 3;

-- ①、删除用户性别为男的用户，按照年龄降序排列，删除1前一条记录

DELETE FROM cms_user WHERE sex='男' ORDER BY age DESC LIMIT 1;

```



# ===============================

# 三七、多表间 内连接查询（综合SELECT写多个例子）

连接查询：就是将两个或两个以上的表，按某个条件连接起来，从中选区想要的数据。

内连接用的最多，所以以下写出很多例子，要多练。

* 内连接查询

  * JOIN|CROSS JOIN|INNER JOIN，三种语法效果相同

  * 通过 ON 来写连接条件

  * 用来显示两个表中符合连接条件的记录

* 外连接查询

  * 左外连接 LEFT JOIN

    * 显示左表的全部记录，及右表符合连接条件的记录

  * 右外连接 RIGHT JOIN

    * 显示右表的全部记录，及左表符合连接条件的记录

```
-- ①、失败的案例。查询cms_user id,username
-- provinces,proName
SELECT cms_user.id,username,proName FROM cms_user,provinces; #失败。得到的结果像是排列组合的一样远远多于我们的预期

-- ②、通过WHERE修改案例，成功但不是首选。因为WHERE多用于第一次筛选。cms_user的proId对应省份表中的id
SELECT cms_user.id,username,proName FROM cms_user,provinces

WHERE cms_user.proId=provinces.id;

-- 1、内连接查询。查询cms_user表中id,username,email,sex。查询provinces表proName。

SELECT u.id,u.username,u.email,u.sex,p.proName

FROM cms_user AS u

INNER JOIN provinces AS p

ON u.proId=p.id;


SELECT u.id,u.username,u.email,u.sex,p.proName

FROM provinces AS p

CROSS JOIN cms_user AS u

ON u.proId=p.id;


SELECT u.id,u.username,u.email,u.sex,p.proName

FROM provinces AS p

JOIN cms_user AS u

ON u.proId=p.id;

-- 综合1，用WHERE加上条件。查询cms_user id,username,sex。查询provinces proName。条件是cms_user的性别为男的用户

SELECT u.id,u.username,u.sex,p.proName

FROM cms_user AS u

JOIN

provinces AS p

ON u.proId=p.id

WHERE u.sex='男';

-- 综合2。根据proName分组

SELECT u.id,u.username,u.sex,p.proName,COUNT(*) AS totalUsers,GROUP_CONCAT(username)

FROM cms_user AS u

JOIN

provinces AS p

ON u.proId=p.id

WHERE u.sex='男'

GROUP BY p.proName;

-- 综合3。对分组结果进行筛选,选出组中人数>=1的
SELECT u.id,u.username,u.sex,p.proName,COUNT(*) AS totalUsers,GROUP_CONCAT(username)

FROM cms_user AS u

JOIN

provinces AS p

ON u.proId=p.id

WHERE u.sex='男'

GROUP BY p.proName

HAVING COUNT(*)>=1;

-- 综合4。按照id升序排列

SELECT u.id,u.username,u.sex,p.proName,COUNT(*) AS totalUsers,GROUP_CONCAT(username)

FROM cms_user AS u

JOIN

provinces AS p

ON u.proId=p.id

WHERE u.sex='男'

GROUP BY p.proName

HAVING COUNT(*)>=1

ORDER BY u.id ASC;


-- 综合5。限制显示条数，前2条
SELECT u.id,u.username,u.sex,p.proName,COUNT(*) AS totalUsers,GROUP_CONCAT(username)

FROM cms_user AS u

JOIN

provinces AS p

ON u.proId=p.id

WHERE u.sex='男'

GROUP BY p.proName

HAVING COUNT(*)>=1

ORDER BY u.id ASC

LIMIT 0,2;

-- 综合6。查询cms_news中的id,title。查询cms_cate 中的cateName。（这两个表的连接条件是新闻表的分类cID对应管理员表的id）

SELECT n.id,n.title,c.cateName FROM

cms_news AS n

JOIN

cms_cate AS c

ON n.cId=c.id;

-- 综合7。cms_news id,title。cms_admin username,role。（这两个表的连接条件是新闻表的创建人aID对应管理员表的id）

SELECT n.id,n.title,a.username,a.role

FROM

cms_news AS n

JOIN

cms_admin AS a

ON n.aId=a.id;

-- 综合8，三张表的查询。cms_news id ,title。cms_cate cateName。cms_admin username,role。（表一是表二的连接条件是cID=表一的id，表一和表三的连接条件是aID=表一的id）

SELECT n.id,n.title,c.cateName,a.username,a.role

FROM cms_cate AS c

JOIN

cms_news AS n

ON n.cId=c.id

JOIN

cms_admin AS a

ON n.aId=a.id;

```



# 三八、多表间 外连接查询（综合SELECT写多个例子）

```
-- 插入错误的数据，即一个不存在的省份proID=20。

INSERT cms_user(username,password,regTime,proId)

VALUES('TEST2','TEST2','1381203974',20);


-- 1、左外连接，以左表为主表。因为proID=20是在主表中，所以不用通过u.proId=p.id进行查询，所以查询结果有这条记录。

SELECT u.id,u.username,u.email,u.sex,p.proName

FROM cms_user AS u

LEFT JOIN provinces AS p

ON u.proId=p.id;


-- 换一下顺序看看。因为proID=20不在主表中，所以要通过u.proId=p.id进行查询，所以查询结果没有这条记录。

SELECT u.id,u.username,u.email,u.sex,p.proName

FROM provinces AS p

LEFT JOIN cms_user AS u

ON u.proId=p.id;

-- 2、右外连接，以右表为主表。结果，又能查询到proID=20的记录。

SELECT u.id,u.username,u.email,u.sex,p.proName

FROM provinces AS p

RIGHT JOIN cms_user AS u

ON u.proId=p.id;

```



# 三九、外键操作

外键，作用保证数据的完整性、一致性，防止垃圾数据的插入。

外键是表的一个字段（或说栏位）。被参照的表是主表（如部门），外键所在的表是子表（如员工）。要先有主表（如部门）再有子表（如员工）。

外键，用来建立子表与父表的关联关系。当父表修改数据时，子表也会跟着改变。
比如，CONSTRAINT emp_fk_dep FOREIGN KEY(depId) REFERENCES department(id)

* 可以实现一对多、多对多关系。

* 父表和子表的存储引擎必须都是InnoDB，而且禁止使用临时表。

* 外键列和参照列必须是相似的数据类型。其中数字的长度或是否有符号位必须相同，而字符的长度则可以不同。

* 外键列和参照列必须创建索引。如果外键列不创建索引，mysql将会自动创建索引。当外键被删除时，索引不会被删除。

外键约束的参照操作：

* CASCADE，父表删除或更新时，子表会跟着删除或更新。

* SET NULL，父表删除或更新时，子表设置为NULL。但要确保子表不是NOT NULL。

* 默认是RESTRICT，或者说NO ACTION。即拒绝对父表的更新、删除操作。

```
-- ①、创建部门表department(主表)
-- id depName
CREATE TABLE IF NOT EXISTS department(
id TINYINT UNSIGNED AUTO_INCREMENT KEY,
depName VARCHAR(20) NOT NULL UNIQUE
)ENGINE=INNODB;

INSERT department(depName) VALUES('教学部'),
('市场部'),
('运营部'),
('督导部');

-- 创建员工表employee(子表)。id ,username ,depId。
CREATE TABLE IF NOT EXISTS employee(
id SMALLINT UNSIGNED AUTO_INCREMENT KEY,
username VARCHAR(20) NOT NULL UNIQUE,
depId TINYINT UNSIGNED
)ENGINE=INNODB;

INSERT employee(username,depId) VALUES('king',1),
('queen',2),
('张三',3),
('李四',4),
('王五',1);

SELECT e.id,e.username,d.depName FROM
employee AS e
JOIN
department AS d
ON e.depId=d.id;

-- 发现问题。当删除督导部时，删除部门后，这个部门下的员工还在。
DELETE FROM department WHERE depName='督导部';
SELECT * FROM employee; #发现有问题。

-- 先把上面的测试表删除
DROP TABLE employee,department;

-- 1、创建部门表department(主表)。id depName。
CREATE TABLE IF NOT EXISTS department(
id TINYINT UNSIGNED AUTO_INCREMENT KEY,
depName VARCHAR(20) NOT NULL UNIQUE
)ENGINE=INNODB;

INSERT department(depName) VALUES('教学部'),
('市场部'),
('运营部'),
('督导部');

-- 2、创建子表，并加入外键。创建员工表employee(子表)
-- id ,username ,depId
CREATE TABLE IF NOT EXISTS employee(
id SMALLINT UNSIGNED AUTO_INCREMENT KEY,
username VARCHAR(20) NOT NULL UNIQUE,
depId TINYINT UNSIGNED,
FOREIGN KEY(depId) REFERENCES department(id)
)ENGINE=INNODB;

INSERT employee(username,depId) VALUES('king',1),
('queen',2),
('张三',3),
('李四',4),
('王五',1);

-- 查询刚刚的创建
DESC employee; #发现，在外键的Key列多了一个索引MUL
SHOW CREATE TABLE name; #发现，多了mysql自动创建了外键名称CONSTRAINT 'employee_ibfk_1'。当删除外键时，就会用到这个名称。

-- 失败。删除主表中的部门
DELETE FROM department WHERE id=1; #报错，因为有约束

-- 成功。先删除子表employee中的属于1部门的员工，再删除主表部门。
DELETE FROM employee WHERE depId=1;
DELETE FROM department WHERE id=1;

-- 失败。插入一个不存在的部门11时，属于垃圾数据。
INSERT employee(username,depId) VALUES('test',11);

```



# 四十、外键操作 添加|删除

```
-- 第一部分：常规操作

-- 删除员工表
DROP TABLE employee;

-- 用CONSTRAINT，指定外键名称
CREATE TABLE IF NOT EXISTS employee(
id SMALLINT UNSIGNED AUTO_INCREMENT KEY,
username VARCHAR(20) NOT NULL UNIQUE,
depId TINYINT UNSIGNED,
CONSTRAINT emp_fk_dep FOREIGN KEY(depId) REFERENCES department(id)
)ENGINE=INNODB;

SELECT * FROM department;
INSERT employee(username,depId) VALUES('king',3),
('queen',2),
('张三',3),
('李四',4),
('王五',2);

-- 1、删除外键。
-- 当创建外键时mysql会自动添加索引，但是当外键被删除了索引还在。
ALTER TABLE employee DROP FOREIGN KEY emp_fk_dep;
DESC employee; #发现索引MUL还在

-- 删除外键后，又可以直接删除部门。但是部门下的员工还在。
DELETE FROM department WHERE id=2;
SELECT * FROM employee;

-- 2、添加外键。
-- 直接ALTER添加会失败，因为上面刚把部门2删除，但部门2的员工没有删除，所以要先删除。
DELETE FROM employee WHERE depID=2;
ALTER TABLE employee ADD CONSTRAINT emp_fk_dep FOREIGN KEY(depId) REFERENCES department(id);
SHOW CREATE TABLE employee;

```

```
-- 第二部分：用CASCADE，父表删除或更新子表也会自动跟着删除或更新。

-- 删除以上用到的表
DROP TABLE employee,department;

-- 重新创建父表
CREATE TABLE IF NOT EXISTS department(
id TINYINT UNSIGNED AUTO_INCREMENT KEY,
depName VARCHAR(20) NOT NULL UNIQUE
)ENGINE=INNODB;

INSERT department(depName) VALUES('教学部'),
('市场部'),
('运营部'),
('督导部');

-- 创建员工表employee(子表)
-- id ,username ,depId
CREATE TABLE IF NOT EXISTS employee(
id SMALLINT UNSIGNED AUTO_INCREMENT KEY,
username VARCHAR(20) NOT NULL UNIQUE,
depId TINYINT UNSIGNED,
FOREIGN KEY(depId) REFERENCES department(id) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=INNODB;

INSERT employee(username,depId) VALUES('king',1),
('queen',2),
('张三',3),
('李四',4),
('王五',1);

-- 删除部门表中的第一个部门
DELETE FROM department WHERE id=1;

-- 更新部门
UPDATE department SET id=id+10; #失败，因为id和depID关联

-- 先删除资料，再更新
DELETE FROM employee;
UPDATE department SET id=id+10; #成功

```

```
-- 第三部分：SET NULL，父表删除或更新时，子表设置为NULL。但要确保子表不是NOT NULL。

-- 删除以上用到的表
DROP TABLE employee,department;

-- 重新创建父表
CREATE TABLE IF NOT EXISTS department(
id TINYINT UNSIGNED AUTO_INCREMENT KEY,
depName VARCHAR(20) NOT NULL UNIQUE
)ENGINE=INNODB;

INSERT department(depName) VALUES('教学部'),
('市场部'),
('运营部'),
('督导部');

-- 创建员工表employee(子表)
-- id ,username ,depId
CREATE TABLE IF NOT EXISTS employee(
id SMALLINT UNSIGNED AUTO_INCREMENT KEY,
username VARCHAR(20) NOT NULL UNIQUE,
depId TINYINT UNSIGNED,
FOREIGN KEY(depId) REFERENCES department(id) ON DELETE SET NULL ON UPDATE SET NULL
)ENGINE=INNODB;

INSERT employee(username,depId) VALUES('king',1),
('queen',2),
('张三',3),
('李四',4),
('王五',1);

```

这里使用的外键都是纯的物理外键。如果数据库存储引擎不是InnoDB的，这时它可能就不只是外键了。

所以说，大家也可以使用这种逻辑外键的形式。

什么叫逻辑外键？即按照外键的思想来做我们的操作。比如，以新闻表为例，当你想删除一个分类的时候，不论是否有外键，你都应该考虑到这个分类下是否有新闻。如果有新闻，就要先把新闻删除掉，再来删除分类。



# 四一、外键操作 联合查询

当我们想查询多个表中的记录，并且把它们合并到一起时，就可以用联合查询。

* UNION，会去掉相同的记录。

* UNION ALL，简单的合并。

```
-- 1、UNION
SELECT username FROM employee UNION SELECT username FROM cms_user;

-- 2、UNION ALL
SELECT username FROM employee UNION ALL SELECT username FROM cms_user;

-- 报错。注意：查询的表格字段数目要相同。
SELECT id,username FROM employee UNION ALL SELECT username,age FROM cms_user;

```



# 四二、子查询 IN、比较运算符、EXISTS

1）什么是子查询？是将一个查询语句嵌套在另一个查询语句中，内层查询语句的结果可以作为外层查询语句的条件。

执行过程是，先执行内层查询，再执行外层查询。

2）什么情况会使用子查询？

* 使用IN

* 使用比较运算符 =、≥、≤等

* 使用EXISTS子查询

  * EXISTS内层查询为真才能执行查询语句，如果为假则外层的查询语句不会执行。

* 使用ANY|SOME、以及ALL

重新载入测试数据

3）将查询结果写入到数据表中。

* INSERT name SELECT ...即通过SELECT查询出结果，再把结果INSERT插入到数据表中。

4）创建数据表同时将查询结果写入到数据表。

* CREATE TABLE name select_statement

```
-- 删除以上用到的表
DROP TABLE employee,department;

-- 重新创建父表
CREATE TABLE IF NOT EXISTS department(
id TINYINT UNSIGNED AUTO_INCREMENT KEY,
depName VARCHAR(20) NOT NULL UNIQUE
)ENGINE=INNODB;

INSERT department(depName) VALUES('教学部'),
('市场部'),
('运营部'),
('督导部');

-- 创建员工表employee(子表)
-- id ,username ,depId
CREATE TABLE IF NOT EXISTS employee(
id SMALLINT UNSIGNED AUTO_INCREMENT KEY,
username VARCHAR(20) NOT NULL UNIQUE,
depId TINYINT UNSIGNED,
FOREIGN KEY(depId) REFERENCES department(id) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=INNODB;

INSERT employee(username,depId) VALUES('king',1),
('queen',2),
('张三',3),
('李四',4),
('王五',1);

```

1、使用IN的子查询

```
SELECT * FROM department;
SELECT * FROM employee;

-- 由IN引发的子查询。其中(1,2,3,4)是第一个语句查询出来的id集合。
SELECT id FROM department;

SELECT id,username FROM employee WHERE depId IN(1,2,3,4);

-- 1、IN子查询。合并两个语句得到如下：
SELECT id,username FROM employee WHERE depId IN(SELECT id FROM department);

-- 2、NOT IN的写法如下：
SELECT id,username FROM employee WHERE depId NOT IN(SELECT id FROM department);


-- 如果成功写入一个垃圾数据（没有部门8）。用 子查询IN 是查询不到这一笔的。
-- 如果用 NOT IN 就可以查到这笔数据。
INSERT employee(username,depId) VALUES('testtest',8);

SELECT id,username FROM employee WHERE depId IN(SELECT id FROM department); #查不到8这笔资料

SELECT id,username FROM employee WHERE depId NOT IN(SELECT id FROM department); #查到8这笔资料

```

2、使用比较运算符=、≥、≤等的子查询。

```
--　创建学员表student
-- id username score
CREATE TABLE IF NOT EXISTS student(
id TINYINT UNSIGNED AUTO_INCREMENT KEY,
username VARCHAR(20)  NOT NULL UNIQUE,
score TINYINT UNSIGNED
);

INSERT student(username,score) VALUES('king',95),
('king1',35),
('king2',45),
('king3',55),
('king4',65),
('king5',75),
('king6',80),
('king7',90),
('king8',25);

-- 创建奖学金scholarship
-- id ,level

CREATE TABLE IF NOT EXISTS scholarship(
id TINYINT UNSIGNED AUTO_INCREMENT KEY,
level TINYINT UNSIGNED
);
INSERT scholarship(level) VALUES(90),(80),(70);


-- 查询获得1等奖学金（分数90）的学员有

SELECT level FROM scholarship WHERE id=1;

SELECT id,username FROM student WHERE score>=90;

-- 1、>=子查询。合并以上两个语句得到如下：

SELECT id,username FROM student WHERE score>=(SELECT level FROM scholarship WHERE id=1);

-- 2、EXISTS子查询。为真时会执行查询，为假时不执行查询。

SELECT * FROM department WHERE id=5; #没有部门5

SELECT id,username FROM employee WHERE EXISTS(SELECT * FROM department WHERE id=5); #查询一个不存在的部门5，EXISTS为假，所以查询结果为空

SELECT id,username FROM employee WHERE EXISTS(SELECT * FROM department WHERE id=4); #EXISTS为真，所以有返回结果

SELECT id,username FROM employee WHERE NOT EXISTS(SELECT * FROM department WHERE id=41); #假假为真，有返回结果

```



# 四三、子查询 ANY|SOME、ALL

<img src="https://ws4.sinaimg.cn/large/006tNc79gy1fozpa7kf6nj30f603f0sy.jpg" width="500">

1、子查询 ANY|SOME、ALL

```
-- 1、>时，ANY|SOME（最小值）子查询。查询所有获得奖学金的学员
SELECT id,username,score FROM student WHERE score>=ANY(SELECT level FROM scholarship);


SELECT id,username,score FROM student WHERE score>=SOME(SELECT level FROM scholarship);

-- 2、>时，ALL（最大值）子查询。查询所有学员中获得一等奖学金的学员
SELECT id,username,score FROM student WHERE score >=ALL(SELECT level FROM scholarship);

-- 3、<时，ALL（最小值）子查询。查询学员表中没有获得奖学金的学员

SELECT id,username,score FROM student WHERE score<ALL(SELECT level FROM scholarship);

-- 4、<时，ANY（最大值）子查询。查询学员表中没有获得奖学金的学员
SELECT id,username,score FROM student WHERE score<ANY(SELECT level FROM scholarship);

SELECT id,username,score FROM student WHERE score<=ANY(SELECT level FROM scholarship);

-- 5、=时，ANY（任意值）子查询，相当于IN的效果。
SELECT id,username,score FROM student WHERE score=ANY(SELECT level FROM scholarship);

SELECT id,username,score FROM student WHERE score IN(SELECT level FROM scholarship);

-- 6、!=或<>时，ALL（任意值）子查询，相当于NOT IN的从效果。
SELECT id,username,score FROM student WHERE score NOT IN(SELECT level FROM scholarship);

SELECT id,username,score FROM student WHERE score <> ALL(SELECT level FROM scholarship);

```

2、将查询结果写入到数据表中。

* INSERT name SELECT ...即通过SELECT查询出结果，再把结果INSERT插入到数据表中。

```
CREATE TABLE test1 (
id TINYINT UNSIGNED AUTO_INCREMENT KEY,
num TINYINT UNSIGNED
);

-- 1、把查询结果写入数据表中
INSERT test1(id,num) SELECT id,score FROM student;
SELECT * FROM test1;

```

3）创建数据表同时将查询结果写入到数据表。

* CREATE TABLE name select_statement

```
-- 2、创建数据表同时将查询结果写入到数据表
CREATE TABLE test2 (
id TINYINT UNSIGNED AUTO_INCREMENT KEY,
num TINYINT UNSIGNED
)SELECT id,score FROM student;

CREATE TABLE test3 (
id TINYINT UNSIGNED AUTO_INCREMENT KEY,
score TINYINT UNSIGNED
)SELECT id,score FROM student;

```



# 四四、正则表达式查询

1）REGEXP '匹配方式'

2）常用的匹配方式

* ^，匹配字符开始

* $，匹配字符结尾

* .，任意字符，包括回车、换行

* [字符集合]，匹配集合中任一字符

* [^字符集合]，匹配集合外任一字符

* S1|S2|S3，匹配S1S2S3中任一字符串

* *，大于等于0个前面的字符

* +，大于等于1个前面的字符

* String(N)，字符串出现N次

* 字符串{M,N}，M次≤字符串出现≤N次

<img src="https://ws2.sinaimg.cn/large/006tNc79gy1fozpb6rq9ij30f707ldgv.jpg" width="500">

```
-- 1、^匹配字符开始的部分。不区分大小写。
-- 查询用户名以t开始的用户
SELECT * FROM cms_user WHERE username REGEXP '^t';

-- 2、$匹配字符串结尾的部分
SELECT * FROM cms_user WHERE username REGEXP 'g$';

-- 3、.代表任意字符。对比前面学的LIKE模糊查询。
SELECT * FROM cms_user WHERE username REGEXP '.';
SELECT * FROM cms_user WHERE username REGEXP 'r..g';
SELECT * FROM cms_user WHERE username LIKE 'r__g';

-- 4、[字符集合] [lto]
SELECT * FROM cms_user WHERE username REGEXP '[lto]';

-- 5、[^字符集合] 除了字符集合中的内容
SELECT * FROM cms_user WHERE username REGEXP '[^lto]';
SELECT * FROM cms_user WHERE username REGEXP '[^l]';

INSERT cms_user(username,password,regTime,proId)
VALUES('lll','lll',138212349,2),
('ttt','lll',138212349,2),
('ooo','lll',138212349,2);

SELECT * FROM cms_user WHERE username REGEXP '[a-k]';

SELECT * FROM cms_user WHERE username REGEXP '[^a-m]';

-- 6、| 或。
SELECT * FROM cms_user WHERE username REGEXP 'ng|qu';

SELECT * FROM cms_user WHERE username REGEXP 'ng|qu|te';

-- 7、*，大于等于0个前面字符。
SELECT * FROM cms_user WHERE username REGEXP 'que*';

-- 8、+，大于等于1个前面字符。
SELECT * FROM cms_user WHERE username REGEXP 't+';

SELECT * FROM cms_user WHERE username REGEXP 'que+';

-- 9、{N}，字符出现N次。
SELECT * FROM cms_user WHERE username REGEXP 'que{2}';

SELECT * FROM cms_user WHERE username REGEXP 'que{3}';

-- 10、{M,N}，字符出现的最小最大次数
SELECT * FROM cms_user WHERE username REGEXP 'que{1,3}';

```



# 四五、mysql运算符

本节内容，练习方法如`SELECT 1+3;`。

1、算数。

<img src="https://ws3.sinaimg.cn/large/006tNc79gy1fozpw8bhe1j30ez05et90.jpg" width="500">

2、比较。

* 结果只能为真或假。

<img src="https://ws2.sinaimg.cn/large/006tNc79gy1fozpxyxr9qj30f108hq4l.jpg" width="500">

3、逻辑。

<img src="https://ws2.sinaimg.cn/large/006tNc79gy1fozq2ziqw7j30ez03dmxa.jpg" width="500">

4、运算符的优先级

<img src="https://ws4.sinaimg.cn/large/006tNc79gy1fozq3kd6ssj30f005et99.jpg" width="500">

* XOR，两个不同为真，两个相同为假。
  * 比如，1 XOR 0 = 1，1 XOR 1 = 0。

* 通过()可以改变优先级。

> NULL的大多数运算结果都为NULL，!NULL=NULL。



# =============================

# 四六、四七、四八、四九、五十、函数库

本节内容，练习方法如`SELECT FLOOR(3.14);`。

1、数学函数

<img src="https://ws4.sinaimg.cn/large/006tNc79gy1fozqbqcxbhj30ey081aaw.jpg" width="600">

2、字符串函数

<img src="https://ws1.sinaimg.cn/large/006tNc79gy1fozql10w1gj30jw08pac1.jpg" width="600">

<img src="https://ws4.sinaimg.cn/large/006tNc79gy1fozqoy3n7aj30gh04e0t5.jpg" width="400">

<img src="https://ws3.sinaimg.cn/large/006tNc79gy1fozqo6yi5nj30ju08ztat.jpg" width="600">

3、日期时间函数

<img src="https://ws2.sinaimg.cn/large/006tNc79gy1fozqssh94gj30jz08vaby.jpg" width="500">

<img src="https://ws4.sinaimg.cn/large/006tNc79gy1fozqun1u5rj30i505awf0.jpg" width="500">

4、条件判断函数

<img src="https://ws4.sinaimg.cn/large/006tNc79gy1fozqvns99jj30jx05fwfy.jpg" width="500">

5、系统信息函数

<img src="https://ws2.sinaimg.cn/large/006tNc79gy1fozqwihxbej30k308r40k.jpg" width="500">

6、加密函数

<img src="https://ws2.sinaimg.cn/large/006tNc79gy1fozqx3buedj30jz04d3z7.jpg" width="500">

7、其他常用函数

<img src="https://ws4.sinaimg.cn/large/006tNc79gy1fozqxu7hipj30k909y0uv.jpg" width="500">



# 五一、索引的使用

1、索引由数据库中的一列或多列组成的。作用是提高数据的查询速度。

2、索引的分类：

* 普通索引

  * 相当于建立书签

* 唯一索引

  * UNIQUE

* 全文索引

  * 只有内容全是英文的才能用

* 单列索引

  * 在一个字段上创建

* 多列索引

  * 在多个字段上创建

* 空间索引

  * 用的少。要求字段是空间类型。

InnoDB、MyISAM ，支持闭区索引。MEMORY，支持哈希索引和闭区索引，默认使用哈希索引。

3、如何创建索引？

* 创建表的时候创建索引，指定INDEX。

* 在旧表上创建索引。

  * CREATE INDEX name ON 表名(字段名);

  * ALTER TABLE name ADD INDEX 索引名(字段名);

4、如何删除索引？

* DROP INDEX 索引名称 ON name

```
-- 1、INDEX。创建普通索引
CREATE TABLE test4(
id TINYINT UNSIGNED,
username VARCHAR(20),
INDEX in_id(id),
KEY in_username(username)
);

DROP INDEX in_id ON test4;
DROP INDEX in_username ON test4;
CREATE INDEX in_id ON test4(id);
ALTER TABLE test4 ADD INDEX in_username(username);

-- 2、UNIQUE KEY。创建唯一索引
CREATE TABLE test5(
id TINYINT UNSIGNED AUTO_INCREMENT KEY,
username VARCHAR(20) NOT NULL UNIQUE,
card CHAR(18) NOT NULL,
UNIQUE KEY uni_card(card)
);
ALTER TABLE test5 DROP INDEX uni_card;
DROP INDEX username ON test5;
CREATE UNIQUE INDEX uni_username ON test5(username);
ALTER TABLE test5 ADD UNIQUE INDEX uni_card(card);

-- 3、FULLTEXT INDEX。创建全文索引
CREATE TABLE test6(
id TINYINT UNSIGNED AUTO_INCREMENT KEY,
username VARCHAR(20) NOT NULL UNIQUE,
userDesc VARCHAR(20) NOT NULL,
FULLTEXT INDEX full_userDesc(userDesc)
);
DROP INDEX full_userDesc ON test6;
CREATE FULLTEXT INDEX full_userDesc ON test6(userDesc);

-- 4、INDEX。创建单列索引
CREATE TABLE test7(
id TINYINT UNSIGNED AUTO_INCREMENT KEY,
test1 VARCHAR(20) NOT NULL,
test2 VARCHAR(20) NOT NULL,
test3 VARCHAR(20) NOT NULL,
test4 VARCHAR(20) NOT NULL,
INDEX in_test1(test1)
);

-- 5、INDEX。创建多列索引
CREATE TABLE test8(
id TINYINT UNSIGNED AUTO_INCREMENT KEY,
test1 VARCHAR(20) NOT NULL,
test2 VARCHAR(20) NOT NULL,
test3 VARCHAR(20) NOT NULL,
test4 VARCHAR(20) NOT NULL,
INDEX mul_t1_t2_t3(test1,test2,test3)
);
ALTER TABLE test8 DROP INDEX mul_t1_t2_t3;
ALTER TABLE test8 ADD INDEX mul_ti_t2_t3(test1,test2,test3);


-- 唯一性的多列索引
CREATE TABLE test9(
id TINYINT UNSIGNED AUTO_INCREMENT KEY,
test1 VARCHAR(20) NOT NULL,
test2 VARCHAR(20) NOT NULL,
test3 VARCHAR(20) NOT NULL,
test4 VARCHAR(20) NOT NULL,
UNIQUE KEY mul_t1_t2_t3(test1,test2,test3)
);

-- 6、SPATIAL INDEX。创建空间索引
CREATE TABLE test10(
id TINYINT UNSIGNED AUTO_INCREMENT KEY,
test GEOMETRY NOT NULL,
SPATIAL INDEX spa_test(test)
)ENGINE=MyISAM;

DROP INDEX spa_test ON test10;

CREATE SPATIAL INDEX spa_test ON test10(test);

```



# 五二、用工具管理数据库*PHPMyAdmin

通过命令写比较痛苦，需要记住的命令好多。通过工具提高开发效率。

但是，刚开始学习，还是建议大家用命令，因为如果你使用工具，那么这条命令你就记不住了。

<img src="https://ws3.sinaimg.cn/large/006tNc79gy1fozrnwxnjkj30tq0ajdj5.jpg" width="600">

1、通过WEB的方式。

* PHPMyAdmin的安装

2、通过客户端的方式。

* SQLyog的安装



# 五三、用工具管理数据库*SQLyog

权限管理、用户管理、备份、视图存储过程，等我们学完这些，再通过命令、或web工具、或客户端工具，来看看如何实现操作。

还是先通过命令来管理数据库。接着再是通过这些好工具来管理。
