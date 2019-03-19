---
title: ror-system-数据库SQL
date: '2017-12-14 00:10'
categories:
  - ror系统
tags:
  - ror系统
img: 'https://ws4.sinaimg.cn/large/006tNc79gy1fnfep1kp2qj30jk0dtwez.jpg'
abbrlink: 19619b26
---

* 201712
* 编程+sql



## 1.1、数据库

* 数据库，可以保存大量数据，还提供了方便的查询(Query)机制，以及提供 CRUD(Create, Read, Update, Delete) 操作。



* 关系型数据库，这种数据库包括开源的 SQLite、MySQL、PostgreSQL，以及需要付费的 Oracle、Microsoft SQL Server 等等。
  * SQLite 是一套轻量级的关系型数据库，也是 Rails 开发时默认的数据库。它的一个数据库就是一个档案。
  * MySQL 是目前最流行的开源数据库。可处理超级大量数据。
  * PostgreSQL 经常与 MySQL 相提并论，是 Heroku 默认的数据库。功能更多。
  * Oracle 和 MS SQL Server有更好的自调优功能。例如银行、保险业等会用。



## 2.1、关系型数据库的特性一: Schema

* Schema 纲要就是使用数据库存数据前，需要先定义 Tables(表) 和 Columns(字段)：
* 通常只会在数据库里面纪录档案的 metadata 例如档名、大小、MimeType 等等，而实际的档案则放在档案系统上，或是上传到七牛或AWS S3等空间。



## 2.2、关系型数据库的特性二: SQL 标准语法

* 关系型数据库都支援使用一种叫做 SQL (Structured Query Language) 的结构化查询语言。我们会用这种语法来操作数据库，例如：

  ```
  INSERT INTO events VALUES ("RubyConf", 100);

  Event.create( :name => "RubyConf", :capacity => 100)
  ```



## 2.3、关系型数据库的特性三: ACID

* 要达成这种跨 Tables 多个 SQL 操作必须同时完成(或失败)的需求，就必须用上 **Transaction 事务**。例如你和别人同时同一秒钟互相转帐，数据库会不会算错馀额？

  * 语法是用 `BEGIN;` 和 `COMMIT;` 把 SQL 句包裹在一起，要么一起成功、要么一起失败。例如：

    ```
    BEGIN;
      INSERT INTO histories (user_id, amount) VALUES (1, -100);
      INSERT INTO histories (user_id, amount) VALUES (2, 100);
      UPDATE accounts SET balance=200 WHERE id=1;
      UPDATE accounts SET balance=300 WHERE id=2;
    COMMIT;
    ```

* 在 Rails 中，每个 model 的 `save` 其实都会用 Transaction 包起来，包括 model 里面的所有 callback

* 如果是跨 model 的话，你也可以用 `ActiveRecord::Base.transaction` 来包裹 `Transaction` 事务，例如：

  ```
  ActiveRecord::Base.transaction do
    A.save
    B.save
    C.save
  end
  ```

* ACID 其实就是在说明 Transactin 的能耐，以下取自 [wikipedia](https://zh.wikipedia.org/zh-cn/ACID):

  * Atomicity 原子性：一个事务（transaction）中的所有操作，要么全部完成，要么全部不完成。
  * Consistency 一致性：在事务开始之前和事务结束以后，数据库的完整性没有被破坏。
  * Isolation 隔离性：数据库允许多个并发事务同时对其数据进行读写和修改的能力。
  * Durability 持久性：事务处理结束后，对数据的修改就是永久的，即便系统故障也不会丢失。



## 3.1、关系型数据库使用 SQL 语言: DDL

* DDL(Data Definition Language)，就是告诉数据库如何去定义 Schema 纲要的SQL。


* 关系型数据库使用 SQL(Structured Query Language) 语言，每个 SQL 句子叫做 SQL Query 或 SQL Statement。
* SQL 分成 DDL 和 DML 两种，都是用分号 `;` 结尾。



## 3.2、建立、删除和更名数据库

* PostgrSQL 可用 utf-8、MySQL 可用 utf8mb4 编码。


* SQLite3的指令`sqlite3 your_db_name.db`。MySQL 指令是 `mysql -u root -p`。PostgreSQL 的指令是 `psql <database_name>`。

  ```
  新建
  CREATE TABLE events (name VARCHAR(50) NOT NULL, capacity INTEGER, date DATE);
  ```

  ```
  修改
  改名 Table，例如 ALTER TABLE persons RENAME TO people;
  新增字串，例如 ALTER TABLE people ADD COLUMN status VARCHAR(50);
  修改和移除字段：SQLite3 没支援，需要开一个新 table 然后把资料复制过去
  ```

  ```
  删除
  DROP TABLE IF EXISTS people;
  ```

* 利用 Migration 来一致管理 Schema， Migration 代码也会放进版本控制系统 Git 里面。



## 3.3、关系型数据库使用SQL 语言: DML

*  DML(Data Manipulation Language)就是操作数据的 SQL ，也就是做 CRUD 的操作。

* 新增资料：INSERT INTO xxxs (栏位1, 栏位2) VALUES (值1, 值2);

   ```
   以下 SQL 会新增数据：
   INSERT INTO events (capacity, name) VALUES (200, "JSConf");
   这个对应的 Rails 语法是 
   Event.create( :capacity => 200, :name => "JSConf")
   ```

   ```
   插入多笔 
   INSERT INTO events (capacity, name) VALUES (300, "COSCUP"), (300, "OSDC.TW");
   ```

* 查找资料：SELECT 栏位1, 栏位2 FROM xxxs;

   ```
   捞全部 events 资料 
   SELECT * FROM events;

   对应的 Rails 语法是 
   Event.all
   ```

   ```
   捞出指定的字段 
   SELECT name, capacity FROM events;

   对应的 Rails 语法是 
   Event.select(:name, :capacity).all
   ```

   ```
   递增排序 SELECT name, capacity FROM events ORDER BY id; 或 SELECT name, capacity FROM events ORDER BY id ASC;

   递减排序 SELECT name, capacity FROM events ORDER BY id DESC;

   分页 SELECT name, capacity FROM events ORDER BY capacity DESC, name ASC LIMIT 20 OFFSET 20;
   ```

* 修改资料：UPDATE xxxs SET 栏位1=值1, 栏位2=值2 WHERE 栏位3=值3; 

  ```
  以下 SQL 会修改 events table 的所有数据把 capacity 改成 10
  UPDATE events SET capacity=10; 

  对应的 Rails 语法是 
  Event.update_all( :capacity => 10 )
  ```

  ```
  用 WHERE 可以指定只有修改 name 是 "RubyConf" 的数据
  UPDATE events SET capacity=100 WHERE name="RubyConf"; 

  对应的 Rails 语法是 
  Event.where( :name => "RubyConf" ).update_all( :capacity => 100)
  ```

  ```
  修改 capacity 和 name
  UPDATE events SET capacity=100, name="RubyConf 2015" WHERE name="RubyConf"; 

  对应的 Rails 语法是 
  Event.where( :name => "RubyConf" ).update_all( :capacity => 100, :name => "RubyConf 2015" )
  ```

  ```
  在 Rails 中，比较常见只修改一笔，例如：
  @event = Event.find(123)
  @event.update( :capacity => 200)

  对应的 SQL 会是
  SELECT * FROM events WHERE id = 123;
  UPDATE events SET capacity=200 WHERE id=123;
  ```

* ​

   删除数据数据







