---
title: wx-function-顶部标签栏/导航栏tab菜单切换
date: '2017-12-22 00:10'
categories:
  - 微信小程序
tags:
  - 微信功能
img: 'https://ws1.sinaimg.cn/large/006tNc79gy1fnfwxbwogcj30dy0ccwer.jpg'
abbrlink: 32fec826
---

* 201712
* 编程+小程序



# 一、案例1

<img src="https://ws2.sinaimg.cn/large/006tKfTcgy1fmn8zs2bq5g30at0kmt9l.gif" height="300">

wxml文件

```
<view class="swiper-tab">
    <view data-current="0" bindtap="swichNav">哈哈</view>
    <view data-current="1" bindtap="swichNav">呵呵</view>
    <view data-current="2" bindtap="swichNav">嘿嘿</view>
</view>

<swiper current="{{currentTab}}" >
  <swiper-item>
    <view>我是哈哈</view>
  </swiper-item>
  <swiper-item>
    <view>我是呵呵</view>
  </swiper-item>
  <swiper-item>
    <view>我是嘿嘿</view>
  </swiper-item>
</swiper>
```

js文件

```
var app = getApp()
  Page( {
    data: {
    },

  swichNav: function( e ) {
    var that = this;
    if( this.data.currentTab === e.target.dataset.current ) {
      return false;
    } else {
      that.setData( {
        currentTab: e.target.dataset.current
      })
    }
  }
})  
```

