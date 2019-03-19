---
title: 'wx-page-循环wx:for一行显示两个商品的wxml和css'
date: '2018-01-08 00:10'
categories:
  - 微信小程序
tags:
  - 微信页面
img: 'https://ws3.sinaimg.cn/large/006tNc79gy1fnfuf5yqi5j30di09sq34.jpg'
abbrlink: f342d2d
---

* 201801
* 编程+小程序



<img src="https://ws2.sinaimg.cn/large/006tNc79gy1fn7z178a3lj30930e975d.jpg" width="250">

# 一、案例1成功

wxml

```
<view class="items">
  <view class="item" wx:for="{{weldata}}">
    <image src='{{item.photos[0].avatar.url}}'></image>
    <view>{{item.title}}</view>
    <view>{{item.price}}</view>
  </view>
</view>
```

js

```
.items {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;//可删，用于居中
}
.item {
  width:49%;
  margin: 0 auto;//可删，用于居中
}
```

# 二、案例2失败——不能用scroll-view

把案例1最外层的view改成scroll-view，纵向scroll-y或横向scroll-x

```
<scroll-view class="items" scroll-y>
    <view class="item" wx:for="{{weldata}}">
      <image src="{{item.photos[0].avatar.url}}"></image>
      <text>{{item.title}}</text>
      <text>{{item.price}}</text>
    </view>
</scroll-view>
```

> 分析：如果按案例1的做法，应该用scroll-x，但是view和scroll-view原理不同，同样设置wrap多行，可能view的多行是往下堆砌，而scroll-x是往右堆砌、scroll-y是向下堆砌但又只能显示一列。
>
> 所以，scroll-x和scroll-y都没法实现**『按行排列+多行排列』**，即`flex-flow: row wrap;`或分开写`flex-direction: row; flex-wrap:wrap;` 。

# 三、案例3——能不能在wx:for上加一层navigator

## 1、失败

```
<view class="items">
  <navigator url='../p_goods/p_goods' >
    <view class="item" wx:for="{{weldata}}">
      <image src="{{item.photos[0].avatar.url}}"></image>
      <text>{{item.title}}</text>
      <text>{{item.price}}</text>
    </view>
  </navigator>
</view>
```

## 2、成功-改变class="items"的位置

```
  <navigator class="items" url='../p_goods/p_goods'>
    <view class="item" wx:for="{{weldata}}">
      <image src="{{item.photos[0].avatar.url}}"></image>
      <text>{{item.title}}</text>
      <text>{{item.price}}</text>
    </view>
  </navigator>
```

### 3、失败-改变wx:for的位置

```
<view class="items">
  <navigator url='../p_goods/p_goods' wx:for="{{weldata}}">
    <view class="item" >
      <image src="{{item.photos[0].avatar.url}}"></image>
      <text>{{item.title}}</text>
      <text>{{item.price}}</text>
    </view>
  </navigator>
</view>
```



# 总结以上三个案例：

1、用view，而不要用scroll-view。

2、要用navigator，如果有wx:for循环，则把navigator放在第二层盒子即产品盒子上`<navigator class="item" url="../../goods/goods/id?={{item.id}}" wx:for="{{xx}}">`，最外层大盒子用`<view class="items">`。

3、wx:for的同个标签内放商品盒子`class="item"`

> PS：如果实在搞不定，也可以先用float:left。