---
layout: post
title: 'html表单<input>样式框内显示(输入用户名、密码)'
date: 2017-05-21 14:06
comments: true
categories: 
---
* 201705
* 编程+前端



# html表单input样式框内显示

```
<%= f.input :email, required: true, autofocus: true, label: false, placeholder: "邮箱" %>
```
###required表示必填字段、label: false没有标签、placeholder: "邮箱"表示在input内显示“邮箱”、autofocus: true当页面加载时获得焦点

# 给input标签加class或id属性
<%= f.input :billing_name, :label => t('f-billing-name'), input_html: { class: 'width-50' }%>