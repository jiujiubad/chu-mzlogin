---
title: ror-system-百宝箱所有功能一览
date: '2018-01-09 00:10'
categories:
  - ror系统
tags:
  - ror系统
img: 'https://ws4.sinaimg.cn/large/006tNc79gy1fnfep1kp2qj30jk0dtwez.jpg'
abbrlink: 5ee8c435
top: 1
---

* 201801
* 编程+rails



luccake最必要：13. Rich Editor，10嵌套表单+19多图

小鑫数据项目：



# 2. 自定义 Model 网址

1）数字加文字ID、乱数token ID、用户自定义ID



# 3. 多语言设置



# 4. 时区设置



# 5. 格式化日期时间、时区



# 6. 表单单选 UI

![](https://ws2.sinaimg.cn/large/006tNc79gy1fmw9exs952j30mm07faa5.jpg)



# 7. 表单单选 UI 和 Select2 Plugin

![](https://ws4.sinaimg.cn/large/006tNc79gy1fmw9gays88j30mg09fglo.jpg)



# 8. 表单多选 UI 和 Select2 Plugin

![](https://ws3.sinaimg.cn/large/006tNc79gy1fmw9h75i4gj30lv07l3yj.jpg)



# 9. 嵌套表单(1-to-1)

![](https://ws2.sinaimg.cn/large/006tNc79gy1fmw9jebwzqj30kr0g7aa7.jpg)



# 10. 嵌套表单(1-to-many)

![](https://ws3.sinaimg.cn/large/006tNc79gy1fmw9lql05hj30ls0hdwf1.jpg)



# 11. 选日期时间的 UI

## 1、应用场景

1）预约做蛋糕。

![](https://ws4.sinaimg.cn/large/006tNc79gy1fmw6zdyrplj30ce09xt8w.jpg)



# 12. 拆开前后台的 CSS 和 JS

## 1、应用场景

1）项目开始时就可以做，拆分后后台代码不用让用户下载。



# 13. Rich Editor 图文编辑器之[ckeditor](http://ckeditor.com)

## 1、应用场景

1）图文编辑用于发布文章，支持输入html。

2）商品详情页发布商品图文信息。

![](https://ws1.sinaimg.cn/large/006tNc79gy1fmw779jnaoj30nv0dhdgy.jpg)



# 14. 批次编辑 (Bulk Editing)

## 1、应用场景

1）后台编辑多笔资料，通过核选框批量删除、批量修改。

![](https://ws2.sinaimg.cn/large/006tNc79gy1fmw7ch5oudj30ny0akaac.jpg)



# 15. 自订列表顺序

## 1、应用场景

1）后台商品、分类修改id进行排序，可以加入ajax拖动排序效果。

![](https://ws1.sinaimg.cn/large/006tNc79gy1fmw7ek3bnsg30lq0jy1ky.gif)

# 16. 多步骤表单

## 1、应用场景

1）用户注册时，要填写信息量过多而拆分。

2）购物流程，第一步选票种/系统ubuntu，第二部填收货人/套餐或线路。

3）报名表单。

![](https://ws3.sinaimg.cn/large/006tNc79gy1fmw7irv6otj30nw0bm0t0.jpg)

# 17. 显示资料验证错误讯息

## 1、应用场景

1）填写表单格式不符时，提示错误。

![](https://ws2.sinaimg.cn/large/006tNc79gy1fmw7o4h0gcj30lr0acdfu.jpg)

![](https://ws2.sinaimg.cn/large/006tNc79gy1fmw7o3ygc1j30ms0bcaa2.jpg)



# 18. 资料筛选、搜索

## 1、应用场景

1）选择不同的标签、或核选方块筛选资料。

2）模糊搜索ransack。如果数据量上万笔，用[Elasticsearch](https://www.elastic.co/)。

![](https://ws3.sinaimg.cn/large/006tNc79gy1fmw7uhmiyjj30ki080jry.jpg)

![](https://ws4.sinaimg.cn/large/006tNc79gy1fmw7y6p3dyj30km08udgc.jpg)

# 19. 多档案上传

## 1、应用场景（配合10的嵌套表单UI）

1）商品详情页小图片。

2）商品详情页描述。

![](https://ws3.sinaimg.cn/large/006tNc79gy1fmw8bclwbmj30nb0cj0sw.jpg)



# 20. 图表数据分析

## 1、应用场景

1）数据分析。

![](https://ws2.sinaimg.cn/large/006tNc79gy1fmw8f937rnj30lk0ay0so.jpg)

![](https://ws2.sinaimg.cn/large/006tNc79gy1fmw8f7z75kj30lj0am3yv.jpg)



# 21. 软删除和版本控制

## 1、应用场景

1）回收站功能，上线的网站要用。

![](https://ws3.sinaimg.cn/large/006tNc79gy1fmw8jue5ojj30m906iq3g.jpg)



# 22. 数据导出CSV/EXCEL

## 1、应用场景

1）资料转移、备份。



# 23. 用户权限控管

## 1、应用场景

1）用户管理。编辑用户权限、设置管理员权限。

2）活动/商品管理。

> 多角色、多权限管理用gem pundit 和 gem cancancan

![](https://ws4.sinaimg.cn/large/006tNc79gy1fmw8otdg64j30mj07b74b.jpg)



# 24. 本地 E-mail 寄送

## 1、应用场景

1）本地测试用即用gem letter_opener。

![](https://ws3.sinaimg.cn/large/006tNc79gy1fmw8u4pmq0j30ly08umx7.jpg)



# 25. 数据导入

## 1、应用场景

1）用rake导入多笔数据，再用CSV.parse解析



# 26. 异步处理任务

## 1、应用场景

1）导入或导出上万笔资料时，让这个进程在后台处理。

