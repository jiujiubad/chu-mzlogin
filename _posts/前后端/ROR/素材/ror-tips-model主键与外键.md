---
title: ror-tips-model主键与外键
date: '2017-11-16 00:10'
categories:
  - ror知识点
tags:
  - ror知识点
img: 'https://ws1.sinaimg.cn/large/006tNc79gy1fnfwh0s580j305k050a9w.jpg'
abbrlink: a7e5943
---

* 201711
* 编程+ruby



原文地址：https://cnbin.github.io/blog/2015/08/19/sql-zhu-jian-yu-wai-jian/

# SQL 主键与外键

AUG 19TH, 2015 1:34 PM

### 主键与外键

关系型数据库中的一条记录中有若干个属性，若其中某一个属性组(注意是组)能唯一标识一条记录，该属性组就可以成为一个主键

比如

- 学生表(学号，姓名，性别，班级)
- 其中每个学生的学号是唯一的，学号就是一个主键
- 课程表(课程编号,课程名,学分)
- 其中课程编号是唯一的,课程编号就是一个主键
- 成绩表(学号,课程号,成绩)
- 成绩表中单一一个属性无法唯一标识一条记录，学号和课程号的组合才可以唯一标识一条记录，所以 学号和课程号的属性组是一个主键

成绩表中的学号不是成绩表的主键，但它和学生表中的学号相对应，并且学生表中的学号是学生表的主键，则称成绩表中的学号是学生表的外键

同理 成绩表中的课程号是课程表的外键

定义主键和外键主要是为了维护关系数据库的完整性，总结一下： * 主键是能确定一条记录的唯一标识，比如，一条记录包括身份正号，姓名，年龄。身份证号是唯一能确定你这个人的，其他都可能有重复，所以，身份证号是主键。 * 外键用于与另一张表的关联。是能确定另一张表记录的字段，用于保持数据的一致性。比如，A表中的一个字段，是B表的主键，那他就可以是A表的外键。

### 主键、外键和索引的区别

主键、外键和索引的区别？

![img](http://ww1.sinaimg.cn/mw690/78f9859egw1ev7v6ijb4nj20hy03zabe.jpg)

聚集索引和非聚集索引的区别？

聚集索引一定是唯一索引。但唯一索引不一定是聚集索引。

聚集索引，在索引页里直接存放数据，而非聚集索引在索引页里存放的是索引，这些索引指向专门的数据页的数据。

Posted by 陈斌彬 Aug 19th, 2015 1:34 pm  [net](https://cnbin.github.io/blog/categories/net/)