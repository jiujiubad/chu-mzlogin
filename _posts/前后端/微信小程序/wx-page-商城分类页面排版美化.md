---
title: wx-page-商城分类页面排版美化
date: '2017-12-23 00:10'
categories:
  - 微信小程序
tags:
  - 微信页面
img: 'https://ws3.sinaimg.cn/large/006tNc79gy1fnfuf5yqi5j30di09sq34.jpg'
abbrlink: fc1e8879
---

* 201712
* 编程+小程序



<img src="https://ws4.sinaimg.cn/large/006tNc79gy1fmropgzjplj30ha0uqwhs.jpg" width="250">

## 1、搜索框

wxml

```
  <view class="search">
    <navigator url="/pages/search/search" class="input">
      <image class="icon"></image>
      <text class="txt">商品搜索</text>
    </navigator>
  </view>
```

wxss

```
.search {
  height: 88rpx;
  width: 100%;
  padding: 0 30rpx;
  display: flex;
  align-items: center;
}
.search .input {
  width: 690rpx;
  height: 56rpx;
  background: #ededed;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
.search .icon {
  background: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/search2-2fb94833aa.png) center no-repeat;
  background-size: 100%;
  width: 28rpx;
}
.search .txt {
  color: #888;
  font-size: 30rpx;
}
```

## 2、左右侧代码+美化左侧

wxml

```
  <view class="catalog">
    <scroll-view class="nav" scroll-y="true">
      <block wx:for="{{newsda}}" wx:key="">
        <view class="item {{cur_id == item.id ? 'active' : ''}}" bindtap="loadData" data-categoryid="{{item.id}}">
          {{item.name}}
        </view>  
      </block>
    </scroll-view>
    <scroll-view class="cate" scroll-y="true">
      <block wx:for="{{newsdata}}" wx:key="">
        <view class="item">
          <image src="{{item.image.url}}"></image>
          <text>{{item.title}}</text>
        </view>  
      </block> 
    </scroll-view>   
  </view> 
```

js

```
// pages/exercies/index.js
Page({
  data: {
    
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'https://luccake.top/api/v1/categories', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          newsda: res.data.category
        })
      }
    })
  },
  loadData: function (e) {
    var that = this;
    console.log(e.target.dataset.categoryid); //测试console是否显示id号，这行可删除。
    wx.request({
      url: 'https://luccake.top/api/v1/categories/' + e.target.dataset.categoryid, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          newsdata: res.data.product,
          cur_id: e.target.dataset.categoryid
        })
      }
    })
  }
})
```

wxss

```
.catalog {
  flex: 1;
  width: 100%;
  background: #fff;
  display: flex;
  border-top: 1px solid #fafafa;
}
.catalog .nav {
  width: 162rpx;
  height: 100%;
}
.catalog .nav .item {
  text-align: center;
  line-height: 90rpx;
  width: 162rpx;
  height: 90rpx;
  color: #333;
  font-size: 28rpx;
  border-left: 6rpx solid #fff;
}
.catalog .nav .item.active {
  color: #ab2b2b;
  font-size: 36rpx;
  border-left: 6rpx solid #ab2b2b;
}
```

