---
title: >-
  bug-购物网4-4 carrierwave上传图片translation missing-
  en.errors.messages.mini_magick_processing_error
date: '2017-11-22 01:10'
categories:
  - ror知识点
tags:
  - bug
img: 'https://ws1.sinaimg.cn/large/006tNc79gy1fnfw7fgtkoj30dv0dh0sq.jpg'
abbrlink: 5082df0b
---

* 201711
* 编程+rails



# JDSTORE4-3，carrierwave和minimagic设置后，上传图片报错

![](https://ws4.sinaimg.cn/large/006tNc79gy1fl7d1jr5awj30q20as3zd.jpg)

translation missing: en.errors.messages.mini_magick_processing_error



## 一、新的解法

输入`brew install imagemagick`，会提示gem已安装是否要更新。

输入`brew upgrade imagemagick`，更新完成，然后`bundle`搞定。



## 二、旧的解法（仍有bug）

#### 原因：网上goolge，有的是说初始化问题，可以尝试重装。但是自己重新无效

#### 临时解决办法：在`config/initializers`下新建一个文件`carrierwave.rb`，然后写入代码，最后重开`rails s`

```
CarrierWave.configure do |config|
  config.storage = :file 
  config.enable_processing = false 
  config.fog_attributes = {'Cache-Control'=>'max-age=315576000'} 
  config.cache_dir = Rails.root.join('tmp', 'uploads') 
  end
```

#### 新问题：上传的图片是原始大小