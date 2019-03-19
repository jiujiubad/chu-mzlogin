---
title: >-
  bug-seed档测试 ActiveRecord--StatementInvalid in
  Devise--SessionsController#create
date: '2017-11-05 05:30'
categories:
  - ror知识点
tags:
  - bug
img: 'https://ws1.sinaimg.cn/large/006tNc79gy1fnfw7fgtkoj30dv0dh0sq.jpg'
abbrlink: 852d9f92
---

* 201711
* 编程+rails



# jdstore4-3，做seed档后，测试报错

# ActiveRecord::StatementInvalid in Devise::SessionsController#create

## SQLite3::ReadOnlyException: attempt to write a readonly database: UPDATE "users" SET "current_sign_in_at" = ?, "last_sign_in_at" = ?, "sign_in_count" = ?, "updated_at" = ? WHERE "users"."id" = ?

    def each
      loop do
        val = step
        break self if done?
        yield val
      end
![](https://ws1.sinaimg.cn/large/006tNc79gy1fl7c5a5xocj31kw0gctch.jpg)





# 原因

seed档里`u.is_admin = true`错写成`u.is_admin`

修改后，`rake db:drop`、 `rake db:migrate`、 `rake db:seed`