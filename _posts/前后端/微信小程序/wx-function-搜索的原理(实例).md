---
title: wx-function-搜索的原理(实例)
date: '2017-12-23 00:10'
categories:
  - 微信小程序
tags:
  - 微信功能
img: 'https://ws1.sinaimg.cn/large/006tNc79gy1fnfwxbwogcj30dy0ccwer.jpg'
abbrlink: e27ad1c4
---

* 201712
* 编程+小程序



# 参考资料

 [微信小程序实战（二）---实现搜索页面 by杨小事er](http://blog.csdn.net/qq_25936689/article/details/53067586)

[本案例github源码](https://github.com/Yangzhedi/myBlog-wxapp)

# 一、搜索原理

<img src="https://ws4.sinaimg.cn/large/006tKfTcgy1fmxz07gi2ug308l0f9n1w.gif" width="200">

## 1、数据的获取和页面跳转

>  需要元素：input页面、resul页面、官方文档api的数据缓存部分如wx.setStorageSync、wx.clearStorageSync()

- input绑定bindInput函数，将输入的值存在inputValue中
- button 用bindtap绑定setSearchStorage函数。这个函数主要就是先判断输入的值是否不为空，再通过getStorageSync获取到key为searchData的localStorage，如果第一次还没有set过这个key就获取[]，再将用户inputValue存的想要搜索的值放进searchData，之后再跳转到result页面。这里我只放了个案例页面。
- 如果在真正的生产环境中，这个函数可以通过wx.request向服务器发送请求，再把数据放进result页面中，实现真正的搜索功能。

1）新建pages/result/result，在wxml页面加入`<view>假设这就是个结果</view>`

2）wxml

```
<input placeholder="请输入搜索的商品" auto-focus bindinput="bindInput" value="{{inputValue}}"/>

<button  style="display:inline-block" bindtap="setSearchStorage">搜索</button>
```

3）js

```
Page({
  data: {
  },
  bindInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
    console.log('bindInput' + this.data.inputValue)
  },

  setSearchStorage: function () {
    let data;
    let localStorageValue = [];
    if (this.data.inputValue != '') {
      //调用API从本地缓存中获取数据  
      var searchData = wx.getStorageSync('searchData') || []
      searchData.push(this.data.inputValue)
      wx.setStorageSync('searchData', searchData)
      wx.navigateTo({
        url: '../result/result'
      })
    } else {
      console.log('空白的你搜个蛋！')
    }
    // this.onLoad();  
  }  
})
```

## 2、再次进入时清空搜索框

原理很简单，搜索框input标签加上{{inputValue}}，把搜索框inputValue的值设置成空。

wxml

```
<button style="display:inline-block" bindtap="clearInput">×</button>
```

js

```
clearInput: function () {
  this.setData({
    inputValue: ''
  })
}  
```

## 3、显示搜索记录

原理，是拿到系统缓存数据getStorageSync('searchData')

wxml

```
<view wx:for="{{getSearch}}" wx:for-index="idx" wx:for-item="itemName" wx:key="idx" >
  <view wx:if="{{itemName != ''}}"> {{itemName}} </view>
</view>
```

js

```
  onShow: function () {
    var getSearch = wx.getStorageSync('searchData');
    this.setData({
      getSearch: getSearch,
      inputValue: ''
    })
    console.log('search is onshow')
  },  
```

## 4、清空搜索记录

原理，将之前的值为searchData数组的localStorage本地缓存重置为空数组。

wxml

```
<modal class="modal" hidden="{{modalHidden}}" bindconfirm="modalChangeConfirm" bindcancel="modalChangeCancel">
  <view> 没有标题没有蒙层没有确定的modal </view>
  <view> 内容可以插入节点 </view> 
</modal>

<button style="display:inline-block" bindtap="clearSearchStorage">清空浏览记录</button>
```

js

```
    clearSearchStorage:function(){
       this.setData({
          modalHidden:false //点击清空记录按钮，出现modal弹窗
      })
    },
    modalChangeConfirm: function () {
    wx.setStorageSync('searchData', [])
    this.setData({
      modalHidden: true  //数据清空后，隐藏modal弹窗
    })
    wx.redirectTo({
      url: '../search/search'  //数据清空后，重定向到当前搜索页面
    })
    // this.onLoad();
  },
  modalChangeCancel: function () {
    this.setData({
      modalHidden: true //点击取消时，隐藏modal弹窗
    })
  }
```







练习

js

```
  clickTip:function(e){
    var name = e.currentTarget.dataset.title
    wx.navigateTo({
      url: '../p_result/p_result?str=' + name,
    })
    var searchData = wx.getStorageSync('searchData') || []
    searchData.push(name)
    wx.setStorageSync('searchData', searchData)
  },
  onShow: function () {
    var getSearch = wx.getStorageSync('searchData');
    this.setData({
      getSearch: getSearch,
    })
    console.log('search is onshow')
  }
```

wxml

```
<view wx:for="{{getSearch}}">
  <view>{{item}}</view>
</view
```

