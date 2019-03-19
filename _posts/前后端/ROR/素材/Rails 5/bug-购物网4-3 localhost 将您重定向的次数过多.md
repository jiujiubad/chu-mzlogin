---
title: bug-购物网4-3 localhost 将您重定向的次数过多
date: '2017-11-23 08:10'
categories:
  - ror知识点
tags:
  - bug
img: 'https://ws1.sinaimg.cn/large/006tNc79gy1fnfw7fgtkoj30dv0dh0sq.jpg'
abbrlink: 936990c3
---

* 201711
* 编程+rails



![](https://ws3.sinaimg.cn/large/006tNc79gy1flqo52990xj30im0nidhn.jpg)



### 删除cookie没用，删除`redirect_to root_path`有效

```
  def admin_required
    if !current_user.admin?
      redirect_to root_path
      flash[:alert] = "请用管理员账号登录"
    end
  end
```

### 代码里的`redirect_to root_path`，和路由里的`root "admin/products#index"`冲突，导致网页无限循环重定向。



## 解决办法：修改主页如`root "welcome#index"`