# 第九章 Active Record 的设计



## 9.1 简短的 Active Record 示例

`establish_connection`，手动连接数据库



## 9.2 Active Record 的组成

自动加载：`extend ActiveRecord::AutoLoad`，自动加载 `active_record/base.rb` 文件

active record『include』的模块比较特殊，可以同时得到『实例方法』和『类方法』。实现方法见『第十章』



## 9.3 经验之谈