---
title: wx-function-商城(实例)分类菜单动态绑定id、动态api
date: '2017-12-22 00:10'
categories:
  - 微信小程序
tags:
  - 微信功能
img: 'https://ws1.sinaimg.cn/large/006tNc79gy1fnfwxbwogcj30dy0ccwer.jpg'
abbrlink: 57f3edf
---

* 201712
* 编程+小程序



<img src="https://ws3.sinaimg.cn/large/006tNc79gy1fmpmtwhs0tj30hc0uk3yq.jpg" width="200">

参考demo2，下载地址[*微信小程序商城项目*之侧栏分类效果(1)](http://so.jb51.net/cse/search?q=%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F%E5%95%86%E5%9F%8E%E9%A1%B9%E7%9B%AE&entry=1&s=10520733385329581432&stp=1&nsid=0)

api地址http://huanqiuxiaozhen.com/wemall/goodstype/typebrandList

# 一、初稿

wxml页面

```
<!--index.wxml-->
<view class="container" wx:key="index">
  <view>
    <button type="primary" bindtap="loadData">加载数据</button>
  </view>
  
  <view wx:for="{{newsdata}}" style="width:25%">
    <image sytle="width:300px;height:200px;" src="{{item.image.url}}"></image>
    [{{item.realtype}}]{{item.title}}——{{item.name}}
  </view>  
</view>
```

js页面，onShow是一开始显示的画面（接index的api）。loadData是自定义的事件，用bindtap的用法绑定在按钮上，点击按钮显示新的画面（接show的api）。

```
// pages/exercies/index.js
Page({
  data: {
  
  },
  onShow: function () {
    var that = this;
    wx.request({
      url: 'https://luccake.top/api/v1/categories', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          newsdata: res.data.category
        })
      }
    })
  },
  loadData: function () {
    var that = this;
    wx.request({
      url: 'https://luccake.top/api/v1/categories/1', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          newsdata: res.data.product
        })        
      }
    })
  }
})
```



# 二、显示分类名，点击出现全部商品（因为还没有绑定分类id）

wxml

```
<!--index.wxml-->
<view class="container" wx:key="index">
  
  <view wx:for="{{newsda}}" style="width:25%" bindtap="loadData" wx:key="">
    {{item.name}}
  </view>  

  <view wx:for="{{newsdata}}" style="width:25%" wx:key="">
    <image sytle="width:300px;height:200px;" src="{{item.image.url}}"></image>
    [{{item.realtype}}]{{item.title}}——{{item.name}}
  </view>    
</view>
```

js，图片接口用了固定id=1，所以只能显示1分类的商品

```
// pages/exercies/index.js
Page({
  data: {
  
  },
  onShow: function () {
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
  loadData: function () {
    var that = this;
    wx.request({
      url: 'https://luccake.top/api/v1/categories/1', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          newsdata: res.data.product
        })        
      }
    })
  }
})
```



# 三、动态绑定分类id

## 1、关键代码

1）目的是点击分类名称后显示相应分类id下的商品。

所以要在带有bindtap的view标签里加入`data-categoryid="{{item.id}}"`

> 注意：这里的`data-变量名称`，在js调用时是不能带`data-`，而是直接用名称

2）定义bindtap点击后指定的function，比如loadData: function (e)。

最关键的代码：`参数名.target.dataset.变量名称`。

如果传递的参数如上是`e`，那么调用方法就是`e.target.dataset.categoryid`。

把代码加入到api的url中，代码如下。

## 2、代码

wxml

```
<!--index.wxml-->
<view class="container" wx:key="index">
  
  <view wx:for="{{newsda}}" style="width:25%" bindtap="loadData" data-categoryid="{{item.id}}" wx:key="">
    {{item.name}}
  </view>  

  <view wx:for="{{newsdata}}" style="width:25%" wx:key="">
    <image sytle="width:300px;height:200px;" src="{{item.image.url}}"></image>
    [{{item.realtype}}]{{item.title}}——{{item.name}}
  </view>    
</view>
```

js

```
// pages/exercies/index.js
Page({
  data: {

  },
  onShow: function () {
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
          newsdata: res.data.product
        })
        
      }
    })
  }
})
```



# 四、加上css

<img src="https://ws3.sinaimg.cn/large/006tNc79gy1fmpmtwhs0tj30hc0uk3yq.jpg" width="200">

wxml

```
<!--index.wxml-->
<view class="container">
  <view class="nav_left">
    <block wx:for="{{newsda}}" wx:key="">
      <view class="nav_left_items {{cur_id == item.id ? 'active' : ''}}" bindtap="loadData" data-categoryid="{{item.id}}">
        {{item.name}}
      </view>  
    </block>
  </view>

  <view class="nav_right">
    <block wx:for="{{newsdata}}" wx:key="">
      <view class="nav_right_items">
        <image src="{{item.image.url}}"></image>
        <text>{{item.title}}</text>
      </view>  
    </block>
  </view>   
</view>
```

js

```
// pages/exercies/index.js
Page({
  data: {
    
  },
  onShow: function () {
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
page{
  background: #f5f5f5;
}
/*总体主盒子*/
.container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #fff;
  color: #939393;
}

/*左侧栏主盒子*/
.nav_left{
  /*设置行内块级元素（没使用定位）*/
  display: inline-block;
  width: 25%;
  height: 100%;
  /*主盒子设置背景色为灰色*/
  background: #f5f5f5;
  text-align: center;
}
/*左侧栏list的item*/
.nav_left .nav_left_items{
  /*每个高30px*/
  height: 30px;
  /*垂直居中*/
  line-height: 30px;
  /*再设上下padding增加高度，总高42px*/
  padding: 6px 0;
  /*只设下边线*/
  border-bottom: 1px solid #dedede;
  /*文字14px*/
  font-size: 14px;
}
/*左侧栏list的item被选中时*/
.nav_left .nav_left_items.active{
  /*背景色变成白色*/
  background: #fff;
}

/*右侧栏主盒子*/
.nav_right{
  /*右侧盒子使用了绝对定位*/
  position: absolute;
  top: 0;
  right: 0;
  flex: 1;
  /*宽度75%，高度占满，并使用百分比布局*/
  width: 75%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  background: #fff;
}
/*右侧栏list的item*/
.nav_right .nav_right_items{
  /*浮动向左*/
  float: left;
  /*每个item设置宽度是33.33%*/
  width: 33.33%;
  height: 80px;
  text-align: center;
}
.nav_right .nav_right_items image{
  /*被图片设置宽高*/
  width: 50px;
  height: 30px;
}
.nav_right .nav_right_items text{
  /*给text设成块级元素*/
  display: block;
  margin-top: 5px;
  font-size: 10px;
  /*设置文字溢出部分为...*/
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
```



## 五、加上wx:if当没有图片或数据时的显示

